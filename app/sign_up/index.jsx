import { StyleSheet, Text, View,Image, TouchableOpacity,ScrollView } from "react-native";
import { Link, } from 'expo-router';
import { Button } from "react-native-paper";
import { useState,useEffect } from "react";
import InputSignUp from "../../components/input_sign_up";


export default function Page() {

    const [text, setText] = useState('');
    useEffect(() => {
        console.log("Text: ", text);
    }
    , [text]);
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
                    <InputSignUp separation={0.028} label={"Nombres"} text={text} setText={setText} placeholder={"Ingresa tus nombres aquí"}></InputSignUp>
                    <InputSignUp separation={0.028} label={"Apellidos"} text={text} setText={setText} placeholder={"Ingresa tus apellidos aquí"}></InputSignUp>
                    <InputSignUp separation={0.028} label={"Correo Electrónico"} text={text} setText={setText} placeholder={"Ingresa tu correo aquí"}></InputSignUp>
                    <InputSignUp separation={0.028} label={"Contraseña"} text={text} setText={setText} placeholder={"Ingresa tu contraseña aquí"}></InputSignUp>
                    <InputSignUp separation={0.028} label={"Confirmar Contraseña"} text={text} setText={setText} placeholder={"Confirma tu contraseña aquí"}></InputSignUp>
                    <InputSignUp separation={0.028} label={"Número de Teléfono"} text={text} setText={setText} placeholder={"Ingresa tu número aquí"}></InputSignUp>
                    <InputSignUp separation={0.028} label={"Tipo de Documento de Identidad"} text={text} setText={setText} placeholder={"Ingresa tu documento de identidad"}></InputSignUp>
                    <InputSignUp separation={0.028} label={"Número de Documento de Identidad"} text={text} setText={setText} placeholder={"Ingresa tu número de documento de identidad"}></InputSignUp>
                </View>
            </ScrollView>

            <View className="flex flex-col w-full">
                <TouchableOpacity activeOpacity={0.7} className="bg-[#3E86B9] flex mx-auto w-[85vw] h-[7vh] rounded-md justify-center  align-middle"   onPress={() => console.log('Pressed')}>
                    <Text className="flex w-full text-center text-2xl font-bold text-[#F3F7FD]">Empezar</Text>
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