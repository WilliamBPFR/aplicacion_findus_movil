import {Text, TouchableOpacity, View,Image} from "react-native";
import { Divider } from "react-native-paper";


export default function CardComentarioPublicacion({nombrePersona, fechaComentario, contenidoComentario, urlfotoPerfil}) {
    return(
      <View className="flex  w-[95%] mb-[2vh]">
        <View className="flex flex-row w-[90%] mb-[calc(1.2vh)]">
            <Image
                source={{ uri: urlfotoPerfil}}
                // style={{ width: 50, height: 50, borderRadius: 25 }}
                className="bg-yellow-100 w-[40px] h-[40px] rounded-full"
                resizeMode="cover"  // Puedes usar "cover", "contain", o "stretch"
            />

            <View className="flex flex-col ml-[5%] justify-center">
                <Text className="text-[#233E58] text-lg font-bold">{nombrePersona}</Text>
                <Text className="text-[#233E58] text-[10px] font-semibold">Publicado el 12 de septiembre del 2024</Text>
            </View>
        </View>

        <View className="flex w-[100%] mx-[2%]">
               <Text className="text-[#233E58] text-[12px] font-semibold">{contenidoComentario}</Text>
        </View>
        <Divider className="w-[100%] h-[2px] bg-[#254E70] rounded-3xl mx-[2%] mt-[4%]"/>
      </View>
    )
}