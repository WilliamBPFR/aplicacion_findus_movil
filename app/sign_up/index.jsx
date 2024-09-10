import { StyleSheet, Text, View,Image, TouchableOpacity,ScrollView,StatusBar,Dimensions,Keyboard } from "react-native";
import { Link, useRouter} from 'expo-router';
import { Button,Icon,Modal,Portal,PaperProvider, TextInput  } from "react-native-paper";
import { useState,useEffect,useRef } from "react";
import InputSignUp from "../../components/input_sign_up";
import InputFecha from "../../components/input_fecha";
import { useFormik } from "formik";
import * as Yup from "yup";
import LottieView from "lottie-react-native";
import BarraVolverAtras from "../../components/barra_volver_atras";
import DropdownComponent from "../../components/dropdown";
import { obtenerTiposDocumentos } from "../../services/catalogoServices";
import {registrarUsuario,formato_nombres,confirmarCorreo} from "../../services/userServices";
import BotonEnvioFormularios from "../../components/boton_envio_formularios";

const { width, height } = Dimensions.get("window");

export default function Page() {

    const [visibleEmailConfirmatioModal, setVisibleEmailConfirmatioModal] = useState(false);
    const [visibleRegisterStatusModal, setVisibleRegisterStatusModal] = useState(false);
    const [showDateModal, setShowDateModal] = useState(false);
    const [sendingUserData, setSendingUserData] = useState(false);
    const [sendingCode, setSendingCode] = useState(false);
    const [buttonBGColor, setButtonBGColor] = useState('#FFFFFF');
    // const [visibleCodeErrorMessage, setVisibleCodeErrorMessage] = useState(false);
    const showEmailConfirmationModal = () => setVisibleEmailConfirmatioModal(true);
    const hideEmailConfirmationModal = () => setVisibleEmailConfirmatioModal(false);
    const showRegisterStatusModal = () => setVisibleRegisterStatusModal(true);
    const hideRegisterStatusModal = () => setVisibleRegisterStatusModal(false);
    // const showCodeErrorMessage = () => setVisibleCodeErrorMessage(true);
    // const hideCodeErrorMessage = () => setVisibleCodeErrorMessage(false);
    const router = useRouter();
    const [apiRessponse, setApiResponse] = useState();
    const [code, setCode] = useState(["", "", "", "","",""]);
    const inputs = useRef([]);
    const [data, setData] = useState(
        [{ nombreTipoDocumento: 'NA', id: 1 }]
    );

    const hideRegisterStatusModalOnSuccess = () => {
        setVisibleRegisterStatusModal(false);
        formik.resetForm();
        router.push("../login");
    }

    const handleChange = (text, index) => {
        let newCode = [...code];
        newCode[index] = text;
        setCode(newCode);
    
        // Mueve el foco al siguiente campo
        if (text && index < 5) {
          inputs.current[index + 1].focus();
        }
      };
       
    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && index > 0) {
          // Mueve el foco al campo anterior si está vacío y se presiona la tecla de retroceso
          inputs.current[index - 1].focus();
        }
      };

    const handleConfirm = () => {
        // Aquí puedes manejar la confirmación del código
        Keyboard.dismiss();
        setSendingCode(true);
        confirmarCorreo({codigoVerificacion: code.join(""),email: apiRessponse?.data.email}).then((response) => {
            // console.log("Respuesta de la peticiónnnnnnnnnnnnnnn:", response);
            if(response.status == 200){
                setApiResponse({...response, verifyingCode: true});
            }else{
                setApiResponse({...apiRessponse, status: response.status,data:{...apiRessponse?.data, message: response.data.message}});
                setSendingCode(false);
            }
        }
        );
        // console.log(code.join(""));
        // console.log("Código confirmado");
      };
    
    const validationSchema = Yup.object({
        nombres: Yup.string().required("Este campo es obligatorio"),
        apellidos: Yup.string().required("Este campo es obligatorio"),
        email: Yup.string().email("Correo inválido").required("Este campo es obligatorio"),
        contrasena: Yup.string().required("Este campo es obligatorio").min(8, 1).matches(/[A-Z]/, 2)
                    .matches(/\d/, 3)
                    .matches(/[!@#$%^&*(),.?":{}|<>]/, 4),
        confirmar_contrasena: Yup.string().required("Este campo es obligatorio").oneOf([Yup.ref("contrasena"), null], "Las contraseñas deben coincidir"),
        numeroTelefono: Yup.string().required("Este campo es obligatorio"),
        IdTipoDocumento: Yup.string().required("Este campo es obligatorio").matches(/\d/, "Este campo es obligatorio"),
        numero_documento: Yup.string().required("Este campo es obligatorio"),
        fechaNacimiento: Yup.date().required("Este campo es obligatorio").max(new Date(), "La fecha de nacimiento no puede ser mayor a la fecha actual"),
    });

    const [pressed, setPressed] = useState({
        nombres: false,
        apellidos: false,
        email: false,
        contrasena: false,
        confirmar_contrasena: false,
        numeroTelefono: false,
        IdTipoDocumento: false,
        numero_documento: false,
        fechaNacimiento: false,
    });

    const formik = useFormik({
        initialValues:{
            nombres:"",
            apellidos:"",
            email:"",
            contrasena:"",
            confirmar_contrasena:"",
            numeroTelefono:"",
            IdTipoDocumento: "",
            numero_documento:"",
            fechaNacimiento: new Date(),
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            Keyboard.dismiss();
            setSendingUserData(true);
            values.nombres = formato_nombres(values.nombres);
            values.apellidos = formato_nombres(values.apellidos);
            values.IdTipoDocumento = parseInt(values.IdTipoDocumento);
            registrarUsuario(values).then((response) => {
                // console.log("Respuesta de la petición:", response.data);
                setApiResponse({status: response.status, data: response.data, verifyingCode: false});
                if(response.status == 400){
                    if(response?.data?.message.includes("email")){
                        formik.setFieldValue("email", "");
                    }
                    if(response?.data?.message.includes("documento")){
                        formik.setFieldValue("numero_documento", "");
                    }
                }
            });
    }});

    useEffect(() => {
        if(apiRessponse?.status == 200){
            if(apiRessponse?.verifyingCode){
                hideEmailConfirmationModal();
                showRegisterStatusModal();
            }else{
                setSendingUserData(false);
                showEmailConfirmationModal();
            }
        }else if(apiRessponse){
            if(!apiRessponse?.verifyingCode){
                setSendingUserData(false);
                showRegisterStatusModal();
            }
        }
    }
    , [apiRessponse]);

    useEffect(() => {
        // console.log("useEffect ejecutado");
        formik.validateForm();
        obtenerTiposDocumentos().then((response) => {
            // console.log("Respuesta de la petición:", response.data);
            if(response.status == 200){
                setData(response.data);
            }
    });
    }, []);

  return (
    <PaperProvider>
        <View className="flex-1 gap-0 bg-[#F3F7FD]">
            <StatusBar hidden={false} backgroundColor={"#F3F7FD"} barStyle={"light-content"} />
            {/* Boton back */}
            <BarraVolverAtras/>

            {/* Label Crear Cuenta */}
            <View className="flex">
                <Text className="text-3xl text-[#233E58] font-extrabold py-[1vh] mx-[10vw]">Crea tu cuenta</Text>
            </View>

            {/* Formulario */}
            <ScrollView contentContainerStyle={styles.scrollViewContent} className=" flex mb-[calc(1.5vh)] max-h-[72vh]">
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
                        maxDate={new Date()}
                    />

                    {/* Input Correo */}
                    <InputSignUp 
                        separation={0.028} 
                        label={"Correo Electrónico"} 
                        text={formik.values.email} 
                        placeholder={"Ingresa tu correo aquí"} 
                        id_name={"correo"}
                        handleChange={formik.handleChange("email")}
                        pressed={pressed.email}
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
                        text={formik.values.numeroTelefono} 
                        placeholder={"Ingresa tu número aquí"}
                        id_name={"numeroTelefono"}
                        handleChange={formik.handleChange("numeroTelefono")}
                        pressed={pressed.numeroTelefono}
                        handlePressed={()=> setPressed({...pressed, numeroTelefono: true})}
                        error={formik.errors.numeroTelefono}
                    />
                    
                    {/* Input Tipo de Documento */}
                    <DropdownComponent
                        separation={0.028}
                        label={"Tipo de Documento de Identidad"} 
                        placeholder={"Ingresa tu documento de identidad"}
                        id_name={"IdTipoDocumento"}
                        data={data}
                        handleChange={formik.handleChange("IdTipoDocumento")}
                        value={parseInt(formik.values.IdTipoDocumento)}
                        pressed={pressed.IdTipoDocumento}
                        handlePressed={()=> setPressed({...pressed, IdTipoDocumento: true})}
                        error={formik.errors.IdTipoDocumento}
                        valueField={"id"}
                        labelField={"nombretipodocumento"}
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
            </ScrollView>

            {/* Boton Crear Cuenta */}
            <View className="flex flex-col w-full">
                <BotonEnvioFormularios
                    esValido={formik.isValid}
                    sendingData={sendingUserData}
                    label={"Crear Cuenta"}
                    handleSubmit={formik.handleSubmit}
                />
                <View className="flex mx-auto mt-[1vh]">
                    <Text className="text-[#233E58] text-lg">¿Ya tienes una cuenta? <Link href="/login" className="text-[#3E86B9] font-bold">Inicia sesión</Link></Text>
                </View>
            </View>


             {/* Overlay con animación de carga */}
             {sendingUserData ? (
                    <View className="absolute top-0 left-0 w-full h-full bg-[#0000003c] justify-center items-center z-[1]">
                        <LottieView 
                            source={require("../../assets/sign_up/sendingData.json")}
                            autoPlay
                            loop
                            className="w-[70%] h-[70%]"
                            style={styles.loadingAnimation}
                        />
                        <Text className="text-[#ffffff] text-2xl font-bold">Enviando datos...</Text>
                    </View>
                )  : null}


            {/* Modal de Verificacion Correo */}
            <Portal>
                <Modal className="w-full h-full mt-0" visible={visibleEmailConfirmatioModal} contentContainerStyle={{backgroundColor: 'white', borderRadius: 15,marginHorizontal: "auto", width: "94%", height: "58vh",justifyContent: "center", alignItems:"center"}}>
                    <LottieView 
                        className="flex h-[25%] w-[80%]" 
                        source={require(`../../assets/sign_up/email_sended.json`)} 
                        autoPlay 
                        loop={true} 
                    />

                    <Text className="text-center text-2xl font-bold text-[#233E58]">
                        Correo Electrónico Enviado 
                    </Text>
                    <Text className="text-center text-[2vh] p-[2vw]  text-[#233E58] mt-[calc(1vh)]">
                        !Te has registrado exitosamente! 
                    </Text>
                    <Text className="text-center text-[2vh] mb-[2vh] px-[3vw] text-[#233E58]">
                    Para verificar que eres tu, revisa tu correo electrónico e introduce el código de verificación aquí debajo. 
                    </Text>

                    {(apiRessponse?.status == 200 && apiRessponse?.verifyingCode == false) ? null :
                        <Text className="text-center text-[#d95151] text-md font-bold mb-[calc(2vh)]">
                                {apiRessponse?.data.message}
                        </Text>
                    }

                    <View className="flex-row mx-auto justify-between w-full px-[5%]">
                        {code.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(input) => (inputs.current[index] = input)}
                                value={digit}
                                mode="outlined"
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                onChangeText={(text) => handleChange(text, index)}
                                outlineStyle={{borderColor: "#3E86B9", borderWidth: 1, borderRadius: 6}}
                                className={`border rounded-lg w-[12vw] h-[${height*0.06}] text-2xl bg-white text-center leading-none`}
                                style={{borderColor: "transparent", borderWidth: 0, borderRadius: 0}}
                                contentStyle={{textAlign: "center"}}
                                keyboardType="numeric"
                                maxLength={1}
                            />
                        ))}
                        </View>
                    <View className="mt-[2vh] w-[80%] mb-[1vh]">
                        <BotonEnvioFormularios
                            label="Confirmar Correo"
                            esValido={code.join("").length === 6}
                            sendingData={sendingCode}
                            handleSubmit={handleConfirm}
                        />
                    </View>
                    
                    {/* <TouchableOpacity 
                        activeOpacity={0.7}
                        className="mt-[2vh] bg-[#3E86B9] w-[50%] h-[13%] rounded-md justify-center mb-[calc(1vh)]" 
                        onPress={handleConfirm}
                    >
                        <Text className="text-[#F3F7FD] font-bold text-lg text-center w-full flex">
                            Confirmar Correo
                        </Text>
                    </TouchableOpacity>    */}
                </Modal>
            </Portal>

            {/* Modal de registro exitoso */}
            <Portal>
                <Modal className="w-full h-full mt-0" visible={visibleRegisterStatusModal} onDismiss={apiRessponse?.status == 200 ? hideRegisterStatusModalOnSuccess : hideRegisterStatusModal} contentContainerStyle={{backgroundColor: 'white', borderRadius: 15,marginHorizontal: "auto", width: "90%", height: "60%",justifyContent: "center", alignItems:"center"}}>
                    <LottieView 
                        className="flex h-[40%] w-[80%]" 
                        source={apiRessponse?.status == 200 ? require(`../../assets/sign_up/check.json`) : require(`../../assets/sign_up/wrong.json`)} 
                        autoPlay 
                        loop={false} 
                    />

                    <Text className="text-center text-2xl font-bold text-[#233E58]">
                        {apiRessponse?.status == 200 ? "¡Registro exitoso!" : "¡Registro fallido!"} 
                    </Text>
                    <Text className="text-center text-lg text-[#233E58] mt-[calc(1vh)]">
                        {apiRessponse?.status == 200 ? `Tu cuenta ha sido creada exitosamente.` : `Ha ocurrido un error al intentar crear tu cuenta.`}
                    </Text>

                    {apiRessponse?.status == 200 ? null :
                        <Text className="text-center text-md font-bold text-[#233E58] mt-[calc(1vh)] px-2">
                             {apiRessponse?.data.message}
                        </Text>
                    }
                    
                    
                    <TouchableOpacity  
                        className="mt-[2vh] bg-[#3E86B9] w-[50%] h-[10%] rounded-md justify-center mb-[calc(1vh)]" 
                        onPress={apiRessponse?.status == 200 ? () => router.push("../login"): hideRegisterStatusModal}
                    >
                        <Text className="text-[#F3F7FD] font-bold text-lg text-center w-full flex">
                            {apiRessponse?.status == 200 ? "Iniciar Sesión" : "Cerrar"}
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