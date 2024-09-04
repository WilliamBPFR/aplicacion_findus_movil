import { Text, View, Image, Dimensions, StatusBar} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");
export default function Page() {

  const router = useRouter();  
  return (
    <SafeAreaView className="flex-1 bg-[#1B434D]">
      <StatusBar hidden={false} backgroundColor={"#1B434D"} barStyle={"light-content"} />
    </SafeAreaView>
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
