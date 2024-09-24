import {Text, TouchableOpacity, View,Image, StyleSheet} from "react-native";
import { Forward } from "lucide-react-native";
import { Divider } from "react-native-paper";



export default function CardMaterialesEducativos() {
    return(
      <View className="flex flex-col w-[100%] h-[50vh] bg-[#a7a8a947] rounded-lg px-[5%] py-[4%] mb-[2vh]">
            <Text className="text-[#233E58] text-xl font-bold">
                Video - Como actuar ante personas desaparecidas
            </Text>

            <Image
                source={{uri: "https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/material_educativo_1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvbWF0ZXJpYWxfZWR1Y2F0aXZvXzEucG5nIiwiaWF0IjoxNzI2OTMwNzg0LCJleHAiOjg2NTcyNjg0NDM4NH0.U_aF_ybah2XmD0CZh_m9Sf0bo4vAxpAe47R5soZmL2g&t=2024-09-21T14%3A59%3A43.528Z"}}
                className="h-[65%] rounded-md mt-[3%]"
                resizeMode="stretch"
            />

            <View className="flex-1 flex-row justify-between items-center">
                <TouchableOpacity activeOpacity={0.7} className="flex-row bg-[#00d0a08a] rounded-lg w-[45%] h-[85%]  ml-[2%] mt-[3%] justify-center items-center">
                    <Text className="text-white font-bold text-lg mr-[5%]">
                        Compartir
                    </Text>

                    <Forward size={30} className="text-white"/>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} className="bg-[#3E86B9] rounded-lg px-[3%] w-[45%] h-[85%] py-[1%] mr-[2%] mt-[3%] justify-center items-center">
                    <Text className="text-white font-bold text-lg">
                        Ver Video
                    </Text>
                </TouchableOpacity>
            </View>
      </View>
)}
