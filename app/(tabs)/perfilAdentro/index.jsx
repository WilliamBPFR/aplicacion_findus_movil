import { Text, View, Image, Dimensions, StatusBar, ScrollView, view, Touchable, TouchableOpacity} from "react-native";
import TopBar from "../../../components/topbar.jsx";
import { Dialog, Portal, PaperProvider,Button } from 'react-native-paper';
import { Dot } from "lucide-react-native";
import { useRouter } from "expo-router";



export default function Page() {

    const router = useRouter();
  return (
    <PaperProvider>
      <View className="flex-1 bg-[#F3F7FD]">
        <StatusBar hidden={false} backgroundColor={"#C6DAEB"} barStyle={"light-content"} />
        <TopBar/>
        <ScrollView 
          className="flex-col w-[100%] h-[70vh] mt-[3%] rounded-lg "
          contentContainerStyle={{alignItems: "center", justifyContent: "center"}}
        >
            <View className="flex-col w-full ">
                <TouchableOpacity 
                activeOpacity={0.8} 
                className="justify-center items-center align-middle"
                >
                    <Image
                        source={{ uri: "https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/persona4.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvcGVyc29uYTQucG5nIiwiaWF0IjoxNzI3NzM5NDIyLCJleHAiOjMxNTUyOTYyMDM0MjJ9.Bpj268olzbmxG_A_hO9yLEDzEpjsPv7DpQtj4aTbEWY&t=2024-09-30T23%3A37%3A02.760Z"}}
                        // style={{ width: 50, height: 50, borderRadius: 25 }}
                        className="w-[35vw] h-[35vw] rounded-full mx-[2vw]"
                        resizeMode="contain"  // Puedes usar "cover", "contain", o "stretch"
                    />
                </TouchableOpacity>

                <View
                    className="flex-row w-[100%] mt-[1vh] justify-center items-center align-middle"
                >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="w-[25vw] h-[6vh] justify-center items-center align-middle bg-[#59a0d3] rounded-lg mr-[2vw]"
                        onPress={() => router.push("../../editarPerfil")}
                    >
                        <Text className="w-[18vw] text-sm text-center font-bold text-[#233E58]">
                            Editar Perfil
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="w-[25vw] h-[6vh] justify-center items-center align-middle bg-[#e08383] rounded-lg ml-[2vw]"
                    >
                        <Text className="w-[18vw] text-sm text-center first-letter:font-bold text-[#233E58]">
                            Desactivar Cuenta
                        </Text>
                    </TouchableOpacity>
                </View>
                
                <Text className="mt-[2vh] text-2xl ml-[3vw] font-bold text-[#233E58]">
                    Datos del Perfil
                </Text>

                <View className="flex-col ml-[calc(3.5vw)] w-[94vw] space-y-[calc(4vh)]">
                    <Text className="ml-[1vw] text-lg  text-[#233E58] ">
                        <Text className="font-bold">- Nombre: </Text>William Chawillfer Ferreira Rosado 
                    </Text>

                    <Text className="ml-[1vw] text-lg  text-[#233E58] ">
                        <Text className="font-bold">- Correo: </Text>williamchawillferferreira@gmail.com
                    </Text>

                    <Text className="ml-[1vw] text-lg  text-[#233E58] ">
                        <Text className="font-bold">- Tipo de Documento: </Text>Cédula de Identidad
                    </Text>

                    <Text className="ml-[1vw] text-lg  text-[#233E58] ">
                        <Text className="font-bold">- Número del Documento: </Text>402-1908507-9 
                    </Text>

                    <Text className="ml-[1vw] text-lg  text-[#233E58] ">
                        <Text className="font-bold">- Número de Teléfono: </Text>829-349-8628 
                    </Text>

                    <Text className="ml-[1vw] text-lg  text-[#233E58] ">
                        <Text className="font-bold">- Rol: </Text>Usuario Normal 
                    </Text>

                    <Text className="ml-[1vw] text-lg  text-[#233E58] ">
                        <Text className="font-bold">- Fecha de Nacimiento: </Text>12/07/2003 (21 años) 
                    </Text>
                </View>

                <Text className="mt-[2vh] text-2xl ml-[3vw] font-bold text-[#233E58]">
                    Estadísticas del Perfil
                </Text>

                <View className="flex-col ml-[calc(3.5vw)] w-[94vw] ">
                    <View className="flex-row justify-between mx-[3vw] my-[calc(1.5vh)]">

                        <View className="bg-[#8dc4d6] w-[40vw] p-1 rounded-lg">
                            <Text className="text-lg font-bold text-center text-[#233E58]">Publicaciones Hechas</Text>
                            <Text className="text-4xl font-extrabold text-center mt-[1vh] text-[#172b3d]">40</Text>
                        </View>

                        <View className="bg-[#8dc4d6] w-[40vw] p-1 rounded-lg">
                            <Text className="text-lg font-bold text-center text-[#233E58]">Publicaciones Activas</Text>
                            <Text className="text-4xl font-extrabold text-center mt-[1vh] text-[#172b3d]">40</Text>
                        </View>
                    </View>

                    <View className="flex-row justify-between mx-[3vw] my-[calc(1.5vh)]">

                        <View className="bg-[#8dc4d6] w-[40vw] p-1 rounded-lg">
                            <Text className="text-lg font-bold text-center text-[#233E58]">Publicaciones Cerradas</Text>
                            <Text className="text-4xl font-extrabold text-center mt-[1vh] text-[#172b3d]">40</Text>
                        </View>

                        <View className="bg-[#8dc4d6] w-[40vw] p-1 rounded-lg">
                            <Text className="text-lg font-bold text-center text-[#233E58]">Publicaciones Desactivadas</Text>
                            <Text className="text-4xl font-extrabold text-center mt-[1vh] text-[#172b3d]">40</Text>
                        </View>
                    </View>

                    <View className="flex-row justify-between mx-[3vw] my-[calc(1.5vh)] ">

                        <View className="bg-[#8dc4d6] w-[40vw] p-1 rounded-lg">
                            <Text className="text-lg font-bold text-center text-[#233E58]">Avistamientos Publicados</Text>
                            <Text className="text-4xl font-extrabold text-center mt-[1vh] text-[#172b3d]">40</Text>
                        </View>

                        <View className="bg-[#8dc4d6] w-[40vw] p-1 rounded-lg">
                            <Text className="text-lg font-bold text-center text-[#233E58]">Comentarios Realizados</Text>
                            <Text className="text-4xl font-extrabold text-center mt-[1vh] text-[#172b3d]">40</Text>
                        </View>
                    </View>
                </View>
          </View>
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

