import { StyleSheet, Text, View,Image, TouchableOpacity,ScrollView,StatusBar,Dimensions,Keyboard } from "react-native";
import {useRouter} from 'expo-router';
import { Button,Icon,Modal,Portal,PaperProvider, TextInput  } from "react-native-paper";
import { useState,useEffect,useRef } from "react";
import InputSignUp from "../../components/input_sign_up.jsx";
import InputFecha from "../../components/input_fecha.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import LottieView from "lottie-react-native";
import BarraVolverAtras from "../../components/barra_volver_atras.jsx";
import DropdownComponent from "../../components/dropdown.jsx";
import { obtenerTiposDocumentos } from "../../services/catalogoServices.js";
import {obtenerInfoEditarUsuarioBD, obtenerToken, editarUsuarioBD, formato_nombres} from "../../services/userServices.js";
import BotonEnvioFormularios from "../../components/boton_envio_formularios.jsx";
import { ActivityIndicator } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Page() {
    // const { id } = useLocalSearchParams();
    const [initialValues, setInitialValues] = useState({
        nombres:"",
        apellidos:"",
        fechaNacimiento: new Date(),
        numeroTelefono:"",
        IdTipoDocumento: "",
        numero_documento:"",
    });
    const [visibleEstatusModificacion, setVisibleEstatusModificacion] = useState(false);
    const [showDateModal, setShowDateModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [sendingUserData, setSendingUserData] = useState(false);
    const showEstatusModificacion = () => setVisibleEstatusModificacion(true);
    const hideEstatusModificacion = () => setVisibleEstatusModificacion(false);
    const router = useRouter();
    const [apiRessponse, setApiResponse] = useState();
    // const [code, setCode] = useState(["", "", "", "","",""]);
    // const inputs = useRef([]);
    const [tiposDocumentos, setTiposDocumentos] = useState(
        [{ nombreTipoDocumento: 'NA', id: 1 }]
    );

    // const hideRegisterStatusModalOnSuccess = () => {
    //     setVisibleRegisterStatusModal(false);
    //     formik.resetForm();
    //     router.push("../login");
    // }

    // const handleChange = (text, index) => {
    //     let newCode = [...code];
    //     newCode[index] = text;
    //     setCode(newCode);
    
    //     // Mueve el foco al siguiente campo
    //     if (text && index < 5) {
    //       inputs.current[index + 1].focus();
    //     }
    //   };
       
    // const handleKeyPress = (e, index) => {
    //     if (e.nativeEvent.key === 'Backspace' && index > 0) {
    //       // Mueve el foco al campo anterior si está vacío y se presiona la tecla de retroceso
    //       inputs.current[index - 1].focus();
    //     }
    //   };

    // const handleConfirm = () => {   
    //     // Aquí puedes manejar la confirmación del código
    //     Keyboard.dismiss();
    //     setSendingCode(true);
    //     confirmarCorreo({codigoVerificacion: code.join(""),email: apiRessponse?.data.email}).then((response) => {
    //         // console.log("Respuesta de la peticiónnnnnnnnnnnnnnn:", response);
    //         if(response.status == 200){
    //             setApiResponse({...response, verifyingCode: true});
    //         }else{
    //             setApiResponse({...apiRessponse, status: response.status,data:{...apiRessponse?.data, message: response.data.message}});
    //             setSendingCode(false);
    //         }
    //     }
    //     );
    //     // console.log(code.join(""));
    //     // console.log("Código confirmado");
    //   };
    
    const handleEdicionFailed = () => {
        hideEstatusModificacion();
    }

    const handleEdicionSuccess = () => {
        hideEstatusModificacion();
        router.push("../perfilAdentro");
    }
    const validationSchema = Yup.object({
        nombres: Yup.string().required("Este campo es obligatorio"),
        apellidos: Yup.string().required("Este campo es obligatorio"),
        numeroTelefono: Yup.string().required("Este campo es obligatorio"),
        IdTipoDocumento: Yup.string().required("Este campo es obligatorio").matches(/\d/, "Este campo es obligatorio"),
        numero_documento: Yup.string().required("Este campo es obligatorio"),
        fechaNacimiento: Yup.date().required("Este campo es obligatorio").max(new Date(), "La fecha de nacimiento no puede ser mayor a la fecha actual"),
    });

    const [pressed, setPressed] = useState({
        nombres: false,
        apellidos: false,
        numeroTelefono: false,
        IdTipoDocumento: false,
        numero_documento: false,
        fechaNacimiento: false,
    });

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            Keyboard.dismiss();
            setSendingUserData(true);
            values.nombres = formato_nombres(values.nombres);
            values.apellidos = formato_nombres(values.apellidos);
            values.IdTipoDocumento = parseInt(values.IdTipoDocumento);
            editarUsuarioBD(values,obtenerToken()).then((response) => {
                console.log("Respuesta de la petición de EDITAR USUARIO:", response.data);
                setApiResponse({status: response.status, data: response.data});
                if(response.status == 400){
                    if(response?.data?.message.includes("documento")){
                        formik.setFieldValue("numero_documento", "");
                    }
                }
            });
    }});

    useEffect(() => {
        setSendingUserData(false);
        if(apiRessponse){
            showEstatusModificacion();
        }
    }
    , [apiRessponse]);

    useEffect(() => {
        // console.log("useEffect ejecutado");
        setLoading(true);
        formik.validateForm();
        obtenerTiposDocumentos().then((response) => {
            // console.log("Respuesta de la petición:", response.data);
            if(response.status == 200){
                setTiposDocumentos(response.data);
            }
        });

        obtenerInfoEditarUsuarioBD(obtenerToken()).then((response) => {
            if(response.status === 200){
                // console.log("Información del perfil: ",response.data);
                setInitialValues({
                    nombres: response.data.nombre,
                    apellidos: response.data.apellido,
                    fechaNacimiento: new Date(response.data.fechanacimiento),
                    numeroTelefono: response.data.numerotelefono,
                    IdTipoDocumento: response.data.idtipodocumento,
                    numero_documento: response.data.numerodocumento,
                });
            }else{
                console.log("Error al obtener la información del perfil: ",response.data);
            }
        }).catch((error) => {
            console.log("Error al obtener la información del perfil: ",error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);


    if(loading){
        return (
            <View className="flex-1 bg-[#F3F7FD]">
                <StatusBar hidden={false} backgroundColor={"#F3F7FD"} barStyle={"light-content"} />
                <BarraVolverAtras/>
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator animating={true} color="#1DE9B6" size="large" />
                </View>
            </View>
        );
    }

  return (
    <PaperProvider>
        <View className="flex-1 gap-0 bg-[#F3F7FD]">
            <StatusBar hidden={false} backgroundColor={"#F3F7FD"} barStyle={"light-content"} />
            {/* Boton back */}
            <BarraVolverAtras/>

            {/* Label Crear Cuenta */}
            <View className="flex">
                <Text className="text-3xl text-[#233E58] font-extrabold py-[1vh] mx-[10vw]">Editar Perfil</Text>
            </View>

            {/* Formulario */}
            <ScrollView contentContainerStyle={styles.scrollViewContent} className=" flex mb-[calc(1.5vh)] max-h-[76vh]">
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
                        data={tiposDocumentos}
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
            <View className="flex flex-row w-full">
            <TouchableOpacity
                activeOpacity={0.7}
                className={`flex bg-auto bg-[#e17b73] mx-auto w-[45%] h-[7vh] rounded-md justify-center align-middle`}
            >
                <Text className="flex w-full text-center text-xl font-bold text-[#F3F7FD]">
                    Cancelar
                </Text>
            </TouchableOpacity>

            <BotonEnvioFormularios
                esValido={(formik.isValid && formik.dirty)}
                sendingData={sendingUserData}
                label={"Guardar Cambios"}
                handleSubmit={formik.handleSubmit}
                width="45%"
            />
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

            {/* Modal de registro exitoso */}
            <Portal>
                <Modal className="w-full h-full mt-0" visible={visibleEstatusModificacion} onDismiss={apiRessponse?.status == 200 ? handleEdicionSuccess : handleEdicionFailed} contentContainerStyle={{backgroundColor: 'white', borderRadius: 15,marginHorizontal: "auto", width: "90%", height: "60%",justifyContent: "center", alignItems:"center"}}>
                    <LottieView 
                        className="flex h-[40%] w-[80%]" 
                        source={apiRessponse?.status == 200 ? require(`../../assets/sign_up/check.json`) : require(`../../assets/sign_up/wrong.json`)} 
                        autoPlay 
                        loop={false} 
                    />

                    <Text className="text-center text-2xl font-bold text-[#233E58]">
                        {apiRessponse?.status == 200 ? "Modificación exitosa!" : "Modificación fallida!"} 
                    </Text>
                    <Text className="text-center text-lg text-[#233E58] mt-[calc(1vh)]">
                        {apiRessponse?.status == 200 ? `Tu usuario ha sido modificado con éxito.` : `Ha ocurrido un error al intentar modificar tu usuario.`}
                    </Text>

                    {apiRessponse?.status == 200 ? null :
                        <Text className="text-center text-md font-bold text-[#233E58] mt-[calc(1vh)] px-2">
                             {apiRessponse?.data.message}
                        </Text>
                    }
                    
                    
                    <TouchableOpacity  
                        className="mt-[2vh] bg-[#3E86B9] w-[50%] h-[10%] rounded-md justify-center mb-[calc(1vh)]" 
                        onPress={apiRessponse?.status == 200 ? () => router.push("../perfilAdentro"): handleEdicionFailed}
                    >
                        <Text className="text-[#F3F7FD] font-bold text-lg text-center w-full flex">
                            {apiRessponse?.status == 200 ? "Aceptar" : "Cerrar"}
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