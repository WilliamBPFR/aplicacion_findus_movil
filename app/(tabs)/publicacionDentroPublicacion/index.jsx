import { Text, View, Image, Dimensions, StatusBar, ScrollView, TouchableOpacity} from "react-native";
import TopBar from "../../../components/topbar.jsx";
import QRCode from "react-native-qrcode-svg";
import { Download,Forward } from "lucide-react-native";
import {Icon} from "react-native-paper";
import CardAvistamiento from "../../../components/card_avistamiento.jsx";
import CardComentarioPublicacion from "../../../components/card_comentario_publicacion.jsx";
import CardHacerComentarioPublicacion from "../../../components/card_hacer_comentario_publicacion.jsx";
import { useRouter } from "expo-router";
const { width, height } = Dimensions.get("window");

export default function Page() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-[#F3F7FD]">
      <StatusBar hidden={false} backgroundColor={"#C6DAEB"} barStyle={"light-content"} />
      <TopBar/>
      <ScrollView className="flex flex-col mt-[2vh]" contentContainerStyle={{alignItems: "center", justifyContent: "center"}}>
          <Text className="text-2xl font-bold mb-[calc(2.5%)]">Persona Desaparecida</Text>

          <View className="flex-row w-[90%] items-center justify-center">
              <Text className="text-lg font-bold mr-[2%]">William Chawillfer Ferreira Rosado</Text>
              <Icon size={25}  color="#4ECCAF" source={"check-circle"} allowFontScaling={true}/>
          </View>
          
          <View className="mt-[2vh] bg-[#c5d7e8a5] w-[90vw] rounded-lg">
              <View className="flex-row w-[85%] mx-auto items-center justify-between align-middle">
                    <Image 
                      source={{uri:"https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/persona1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvcGVyc29uYTEucG5nIiwiaWF0IjoxNzI2MDE5NDA4LCJleHAiOjMxNTUzMjYwMTk0MDh9.rm1N02w0q05satHgiDz8vgOx84dAdDIsV3aStQHDeHw&t=2024-09-11T01%3A50%3A03.953Z"}} 
                      className="w-[50%] h-[20vh] my-[2vh] rounded-lg"
                      resizeMode="contain"
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
                  <Text className="text-[15px] text-[#254E70] mb-[1%]"><Text className="font-bold">Nombre: </Text>William Chawillfer Ferreira Rosado</Text>
                  <Text className="text-[15px] text-[#254E70] mb-[1%]"><Text className="font-bold">Edad: </Text> 28 años</Text>
                  <Text className="text-[15px] text-[#254E70] mb-[1%]"><Text className="font-bold">Fecha de Desaparición: </Text>16/08/2024</Text>
                  <Text className="text-[15px] text-[#254E70] mb-[1%]"><Text className="font-bold">Últ. Ubicación: </Text>Los Minas - 20/08/2024</Text>
                  <Text className="text-[15px] text-[#254E70] mb-[1%]"><Text className="font-bold">Cédula: </Text>402-1908507-9</Text>
                  <Text className="text-[15px] text-[#254E70] mb-[1%]"><Text className="font-bold">Descripción: </Text> Es una persona de 1.75 metros de altura, pesa 70 kg, tiene ojos marrones, cabello castaño oscuro y tez clara. Su complexión es atlética y su rostro tiene rasgos definidos con una mandíbula fuerte.</Text>
                  <Text className="text-[15px] text-[#254E70] mb-[1%]"><Text className="font-bold">Información de Contacto: </Text>Maria Duverge: 829 -123 - 4567 / Mario Duverge: 829 - 123 - 5678</Text>
                  <Text className="text-[15px] text-[#254E70] mb-[1%]"><Text className="font-bold">Estado de la Publicación: </Text>Activa</Text>

              </View>
          </View>

          <View className="mt-[2vh] bg-[#c5d7e8a5] w-[90vw] rounded-lg items-center justify-center px-[2vw]">
              <Text className="text-[#233E58] text-center text-[18px] w-[80%] font-bold mt-[2%]">Avistamiestos</Text>
              <Text className="text-[#233E58] text-center text-[16px] w-[80%] font-bold mt-[0.5%]">William Chawillfer Ferreira Rosado</Text>
              <CardAvistamiento/>
              <CardAvistamiento/>
              <CardAvistamiento/>

              <TouchableOpacity
                onPress={() => router.push("/crearReporteAvistamiento")}
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

