import { Text, View, Image, TouchableOpacity, Modal, StatusBar, ActivityIndicator, StyleSheet } from "react-native";
import { Link, useRouter } from 'expo-router';
import { useState } from "react";
import InputSignUp from "../../components/input_sign_up";
import { useFormik } from "formik";
import { login, guardarToken } from "../../services/userServices";
import LottieView from 'lottie-react-native'; // Para animaciones
import { Portal, PaperProvider } from 'react-native-paper'; // Para modal de tipo portal

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Estado para mostrar modal de carga
  const [modalVisible, setModalVisible] = useState(false); // Estado para modal de éxito/error
  const [modalMessage, setModalMessage] = useState(''); // Mensaje de éxito/error
  const [apiRessponse, setApiResponse] = useState(null); // Para guardar la respuesta

  const formik = useFormik({
    initialValues: {
      email: "",
      contrasena: "",
    },
    onSubmit: async (values) => {
      console.log("Enviando datos: ", values);
      setLoading(true); // Mostrar modal de carga
      try {
        const response = await login(values);
        console.log("Respuesta del servidor: ", response.data);
        setApiResponse(response); // Guardamos la respuesta para manejar el estado

        if (response.status === 200 && response.data.autenticado) {  
          console.log("Autenticado correctamente: ", response.data);
          console.log("Token: ", response.data.token);

          // Guardar el token
          const tokenGuardado = await guardarToken(response.data.token);
          setLoading(false); // Ocultar modal de carga

          if (tokenGuardado) {
            setModalMessage("Inicio de sesión exitoso");
            setModalVisible(true); // Mostrar modal de éxito
            setTimeout(() => {
              setModalVisible(false);
              router.push("../home");  // Navegar a home después de 2 segundos
            }, 2000);
          } else {
            setModalMessage("Error al guardar el token");
            setModalVisible(true);
          }
        } else {
          setLoading(false); // Ocultar modal de carga
          setModalMessage("Login fallido: " + response.data.message);
          setModalVisible(true); // Mostrar modal de error
        }
      } catch (error) {
        setLoading(false); // Ocultar modal de carga
        setModalMessage("Ocurrió un error: " + error.message);
        setModalVisible(true); // Mostrar modal de error
      }
    },
  });

  const hideModal = () => setModalVisible(false);

  return (
    <PaperProvider>
      <View className="flex-1 bg-[#F3F7FD]">
        <StatusBar hidden={false} backgroundColor={"#F3F7FD"} barStyle={"dark-content"} />

        {/* Botón back */}
        <View className="flex mx-[4.5vw] my-[1vh]">
          <TouchableOpacity onPress={() => router.push("../bienvenida")}>
            <Image source={require("../../assets/sign_up/flecha-izquierda.png")} className="w-[10vw] h-[calc(4.5vh)]" />
          </TouchableOpacity>
        </View>

        {/* Título Iniciar sesión */}
        <View className="flex">
          <Text className="text-[24px] text-[#233E58] font-extrabold py-[1vh] mx-[7.2vw]">Inicia sesión</Text>
        </View>

        {/* Formulario */}
        <View className="flex mx-[7.2vw] py-[4vh] max-h-[70vh] mb-[calc(1.5vh)]">
          <View className="flex w-[calc(85.380vw)]">
            <InputSignUp separation={0.028} label={"Correo electrónico"} text={formik.values.email} placeholder={"nombre@dominio.com"} handleChange={formik.handleChange("email")} />
            <InputSignUp separation={0.028} label={"Contraseña"} text={formik.values.contrasena} placeholder={"Ingresa tu contraseña"} handleChange={formik.handleChange("contrasena")} tipo_contrasena={true} />
          </View>
        </View>

        {/* Botón Iniciar sesión */}
        <View className="flex flex-col w-full">
          <TouchableOpacity activeOpacity={0.7} className="bg-[#3E86B9] flex mx-auto w-[85vw] h-[7vh] rounded-md justify-center align-middle" onPress={formik.handleSubmit}>
            <Text className="text-center text-[16px] font-bold text-[#F3F7FD]">Iniciar sesión</Text>
          </TouchableOpacity>

          <View className="flex mx-auto mt-[4vh]">
            <Link href="../recuperarContrasena" className="text-[#3E86B9] font-semibold">¿Olvidaste tu contraseña?</Link>
          </View>
          <View className="flex mx-auto mt-[4vh]">
            <Link href="../sign_up" className="text-[#3E86B9] font-semibold">¿No tienes cuenta? Crea una aquí</Link>
          </View>
        </View>

        {/* Modales */}
        <Portal>
          {/* Modal de loading */}
          <Modal
            visible={loading}
            transparent={true} // Hacer el fondo del modal transparente
            onRequestClose={() => setLoading(false)} // Cerrar modal al presionar fuera
            animationType="fade" // Tipo de animación
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <ActivityIndicator size="large" color="#3E86B9" />
                <Text style={styles.loadingText}>Iniciando sesión...</Text>
              </View>
            </View>
          </Modal>

          {/* Modal de éxito o error */}
          <Modal
            visible={modalVisible}
            transparent={true} // Hacer el fondo del modal transparente
            onRequestClose={hideModal} // Cerrar modal al presionar fuera
            animationType="fade" // Tipo de animación
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
                  {apiRessponse?.status === 200 ? "¡Inicio de sesión exitoso!" : "¡Inicio de sesión fallido!"}
                </Text>
                <Text style={styles.modalMessage}>
                  {apiRessponse?.status === 200 ? `Has iniciado sesión correctamente.` : `Ha ocurrido un error al intentar iniciar sesión.`}
                </Text>
                {apiRessponse?.status !== 200 && (
                  <Text style={styles.modalErrorMessage}>
                    {apiRessponse?.data?.message}
                  </Text>
                )}
                <TouchableOpacity 
                  style={styles.modalButton} 
                  onPress={apiRessponse?.status === 200 ? () => router.push("../home") : hideModal}>
                  <Text style={styles.modalButtonText}>
                    {apiRessponse?.status === 200 ? "Ir a Inicio" : "Cerrar"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </Portal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
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
