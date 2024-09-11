import { Text, View, StyleSheet, TouchableOpacity, StatusBar,Dimensions, Animated,ScrollView,Platform } from "react-native";
import { TextInput,Icon } from "react-native-paper";
import BarraVolverAtras from "../../components/barra_volver_atras";
import InputSignUp from "../../components/input_sign_up";
import { useFormik } from "formik";
import { useState,useRef,useEffect } from "react";
import LottieView from "lottie-react-native";
import BotonEnvioFormularios from "../../components/boton_envio_formularios";
import * as Yup from "yup";
import {solicitarCambioContrasena, verificarCodigoCambioContrasena, cambiarContrasena} from "../../services/userServices";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get("window");

export default function Page() {
    
     // Estado de animación
     const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial value for opacity: 0
     const slideAnim = useRef(new Animated.Value(width)).current;  // Initial value for slide
     const [responseState, setResponseState] = useState(null);
     const [sendingCode, setSendingCode] = useState(false);
       // Función para manejar la animación del fade in y slide
       const handleAnimation = (nextState) => {
        // Realiza la animación de salida primero
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0, // Cambia la opacidad a 0 para ocultar
                duration: 300, // Duración de la animación
                useNativeDriver: true
            }),
            Animated.timing(slideAnim, {
                toValue: -width, // Cambia la vista hacia la izquierda
                duration: 300, // Duración de la animación
                useNativeDriver: true
            })
        ]).start(() => {
            // Una vez termine la animación de salida, cambia el estado
            setProcessPart(nextState);
            // Realiza la animación de entrada de la siguiente vista
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1, // Cambia la opacidad a 1 para mostrar la nueva vista
                    duration: 300, // Duración de la animación
                    useNativeDriver: true
                }),
                Animated.timing(slideAnim, {
                    toValue: 0, // Devuelve la vista a su posición original
                    duration: 300, // Duración de la animación
                    useNativeDriver: true
                })
            ]).start();
        });
    };
    const [code, setCode] = useState(["", "", "", "","",""]);
    const inputs = useRef([]);
    const [avaibleResend, setAvaibleResend] = useState(true);
    const [timeResend, setTimeResend] = useState(60);
    const [timesResended, setTimesResended] = useState(0);

    useEffect(() => {
        if(timeResend > 0 && !avaibleResend){
            setTimeout(() => {
                setTimeResend(timeResend - 1);
            }, 1000);
        }else if(timeResend == 0 && !avaibleResend){
            setAvaibleResend(true);
        }
    }, [avaibleResend, timeResend]);

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
        if (e.nativeEvent.key === 'Backspace' && index > 0 && !code[index]) {
          // Mueve el foco al campo anterior si está vacío y se presiona la tecla de retroceso
          inputs.current[index - 1].focus();
        }
      };

    const handleConfirm = () => {
        // Aquí puedes manejar la confirmación del código
        setSendingCode(true);
        const codeValue = code.join("");
        verificarCodigoCambioContrasena({email: responseState.data.email, codigoVerificacion: codeValue}).then((response) => {
            if(response.status == 200){
                setResponseState({status: 200, purpose: "tomacodigo", data: response.data});
                handleAnimation({ tomaCodigo: false, tomaNuevaContrasena: true });
            }else{
                setResponseState({... responseState, status: 400, purpose: "tomacodigo", data: {...responseState?.data, message: response?.data?.message}});
                setSendingCode(false);
            }
            console.log(response.data);
        }).catch((error) => {
            setResponseState({status: 500, purpose: "tomacodigo", data: error.response.data});
            console.log("Error al verificar código");
            console.log(error);
            setSendingCode(false);
        });
    };

    const handleResendCode = () => {
        if(!avaibleResend) return;

        solicitarCambioContrasena({email: responseState?.data?.email, resend: true}).then((response) => {
            if(response.status == 200){
                setResponseState({status: 200, purpose: "reenvioCodigo", data: {...response.data, message:"Código Reenviado, revise su correo.", email: responseState.data.email}});
            }else{
                setResponseState({status: 400, purpose: "reenvioCodigo", data: response.data});
            }
            console.log(response.data);
        }).catch((error) => {
            setResponseState({status: 500, purpose: "reenvioCodigo", data: error.response.data});
            console.log("Error al reenviar correo");
            console.log(error);
            formikCorreo.setSubmitting(false);
        });           
        setAvaibleResend(false);
        setTimeResend(60*(timesResended+1));
        setTimesResended(timesResended+1);
    };

    const formikCorreo = useFormik({
        initialValues:{
            email:"",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Ingresa un correo válido").required("Ingresa tu correo electrónico"),
        }),
        onSubmit: (values) => {
            solicitarCambioContrasena(values).then((response) => {
                if(response.status == 200){
                    setResponseState({status: 200, purpose: "tomacorreo", data: {...response.data, email: values.email}});
                    handleAnimation({ tomaCorreo: false, tomaCodigo: true });
                    if(response.data.message.includes("vigente")){
                        setAvaibleResend(true);
                        setTimeResend(0);
                    }else{
                        setAvaibleResend(false);
                    }
                }else{
                    setResponseState({status: 400, purpose: "tomacorreo", data: response.data});
                    formikCorreo.setSubmitting(false);
                }
                console.log(response.data);
            }).catch((error) => {
                setResponseState({status: 500, purpose: "tomacorreo", data: error.response.data});
                console.log("Error al enviar correo");
                console.log(error);
                formikCorreo.setSubmitting(false);
            });           
        }
    });

    const formikContrasena = useFormik({
        initialValues:{
            contrasena:"",
            confirmar_contrasena:"",
        },
        validationSchema: Yup.object({
            contrasena: Yup.string().required("Este campo es obligatorio").min(8, 1).matches(/[A-Z]/, 2)
                .matches(/\d/, 3)
                .matches(/[!@#$%^&*(),.?":{}|<>]/, 4)
            ,
            confirmar_contrasena: Yup.string().required("Confirma tu nueva contraseña").oneOf([Yup.ref("contrasena"), null], "Las contraseñas no coinciden"),
        }),
        onSubmit: (values) => {
            console.log("APIRESPONSE", responseState);

            cambiarContrasena({contrasena: values.contrasena}, responseState?.data?.token).then((response) => {
                if(response.status == 200){
                    setResponseState({status: 200, purpose: "cambioContrasena", data: response.data});
                    handleAnimation({ tomaNuevaContrasena: false, contrasenaActualizada: true });
                }else{
                    setResponseState({status: 400, purpose: "cambioContrasena", data: response.data});
                    formikContrasena.setSubmitting(false);
                }
                console.log(response.data);

            }).catch((error) => {
                console.log("Error al cambiar contraseña");
                console.log(error);
            });
            console.log(values);
        }
    });

    const [processPart, setProcessPart] = useState({
        tomaCorreo: true,
        tomaCodigo: false,
        tomaNuevaContrasena: false,
        contrasenaActualizada: false,
    });


    const [pressed, setPressed] = useState({
        email: false,
        contrasena: false,
        confirmar_contrasena: false, // Confirmar contraseña
    });

    useEffect(() => {
        formikCorreo.validateForm();
        formikContrasena.validateForm();
        handleAnimation({ tomaCorreo: true });
    }, []);

    useEffect(() => {
        console.log(responseState);
    }
    ,[responseState]);

    return (
        <View className="flex-1 bg-[#F3F7FD]">
          <StatusBar hidden={false} backgroundColor={"#F3F7FD"} barStyle={"dark-content"} />
          {!processPart.contrasenaActualizada && (
                <BarraVolverAtras/>
            )}

        <ScrollView contentContainerStyle={styles.scrollViewContent} className=" flex mb-[calc(1.5vh)] max-h-[90vh]">
            {processPart.tomaCorreo && (
                <Animated.View className="flex w-full h-[55vh] mt-[4vh]" style={{ opacity: fadeAnim, transform: [{ translateX: slideAnim }] }}>
                    <LottieView 
                        className="h-[27%] " 
                        source={require(`../../assets/recuperarContrasena/lock.json`)} 
                        autoPlay 
                        loop={true} 
                    />           
                    {/* <Image source={require("../../assets/recuperarContrasena/candado.png")} className="w-[22vw] h-[10vh] mx-auto"></Image> */}
                    <Text className="text-[24px] text-[#233E58] font-extrabold text-center mt-[2vh] max-w-[47vw] mx-auto">Reestablece Tu contraseña</Text>
                    <Text className="text-[16px] text-[#233E58] text-center mt-[1vh] max-w-[78vw] mx-auto">Ingresa el correo con el que registraste tu cuenta para enviarte un código de restablecimiento.</Text>
                    {(responseState?.status != 200 && responseState?.purpose == "tomacorreo") && (
                            <Text className="text-[#FF5757] text-[14px] font-extrabold w-[100vw] px-[10vw] text-center mt-[2vh]">{responseState.data.message}</Text>
                    )}
                    <View className="flex mx-auto w-[calc(85.38vw)]">
                    <InputSignUp
                            separation={0.028}
                            text={formikCorreo.values.email}
                            placeholder={"Correo Electrónico"}
                            id_name={"email"}
                            handleChange={formikCorreo.handleChange("email")}
                            pressed={pressed.email}
                            handlePressed={()=> setPressed({...pressed, email: true})}
                            error={formikCorreo.errors.email}
                            keyboardType="email-address"
                    />
                        <BotonEnvioFormularios
                            esValido={formikCorreo.isValid}
                            sendingData={formikCorreo.isSubmitting}
                            label={"Confirmar"}
                            handleSubmit={formikCorreo.handleSubmit}

                       />
                </View>
                </Animated.View>
            )}

            {processPart.tomaCodigo && (
                 <Animated.View className="flex w-full h-[70vh]" style={{ opacity: fadeAnim, transform: [{ translateX: slideAnim }] }}>
                     <LottieView 
                            className="h-[30%]" 
                            source={require(`../../assets/sign_up/email_sended.json`)} 
                            autoPlay 
                            loop={false} 
                        />           
                        <Text className="text-[24px] text-[#233E58] font-extrabold text-center max-w-[47vw] mx-auto">Ingresa el código</Text>
                        <Text className="text-[16px] text-[#233E58] text-center mt-[1vh] max-w-[78vw] mx-auto">Introduce el código de 4 dígitos que enviamos a tu correo.</Text>

                        <View className="flex mx-auto mt-[2vh] w-[calc(85.38vw)]">
                        <View className="flex-row mx-auto justify-between w-full">
                        {code.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(input) => (inputs.current[index] = input)}
                                value={digit}
                                mode="outlined"
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                onChangeText={(text) => handleChange(text, index)}
                                outlineStyle={{borderColor: "#3E86B9", borderWidth: 1, borderRadius: 6}}
                                className={`border rounded-lg w-[13vw] h-[${height*0.06}] text-2xl bg-white text-center leading-none`}
                                style={{borderColor: "transparent", borderWidth: 0, borderRadius: 0}}
                                contentStyle={{textAlign: "center"}}
                                keyboardType="numeric"
                                maxLength={1}
                            />
                        ))}
                        </View>
                        <View className="mt-[3vh]">
                            <BotonEnvioFormularios
                                esValido={code.join("").length == 6}
                                sendingData={sendingCode}
                                label={"Confirmar"}
                                handleSubmit={handleConfirm}
                            />
                        </View>
                    </View>

                    {(responseState?.status == 200 && responseState?.purpose == "tomacorreo" && responseState?.data?.message.includes("vigente")) &&
                        (
                            <Text className="text-[#2ea353] text-[14px] font-extrabold w-[100vw] px-[10vw] text-center mt-[2vh]">{responseState.data.message}</Text>
                            
                        )
                    }

                    {(responseState?.status == 200 && responseState?.purpose == "reenvioCodigo" && responseState.data.message) &&
                        (
                            <Text className="text-[#2ea353] text-[14px] font-extrabold w-[100vw] px-[10vw] text-center mt-[2vh]">{responseState.data.message}</Text>
                            
                        )
                    }

                    {(responseState?.status == 200 && (responseState?.purpose == "tomacorreo" || responseState?.purpose == "reenvioCodigo")) && (
                        timeResend == 0 ? (
                            <Text className="text-[#233E58] text-[14px] font-extrabold w-[100vw] px-[10vw] text-center mt-[2vh]">
                                    ¿No te ha llegado el correo?,
                                    <Text 
                                    className="text-[#3E86B9] font-bold"
                                    onPress={handleResendCode}> Solicita otro aquí</Text>
                                </Text>
                            ) : (
                                <Text className="text-[#233E58] text-[14px] font-extrabold w-[100vw] px-[10vw] text-center mt-[2vh]">
                                    ¿No te ha llegado el correo?, espera 
                                    <Text className="text-[#3E86B9] text-[14px] font-extrabold w-[100vw] px-[10vw] text-center mt-[2vh]"> {timeResend} </Text>
                                    segundos para solicitar otro.
                                </Text>
                            )
                    )}

                    {(responseState?.status == 400 && responseState?.purpose == "tomacodigo") && (
                            <Text className="text-[#FF5757] text-[14px] font-extrabold w-[100vw] px-[10vw] text-center mt-[3vh]">{responseState?.data?.message}</Text>
                        )}
                    </Animated.View >
            )}

          {processPart.tomaNuevaContrasena && (
                    <Animated.View  className="flex h-[80vh] w-full " style={{ opacity: fadeAnim, transform: [{ translateX: slideAnim }] }}>
                        <LottieView 
                                className="h-[24%] " 
                                source={require(`../../assets/recuperarContrasena/password.json`)} 
                                autoPlay 
                                loop={true} 
                            />           
                            {/* <Image source={require("../../assets/recuperarContrasena/candado.png")} className="w-[22vw] h-[10vh] mx-auto"></Image> */}
                            <Text className="text-[24px] text-[#233E58] font-extrabold text-center max-w-[47vw] mx-auto">Crea tu nueva contraseña</Text>
                            <Text className="text-[16px] text-[#233E58] text-center mt-[1vh] max-w-[78vw] mx-auto">Escribe y confirma tu nueva contraseña.</Text>

                            <View className="flex mx-auto mt-[2vh] w-[calc(85.38vw)]">

                            {/* Input Contraseña */}
                            <InputSignUp 
                                separation={0.028} 
                                label={"Contraseña"} 
                                text={formikContrasena.values.contrasena} 
                                placeholder={"Nueva Contraseña"} 
                                id_name={"contrasena"}
                                handleChange={formikContrasena.handleChange("contrasena")}
                                tipo_contrasena={true}
                                pressed={pressed.contrasena}
                                handlePressed={()=> setPressed({...pressed, contrasena: true})}
                                error={formikContrasena.errors.contrasena}
                                showLabel={false}
                            />

                            {/* Texto de validación de contraseña */}
                            <View className="mb-6">
                                <Text className="text-[#233E58] text-[14px] font-extrabold">Tu contraseña debe:</Text>

                                <View className="flex flex-row ml-4 mt-[calc(0.5vh)] ">
                                    <Icon size={16} color={(formikContrasena.values.contrasena.length >= 8) ? "#4ECCAF" : "#CFCDD1"} source={"check-circle"} allowFontScaling={true}/>
                                    <Text className="text-[#233E58] text-[14px] ml-1">Tener al menos 8 caracteres</Text>
                                </View>

                                <View className="flex flex-row ml-4 mt-[calc(0.5vh)] ">
                                    <Icon size={16} color={/[A-Z]/.test(formikContrasena.values.contrasena) ? "#4ECCAF" : "#CFCDD1"} source={"check-circle"} allowFontScaling={true}/>
                                    <Text className="text-[#233E58] text-[14px] ml-1">Tener al menos una mayúscula</Text>
                                </View>

                                <View className="flex flex-row ml-4 mt-[calc(0.5vh)] ">
                                    <Icon size={16} color={/\d/.test(formikContrasena.values.contrasena) ? "#4ECCAF" : "#CFCDD1"} source={"check-circle"} allowFontScaling={true}/>
                                    <Text className="text-[#233E58] text-[14px] ml-1">Tener al menos un número</Text>
                                </View>

                                <View className="flex flex-row ml-4 mt-[calc(0.5vh)] ">
                                    <Icon size={16} color={/[!@#$%^&*(),.?":{}|<>]/.test(formikContrasena.values.contrasena) ? "#4ECCAF" : "#CFCDD1"} source={"check-circle"} allowFontScaling={true}/>
                                    <Text className="text-[#233E58] text-[14px] ml-1">Tener al menos un caracter especial</Text>
                                </View>
                            </View>

                            {/* Input Confirmar Contraseña */}
                            <InputSignUp 
                                separation={0.028} 
                                text={formikContrasena.values.confirmar_contrasena} 
                                placeholder={"Confirmar Nueva Contraseña"} 
                                id_name={"confirmar_contrasena"}
                                handleChange={formikContrasena.handleChange("confirmar_contrasena")}
                                tipo_contrasena={true}
                                pressed={pressed.confirmar_contrasena}
                                handlePressed={()=> setPressed({...pressed, confirmar_contrasena: true})}
                                error={formikContrasena.errors.confirmar_contrasena}
                                showLabel={false}
                            />

                            <View className="mt-[3vh]">
                                <BotonEnvioFormularios
                                    esValido={formikContrasena.isValid }
                                    sendingData={formikContrasena.isSubmitting}
                                    label={"Confirmar"}
                                    handleSubmit={formikContrasena.handleSubmit}
                                />
                            </View>
                        </View>
                    </Animated.View >

            )}

           {processPart.contrasenaActualizada && (
                    <Animated.View className="flex h-[55vh] mb-0 w-full mt-[27vh]" style={{ opacity: fadeAnim, transform: [{ translateX: slideAnim }] }}>
                        <LottieView 
                            className="h-[20vh]" 
                            source={require(`../../assets/sign_up/check.json`)} 
                            autoPlay 
                            loop={true} 
                        />                        
                        <Text className="text-[20px] text-[#233E58] font-extrabold text-center mt-[2vh] max-w-[47vw] mx-auto">Tu contraseña ha sido actualizada</Text>
                        <View className="flex mx-auto mt-[2vh] w-[calc(85.38vw)]">
                            <TouchableOpacity 
                                activeOpacity={0.7}  
                                className=" bg-[#3E86B9] w-[100%] h-[6vh] rounded-md justify-center mb-[calc(1vh)]" 
                                onPress={() => console.log('Pressed')}
                            >
                                <Text className="text-[#F3F7FD] font-bold text-lg text-center w-full flex">
                                    Iniciar Sesión
                                </Text>
                            </TouchableOpacity>
                    </View>
                        </Animated.View >
            )}
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