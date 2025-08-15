import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link } from 'expo-router';
import { eliminarToken, obtenerToken } from "../../services/userServices";


// Crea la configuración de Tamagui


export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>

        <Text className="text-red-500 text-5xl">Hello World3</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
      </View>
      <View>
        <Link href="/login">Login</Link>
        <Link href="/">Bienvenida</Link>
        <Link href="/sign_up">Sign Up</Link>
        <Link href="/FormPublicacion">Form Publicacion</Link>
        <Link href="/recuperarContrasena">Recuperar Contraseña</Link>
        <Link href="/home">Pantalla Home</Link>
        <Link href="/publicacionDentroPublicacion/1">Pantalla Dentro de Publicacion</Link>
        <Link href="/material-educativo">Pantalla Material Educativo</Link>
        <Link href="/perfilAdentro">Pantalla Profile Adentro</Link>
        <Link href="/editarPerfil">Pantalla Editar Perfil</Link>
        <Link href="/crearReporteAvistamiento/1?nombredesaparecido=Maria Pardo">Pantalla Reporte de Avistamiento</Link>
        <Link href="/pruebaNotificacionesPush">Pantalla de Prueba de Notificaciones</Link>
        {/* <TouchableOpacity onPress={() => eliminarToken() }><Text>Borrar Token</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {
            const token = obtenerToken()
            console.log(token)
            } }><Text>Obtener Token</Text></TouchableOpacity> */}
      </View>
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
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
