import {Text, View,Dimensions, } from "react-native";
import { TextInput } from "react-native-paper" 
import { useState } from "react";

const { width, height } = Dimensions.get("window");


export default function InputSignUp({text, label, placeholder, separation,id_name,handleChange, tipo_contrasena}) {
    const [showPassword, setShowPassword] = useState(tipo_contrasena ? true : false);
    return(
        <View className="flex flex-col">
            <Text className=" mb-[calc(1.4vh)] text-[#233E58] text-[14px] font-bold">
                {label}
            </Text>
            
            <TextInput
                value={text}
                onChangeText={handleChange}
                id={id_name}
                mode="outlined"
                className={``}
                placeholder={placeholder}
                placeholderTextColor="#B7CBDB"
                outlineStyle={{borderColor: "#C6DAEB", borderWidth: 1, borderRadius: 6}}
                style={{fontSize: 14, borderColor: "transparent", borderWidth: 0, borderRadius: 0, marginBottom: separation*height}}
                right={ tipo_contrasena ? <TextInput.Icon icon={showPassword ? "eye" : "eye-off"} forceTextInputFocus={false} onPress={()=> setShowPassword(!showPassword)}/> : <></>}
                secureTextEntry={showPassword}
            />
        </View>
    )
}