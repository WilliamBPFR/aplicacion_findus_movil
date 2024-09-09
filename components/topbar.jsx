import {Text, View,Dimensions, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper" 
import { useState } from "react";
import { Avatar } from 'react-native-paper';


const { width, height } = Dimensions.get("window");


export default function TopBar() {
    return(
        <View className="w-full h-[9vh] justify-center">
            <TouchableOpacity>
                <Image
                    source={{ uri: "https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/logo_findus.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvbG9nb19maW5kdXMucG5nIiwiaWF0IjoxNzI1NTAzODk5LCJleHAiOjMzMjYxNTAzODk5fQ.DK_-tbuq-B9GxEPDkKQbT08OZ_ojjDoZ3-0nz3bTJ4s&t=2024-09-05T02%3A38%3A19.638Z" }}
                    // style={{ width: 50, height: 50, borderRadius: 25 }}
                    className="bg-yellow-100 w-[45px] h-[45px] ml-[5vw] rounded-full"
                    resizeMode="contain"  // Puedes usar "cover", "contain", o "stretch"
                />
            </TouchableOpacity>

            {/*Iconos de Mensajes y Chat*/}
        </View>
    )
}