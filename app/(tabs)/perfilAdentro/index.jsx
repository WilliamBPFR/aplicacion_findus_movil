import { Text, View, Image, Dimensions, StatusBar, ScrollView, view, Touchable, TouchableOpacity, Modal} from "react-native";
import TopBar from "../../../components/topbar.jsx";
import { Dialog, Portal, PaperProvider,ActivityIndicator } from 'react-native-paper';
import { Dot } from "lucide-react-native";
import { obtenerInfoUserPerfilBD, obtenerToken, extraerEdad, cambiarContrasena, cambiarFotoPerfilBD } from "../../../services/userServices.js";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { formatearFecha } from "../../../services/publicacionServices.js";
import * as ImagePicker from "expo-image-picker";



export default function Page() {

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [userData, setUserData] = useState({});
    const [userStatistics, setUserStatistics] = useState({});
    const [imageName, setImageName] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [sendingImage, setSendingImage] = useState(false);
    const [actualizarTopBar, setActualizarTopBar] = useState(false);

    
    useEffect(() => {
        setLoading(true);
        obtenerInfoUserPerfilBD(obtenerToken()).then((response) => {
            if(response.status === 200){
                // console.log("Información del perfil: ",response.data);
                setUserData(response.data.informacionesPerfil);
                setUserStatistics(response.data.estadisticasPublicaciones);
            }else{
                console.log("Error al obtener la información del perfil: ",response.data);
            }
        }).catch((error) => {
            console.log("Error al obtener la información del perfil: ",error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const convertToBase64 = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const reader = new FileReader();
    
        return new Promise((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result.split(',')[1]); // Devuelve solo la parte Base64
          };
          reader.readAsDataURL(blob);
        });
      };
    

    const openCamera = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                // aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                const { uri, mimeType} = result.assets[0];
                const fileName = uri.split("/").pop()
                const base64File = await convertToBase64(uri);
                setImageName(fileName); // Muestra el nombre del archivo
                
                if (onImagePicked) {
                    onImagePicked({ base64File: base64File, fileName: fileName, mimeType: mimeType });
                }
            }
        } catch (error) {
            console.error("Error picking image: ", error);
        }
    };

    const openGallery = async () => {
        try {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
          });
    
          if (!result.canceled) {
            const { uri, mimeType} = result.assets[0];
            const fileName = uri.split("/").pop()
            const base64File = await convertToBase64(uri);
            setImageName(fileName); // Muestra el nombre del archivo
    
            if (onImagePicked) {
              onImagePicked({ base64File: base64File, fileName: fileName, mimeType: mimeType });
            }
          }
        } catch (error) {
          console.error("Error picking image: ", error);
        }
    };
    
    const onImagePicked = async (data) => {
        // console.log("Imagen seleccionada: ",data);
        setSendingImage(true);
        cambiarFotoPerfilBD(data,obtenerToken()).then((response) => {
            if(response.status === 200){
                console.log("Foto de perfil cambiada correctamente");
                setUserData({...userData,urlfotoperfil:response.data.urlFotoPerfil});
                setActualizarTopBar(true);
            }else{
                console.log("Error al cambiar la foto de perfil: ",response.data);
            }
        }).catch((error) => {
            console.log("Error al cambiar la foto de perfil: ",error);
        }).finally(() => {
            setSendingImage(false);
            setModalVisible(false);
        });
    };

        

    if (loading) {
        return (
          <View className="flex-1 bg-[#F#F7FD]">
             <StatusBar hidden={false} backgroundColor={"#C6DAEB"} barStyle={"light-content"} />
             <TopBar/>
            <ActivityIndicator className="mt-[5vh]" animating={true} color={"#1DE9B6"} size={"large"} />
          </View>
        );
      }

  return (
    <PaperProvider>
      <View className="flex-1 bg-[#F3F7FD]">
        <StatusBar hidden={false} backgroundColor={"#C6DAEB"} barStyle={"light-content"} />
        <TopBar actualizar={actualizarTopBar} setActualizar={setActualizarTopBar}/>
        <ScrollView 
          className="flex-col w-[100%] h-[70vh] mt-[3%] rounded-lg "
          contentContainerStyle={{alignItems: "center", justifyContent: "center"}}
        >
            <View className="flex-col w-full ">
                <TouchableOpacity 
                    activeOpacity={0.8} 
                    className="justify-center items-center align-middle"
                    onPress={() => setModalVisible(true)}
                >
                    <Image
                        source={{ uri: userData?.urlfotoperfil }}
                        // style={{ width: 50, height: 50, borderRadius: 25 }}
                        className="w-[35vw] h-[35vw] rounded-full mx-[2vw]"
                        resizeMode="cover"  // Puedes usar "cover", "contain", o "stretch"
                    />
                </TouchableOpacity>

                
                <Modal
                    transparent={true}
                    // animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View className="flex-1 justify-center items-center bg-black/50">
                        {!sendingImage ? (
                            <View className="w-72 p-5 bg-white rounded-lg ">
                                <Text className="text-xl font-bold mb-4 text-center text-[#233E58]">Seleccione una opción</Text>
                                <TouchableOpacity
                                    onPress={openGallery}
                                    className="py-3 items-center border-b border-gray-300"
                                >
                                    <Text className="text-[#3571d3] text-base font-bold">Seleccionar de galería</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={openCamera}
                                    className="py-3 items-center border-b border-gray-300"
                                >
                                    <Text className="text-[#3571d3] text-base font-bold">Abrir cámara</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                    className="py-3 items-center"
                                >
                                    <Text className="text-red-500 text-base font-bold">Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        ): (
                            <View className="w-72 p-5 bg-white rounded-lg ">
                                <Text className="text-xl font-bold mb-4 text-center text-[#233E58]">Subiendo imagen...</Text>
                                <ActivityIndicator animating={true} color={"#1DE9B6"} size={"large"} />
                            </View>
                        )}
                    </View>
                </Modal>

                <View
                    className="flex-row w-[100%] mt-[1vh] justify-center items-center align-middle"
                >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="w-[25vw] h-[6vh] justify-center items-center align-middle bg-[#59a0d3] rounded-lg mr-[2vw]"
                        onPress={() => router.push(`../../editarPerfil`)}
                    >
                        <Text className="w-[18vw] text-sm text-center font-bold text-[#233E58]">
                            Editar Perfil
                        </Text>
                    </TouchableOpacity>
{/* 
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="w-[25vw] h-[6vh] justify-center items-center align-middle bg-[#e08383] rounded-lg ml-[2vw]"
                    >
                        <Text className="w-[18vw] text-sm text-center first-letter:font-bold text-[#233E58]">
                            Desactivar Cuenta
                        </Text>
                    </TouchableOpacity> */}
                </View>
                
                <Text className="mt-[2vh] text-2xl ml-[3vw] font-bold text-[#233E58]">
                    Datos del Perfil
                </Text>

                <View className="flex-col ml-[calc(3.5vw)] w-[94vw] space-y-[calc(4vh)]">
                    <Text className="ml-[1vw] text-lg  text-[#233E58] ">
                        <Text className="font-bold">- Nombre: </Text>{userData?.nombre} {userData?.apellido} 
                    </Text>

                    <Text className="ml-[1vw] text-lg  text-[#233E58] ">
                        <Text className="font-bold">- Correo: </Text>{userData?.email}
                    </Text>

                    <Text className="ml-[1vw] text-lg  text-[#233E58] ">
                        <Text className="font-bold">- Tipo de Documento: </Text>{userData?.tipodocumento?.nombretipodocumento}
                    </Text>

                    <Text className="ml-[1vw] text-lg  text-[#233E58] ">
                        <Text className="font-bold">- Número del Documento: </Text>{userData?.numerodocumento}
                    </Text>

                    <Text className="ml-[1vw] text-lg  text-[#233E58] ">
                        <Text className="font-bold">- Número de Teléfono: </Text>{userData?.numerotelefono}
                    </Text>

                    <Text className="ml-[1vw] text-lg  text-[#233E58] ">
                        <Text className="font-bold">- Rol: </Text>{userData?.rol?.nombrerol}
                    </Text>

                    <Text className="ml-[1vw] text-lg  text-[#233E58] ">
                        <Text className="font-bold">- Fecha de Nacimiento: </Text>{formatearFecha(userData?.fechanacimiento)} ({extraerEdad(userData?.fechanacimiento)} años) 
                    </Text>
                </View>

                <Text className="mt-[2vh] text-2xl ml-[3vw] font-bold text-[#233E58]">
                    Estadísticas del Perfil
                </Text>

                <View className="flex-col ml-[calc(3.5vw)] w-[94vw] ">
                    <View className="flex-row justify-between mx-[3vw] my-[calc(1.5vh)]">

                        <View className="bg-[#8dc4d6] w-[40vw] p-1 rounded-lg">
                            <Text className="text-lg font-bold text-center text-[#233E58]">Publicaciones Hechas</Text>
                            <Text className="text-4xl font-extrabold text-center mt-[1vh] text-[#172b3d]">{userStatistics?.totalPublicacionesHechas}</Text>
                        </View>

                        <View className="bg-[#8dc4d6] w-[40vw] p-1 rounded-lg">
                            <Text className="text-lg font-bold text-center text-[#233E58]">Publicaciones Activas</Text>
                            <Text className="text-4xl font-extrabold text-center mt-[1vh] text-[#172b3d]">{userStatistics?.totalPublicacionesActivas}</Text>
                        </View>
                    </View>

                    <View className="flex-row justify-between mx-[3vw] my-[calc(1.5vh)]">

                        <View className="bg-[#8dc4d6] w-[40vw] p-1 rounded-lg">
                            <Text className="text-lg font-bold text-center text-[#233E58]">Publicaciones Cerradas</Text>
                            <Text className="text-4xl font-extrabold text-center mt-[1vh] text-[#172b3d]">{userStatistics?.totalPublicacionesCerradas}</Text>
                        </View>

                        <View className="bg-[#8dc4d6] w-[40vw] p-1 rounded-lg">
                            <Text className="text-lg font-bold text-center text-[#233E58]">Publicaciones Desactivadas</Text>
                            <Text className="text-4xl font-extrabold text-center mt-[1vh] text-[#172b3d]">{userStatistics?.totalPublicacionesInactivas}</Text>
                        </View>
                    </View>

                    <View className="flex-row justify-between mx-[3vw] my-[calc(1.5vh)] ">

                        <View className="bg-[#8dc4d6] w-[40vw] p-1 rounded-lg">
                            <Text className="text-lg font-bold text-center text-[#233E58]">Avistamientos Publicados</Text>
                            <Text className="text-4xl font-extrabold text-center mt-[1vh] text-[#172b3d]">{userStatistics?.totalAvistamientosPublicados}</Text>
                        </View>

                        <View className="bg-[#8dc4d6] w-[40vw] p-1 rounded-lg">
                            <Text className="text-lg font-bold text-center text-[#233E58]">Comentarios Realizados</Text>
                            <Text className="text-4xl font-extrabold text-center mt-[1vh] text-[#172b3d]">{userStatistics?.totalComentariosHechos}</Text>
                        </View>
                    </View>
                </View>
          </View>
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

