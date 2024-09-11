import {Text, TouchableOpacity, View, Image} from "react-native";
import { useEffect,useRef } from "react";
import { useState } from "react";



export default function CardPublicacionesHorizontal({nombre, edad, fecha_desaparicion, ultima_ubicacion, imagen}) {
    return(
      <View className="flex flex-col items-center justify-center rounded-lg overflow-hiddenz  bg-[#DCECFA] border-2 border-[#C6DAEB] w-[60vw] h-[45vh] mb-[calc(1.5vh)] mr-[5vw]">
            <Image
                source={{uri: imagen}}
                className="w-[85%] h-[45%] rounded-lg"
                resizeMode="cover"
            />

            <Text className="text-[#233E58] font-bold text-lg mt-[calc(1.5vh)]">{nombre}</Text>

            <Text className="text-[#233E58] font-normal text-sm mt-[calc(0.2vh)]">
                <Text className="font-bold">Edad:</Text> {edad}
            </Text>

            <Text className="text-[#233E58] font-normal text-sm mt-[calc(0.2vh)]">
                <Text className="font-bold">Fecha desaparición:</Text> {fecha_desaparicion}
            </Text>

            <Text className="text-[#233E58] font-normal text-sm mt-[calc(0.2vh)]">
                <Text className="font-bold">Últ. Ubicación:</Text> {ultima_ubicacion}
            </Text>

            <TouchableOpacity
                onPress={() => console.log("Ver más")}
                className="mt-[calc(1vh)] w-[85%] h-[14%] bg-[#3E86B9] rounded-lg align-middle justify-center"

            >
                <Text className="text-white text-lg font-bold text-center">Ver más</Text>
            </TouchableOpacity>
      </View>
    )
}