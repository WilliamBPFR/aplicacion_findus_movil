import { StyleSheet, Text, View } from "react-native";
import { Link } from 'expo-router';


// Crea la configuración de Tamagui


export default function Page() {
  return (
      <View style={styles.container}>
        <View style={styles.main}>
          <Text className="text-red-500 text-5xl">Hello World3</Text>
          <Text style={styles.subtitle}>This is the first page of your app.</Text>
        </View>
        <Link href="/login">Login</Link>
        <Link href="/bienvenida">Bienvenida</Link>
        <Link href="/sign_up">Sign Up</Link>
        <Link href="/FormPublicacion">Form Publicacion</Link>
        <Link href="/recuperarContrasena">Recuperar Contraseña</Link>
        <Link href="/home">Pantalla Home</Link>
        <Link href="/BottomNavigator">Barra Abajo</Link>
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
