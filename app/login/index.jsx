import { Text, View, Image, TouchableOpacity, Dimensions, StatusBar} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from 'expo-router';
import { Button, IconButton} from 'react-native-paper';
import { useState,useEffect } from "react";
import InputSignUp from "../../components/input_sign_up";
import { useFormik } from "formik";



const { width, height } = Dimensions.get("window");

export default function Page() {

    const router = useRouter();

    const formik = useFormik({
        initialValues:{
            correo:"",
            contrasena:""
        },
        onSubmit: (values) => {
            console.log(values);
            router.push('../home');
        }
    });

    const { width, height } = Dimensions.get("window");
    return (
      <View className="flex-1  bg-[#F3F7FD]">
        <StatusBar hidden={false} backgroundColor={"#F3F7FD"} barStyle={"dark-content"} />
          {/* Boton back */}  
          <View className="flex ">
            <View className="flex mx-[4.5vw] my-[1vh]">
              <TouchableOpacity onPress={() => router.push('../home')}>
                <Image source={require("../../assets/sign_up/flecha-izquierda.png")} className="w-[10vw] h-[calc(4.5vh)]"></Image>
              </TouchableOpacity>
            </View>
          </View>

          {/* Label Crear Cuenta */}
          <View className="flex">
            <Text className="text-[24px] text-[#233E58] font-extrabold py-[1vh] mx-[7.2vw]">Inicia sesión</Text>
          </View>

          {/* Formulario */}
          <View className="flex mx-[7.2vw] py-[4vh] max-h-[70vh] mb-[calc(1.5vh)]">
            <View className="flex w-[calc(85.380vw)]">
              {/* Input Correo */}
              <InputSignUp 
                separation={0.028} 
                className="text-[14px]"
                label={"Correo electrónico"} 
                text={formik.values.correo} 
                placeholder={"nombre@dominio.com"} 
                id_name={"correo"}
                handleChange={formik.handleChange("correo")}
              />
              {/* Input Contraseña */}
              <InputSignUp 
                separation={0.028} 
                label={"Contraseña"} 
                text={formik.values.contrasena} 
                placeholder={"Ingresa tu contraseña"} 
                id_name={"contrasena"}
                handleChange={formik.handleChange("contrasena")}
                tipo_contrasena={true}
              />
            </View>
          </View>

          {/* Boton Iniciar Sesión */}
          <View className="flex flex-col w-full">
                <TouchableOpacity 
                    activeOpacity={0.7} 
                    className="bg-[#3E86B9] flex mx-auto w-[85vw] h-[7vh] rounded-md justify-center  align-middle"   
                    onPress={formik.handleSubmit}
                >
                        <Text className="flex w-full text-center text-[16px] font-bold text-[#F3F7FD]">
                            Iniciar sesión
                        </Text>
                </TouchableOpacity>

                <View className="flex mx-auto mt-[4vh]">
                    <Link href="/login" className="text-[#3E86B9] font-semibold">¿Olvidaste tu contraseña?</Link>
                </View>
                <View className="flex mx-auto mt-[4vh]">
                    <Link href="/sign_up" className="text-[#3E86B9] font-semibold">¿No tienes cuenta? Crea una aquí</Link>
                </View>
            </View>

      </View>

  )
}
  
