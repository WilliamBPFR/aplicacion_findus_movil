import { StyleSheet, Text, View } from "react-native";
import { Link } from 'expo-router';
export default function Page() {
  return (
    <View className="flex-1 align-middle p-6">
      <View style={styles.main}>
        <Text className="text-red-500 text-5xl">ESTO ES LOGINNN</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
      </View>
      <Link href="/">HOME</Link>
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
  