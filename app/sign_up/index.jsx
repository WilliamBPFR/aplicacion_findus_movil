import { StyleSheet, Text, View,Image, TouchableOpacity,ScrollView,StatusBar } from "react-native";
import { Link, } from 'expo-router';
import { Button,Icon } from "react-native-paper";
import { useState,useEffect } from "react";
import InputSignUp from "../../components/input_sign_up";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Page() {

    const validationSchema = Yup.object({
        nombres: Yup.string().required("Este campo es obligatorio"),
        apellidos: Yup.string().required("Este campo es obligatorio"),
        correo: Yup.string().email("Correo inválido").required("Este campo es obligatorio"),
        contrasena: Yup.string().required("Este campo es obligatorio").min(8, 1).matches(/[A-Z]/, 2)
                    .matches(/\d/, 3)
                    .matches(/[!@#$%^&*(),.?":{}|<>]/, 4),
        confirmar_contrasena: Yup.string().required("Este campo es obligatorio").oneOf([Yup.ref("contrasena"), null], "Las contraseñas deben coincidir"),
        telefono: Yup.string().required("Este campo es obligatorio"),
        tipo_documento: Yup.string().required("Este campo es obligatorio"),
        numero_documento: Yup.string().required("Este campo es obligatorio"),
    });

    const [pressed, setPressed] = useState({
        nombres: false,
        apellidos: false,
        correo: false,
        contrasena: false,
        confirmar_contrasena: false,
        telefono: false,
        tipo_documento: false,
        numero_documento: false,
    });

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
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });

  return (
        <View className="flex-1 gap-0 bg-[#F3F7FD]">
            <StatusBar hidden={false} backgroundColor={"#F3F7FD"} barStyle={"light-content"} />
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
            <ScrollView contentContainerStyle={styles.scrollViewContent} className=" flex  mb-[calc(1.5vh)]">
                <View className=" flex w-[calc(85.380vw)]">
                    {/* Input Nombre */}
                    <InputSignUp 
                        separation={0.028} 
                        label={"Nombres"} 
                        text={formik.values.nombres} 
                        placeholder={"Ingresa tus nombres aquí"} 
                        id_name={"nombres"}
                        handleChange={formik.handleChange("nombres")}
                        pressed={pressed.nombres}
                        handlePressed={()=> setPressed({...pressed, nombres: true})}
                        error={formik.errors.nombres}
                    />

                    {/* Input Apellidos */}
                    <InputSignUp 
                        separation={0.028} 
                        label={"Apellidos"} 
                        text={formik.values.apellidos} 
                        placeholder={"Ingresa tus apellidos aquí"} 
                        id_name={"apellidos"}
                        handleChange={formik.handleChange("apellidos")}
                        pressed={pressed.apellidos}
                        handlePressed={()=> setPressed({...pressed, apellidos: true})}
                        error={formik.errors.apellidos}
                    />

                    {/* Input Correo */}
                    <InputSignUp 
                        separation={0.028} 
                        label={"Correo Electrónico"} 
                        text={formik.values.correo} 
                        placeholder={"Ingresa tu correo aquí"} 
                        id_name={"correo"}
                        handleChange={formik.handleChange("correo")}
                        pressed={pressed.correo}
                        handlePressed={()=> setPressed({...pressed, correo: true})}
                        error={formik.errors.correo}
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
                        pressed={pressed.contrasena}
                        handlePressed={()=> setPressed({...pressed, contrasena: true})}
                        error={formik.errors.contrasena}
                    />

                    {/* Texto de validación de contraseña */}
                    <View className="mb-6">
                        <Text className="text-[#233E58] text-[14px] font-extrabold">Tu contraseña debe:</Text>

                        <View className="flex flex-row ml-4 mt-[calc(0.5vh)] ">
                            <Icon size={16} color={(formik.values.contrasena.length >= 8) ? "#4ECCAF" : "#CFCDD1"} source={"check-circle"} allowFontScaling={true}/>
                            <Text className="text-[#233E58] text-[14px] ml-1">Tener al menos 8 caracteres</Text>
                        </View>

                        <View className="flex flex-row ml-4 mt-[calc(0.5vh)] ">
                            <Icon size={16} color={/[A-Z]/.test(formik.values.contrasena) ? "#4ECCAF" : "#CFCDD1"} source={"check-circle"} allowFontScaling={true}/>
                            <Text className="text-[#233E58] text-[14px] ml-1">Tener al menos una mayúscula</Text>
                        </View>

                        <View className="flex flex-row ml-4 mt-[calc(0.5vh)] ">
                            <Icon size={16} color={/\d/.test(formik.values.contrasena) ? "#4ECCAF" : "#CFCDD1"} source={"check-circle"} allowFontScaling={true}/>
                            <Text className="text-[#233E58] text-[14px] ml-1">Tener al menos un número</Text>
                        </View>

                        <View className="flex flex-row ml-4 mt-[calc(0.5vh)] ">
                            <Icon size={16} color={/[!@#$%^&*(),.?":{}|<>]/.test(formik.values.contrasena) ? "#4ECCAF" : "#CFCDD1"} source={"check-circle"} allowFontScaling={true}/>
                            <Text className="text-[#233E58] text-[14px] ml-1">Tener al menos un caracter especial</Text>
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
                        pressed={pressed.confirmar_contrasena}
                        handlePressed={()=> setPressed({...pressed, confirmar_contrasena: true})}
                        error={formik.errors.confirmar_contrasena}
                    />

                    {/* Input Teléfono */}
                    <InputSignUp 
                        separation={0.028} 
                        label={"Número de Teléfono"} 
                        text={formik.values.telefono} 
                        placeholder={"Ingresa tu número aquí"}
                        id_name={"telefono"}
                        handleChange={formik.handleChange("telefono")}
                        pressed={pressed.telefono}
                        handlePressed={()=> setPressed({...pressed, telefono: true})}
                        error={formik.errors.telefono}
                    />

                    {/* Input Tipo de Documento */}
                    <InputSignUp 
                        separation={0.028} 
                        label={"Tipo de Documento de Identidad"} 
                        text={formik.values.tipo_documento} 
                        placeholder={"Ingresa tu documento de identidad"}
                        id_name={"tipo_documento"}
                        handleChange={formik.handleChange("tipo_documento")}
                        pressed={pressed.tipo_documento}
                        handlePressed={()=> setPressed({...pressed, tipo_documento: true})}
                        error={formik.errors.tipo_documento}
                    />

                    {/* Input Número de Documento */}
                    <InputSignUp 
                        separation={0.028} 
                        label={"Número de Documento de Identidad"} 
                        text={formik.values.numero_documento} 
                        placeholder={"Ingresa tu número de documento de identidad"}
                        id_name={"numero_documento"}
                        handleChange={formik.handleChange("numero_documento")}
                        pressed={pressed.numero_documento}
                        handlePressed={()=> setPressed({...pressed, numero_documento: true})}
                        error={formik.errors.numero_documento}
                    />

                </View>

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
            </ScrollView>
        </View>
  );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});