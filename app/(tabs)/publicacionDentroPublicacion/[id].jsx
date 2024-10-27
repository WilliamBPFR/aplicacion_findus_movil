import { Text, View, Image, Dimensions, StatusBar, ScrollView, TouchableOpacity,BackHandler} from "react-native";
import TopBar from "../../../components/topbar.jsx";
import QRCode from "react-native-qrcode-svg";
import { Download,Forward } from "lucide-react-native";
import {Icon} from "react-native-paper";
import CardAvistamiento from "../../../components/card_avistamiento.jsx";
import CardComentarioPublicacion from "../../../components/card_comentario_publicacion.jsx";
import CardHacerComentarioPublicacion from "../../../components/card_hacer_comentario_publicacion.jsx";
import { obtenerInfoDesaparecidoByID, formatearFecha } from "../../../services/publicacionServices.js";
import { useRouter, useLocalSearchParams,  useFocusEffect} from "expo-router";
import { useEffect,useState, useCallback } from "react";
import { ActivityIndicator } from 'react-native-paper';


const { width, height } = Dimensions.get("window");

export default function Page() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [publicacion, setPublicacion] = useState({});
  const [loadingData, setLoadingData] = useState(true);

  useFocusEffect(
    useCallback(() => {
      // Esta función se ejecuta al recibir el foco. No hacemos nada aquí.
      
      return () => {
        // Esta función solo se ejecuta al perder el foco.
       setLoadingData(true);
       setPublicacion({});
      };
    }, [])
  );

  useEffect(() => {
    if(id){
      // Aquí se puede hacer la petición a la API para obtener la publicación con el id
      obtenerInfoDesaparecidoByID(id).then((response) => {
        console.log(response);
        if (response.status === 200) {
          setPublicacion(response.data);
          // console.log(response.data.avistamiento[0].fotosavistamiento[0].urlarchivo);
          setLoadingData(false);
        }
      });
    }
  }, [id]);

  if (loadingData) {
    return (
      <View className="flex-1 bg-[#F3F7FD]">
        <StatusBar hidden={false} backgroundColor={"#C6DAEB"} barStyle={"light-content"} />
        <TopBar/>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator animating={true} color="#1DE9B6" size="large" />
        </View>
      </View>
    );
  }
  return (
    <View className="flex-1 bg-[#F3F7FD]">
      <StatusBar hidden={false} backgroundColor={"#C6DAEB"} barStyle={"light-content"} />
      <TopBar/>
      <ScrollView className="flex flex-col mt-[2vh]" contentContainerStyle={{alignItems: "center", justifyContent: "center"}}>
          <Text className="text-2xl font-bold mb-[calc(2.5%)]">Persona Desaparecida</Text>

          <View className="flex-row w-[90%] items-center justify-center">
              <Text className="text-lg font-bold mr-[2%]">{publicacion?.nombredesaparecido}</Text>
              <Icon size={25}  color={publicacion?.verificado ? "#4ECCAF": "#C1C1C1"} source={"check-circle"} allowFontScaling={true}/>
          </View>
          
          <View className="mt-[2vh] bg-[#c5d7e8a5] w-[90vw] rounded-lg">
              <View className="flex-row w-[85%] mx-auto items-center justify-between align-middle">
                    <Image 
                      source={{uri: publicacion?.fotospublicacion[0]?.urlarchivo}} 
                      className="w-[50%] h-[20vh] my-[2vh] rounded-lg"
                      resizeMode="cover"
                    />
                    <View className="flex-col">
                      <Text className="text-xs font-bold text-[#254E70] w-full text-center mb-[5%]">QR Publicación</Text>
                        <QRCode
                            value="https://youtube.com"
                            size={width*0.30}                        
                        />                      
                      <View className="flex-row items-center justify-center mt-[5%] space-x-[10%]">
                        <TouchableOpacity
                          onPress={() => console.log("Descargar QR")}
                        >
                            <Download size={25} color="#000000" source={"download-outline"} allowFontScaling={true}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => console.log("Compartir QR")}
                        >
                            <Forward size={25}  color="#000000" source={"download-outline"} allowFontScaling={true}/>
                        </TouchableOpacity>
                      </View>
                    </View>

              </View>

              <View className="flex-col w-[90%] mx-auto mt-[1vh] mb-[2vh]">
                  <Text className="text-[15px] text-[#254E70] mb-[1%]"><Text className="font-bold">Nombre: </Text>{publicacion?.nombredesaparecido}</Text>
                  <Text className="text-[15px] text-[#254E70] mb-[1%]"><Text className="font-bold">Edad: </Text> {publicacion?.edad} años</Text>
                  <Text className="text-[15px] text-[#254E70] mb-[1%]"><Text className="font-bold">Fecha de Desaparición: </Text>{formatearFecha(publicacion?.fechadesaparicion)}</Text>
                  {/* <Text className="text-[15px] text-[#254E70] mb-[1%]"><Text className="font-bold">Últ. Ubicación: </Text>Los Minas - 20/08/2024</Text> */}
                  <Text className="text-[15px] text-[#254E70] mb-[1%]"><Text className="font-bold">{publicacion?.tipodocumento.nombretipodocumento}: </Text>{publicacion?.numerodocumentodesaparecido}</Text>
                  <Text className="text-[15px] text-[#254E70] mb-[1%]"><Text className="font-bold">Descripción: </Text>{publicacion?.descripcionpersonadesaparecido}</Text>
                  <Text className="text-[15px] text-[#254E70] mb-[1%]"><Text className="font-bold">Información de Contacto: </Text>{publicacion?.informacioncontacto}</Text>
                  <Text className="text-[15px] text-[#254E70] mb-[1%]"><Text className="font-bold">Estado de la Publicación: </Text>{publicacion?.estado.nombreestado}</Text>

              </View>
          </View>

          <View className="mt-[2vh] bg-[#c5d7e8a5] w-[90vw] rounded-lg items-center justify-center px-[2vw]">
              <Text className="text-[#233E58] text-center text-[18px] w-[80%] font-bold mt-[2%]">Avistamiestos de <Text className="font-extrabold">{publicacion?.nombredesaparecido}</Text></Text>
              {/* <Text className="text-[#233E58] text-center text-[16px] w-[80%] font-bold mt-[0.5%]">{publicacion?.nombredesaparecido}</Text> */}
              {publicacion?.avistamiento.length != 0 ? (
                publicacion?.avistamiento.map((avistamiento,index) => (
                  <CardAvistamiento 
                    key={avistamiento.idavistamiento}
                    nombreQuienVio={avistamiento.usuario.nombre + " " + avistamiento.usuario.apellido}
                    dondeVio={avistamiento.localidad_avistamiento}
                    descripcion={avistamiento.detalles}
                    urlfotoAvistamiento={avistamiento.fotosavistamiento[0].urlarchivo}
                    cantItems={publicacion?.avistamiento.length}
                    numItem={index}
                  />
                ) )) : (
                  <Text className="text-[#233E58] text-center text-[16px] w-[80%] font-bold mt-[0.5%]">No hay avistamientos registrados</Text>
                )
              }
              {/* <CardAvistamiento/>
              <CardAvistamiento/>
              <CardAvistamiento/> */}

              <TouchableOpacity
                onPress={() => router.push(`/crearReporteAvistamiento/${id}?nombredesaparecido=${publicacion?.nombredesaparecido}`)}
                className="bg-[#3E86B9] w-[80%] h-[6vh] rounded-lg mt-[4%] mb-[4%] items-center justify-center"
              >
                <Text className="text-white text-center text-[18px] font-bold">Reportar Avistamiento</Text>
              </TouchableOpacity>
          </View>

          <View className="mt-[2vh] bg-[#c5d7e8a5] w-[90vw] rounded-lg items-center justify-center px-[2vw] mb-[2vh]">
              <Text className="text-[#233E58] text-center text-[18px] w-[80%] font-bold mt-[2%] mb-[calc(1.5vh)]">Comentarios de la Publicación</Text>
              <CardHacerComentarioPublicacion/>
              <CardComentarioPublicacion/>  
              <CardComentarioPublicacion/>
              <CardComentarioPublicacion/>
              <CardComentarioPublicacion/>
              <CardComentarioPublicacion/>

          </View> 
      </ScrollView>
    </View>
  );
}

