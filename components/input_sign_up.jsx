import {Text, View,Dimensions, } from "react-native";
import { TextInput } from "react-native-paper" 
import { useState } from "react";

const { width, height } = Dimensions.get("window");


export default function InputSignUp({text, label, placeholder, separation,id_name,handleChange, tipo_contrasena}) {
    const [showPassword, setShowPassword] = useState(true);
    return(
        <View className="flex flex-col">
            <Text className=" mb-[calc(1.4vh)] text-[#233E58] text-lg font-bold">
                {label}
            </Text>
            
            <TextInput
                value={text}
                onChangeText={handleChange}
                id={id_name}
                mode="outlined"
                className={``}
                placeholder={placeholder}
                outlineStyle={{borderColor: "#C6DAEB", borderWidth: 1, borderRadius: 6}}
                style={{borderColor: "transparent", borderWidth: 0, borderRadius: 0, marginBottom: separation*height}}
                right={ tipo_contrasena ? <TextInput.Icon icon="eye" forceTextInputFocus={false} onPress={()=> setShowPassword(!showPassword)}/> : <></>}
                secureTextEntry={showPassword}
            />
        </View>
    )
}