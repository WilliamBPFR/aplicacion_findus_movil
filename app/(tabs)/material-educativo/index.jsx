import { Text, View, Image, Dimensions, StatusBar, ScrollView, view} from "react-native";
import TopBar from "../../../components/topbar.jsx";
import CardMaterialesEducativos from "../../../components/card_materiales_educativos.jsx";

const { width, height } = Dimensions.get("window");

export default function Page() {

  return (
    <View className="flex-1 bg-[#F3F7FD]">
      <StatusBar hidden={false} backgroundColor={"#C6DAEB"} barStyle={"light-content"} />
      <TopBar/>
      <ScrollView className="flex-col" contentContainerStyle={{alignItems: "center", justifyContent: "center"}}>
          <View className="w-full mt-[3vh]">
            <Text className="ml-[7%] text-2xl font-bold text-[#233E58]">
              Material Educativo
            </Text>

            <Text className="ml-[7%] mt-[1vh] text-lg font-bold text-[#233E58]">
              Cosas que puedes aprender hoy
            </Text>
          </View>

          <ScrollView className="flex-col w-[90%] h-[70%] mt-[3%] rounded-lg">

          <CardMaterialesEducativos/>
          <CardMaterialesEducativos/>
          <CardMaterialesEducativos/>
          <CardMaterialesEducativos/>
          <CardMaterialesEducativos/>
          <CardMaterialesEducativos/>

          </ScrollView>
          
      </ScrollView>
    </View>
  );
}
