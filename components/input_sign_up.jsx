import {Text, View,Dimensions } from "react-native";
import { TextInput } from "react-native-paper" 
import { useState } from "react";

const { width, height } = Dimensions.get("window");


export default function InputSignUp({text, label, placeholder, separation,id_name,handleChange, tipo_contrasena, pressed, handlePressed, error, showLabel=true}) {
    const [showPassword, setShowPassword] = useState(tipo_contrasena);
    const borderColor = (pressed && error) ? "#F26D6F" : "#C6DAEB";
    return(
        
        <View className="flex flex-col">
            {showLabel ? 
            <Text className=" mb-[calc(1.4vh)] text-[#233E58] text-[14px] font-medium">
                {label}
            </Text>
            : <></>}
            
            <TextInput
                name={id_name}
                value={text}
                onChangeText={handleChange}
                onPress={pressed ? handlePressed : null}
                id={id_name}
                mode="outlined"
                className={"font-medium"}
                placeholder={placeholder}
                placeholderTextColor="#B7CBDB"
                outlineStyle={{borderColor: borderColor, borderWidth: 1, borderRadius: 6}}
                style={{fontSize: 14, borderColor: "transparent", borderWidth: 0, borderRadius: 0, marginBottom: separation*height}}
                right={ tipo_contrasena ? <TextInput.Icon icon={showPassword ? "eye" : "eye-off"} forceTextInputFocus={false} onPress={()=> setShowPassword(!showPassword)}/> : <></>}
                secureTextEntry={showPassword}
            />
        </View>
    )
}