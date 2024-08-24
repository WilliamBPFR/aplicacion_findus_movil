import { StyleSheet, Text, View,Image, TouchableOpacity,ScrollView,StatusBar } from "react-native";
import { Link, useRouter} from 'expo-router';
import { Button,Icon,Modal,Portal,PaperProvider, TextInput  } from "react-native-paper";
import { useState,useEffect } from "react";
import InputSignUp from "../../components/input_sign_up";
import InputFecha from "../../components/input_fecha";
import { useFormik } from "formik";
import * as Yup from "yup";
import LottieView from "lottie-react-native";

export default function Page() {

    const [visible, setVisible] = useState(false);
    const [showDateModal, setShowDateModal] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const router = useRouter();
    const [apiRessponse, setApiResponse] = useState({status:200});


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
        email: false,
        contrasena: false,
        confirmar_contrasena: false,
        telefono: false,
        tipo_documento: false,
        numero_documento: false,
        fechaNacimiento: false,
    });

    const formik = useFormik({
        initialValues:{
            nombre:"",
            apellido:"",
            email:"",
            contrasena:"",
            confirmar_contrasena:"",
            numeroTelefono:"",
            tipo_documento:"",
            numero_documento:"",
            fechaNacimiento: new Date(),
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            // showModal();
        }
    });

  return (
    <PaperProvider>
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
            <ScrollView contentContainerStyle={styles.scrollViewContent} className=" flex mb-[calc(1.5vh)]">
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

                    {/* Input Fecha de Nacimiento */}
                    <InputFecha
                        label={"Fecha de Nacimiento"}
                        separation={0.028} 
                        value={formik.values.fechaNacimiento} 
                        placeholder={"Seleccione su fecha de Nacimiento"}
                        id_name={"fecha_nacimiento"}
                        setFieldValue={formik.setFieldValue}
                        fiedName={"fechaNacimiento"}
                        pressed={pressed.fechaNacimiento}
                        handlePressed={()=> setPressed({...pressed, fechaNacimiento: true})}
                        error={formik.errors.fechaNacimiento}
                        showDateModal={showDateModal}
                        setShowDateModal={setShowDateModal}
                    />

                    {/* Input Correo */}
                    <InputSignUp 
                        separation={0.028} 
                        label={"Correo Electrónico"} 
                        text={formik.values.email} 
                        placeholder={"Ingresa tu correo aquí"} 
                        id_name={"correo"}
                        handleChange={formik.handleChange("correo")}
                        pressed={pressed.correo}
                        handlePressed={()=> setPressed({...pressed, email: true})}
                        error={formik.errors.email}
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

                {/* Boton Crear Cuenta */}
                <View className="flex flex-col w-full">
                <TouchableOpacity 
                    activeOpacity={0.7} 
                    className="bg-[#3E86B9] flex mx-auto w-[85vw] h-[7vh] rounded-md justify-center align-middle"   
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
            
            {/* Modal de registro exitoso */}
            <Portal>
                <Modal className="w-full h-full mt-0" visible={false} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white', borderRadius: 15,marginHorizontal: "auto", width: "90%", height: "40%",justifyContent: "center", alignItems:"center"}}>
                    <LottieView 
                        className="flex h-[45%] w-[80%]" 
                        source={apiRessponse.status == 200 ? require(`../../assets/sign_up/check.json`) : require(`../../assets/sign_up/wrong.json`)} 
                        autoPlay 
                        loop={false} 
                    />

                    <Text className="text-center text-2xl font-bold text-[#233E58]">
                        {apiRessponse.status == 200 ? "¡Registro exitoso!" : "¡Registro fallido!"} 
                    </Text>
                    <Text className="text-center text-lg text-[#233E58] mt-[calc(1vh)]">
                        {apiRessponse.status == 200 ? "Tu cuenta ha sido creada exitosamente." : "Ha ocurrido un error al intentar crear tu cuenta."}
                    </Text>
                    
                    <TouchableOpacity 
                        activeOpacity={0.7}  
                        className="mt-[2vh] bg-[#3E86B9] w-[50%] h-[13%] rounded-md justify-center mb-[calc(1vh)]" 
                        onPress={apiRessponse.status == 200 ? () => router.push("../login"): hideModal}
                    >
                        <Text className="text-[#F3F7FD] font-bold text-lg text-center w-full flex">
                            {apiRessponse.status == 200 ? "Iniciar Sesión" : "Cerrar"}
                        </Text>
                    </TouchableOpacity>   
                </Modal>
            </Portal>

            {/* Modal de Verificacion Correo */}
            <Portal>
                <Modal className="w-full h-full mt-0" visible={true} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white', borderRadius: 15,marginHorizontal: "auto", width: "90%", height: "60%",justifyContent: "center", alignItems:"center"}}>
                    <LottieView 
                        className="flex h-[25%] w-[80%]" 
                        source={apiRessponse.status == 200 ? require(`../../assets/sign_up/email_sended.json`) : require(`../../assets/sign_up/wrong.json`)} 
                        autoPlay 
                        loop={true} 
                    />

                    <Text className="text-center text-2xl font-bold text-[#233E58]">
                        Correo Electrónico Enviado 
                    </Text>
                    <Text className="text-center text-lg text-[#233E58] mt-[calc(1vh)]">
                        Revisa tu correo electrónico e introduce el código de verificación aquí debajo.
                    </Text>
                    <View className="h-[10%] w-[80vw] mt-[calc(1.5vh)]">
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
                            showLabel={false}
                        />
                    </View>
                    
                    <TouchableOpacity 
                        activeOpacity={0.7}  
                        className="mt-[2vh] bg-[#3E86B9] w-[50%] h-[13%] rounded-md justify-center mb-[calc(1vh)]" 
                        onPress={apiRessponse.status == 200 ? () => router.push("../login"): hideModal}
                    >
                        <Text className="text-[#F3F7FD] font-bold text-lg text-center w-full flex">
                            {apiRessponse.status == 200 ? "Iniciar Sesión" : "Cerrar"}
                        </Text>
                    </TouchableOpacity>   
                </Modal>
            </Portal>
            </View>
        </PaperProvider>
  );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});