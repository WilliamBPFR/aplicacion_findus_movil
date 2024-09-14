import { Text, View, Image, Dimensions, StatusBar, ScrollView, view} from "react-native";
import TopBar from "../../../components/topbar";
import CardPublicacionesGrande from "../../../components/card_publicacion_grande_home";
import SliderPublicacionesRecientes from "../../../components/slider_arriba_publicaciones_recientes";
import { Divider } from "react-native-paper";


const { width, height } = Dimensions.get("window");

export default function Page() {

  return (
    <View className="flex-1 bg-[#F3F7FD]">
      <StatusBar hidden={false} backgroundColor={"#C6DAEB"} barStyle={"light-content"} />
      <TopBar/>
      <ScrollView className="flex-col ]" contentContainerStyle={{alignItems: "center", justifyContent: "center"}}>
          {/*Componente Slider de Arriba*/}
          <SliderPublicacionesRecientes/>

          <Divider className="w-[100vh] mx-[5vw] bg-[#C6DAEB] h-[2px] mb-[2vh]"/>

          <CardPublicacionesGrande/>

          <Divider className="w-[100vh] mx-[5vw] bg-[#C6DAEB] h-[2px] mb-[2vh]"/>

          <CardPublicacionesGrande/>

          <Divider className="w-[100vh] mx-[5vw] bg-[#C6DAEB] h-[2px] mb-[2vh]"/>

          <CardPublicacionesGrande/>

          <Divider className="w-[100vh] mx-[5vw] bg-[#C6DAEB] h-[2px] mb-[2vh]"/>

          <CardPublicacionesGrande/>

          <Divider className="w-[100vh] mx-[5vw] bg-[#C6DAEB] h-[2px] mb-[2vh]"/>

          <CardPublicacionesGrande/>

          <Divider className="w-[100vh] mx-[5vw] bg-[#C6DAEB] h-[2px] mb-[2vh]"/>

          <CardPublicacionesGrande/>

          <Divider className="w-[100vh] mx-[5vw] bg-[#C6DAEB] h-[2px] mb-[2vh]"/>

          <CardPublicacionesGrande/>

          <Divider className="w-[100vh] mx-[5vw] bg-[#C6DAEB] h-[2px] mb-[2vh]"/>

          <CardPublicacionesGrande/>

          <Divider className="w-[100vh] mx-[5vw] bg-[#C6DAEB] h-[2px] mb-[2vh]"/>

          <CardPublicacionesGrande/>

          <Divider className="w-[100vh] mx-[5vw] bg-[#C6DAEB] h-[2px] mb-[2vh]"/>

          <CardPublicacionesGrande/>
      </ScrollView>
    </View>
  );
}

