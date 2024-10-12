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
  // const obtenerToken = async () => {
  //   // const isAvailable = await SecureStore.isAvailableAsync();
  //   // console.log("SecureStore disponible:", isAvailable)
  //   return await obtenerToken();
  // };
  useEffect(() => {
    const backAction = () => {
      // Aquí defines la ruta a la que quieres redirigir
      router.replace('/FormPublicacion');  // Reemplaza con la pantalla específica
      return true; // Esto indica que estamos manejando el evento nosotros.
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);
  // // Estado para el valor seleccionado del dropdown
  // const [selectedValue, setSelectedValue] = useState("");
  // const [error, setError] = useState(false);

  // // Manejo del evento de selección
  // const handleSelect = (value) => {
  //   setSelectedValue(value);
  //   setPressed(true); // Puedes ajustar según la lógica de tu aplicación
  // };

  // const handleChange = (text, index) => {
  //   let newCode = [...code];
  //   newCode[index] = text;
  //   setCode(newCode);

  //   // Mueve el foco al siguiente campo
  //   if (text && index < 3) {
  //     inputs.current[index + 1].focus();
  //   }
  // };

  useEffect(() => {
    console.log("useEffect ejecutado");
    obtenerTiposDocumentos().then((response) => {
      console.log("Respuesta de la ppetición:", response.data);
      if (response.status == 200) {
        setItems(response.data);
      }
    });
  }, []);

  const [data, setData] = useState(
    [{ nombreTipoDocumento: 'NA', id: 1 }]
  );

  // function calcular edad
  const calcularEdad = (fecha_nacimiento) => {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha_nacimiento.getFullYear();
    
    // Obtener el mes actual y el mes de nacimiento
    const mesActual = hoy.getMonth();
    const mesNacimiento = fecha_nacimiento.getMonth();
  
    // Comprobar si el cumpleaños aún no ha ocurrido este año
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && hoy.getDate() < fecha_nacimiento.getDate())) {
      edad--;
    }
  
    return edad;
  };
  

  const validationSchema = Yup.object({
    nombre_desaparecido: Yup.string().required("Este campo es obligatorio"),
    id_tipo_documento: Yup.number().required("Este campo es obligatorio"),
    documento_desaparecido: Yup.string().required("Este campo es obligatorio"),
    telefono: Yup.string().required("Este campo es obligatorio"),
    fecha_desaparicion: Yup.date().required("Este campo es obligatorio"),
    descripcion_desaparecido: Yup.string().required("Este campo es obligatorio"),
    relacion_desaparecido: Yup.string().required("Este campo es obligatorio"),
    contacto: Yup.string().required("Este campo es obligatorio"),
    fecha_nacimiento: Yup.date().required("Este campo es obligatorio"),
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
      nombre_desaparecido: "",
      id_tipo_documento: "",
      documento_desaparecido: "",
      telefono: "",
      fecha_desaparicion: new Date(),
      descripcion_desaparecido: "",
      relacion_desaparecido: "",
      contacto: "",
      fecha_nacimiento: new Date(),
      // idusuario: 24,
      edad: new Date(),
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
    // console.log("useEffect ejecutado");
    // console.log("TOKENNNNNN");
    // console.log(obtenerToken());
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
          <Text className="text-[24px] text-[#233E58] font-extrabold py-[1vh] mx-[-42.5vw]">
            Crear publicación de{"\n"}Persona Desaparecida
          </Text>
        </View>
        <View className="flex w-[calc(85.380vw)]">
          {/* Input Nombre */}
          <InputSignUp
            separation={0.028}
            label="Nombre"
            text={formik.values.nombre_desaparecido} // Corregido
            placeholder="Ingrese el nombre"
            id_name={"nombre_desaparecido"} // Corregido
            handleChange={formik.handleChange("nombre_desaparecido")} // Corregido
            pressed={pressed.nombre_desaparecido} // Corregido
            handlePressed={() => setPressed({ ...pressed, nombre_desaparecido: true })} // Corregido
            error={formik.errors.nombre_desaparecido} // Corregido
          />
  
          {/* Input Fecha de Nacimiento */}
          <InputFecha
            label={"Fecha de Nacimiento"}
            separation={0.028}
            value={formik.values.fecha_nacimiento}
            placeholder={"Seleccione su fecha de Nacimiento"}
            id_name={"fecha_nacimiento"}
            setFieldValue={formik.setFieldValue}
            fiedName={"fecha_nacimiento"}
            pressed={pressed.fecha_nacimiento}
            handlePressed={() => setPressed({ ...pressed, fecha_nacimiento: true })}
            error={formik.errors.fecha_nacimiento}
            showDateModal={showDateModalNacimiento}
            setShowDateModal={setShowDateModalNacimiento}
            maxDate={new Date()}
          />
  
          {/* Dropdown Tipo de documento */}
          <DropdownComponent
            separation={0.028}
            label="Tipo de documento"
            placeholder="Seleccione el tipo de documento"
            id_name={"id_tipo_documento"} // Corregido
            data={data}
            handleChange={formik.handleChange("id_tipo_documento")} // Corregido
            value={parseInt(formik.values.id_tipo_documento)} // Corregido
            pressed={pressed.id_tipo_documento} // Corregido
            handlePressed={() => setPressed({ ...pressed, id_tipo_documento: true })} // Corregido
            error={formik.errors.id_tipo_documento} // Corregido
            valueField={"id"}
            labelField={"nombretipodocumento"} // Corregido
          />
  
          {/* Input Documento */}
          <InputSignUp
            separation={0.028}
            label="Documento"
            text={formik.values.documento_desaparecido} // Corregido
            placeholder="Documento"
            id_name={"documento_desaparecido"} // Corregido
            handleChange={formik.handleChange("documento_desaparecido")} // Corregido
            pressed={pressed.documento_desaparecido} // Corregido
            handlePressed={() => setPressed({ ...pressed, documento_desaparecido: true })} // Corregido
            error={formik.errors.documento_desaparecido} // Corregido
          />
  
          {/* Input Teléfono */}
          <InputSignUp
            separation={0.028}
            label="Teléfono contacto"
            text={formik.values.telefono} // Corregido
            placeholder="809-000-0000"
            id_name={"telefono"} // Corregido
            handleChange={formik.handleChange("telefono")} // Corregido
            pressed={pressed.telefono} // Corregido
            handlePressed={() => setPressed({ ...pressed, telefono: true })} // Corregido
            error={formik.errors.telefono} // Corregido
          />
  
          {/* Input Fecha de desaparición */}
          <InputFecha
            label={"Fecha de desaparición"}
            separation={0.028}
            value={formik.values.fecha_desaparicion} // Corregido
            placeholder={"Seleccione la fecha de desaparición"}
            id_name={"fecha_desaparicion"} // Corregido
            setFieldValue={formik.setFieldValue}
            fiedName={"fecha_desaparicion"} // Corregido
            pressed={pressed.fecha_desaparicion} // Corregido
            handlePressed={() => setPressed({ ...pressed, fecha_desaparicion: true })} // Corregido
            error={formik.errors.fecha_desaparicion} // Corregido
            showDateModal={showDateModalDesaparicion}
            setShowDateModal={setShowDateModalDesaparicion}
          />
  
          {/* Subir imagen */}
          <ImagePickerComponent
            separation={0.028}
            buttonTitle="Subir foto"
            label="Foto del desaparecido"
            onImagePicked={(image) => setImageData(image)}
            containerStyle={{ marginVertical: 24 }}
            imageStyle={{ width: 200, height: 200 }}
          />
  
          {/* Subir documento */}
          <DocumentPickerComponent
            separation={0.028}
            label="Reporte de la policia"
            onDocumentPicked={(document) => setDocumentData(document)}
          />
  
          {/* Input Ubicación con MapInput */}
          <MapInput
            separation={0.028}
            onLocationSelect={(location) => {
              formik.setFieldValue("ubicacion_latitud", location.latitude);
              formik.setFieldValue("ubicacion_longitud", location.longitude);
            }}
          />
          {pressed.ubicacion && formik.errors.ubicacion && (
            <Text style={{ color: "red" }}>{formik.errors.ubicacion}</Text>
          )}
  
          {/* Input Relación con el desaparecido */}
          <InputSignUp
            separation={0.028}
            label="Relación con el desaparecido"
            text={formik.values.relacion_desaparecido} // Corregido
            placeholder="ej. Madre, Padre, Hermano"
            id_name={"relacion_desaparecido"} // Corregido
            handleChange={formik.handleChange("relacion_desaparecido")} // Corregido
            pressed={pressed.relacion_desaparecido} // Corregido
            handlePressed={() =>
              setPressed({ ...pressed, relacion_desaparecido: true })
            }
            error={formik.errors.relacion_desaparecido} // Corregido
          />
  
          {/* Input Contacto */}
          <InputSignUp
            separation={0.028}
            label="Contacto"
            text={formik.values.contacto} // Corregido
            placeholder="Otra información de contacto"
            id_name={"contacto"} // Corregido
            handleChange={formik.handleChange("contacto")} // Corregido
            pressed={pressed.contacto} // Corregido
            handlePressed={() => setPressed({ ...pressed, contacto: true })} // Corregido
            error={formik.errors.contacto} // Corregido
          />
  
          {/* Input Descripción del desaparecido */}
          <InputSignUp
            separation={0.028}
            label="Descripción del desaparecido"
            text={formik.values.descripcion_desaparecido} // Corregido
            placeholder="ej. Estatura, color de piel, color de ojos"
            id_name={"descripcion_desaparecido"} // Corregido
            handleChange={formik.handleChange("descripcion_desaparecido")} // Corregido
            pressed={pressed.descripcion_desaparecido} // Corregido
            handlePressed={() =>
              setPressed({ ...pressed, descripcion_desaparecido: true })
            }
            error={formik.errors.descripcion_desaparecido} // Corregido
          />
  
          {/* Botón para enviar */}
          <View className="flex flex-col w-full">
            <BotonEnvioFormularios
              esValido={formik.isValid}
              sendingData={loading}
              label="Crear publicación"
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
