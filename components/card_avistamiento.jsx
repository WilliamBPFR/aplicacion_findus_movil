import {Text, TouchableOpacity, View,Image, StyleSheet} from "react-native";
import { useEffect,useRef } from "react";
import { useState } from "react";
import { MapPinned } from "lucide-react-native";
import { Divider } from "react-native-paper";



export default function CardAvistamiento() {
    return(
      <View className="flex w-[100%] mt-[3%] ">
            <View className="ml-[1vw]">
                <Text className="text-[#254E70] font-bold text-[15px]">Último Avistamiento</Text>
                <View className="flex-row mx-auto mt-[2%] rounded-lg">
                    <Image
                        source={{uri: "https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/trauma-and-loss.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvdHJhdW1hLWFuZC1sb3NzLmpwZyIsImlhdCI6MTcyNjMyODY4MiwiZXhwIjo4NjU3MjYyNDIyODJ9.afy8Wi7XEZAEzjG1wUBO-n0AH9YsLk0tJH9o58m4eGk&t=2024-09-14T15%3A44%3A40.306Z"}}
                        className="w-[35%] h-[100%] rounded-lg"
                    />

                    <View className="flex-col max-w-[60%] mx-auto ml-[3%]">
                        <Text className="text-[15px] text-[#254E70] mb-[1.5%]"><Text className="font-bold">Quién lo vió:</Text> William Chawillfer Ferreira Rosado</Text>
                        <Text className="text-[15px] text-[#254E70] mb-[1.5%]"><Text className="font-bold">Dónde lo vió:</Text> Calle Maria Gala #10, Jardines del Norte, D. N.</Text>
                        <Text className="text-[15px] text-[#254E70] mb-[1.5%]"><Text className="font-bold">Descripción:</Text> La persona divagaba sin rumbo. Al tratar de detenorlo, se fue corriendo.</Text>
                    </View> 
                </View>
            </View>
            <Divider className="w-[98%] h-[2px] bg-[#254E70] rounded-3xl mx-[2%] mt-[4%]"/>
      </View>
    )
}
