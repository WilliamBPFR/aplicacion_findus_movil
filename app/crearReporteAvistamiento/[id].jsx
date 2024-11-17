import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    BackHandler,
    Modal,
    ActivityIndicator,
  } from "react-native";
  import { Portal, PaperProvider} from "react-native-paper";
  import { StatusBar } from "expo-status-bar";
  import { useRouter,useLocalSearchParams } from "expo-router";
  import { useState, useEffect } from "react";
  import LottieView from 'lottie-react-native'; // Para animaciones
  import InputSignUp from "../../components/input_sign_up.jsx";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import InputFecha from "../../components/input_fecha.jsx";
  import { obtenerToken } from "../../services/userServices.js";
  import MapInput from "../../components/map.jsx";
  import BotonEnvioFormularios from "../../components/boton_envio_formularios.jsx";
  import { subirArchivo } from "../../services/uploadFileServices.js";
  import { crearAvistamiento, subirFotoAvistamiento } from "../../services/avistamiento.js";
  import ImagePickerComponent from "../../components/imagePicker.jsx";
  
  export default function Page() {
    const [showDateModalNacimiento, setShowDateModalNacimiento] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [apiRessponse, setApiResponse] = useState(null);
    const { id,nombredesaparecido} = useLocalSearchParams(); // Accede a los parámetros por nombre.
    const hideModal = () => setModalVisible(false);


    useEffect(() => {
      console.log("ID de la publicación:", id);
      console.log("Nombre del desaparecido:", nombredesaparecido.trim());
    }, [id]);
    
    const router = useRouter();
    useEffect(() => {
      const backAction = () => {
        // Aquí defines la ruta a la que quieres redirigir
        router.replace(`/publicacionDentroPublicacion/${id}`);  // Reemplaza con la pantalla específica
        return true; // Esto indica que estamos manejando el evento nosotros.
      };
  
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );
  
      return () => backHandler.remove();
    }, []);
  
    useEffect(() => {
      formik.validateForm();
    }, []);

    const validationSchema = Yup.object({
      fecha_avistamiento: Yup.date().required("Este campo es obligatorio"),
      detalles: Yup.string().required("Este campo es obligatorio"),
      ubicacion_latitud: Yup.string().required("Este campo es obligatorio"),
      ubicacion_longitud: Yup.string().required("Este campo es obligatorio"),
      imageData: Yup.object().required(),
    });
  
    const [pressed, setPressed] = useState({
      fecha_avistamiento: false,
      detalles: false,
      ubicacion: false,
    });
  
    const formik = useFormik({
      initialValues: {
        fecha_avistamiento: new Date(),
        detalles: "",
        ubicacion_latitud: "",
        ubicacion_longitud: "",
        imageData: null,
        idPublicacion: id,
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        // console.log(values)

        setLoading(true);
        try{
          const response = await crearAvistamiento(values);
          setApiResponse(response);

          if (response.status === 200) {
            console.log("Avistamiento creado correctamente: ", response.data);
            console.log("ID DEL AVISTAMIENTO: ", response.data.idAvistamiento);

            const dataFoto = {
              idavistamiento: response.data.idAvistamiento,
              base64File: values?.imageData?.base64,
              fileName: values?.imageData?.fileName,
              mimeType: values?.imageData?.mimeType
            }

            const responseFoto = await subirFotoAvistamiento(dataFoto);
            if (responseFoto.status === 200) {
              setLoading(false);  
              setModalVisible(true);
              setTimeout(() => {
                setModalVisible(false);
                router.push(`/publicacionDentroPublicacion/${id}`);
              }, 2000);
            }
          }else{
              console.log("Error al crear la publicación: ", response.data.message);
              setModalVisible(true);
              setLoading(false);
          }
      } catch (error) {
        setModalVisible(true);
        setLoading(false);
        console.error("Error en la petición: ", error);
      }
    }
    });
  
  
  
    useEffect(() => {
      formik.validateForm();
      // console.log(formik?.values);
      // console.log(formik?.errors);
      // console.log(typeof(formik?.values.ubicacion_latitud))
    }, [formik?.values]);
  
    return (
      <PaperProvider>
      <View className="flex-1 bg-[#F3F7FD]">
        <StatusBar
          hidden={false}
          backgroundColor={"#F3F7FD"}
          barStyle={"dark-content"}
        />
        {/* Botón back */}
        <View className="flex">
          <View className="flex mx-[4.5vw] my-[1vh]">
            <TouchableOpacity onPress={() => router.back()}>
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
          className="flex mb-[calc(1.5vh)]"
        >
          <View className="flex">
            <Text className="text-[24px] w-[90vw] text-[#233E58] font-extrabold py-[1vh] mx-[-42.5vw]">
              Crear Reporte de Avistamiento de {nombredesaparecido}
            </Text>
          </View>
          <View className="flex w-[calc(85.380vw)]">
            {/* Input Fecha de Avistamiento */}
            <InputFecha
              label={"Fecha de Avistamiento"}
              separation={0.028}
              value={formik.values.fecha_avistamiento}
              placeholder={"Seleccione su fecha de Nacimiento"}
              id_name={"fecha_avistamiento"}
              setFieldValue={formik.setFieldValue}
              fiedName={"fecha_avistamiento"}
              pressed={pressed.fecha_avistamiento}
              handlePressed={() => setPressed({ ...pressed, fecha_avistamiento: true })}
              error={formik.errors.fecha_avistamiento}
              showDateModal={showDateModalNacimiento}
              setShowDateModal={setShowDateModalNacimiento}
              maxDate={new Date()}
            />
    
            {/* Input Detalles de Avistamiento */}
            <InputSignUp
              separation={0.028}
              label="Detalles del Avistamiento"
              text={formik.values.detalles} // Corregido
              placeholder="Detalles del Avistamiento"
              id_name={"detalles"} // Corregido
              handleChange={formik.handleChange("detalles")} // Corregido
              pressed={pressed.detalles} // Corregido
              handlePressed={() => setPressed({ ...pressed, detalles: true })} // Corregido
              error={formik.errors.detalles} // Corregido
              multiline={true}
            />

                      {/* Subir imagen */}
          <ImagePickerComponent
            separation={0.028}
            buttonTitle="Subir foto"
            label="Foto del Avistamiento"
            onImagePicked={(image) => formik.setFieldValue("imageData",image)}
            containerStyle={{ marginVertical: 24 }}
            imageStyle={{ width: 300, height: 300 }}
          />
  
    
            {/* Input Ubicación con MapInput */}
            <MapInput
              separation={0.028}
              onLocationSelect={(location) => {
                formik.setFieldValue("ubicacion_latitud", location.latitude.toString());
                formik.setFieldValue("ubicacion_longitud", location.longitude.toString());
              }}
              label="Ubicación de la Desaparición"
            />
            {pressed.ubicacion && (formik.errors.ubicacion_latitud || formik.errors.ubicacion_longitud) && (
              <Text style={{ color: "red" }}>{formik.errors.ubicacion}</Text>
            )}
    
            {/* Botón para enviar */}
            <View className="flex flex-col w-full">
              <BotonEnvioFormularios
                esValido={formik.isValid}
                sendingData={loading}
                label="Reportar Avistamiento"
                handleSubmit={formik.handleSubmit}
              />
            </View>
  
            {/* Modales */}
            <Portal>
              {/* Modal de loading */}
              <Modal
                visible={loading}
                transparent={true}
                onRequestClose={() => setLoading(false)}
                animationType="fade"
              >
                <View style={styles.modalBackground}>
                  <View style={styles.modalContent}>
                    <ActivityIndicator size="large" color="#3E86B9" />
                    <Text style={styles.loadingText}>Creando Avistamiento...</Text>
                  </View>
                </View>
              </Modal>
                  
              {/* Modal de éxito o error */}  
              <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={hideModal}
                animationType="fade"
              >
                <View style={styles.modalBackground}>
                  <View style={styles.modalContent}>
                    <LottieView 
                      style={styles.lottie}
                      source={apiRessponse?.status === 200 ? require('../../assets/sign_up/check.json') : require('../../assets/sign_up/wrong.json')} 
                      autoPlay 
                      loop={false} 
                    />
                    <Text style={styles.modalTitle}>
                      {apiRessponse?.status === 200 ? "Avistamiento creado exitosamente!" : "¡Error al crear el avistamiento!"}
                    </Text>
                    <Text style={styles.modalMessage}>
                      {apiRessponse?.status === 200 ? "Tu avistamiento ha sido creado exitosamente." : "Ocurrió un error al intentar crear el avistamiento."}
                    </Text>
                    {apiRessponse?.status !== 200 && (
                      <Text style={styles.modalErrorMessage}>
                        {apiRessponse?.data?.message}
                      </Text>
                    )}
                    <TouchableOpacity 
                      style={styles.modalButton}
                      onPress={apiRessponse?.status === 200 ? () => router.push(`/publicacionDentroPublicacion/${id}`) : hideModal}
                    >
                      <Text style={styles.modalButtonText}>Aceptar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              
            </Portal>
          </View>
        </ScrollView>
      </View>
      </PaperProvider>
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
      alignItems: "center",
      justifyContent: "flex-start",
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
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)', // Fondo oscuro semitransparente
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: 15,
      padding: 20,
      width: '80%',
      alignItems: 'center',
    },
    lottie: {
      width: '80%',
      height: '40%',
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#233E58',
      textAlign: 'center',
      marginVertical: 10,
    },
    modalMessage: {
      fontSize: 18,
      color: '#233E58',
      textAlign: 'center',
      marginBottom: 10,
    },
    modalErrorMessage: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#233E58',
      textAlign: 'center',
      marginTop: 10,
      paddingHorizontal: 20,
    },
    modalButton: {
      backgroundColor: '#3E86B9',
      width: '50%',
      height: 40,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    modalButtonText: {
      color: '#F3F7FD',
      fontWeight: 'bold',
      fontSize: 18,
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: '#233E58',
    },
  
  });
  