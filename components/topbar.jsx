import {Text, View,Dimensions, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper" 
import { useState } from "react";
import { Avatar } from 'react-native-paper';
import {Icon} from "react-native-paper";


const { width, height } = Dimensions.get("window");


export default function TopBar() {
    return(
        <View className="w-full flex-row h-[8vh] items-center justify-between px-[5vw] border-b-2 border-b-[#C6DAEB]">
            <TouchableOpacity>
                <Image
                    source={{ uri: "https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/logo_findus.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvbG9nb19maW5kdXMucG5nIiwiaWF0IjoxNzI1NTAzODk5LCJleHAiOjMzMjYxNTAzODk5fQ.DK_-tbuq-B9GxEPDkKQbT08OZ_ojjDoZ3-0nz3bTJ4s&t=2024-09-05T02%3A38%3A19.638Z" }}
                    // style={{ width: 50, height: 50, borderRadius: 25 }}
                    className="bg-yellow-100 w-[45px] h-[45px] rounded-full"
                    resizeMode="contain"  // Puedes usar "cover", "contain", o "stretch"
                />
            </TouchableOpacity>

            <View className="flex-row">
                <TouchableOpacity
                    onPress={() => console.log("Mensaje")}
                >
                    <Icon
                        source="message-reply-outline"
                        size={36}
                        color="#233E58"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => console.log("Chat")}
                    className="ml-[calc(3.5vw)]"
                >
                    <Icon
                        source="chat-outline"
                        size={36}
                        color="#233E58"
                    />
                </TouchableOpacity>
                </View>
            {/*Iconos de Mensajes y Chat*/}
        </View>
    )
}