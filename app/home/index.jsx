import { Text, View, Image, Dimensions, StatusBar} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");
export default function Page() {

  return (
    <SafeAreaView className="flex-1 bg-[#1B434D]">
      <StatusBar hidden={false} backgroundColor={"#1B434D"} barStyle={"light-content"} />
    </SafeAreaView>
  );
}

