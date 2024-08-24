import { StyleSheet, Text, View,Image, TouchableOpacity,ScrollView,StatusBar } from "react-native";
import { Link, } from 'expo-router';
import { Button,Icon } from "react-native-paper";
import { useState,useEffect } from "react";
import InputSignUp from "../../components/input_sign_up";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Page() {

    const validationSchema = Yup.object({
        nombre: Yup.string().required("Este campo es obligatorio"),
        fecha_nacimiento: Yup.date().required("Este campo es obligatorio"),
        tipo_documento: Yup.string().required("Este campo es obligatorio"),
        documento: Yup.string().required("Este campo es obligatorio"),
        telefono: Yup.string().required("Este campo es obligatorio"),
        fecha_desaparicion: Yup.date().required("Este campo es obligatorio"),
        relacion_desaparecido: Yup.string().required("Este campo es obligatorio"),
        contacto: Yup.string().required("Este campo es obligatorio"),
        ubicacion: Yup.string().required("Este campo es obligatorio"),
        descripcion_desaparecido: Yup.string().required("Este campo es obligatorio"),
    })

    const [pressed, setPressed] = useState({
        nombre: false,
        fecha_nacimiento: false,
        tipo_documento: false,
        documento: false,
        telefono: false,
        fecha_desaparicion: false,
        relacion_desaparecido: false,
        contacto: false,
        ubicacion: false,
        descripcion_desaparecido: false,
    });

    const formik = useFormik({
        initialValues: {
            nombre: "",
            fecha_nacimiento: "",
            tipo_documento: "",
            documento: "",
            telefono: "",
            fecha_desaparicion: "",
            relacion_desaparecido: "",
            contacto: "",
            ubicacion: "",
            descripcion_desaparecido: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const handlePress = (field) => {
        setPressed({ ...pressed, [field]: true });
    };

    return (
      <View className="flex-1  bg-[#F3F7FD]">
        <StatusBar
          hidden={false}
          backgroundColor={"#F3F7FD"}
          barStyle={"dark-content"}
        />
        {/* Boton back */}
        <View className="flex">
          <View className="flex mx-[4.5vw] my-[1vh]">
            <TouchableOpacity onPress={() => router.push("../home")}>
              <Image
                source={require("../../assets/sign_up/flecha-izquierda.png")}
                className="w-[10vw] h-[calc(4.5vh)]"
              ></Image>
            </TouchableOpacity>
          </View>
        </View>

        {/* Formulario */}
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          className=" flex  mb-[calc(1.5vh)]"
        >
          <View className="flex">
            <Text className="text-[24px] text-[#233E58] font-extrabold py-[1vh] mx-[-42.5vw]">
              Crear publicación de{"\n"}
              Persona Desaparecida
            </Text>
          </View>
          <View className=" flex w-[calc(85.380vw)]">
            {/* Input Nombre */}
            <InputSignUp
              separation={0.028}
              label="Nombre"
              placeholder="Ingrese el nombre"
              value={formik.values.nombre}
              onChangeText={formik.handleChange("nombre")}
              onBlur={() => handlePress("nombre")}
              error={pressed.nombre && formik.errors.nombre}
            />

            {/* Input Fecha de nacimiento */}
            <InputSignUp
              separation={0.028}
              label="Fecha de nacimiento"
              placeholder="dd/mm/aaaa"
              value={formik.values.fecha_nacimiento}
              onChangeText={formik.handleChange("fecha_nacimiento")}
              onBlur={() => handlePress("fecha_nacimiento")}
              error={pressed.fecha_nacimiento && formik.errors.fecha_nacimiento}
            />

            {/* Input Tipo de documento */}
            <InputSignUp
              separation={0.028}
              label="Tipo de documento"
              placeholder="Tipo de documento"
              value={formik.values.tipo_documento}
              onChangeText={formik.handleChange("tipo_documento")}
              onBlur={() => handlePress("tipo_documento")}
              error={pressed.tipo_documento && formik.errors.tipo_documento}
            />

            {/* Input Documento */}
            <InputSignUp
              separation={0.028}
              label="Documento"
              placeholder="Documento"
              value={formik.values.documento}
              onChangeText={formik.handleChange("documento")}
              onBlur={() => handlePress("documento")}
              error={pressed.documento && formik.errors.documento}
            />

            {/* Input Teléfono */}
            <InputSignUp
              separation={0.028}
              label="Teléfono contacto"
              placeholder="809-000-0000"
              value={formik.values.telefono}
              onChangeText={formik.handleChange("telefono")}
              onBlur={() => handlePress("telefono")}
              error={pressed.telefono && formik.errors.telefono}
            />

            {/* Input Fecha de desaparición */}
            <InputSignUp
              separation={0.028}
              label="Fecha de desaparición"
              placeholder="dd/mm/aaaa"
              value={formik.values.fecha_desaparicion}
              onChangeText={formik.handleChange("fecha_desaparicion")}
              onBlur={() => handlePress("fecha_desaparicion")}
              error={
                pressed.fecha_desaparicion && formik.errors.fecha_desaparicion
              }
            />

            {/* Input Relación con el desaparecido */}
            <InputSignUp
              separation={0.028}
              label="Relación con el desaparecido"
              placeholder="ej. Madre, Padre, Hermano"
              value={formik.values.relacion_desaparecido}
              onChangeText={formik.handleChange("relacion_desaparecido")}
              onBlur={() => handlePress("relacion_desaparecido")}
              error={
                pressed.relacion_desaparecido &&
                formik.errors.relacion_desaparecido
              }
            />

            {/* Input Contacto */}
            <InputSignUp
              separation={0.028}
              label="Contacto"
              placeholder="Otra información de contacto"
              value={formik.values.contacto}
              onChangeText={formik.handleChange("contacto")}
              onBlur={() => handlePress("contacto")}
              error={pressed.contacto && formik.errors.contacto}
            />

            {/* Input Ubicación */}
            <InputSignUp
              separation={0.028}
              label="Ubicación"
              placeholder="Ubicación"
              value={formik.values.ubicacion}
              onChangeText={formik.handleChange("ubicacion")}
              onBlur={() => handlePress("ubicacion")}
              error={pressed.ubicacion && formik.errors.ubicacion}
            />

            {/* Input Descripción del desaparecido */}
            <InputSignUp
              separation={0.028}
              label="Descripción del desaparecido"
              placeholder="ej. Estatura, color de piel, color de ojos"
              value={formik.values.descripcion_desaparecido}
              onChangeText={formik.handleChange("descripcion_desaparecido")}
              onBlur={() => handlePress("descripcion_desaparecido")}
              error={
                pressed.descripcion_desaparecido &&
                formik.errors.descripcion_desaparecido
              }
            />

            {/* Subit foto */}
            

            <View className="flex flex-col w-full">
              <TouchableOpacity
                activeOpacity={0.7}
                className="bg-[#3E86B9] flex mx-auto w-[85vw] h-[7vh] rounded-md justify-center  align-middle"
                onPress={formik.handleSubmit}
              >
                <Text className="flex w-full text-center text-[16px] font-bold text-[#F3F7FD]">
                  Publicar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 24,
    },
    main: {
        flex: 1,
        justifyContent: "center",
        maxWidth: 960,
        marginHorizontal: "auto",
    },
    scrollViewContent: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 64,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 36,
        color: "#38434D",
    },
    button: {
        marginTop: 24,
    },
});