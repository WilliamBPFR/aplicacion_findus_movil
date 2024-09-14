import {Text, TouchableOpacity, View,Image} from "react-native";
import { useEffect,useRef } from "react";
import { useState } from "react";


export default function CardPublicacionesGrande() {
    return(
      <View className="flex  w-[95vw] mb-[calc(1.5vh)]">
        <View className="flex flex-row w-[100%] h-[8vh]">
            <Image
                source={{ uri: "https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/persona4.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvcGVyc29uYTQucG5nIiwiaWF0IjoxNzI2MTEwNTcxLCJleHAiOjMxNTUyOTQ1NzQ1NzF9.kS3sLNvPe8gVi9ZdfOWTTNdwPpWDsn8Nvwc0b-kr1CU&t=2024-09-12T03%3A09%3A31.630Z" }}
                // style={{ width: 50, height: 50, borderRadius: 25 }}
                className="bg-yellow-100 w-[45px] h-[45px] rounded-full"
                resizeMode="contain"  // Puedes usar "cover", "contain", o "stretch"
            />

            <View className="flex flex-col ml-[5%] ">
                <Text className="text-[#233E58] text-lg font-bold">Nombre de usuario</Text>
                <Text className="text-[#233E58] text ml-[7%]">Hace 2 horas</Text>
            </View>
        </View>

        <View className="flex w-[100%] h-[32vh]">
          <View className="flex flex-col mx-[5%] h-[100%]">
               <Text className="text-[#233E58] text-[12px] font-bold">Este es un mensaje urgente para informarles que mi hermano, Hugo Desangles Dietsch, ha desaparecido en Ágora Mall. La última vez que fue visto fue alrededor de las 09:00 A.M. Agradezco cualquier información o ayuda para encontrarlo.</Text>

               <Image
                  source={{uri: "https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/persona2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvcGVyc29uYTIucG5nIiwiaWF0IjoxNzI2MTA5MjE1LCJleHAiOjMxNTUyOTQ1NzMyMTV9.7XG2tuhw2kQA595EJlG7a0JC35lSVFq9_wXFTqO03VQ&t=2024-09-12T02%3A46%3A55.517Z"}}
                  className="w-[100%] flex-1 rounded-lg my-[calc(2.5%)]"
               />
          </View>
        </View>
        <TouchableOpacity className="flex w-[90%] h-[6vh] bg-[#233E58] mx-auto items-center justify-center mt-[calc(0.5vh)] rounded-lg" onPress={()=> console.log("Pressed")} activeOpacity={0.9}>
            <Text className="text-white text-lg font-bold">Ver Publicación Completa</Text>
        </TouchableOpacity>
      </View>
    )
}