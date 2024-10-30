import {Text, TouchableOpacity, View,Image} from "react-native";
import { useState } from "react";
import { Divider } from "react-native-paper";
import { TextInput } from 'react-native-paper';
import { crearComentario } from "../services/publicacionServices";
import { ActivityIndicator } from 'react-native-paper';
import { obtenerToken } from "../services/userServices";
import { obtenerFotoPerfil, obtenerNombreUsuario } from "../services/userServices";


export default function CardHacerComentarioPublicacion({setPublicacion,publicacion, idpublicacion}) {
  const userName = obtenerNombreUsuario();
  const [comentario, setComentario] = useState("");
  const fotoPerfil = obtenerFotoPerfil();
  const [loading, setLoading] = useState(false);
  const enviarComentario = (comentario) => {
    // Aquí se puede hacer la petición a la API para enviar el comentario
    setLoading(true);
    console.log(comentario);
    crearComentario({idpublicacion: idpublicacion, texto: comentario},obtenerToken()).then((response) => {
      console.log(response);
      if (response.status === 200) {
        setPublicacion({...publicacion, comentario: [response.data, ...publicacion.comentario]});
        console.log("Comentario enviado correctamente");
        setComentario("");
        setLoading(false);
        }
      }
    ).catch((error) => {
      console.log("Error al enviar comentario: ", error);
      setLoading(false);
    })
    }
    return(
      <View className="flex  w-[95%] mb-[2vh]">
        <View className="flex flex-row w-[90%] mb-[calc(1.2vh)]">
            <Image
                source={{ uri: fotoPerfil ? fotoPerfil : "https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/persona5.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvcGVyc29uYTUucG5nIiwiaWF0IjoxNzI2MzU0NDM4LCJleHAiOjg2NTcyNjI2ODAzOH0.drYuop1vzG2NlTpZ2TWIroY-iUzQ6ETuiQnXfkwU1-w&t=2024-09-14T22%3A53%3A58.044Z" }}
                // style={{ width: 50, height: 50, borderRadius: 25 }}
                className="bg-yellow-100 w-[40px] h-[40px] rounded-full"
                resizeMode="cover"  // Puedes usar "cover", "contain", o "stretch"
            />

            <View className="flex flex-col ml-[5%] justify-center">
                <Text className="text-[#233E58] text-lg font-bold">{ userName ? userName : "Willfer Chawillmy Ferreira Rosado"}</Text>
            </View>
        </View>

        <View className="flex w-[100%] mx-[2%] flex-row items-center">
          <TextInput
            value={comentario}
            mode="flat"
            onChangeText={text => setComentario(text)}
            className="w-[77%] rounded-lg bg-[#9cc1e641] border-0 justify-center align-middle "
            multiline={true}
            placeholder="Escribe un comentario..."
            outlineStyle={{borderColor: "", borderWidth: 0}}
            numberOfLines={1}
            textAlignVertical="bottom"
            activeUnderlineColor="#254e701b"
            underlineStyle={{borderColor: "transparent", borderWidth: 0}}
            underlineColor="transparent"
          />
          <TouchableOpacity
            className={`flex bg-[#3E86B9] ml-[10%] mx-auto w-[20%] h-[6vh] rounded-md justify-center align-middle`}
            activeOpacity={0.7}
            onPress={()=>enviarComentario(comentario)}
            style={{backgroundColor: loading || comentario === "" ? "#9cc1e6" : "#3E86B9"}}
            disabled={loading || comentario === ""}
          >
            {loading ? (
              <ActivityIndicator animating={true} color="#061c8d" size="small" />
            ) : (
              <Text className="flex w-full text-center text-md font-bold text-[#F3F7FD]" >
                Enviar
            </Text>
            )}
            {/* // <Text className="flex w-full text-center text-md font-bold text-[#F3F7FD]" >
            //     Enviar
            // </Text> */}
          </TouchableOpacity>
        </View>
        <Divider className="w-[100%] h-[2px] bg-[#254E70] rounded-3xl mx-[2%] mt-[4%]"/>
      </View>
    )
}