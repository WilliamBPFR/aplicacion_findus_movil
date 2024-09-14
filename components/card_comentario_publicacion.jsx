import {Text, TouchableOpacity, View,Image} from "react-native";
import { useEffect,useRef } from "react";
import { useState } from "react";
import { Divider } from "react-native-paper";


export default function CardComentarioPublicacion() {
    return(
      <View className="flex  w-[95%] mb-[2vh]">
        <View className="flex flex-row w-[100%] mb-[calc(1.2vh)]">
            <Image
                source={{ uri: "https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/persona4.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvcGVyc29uYTQucG5nIiwiaWF0IjoxNzI2MTEwNTcxLCJleHAiOjMxNTUyOTQ1NzQ1NzF9.kS3sLNvPe8gVi9ZdfOWTTNdwPpWDsn8Nvwc0b-kr1CU&t=2024-09-12T03%3A09%3A31.630Z" }}
                // style={{ width: 50, height: 50, borderRadius: 25 }}
                className="bg-yellow-100 w-[40px] h-[40px] rounded-full"
                resizeMode="contain"  // Puedes usar "cover", "contain", o "stretch"
            />

            <View className="flex flex-col ml-[5%] justify-center">
                <Text className="text-[#233E58] text-lg font-bold">Jao Ming Perez</Text>
                <Text className="text-[#233E58] text-[10px] font-semibold">Publicado el 12 de septiembre del 2024</Text>
            </View>
        </View>

        <View className="flex w-[100%] mx-[2%]">
               <Text className="text-[#233E58] text-[12px] font-semibold">Este es un mensaje urgente para informarles que mi hermano, Hugo Desangles Dietsch, ha desaparecido en Ágora Mall. La última vez que fue visto fue alrededor de las 09:00 A.M. Agradezco cualquier información o ayuda para encontrarlo.</Text>
        </View>
        <Divider className="w-[100%] h-[2px] bg-[#254E70] rounded-3xl mx-[2%] mt-[4%]"/>
      </View>
    )
}