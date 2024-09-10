import { Text, View, Image, Dimensions, StatusBar} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../../components/topbar";

const { width, height } = Dimensions.get("window");

export default function Page() {

  return (
    <View className="flex-1 bg-[#F3F7FD]">
      <StatusBar hidden={false} backgroundColor={"#C6DAEB"} barStyle={"light-content"} />
      <TopBar/>
    </View>
  );
}

