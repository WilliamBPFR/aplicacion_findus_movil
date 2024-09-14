import {Text, TouchableOpacity, View,Image} from "react-native";
import { useEffect,useRef } from "react";
import { useState } from "react";
import { Divider } from "react-native-paper";
import { TextInput } from 'react-native-paper';


export default function CardHacerComentarioPublicacion() {
  const [comentario, setComentario] = useState("");
    return(
      <View className="flex  w-[95%] mb-[2vh]">
        <View className="flex flex-row w-[100%] mb-[calc(1.2vh)]">
            <Image
                source={{ uri: "https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/persona5.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvcGVyc29uYTUucG5nIiwiaWF0IjoxNzI2MzU0NDM4LCJleHAiOjg2NTcyNjI2ODAzOH0.drYuop1vzG2NlTpZ2TWIroY-iUzQ6ETuiQnXfkwU1-w&t=2024-09-14T22%3A53%3A58.044Z" }}
                // style={{ width: 50, height: 50, borderRadius: 25 }}
                className="bg-yellow-100 w-[40px] h-[40px] rounded-full"
                resizeMode="contain"  // Puedes usar "cover", "contain", o "stretch"
            />

            <View className="flex flex-col ml-[5%] justify-center">
                <Text className="text-[#233E58] text-lg font-bold">Willfer Chawillmy Ferreira Rosado</Text>
            </View>
        </View>

        <View className="flex w-[100%] mx-[2%]">
          <TextInput
            value={comentario}
            mode="flat"
            onChangeText={text => setComentario(text)}
            className="w-[100%] rounded-lg bg-[#9cc1e641] border-0 justify-center align-middle "
            multiline={true}
            placeholder="Escribe un comentario..."
            outlineStyle={{borderColor: "", borderWidth: 0}}
            numberOfLines={1}
            textAlignVertical="bottom"
            activeUnderlineColor="#254e701b"
            underlineStyle={{borderColor: "transparent", borderWidth: 0}}
            underlineColor="transparent"
          />
        </View>
        <Divider className="w-[100%] h-[2px] bg-[#254E70] rounded-3xl mx-[2%] mt-[4%]"/>
      </View>
    )
}