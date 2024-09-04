import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";

export default function Page() {

  const router = useRouter();  
  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <View style={styles.main}>
        <Text style={styles.title}>Hello World3</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
      </View>
        <View>
            <Link href="../login">Login</Link>
            <Link href="../home">Home</Link>
            <Link href="../sign_up">Sign Up</Link>
            <Link href="../FormPublicacion">Form Publicacion</Link>
            <Link href="/BottomNavigator">Bottom Navigator</Link>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 24,
    paddingBottom: 110, // Asegura que el contenido no se superponga con la barra de estado

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
