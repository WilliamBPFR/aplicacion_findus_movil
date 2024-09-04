import { Text, View, Image, TouchableOpacity, StatusBar,Dimensions} from "react-native";
import { TextInput,Icon } from "react-native-paper";
import BarraVolverAtras from "../../components/barra_volver_atras";
import InputSignUp from "../../components/input_sign_up";
import { useFormik } from "formik";
import { useState,useRef } from "react";
import LottieView from "lottie-react-native";


const { width, height } = Dimensions.get("window");

export default function Page() {
    
    const [code, setCode] = useState(["", "", "", ""]);
    const inputs = useRef([]);

    const handleChange = (text, index) => {
        let newCode = [...code];
        newCode[index] = text;
        setCode(newCode);
    
        // Mueve el foco al siguiente campo
        if (text && index < 3) {
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
        console.log(code.join(""));
      };
    const [processPart, setProcessPart] = useState({
        tomaCorreo: false,
        tomaCodigo: false,
        tomaNuevaContrasena: false,
        contrasenaActualizada: true,
    });
    const formikCorreo = useFormik({
        initialValues:{
            apellidos:"",
        },
        onSubmit: (values) => {
            console.log(values);
        }
    });

    const formikContrasena = useFormik({
        initialValues:{
            contrasena:"",
            confirmar_contrasena:"",
        },
        onSubmit: (values) => {
            console.log(values);
        }
    });

    const [pressed, setPressed] = useState({
        apellidos: false,
        contrasena: false,
        confirmar_contrasena: false,
    });

    return (
        <View className="flex-1 bg-[#F3F7FD]">
          <StatusBar hidden={false} backgroundColor={"#F3F7FD"} barStyle={"dark-content"} />
          {!processPart.contrasenaActualizada && (
                <BarraVolverAtras/>
            )}
         
          {processPart.tomaCorreo && (
                <View className="flex w-full h-[100%] mt-[4vh]">
                        <LottieView 
                            className="h-[24%] " 
                            source={require(`../../assets/recuperarContrasena/lock.json`)} 
                            autoPlay 
                            loop={true} 
                        />           
                    {/* <Image source={require("../../assets/recuperarContrasena/candado.png")} className="w-[22vw] h-[10vh] mx-auto"></Image> */}
                    <Text className="text-[24px] text-[#233E58] font-extrabold text-center mt-[2vh] max-w-[47vw] mx-auto">Reestablece Tu contraseña</Text>
                    <Text className="text-[16px] text-[#233E58] text-center mt-[1vh] max-w-[78vw] mx-auto">Ingresa el correo con el que registraste tu cuenta para enviarte un código de restablecimiento.</Text>

                    <View className="flex mx-auto w-[calc(85.38vw)]">
                    <InputSignUp
                            separation={0.028}
                            text={formikCorreo.values.apellidos}
                            placeholder={"Correo Electrónico"}
                            id_name={"apellidos"}
                            handleChange={formikCorreo.handleChange("apellidos")}
                            pressed={pressed.apellidos}
                            handlePressed={()=> setPressed({...pressed, apellidos: true})}
                            error={formikCorreo.errors.apellidos}
                            keyboardType="email-address"
                    />

                            <TouchableOpacity 
                                activeOpacity={0.7}  
                                className="mt-[2vh] bg-[#3E86B9] w-[100%] h-[20%] rounded-md justify-center mb-[calc(1vh)]" 
                                onPress={() => console.log('Pressed')}
                            >
                                <Text className="text-[#F3F7FD] font-bold text-lg text-center w-full flex">
                                Enviar Código
                                </Text>
                            </TouchableOpacity>  
                </View>
                </View>
            )}

            {processPart.tomaCodigo && (
                     <View className="flex w-full h-[70vh] mt-[4vh]">
                     <LottieView 
                            className="h-[30%]" 
                            source={require(`../../assets/sign_up/email_sended.json`)} 
                            autoPlay 
                            loop={false} 
                        />           
                        <Text className="text-[24px] text-[#233E58] font-extrabold text-center max-w-[47vw] mx-auto">Ingresa el código</Text>
                        <Text className="text-[16px] text-[#233E58] text-center mt-[1vh] max-w-[78vw] mx-auto">Introduce el código de 4 dígitos que enviamos a tu correo.</Text>

                        <View className="flex mx-auto mt-[2vh] w-[calc(65.38vw)]">
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
                        <TouchableOpacity 
                            activeOpacity={0.7}  
                            className="mt-[5vh] bg-[#3E86B9] w-[100%] h-[22%] rounded-md justify-center mb-[calc(1vh)]" 
                            onPress={() => console.log('Pressed')}
                        >
                            <Text className="text-[#F3F7FD] font-bold text-lg text-center w-full flex">
                            Confirmar
                            </Text>
                        </TouchableOpacity>  
                    </View>
                      
                    </View>
            )}

          {processPart.tomaNuevaContrasena && (
                    <View className="flex h-[60vh] w-full mt-[4vh]">
                    <LottieView 
                            className="h-[37%] " 
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

                            <TouchableOpacity 
                                activeOpacity={0.7}  
                                className="mt-[2vh] bg-[#3E86B9] w-[100%] h-[14%] rounded-md justify-center mb-[calc(1vh)]" 
                                onPress={() => console.log('Pressed')}
                            >
                                <Text className="text-[#F3F7FD] font-bold text-lg text-center w-full flex">
                                Confirmar Cambio
                                </Text>
                            </TouchableOpacity>  
                    </View>
                   </View>
            )}

           {processPart.contrasenaActualizada && (
                    <View className="flex h-[35vh] mb-0 w-full mt-[23vh]">
                        <LottieView 
                            className="h-[65%] " 
                            source={require(`../../assets/sign_up/check.json`)} 
                            autoPlay 
                            loop={true} 
                        />                        
                        <Text className="text-[24px] text-[#233E58] font-extrabold text-center mt-[2vh] max-w-[47vw] mx-auto">Tu contraseña ha sido actualizada</Text>
                        <View className="flex mx-auto mt-[2vh] w-[calc(85.38vw)]">
                            <TouchableOpacity 
                                activeOpacity={0.7}  
                                className=" bg-[#3E86B9] w-[100%] h-[44%] rounded-md justify-center mb-[calc(1vh)]" 
                                onPress={() => console.log('Pressed')}
                            >
                                <Text className="text-[#F3F7FD] font-bold text-lg text-center w-full flex">
                                    Iniciar Sesión
                                </Text>
                            </TouchableOpacity>
                    </View>
                        </View>
            )}
        </View>
);
}