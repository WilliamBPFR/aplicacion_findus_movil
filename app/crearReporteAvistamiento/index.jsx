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
  import { Link, useRouter } from "expo-router";
  import { useState, useEffect } from "react";
  import LottieView from 'lottie-react-native'; // Para animaciones
  import InputSignUp from "../../components/input_sign_up.jsx";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import InputFecha from "../../components/input_fecha.jsx";
  import DropdownComponent from "../../components/dropdown.jsx";
  import ImagePickerComponent from "../../components/imagePicker.jsx";
  import DocumentPickerComponent from "../../components/filePicker.jsx";
  import { obtenerTiposDocumentos } from "../../services/catalogoServices.js";
  import { obtenerToken } from "../../services/userServices.js";
  import MapInput from "../../components/map.jsx";
  import {crearPublicacion} from "../../services/publicacionServices.js";
  import BotonEnvioFormularios from "../../components/boton_envio_formularios.jsx";
  import { subirArchivo } from "../../services/uploadFileServices.js";
  
  export default function Page() {
    const [showDateModalNacimiento, setShowDateModalNacimiento] = useState(false);
    const [showDateModalDesaparicion, setShowDateModalDesaparicion] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [apiRessponse, setApiResponse] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [documentData, setDocumentData] = useState(null);
  
    const router = useRouter();
    useEffect(() => {
      const backAction = () => {
        // Aquí defines la ruta a la que quieres redirigir
        router.replace('/publicacionDentroPublicacion');  // Reemplaza con la pantalla específica
        return true; // Esto indica que estamos manejando el evento nosotros.
      };
  
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );
  
      return () => backHandler.remove();
    }, []);
  
    const validationSchema = Yup.object({
      fecha_avistamiento: Yup.date().required("Este campo es obligatorio"),
      detalles: Yup.string().required("Este campo es obligatorio"),
      relacion_desaparecido: Yup.string().required("Este campo es obligatorio"),
      ubicacion_latitud: Yup.string().required("Este campo es obligatorio"),
      ubicacion_longitud: Yup.string().required("Este campo es obligatorio"),
    });
  
    const [pressed, setPressed] = useState({
      nombre_desaparecido: false,
      id_tipo_documento: false,
      documento_desaparecido: false,
      telefono: false,
      fecha_desaparicion: false,
      descripcion_desaparecido: false,
      relacion_desaparecido: false,
      contacto: false,
      fecha_nacimiento: false,
    });
  
    const formik = useFormik({
      initialValues: {
        fecha_avistamiento: new Date(),
        detalles: "",
        ubicacion_latitud: "",
        ubicacion_longitud: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoading(true);
        try {
          console.log("Fecha de nacimiento: ", values.fecha_nacimiento);
          values.edad = calcularEdad(values.fecha_nacimiento);
          values.id_tipo_documento = parseInt(values.id_tipo_documento);
          
          values.ubicacion_latitud = values.ubicacion_latitud.toString();
          values.ubicacion_longitud = values.ubicacion_longitud.toString();
    
          console.log("Enviando datos: ", values);
    
          const response = await crearPublicacion(values,obtenerToken()); // Espera la respuesta
          setApiResponse(response); // Guarda la respuesta para manejar el estado
          
          if (response.status === 200) {
            console.log("Publicación creada correctamente: ", response.data);
            const idPublicacion = response.data.idpublicacion;
            console.log("Publicación creada correctamente: ", response.data);
  
            // Paso 2: Subir la imagen o el archivo si se proporcionó
            if (imageData) {
              const uploadData = {
                idpublicacion: idPublicacion,
                base64Image: imageData?.base64,
                base64File: null,
                fileName: imageData?.fileName,
                mimeType: imageData?.mimeType
              };
  
              console.log("Datos de la imagen: ", "fileName:", uploadData.fileName, "mimeType:", uploadData.mimeType, "idPublicacion:", uploadData.idpublicacion);
              
              // Llamada a la API para subir la imagen/archivo
              const uploadResponse = await subirArchivo(uploadData);
              if (uploadResponse.status === 200) {
                console.log("Imagen subida correctamente");
              } else {
                console.error("Error al subir la imagen", uploadResponse.data.message);
              }
            }
  
            if(documentData){
              const uploadData = {
                idpublicacion: idPublicacion,
                base64Image: null,
                base64File: documentData?.base64,
                fileName: documentData?.fileName,
                mimeType: documentData?.mimeType,
              };
  
              console.log("Datos del archivo: ", "fileName:", uploadData.fileName, "mimeType:", uploadData.mimeType, "idPublicacion:", uploadData.idpublicacion);
              
              // // Llamada a la API para subir la imagen/archivo
              const uploadResponse = await subirArchivo(uploadData, 'tu_token_aqui');
              if (uploadResponse.status === 200) {
                console.log("Archivo subido correctamente");
              } else {
                console.error("Error al subir el archivo: ", uploadResponse.data.message);
              }
            }
            
            setLoading(false);  
            setModalVisible(true);
            setTimeout(() => {
              setModalVisible(false);
              router.push("../home");
            }, 2000);
          } else {
            console.log("Error al crear la publicación: ", response.data.message);
            setModalVisible(true);
            setLoading(false);
          }
        } catch (error) {
          setModalVisible(true);
          setLoading(false);
          console.error("Error en la petición: ", error);
        }
      },
    });
  
    const hideModal = () => setModalVisible(false);
  
  
  
    useEffect(() => {
      formik.validateForm();
      obtenerTiposDocumentos().then((response) => {
          if(response.status == 200){
              setData(response.data);
          }
    });
    }, []);
  
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
              Crear Reporte de Avistamiento de William Chawillfer Ferreira Rosado
            </Text>
          </View>
          <View className="flex w-[calc(85.380vw)]">
            {/* Input Fecha de Avistamiento */}
            <InputFecha
              label={"Fecha de Avistamiento"}
              separation={0.028}
              value={formik.values.fecha_nacimiento}
              placeholder={"Seleccione su fecha de Nacimiento"}
              id_name={"fecha_avistamiento"}
              setFieldValue={formik.setFieldValue}
              fiedName={"fecha_avistamiento"}
              pressed={pressed.fecha_nacimiento}
              handlePressed={() => setPressed({ ...pressed, fecha_nacimiento: true })}
              error={formik.errors.fecha_nacimiento}
              showDateModal={showDateModalNacimiento}
              setShowDateModal={setShowDateModalNacimiento}
              maxDate={new Date()}
            />
    
            {/* Input Detalles de Avistamiento */}
            <InputSignUp
              separation={0.028}
              label="Detalles del Avistamiento"
              text={formik.values.documento_desaparecido} // Corregido
              placeholder="Detalles del Avistamiento"
              id_name={"detalles"} // Corregido
              handleChange={formik.handleChange("detalles")} // Corregido
              pressed={pressed.documento_desaparecido} // Corregido
              handlePressed={() => setPressed({ ...pressed, documento_desaparecido: true })} // Corregido
              error={formik.errors.documento_desaparecido} // Corregido
              multiline={true}
            />
    
            {/* Input Ubicación con MapInput */}
            <MapInput
              separation={0.028}
              onLocationSelect={(location) => {
                formik.setFieldValue("ubicacion_latitud", location.latitude);
                formik.setFieldValue("ubicacion_longitud", location.longitude);
              }}
              label="Ubicación de la Desaparición"
            />
            {pressed.ubicacion && formik.errors.ubicacion && (
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
                    <Text style={styles.loadingText}>Creando publicación...</Text>
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
                      {apiRessponse?.status === 200 ? "¡Publicación creada exitosamente!" : "¡Error al crear la publicación!"}
                    </Text>
                    <Text style={styles.modalMessage}>
                      {apiRessponse?.status === 200 ? "Tu publicación ha sido creada exitosamente." : "Ocurrió un error al intentar crear la publicación."}
                    </Text>
                    {apiRessponse?.status !== 200 && (
                      <Text style={styles.modalErrorMessage}>
                        {apiRessponse?.data?.message}
                      </Text>
                    )}
                    <TouchableOpacity 
                      style={styles.modalButton}
                      onPress={apiRessponse?.status === 200 ? () => router.push("../home") : hideModal}
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
  