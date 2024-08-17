import { StyleSheet, Text, View,Image, TouchableOpacity,ScrollView,Dimensions } from "react-native";
import { Link, } from 'expo-router';
import { Button,Icon } from "react-native-paper";
import { useState,useEffect } from "react";
import InputSignUp from "../../components/input_sign_up";
import { useFormik } from "formik";
import * as Yup from "yup";

const { width, height } = Dimensions.get("window");


export default function Page() {

    const formik = useFormik({
        initialValues:{
            nombres:"",
            apellidos:"",
            correo:"",
            contrasena:"",
            confirmar_contrasena:"",
            telefono:"",
            tipo_documento:"",
            numero_documento:""
        },
        onSubmit: (values) => {
            console.log(values);
        }
    });

  return (
        <View className="flex-1 gap-0 bg-[#F3F7FD]">
            {/* Arriba */}
            <View className="flex ">
                {/* Imagen Izquierda */}
                <View className="flex mx-[2vw] my-[1vh]">
                    <TouchableOpacity onPress={()=>{console.log("AYAYAYAY")}}>
                        <Image source={require("../../assets/sign_up/flecha-izquierda.png")} className="w-[10vw] h-[calc(4.5vh)]"></Image>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Label Crear Cuenta */}
            <View className="flex">
                <Text className="text-3xl text-[#233E58] font-extrabold py-[1vh] mx-[10vw]">Crea tu cuenta</Text>
            </View>

            {/* Formulario */}
            <ScrollView contentContainerStyle={styles.scrollViewContent} className=" flex max-h-[70vh] mb-[calc(1.5vh)]">
                <View className=" flex w-[calc(85.380vw)]">
                    {/* Input Nombre */}
                    <InputSignUp 
                        separation={0.028} 
                        label={"Nombres"} 
                        text={formik.values.nombres} 
                        placeholder={"Ingresa tus nombres aquí"} 
                        id_name={"nombres"}
                        handleChange={formik.handleChange("nombres")}
                    />

                    {/* Input Apellidos */}
                    <InputSignUp 
                        separation={0.028} 
                        label={"Apellidos"} 
                        text={formik.values.apellidos} 
                        placeholder={"Ingresa tus apellidos aquí"} 
                        id_name={"apellidos"}
                        handleChange={formik.handleChange("apellidos")}
                    />

                    {/* Input Correo */}
                    <InputSignUp 
                        separation={0.028} 
                        label={"Correo Electrónico"} 
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
                        tipo_contrasena={true}
                    />
                <View className="mb-6">
                    <Text className="text-[#233E58] text-[14px] font-extrabold">Tu contraseña debe:</Text>
                    <View className="flex flex-row ml-4 mt-[calc(0.5vh)]">
                        <Icon size={30} color="#4ECCAF" source={"check-circle"} className="h-[100%]"/>
                        <Text className="text-[#233E58] text-[14px] ml-3">Tu contraseña debe:</Text>
                    </View>
                </View>

                    {/* Input Confirmar Contraseña */}
                    <InputSignUp 
                        separation={0.028} 
                        label={"Confirmar Contraseña"} 
                        text={formik.values.confirmar_contrasena} 
                        placeholder={"Confirma tu contraseña aquí"} 
                        id_name={"confirmar_contrasena"}
                        handleChange={formik.handleChange("confirmar_contrasena")}
                        tipo_contrasena={true}
                    />

                    {/* Input Teléfono */}
                    <InputSignUp 
                        separation={0.028} 
                        label={"Número de Teléfono"} 
                        text={formik.values.telefono} 
                        placeholder={"Ingresa tu número aquí"}
                        id_name={"telefono"}
                        handleChange={formik.handleChange("telefono")}
                    />

                    {/* Input Tipo de Documento */}
                    <InputSignUp 
                        separation={0.028} 
                        label={"Tipo de Documento de Identidad"} 
                        text={formik.values.tipo_documento} 
                        placeholder={"Ingresa tu documento de identidad"}
                        id_name={"tipo_documento"}
                        handleChange={formik.handleChange("tipo_documento")}
                    />

                    {/* Input Número de Documento */}
                    <InputSignUp 
                        separation={0.028} 
                        label={"Número de Documento de Identidad"} 
                        text={formik.values.numero_documento} 
                        placeholder={"Ingresa tu número de documento de identidad"}
                        id_name={"numero_documento"}
                        handleChange={formik.handleChange("numero_documento")}
                    />

                </View>
            </ScrollView>

            <View className="flex flex-col w-full">
                <TouchableOpacity 
                    activeOpacity={0.7} 
                    className="bg-[#3E86B9] flex mx-auto w-[85vw] h-[7vh] rounded-md justify-center  align-middle"   
                    onPress={formik.handleSubmit}
                >
                        <Text className="flex w-full text-center text-xl font-bold text-[#F3F7FD]">
                            Crear Cuenta
                        </Text>
                </TouchableOpacity>

                <View className="flex mx-auto mt-[1vh]">
                    <Text className="text-[#233E58] text-lg">¿Ya tienes una cuenta? <Link href="/login" className="text-[#3E86B9] font-bold">Inicia sesión</Link></Text>
                </View>
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});