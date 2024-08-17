import { Text, View, Image, TouchableOpacity, Dimensions, StatusBar} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link } from 'expo-router';
import { Button, IconButton} from 'react-native-paper';
import { useState,useEffect } from "react";
import InputSignUp from "../../components/input_sign_up";
import { useFormik } from "formik";



const { width, height } = Dimensions.get("window");

export default function Page() {

    const formik = useFormik({
        initialValues:{
            correo:"",
            contrasena:""
        },
        onSubmit: (values) => {
            console.log(values);
        }
    });

    const { width, height } = Dimensions.get("window");
    return (
      <View className="flex-1 bg-[#F3F7FD]">
        <StatusBar hidden={false} backgroundColor={"#F3F7FD"} barStyle={"dark-content"} />
          {/* Boton back */}  
          <View className="flex ">
            <View className="flex mx-[3vw] my-[1vh]">
              <TouchableOpacity onPress={()=>{console.log("AYAYAYAY")}}>
                <Image source={require("../../assets/sign_up/flecha-izquierda.png")} className="w-[10vw] h-[calc(4.5vh)]"></Image>
              </TouchableOpacity>
            </View>
          </View>

          {/* Label Crear Cuenta */}
          <View className="flex">
            <Text className="text-[24px] text-[#233E58] font-extrabold py-[1vh] mx-[6vw]">Inicia Sesión</Text>
          </View>

          {/* Formulario */}
          <View className="flex mx-[6vw] py-[4vh] max-h-[70vh] mb-[calc(1.5vh)]">
            <View className="flex w-[calc(85.380vw)]">
              {/* Input Correo */}
              <InputSignUp 
                separation={0.028} 
                className="text-[14px]"
                label={"Correo"} 
                text={formik.values.correo} 
                placeholder={"Ingresa tu correo aquí"} 
                id_name={"correo"}
                handleChange={formik.handleChange("correo")}
              />
              {/* Input Contraseña */}
              <InputSignUp 
                separation={0.028} 
                label={"Contraseña"} 
                text={formik.values.contrasena} 
                placeholder={"Ingresa tu contraseña aquí"} 
                id_name={"contrasena"}
                handleChange={formik.handleChange("contrasena")}
              />
            </View>
          </View>

      </View>

  )
}
  
