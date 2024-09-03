import { Text, View, Image, Dimensions, StatusBar} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link } from 'expo-router';
import { Button, IconButton} from 'react-native-paper';


const { width, height } = Dimensions.get("window");
export default function Page() {
  return (
    // <SafeAreaProvider>
    //   <SafeAreaView style={{ flex: 1,backgroundColor: "#1B434D" }}>
        <View className="flex-1 bg-[#1B434D]">
          <StatusBar hidden={false} backgroundColor={"#1B434D"} barStyle={"light-content"} />
          {/* Circulo screen-52 */}
          <View className="w-[52vw]-52 h-[36vw] overflow-hidden ml-[3vw]">
            <View className="w-[52vw] h-[52vw] rounded-full bg-[#EAF2FF] mt-auto -translate-y-1/2"></View>
          </View>

            {/* Circulo circulo_arriba_izquierdo */}
          <View className="absolute w-[41vw] h-[36vw] overflow-hidden ml-[57vw]">
            <View className="w-[41vw] h-[41vw] rounded-full bg-[#C4F0DF] mt-auto -translate-y-1/2"></View>
          </View>

            {/* Circulo circulo_central */}
          <View className="absolute ml-[calc(8.4vw)] w-[84vw] h-[82vw] mt-[39vw]">
            <View className="w-[84vw] h-[82vw] rounded-full bg-[#EAFFF7]"></View>
          </View>

          {/* Lineas de Atras*/}
          <View className="absolute w-[135vw] h-[51vh] overflow-hidden mt-[15vh]">
            <Image source={require("../../assets/home/lineas_fondo.png")} className="-ml-[15vw] rotate-[-17.41] w-[135vw] h-[51vh]"></Image>
          </View>

          {/* Imagen Mano Derecha */}
          <View className="absolute w-[89vw] h-[70vw] mt-[3vw] ml-[28vw]">
            <Image source={require("../../assets/home/mano_derecha.png")} className="-ml-[6vw] rotate-[22.56] w-[97vw] h-[125vw]"></Image>
          </View>

          {/* Imagen Mano Izquierda */}
          <View className="absolute w-[78vw] h-[82vw]  mt-[61vw]">
            <Image source={require("../../assets/home/mano_izquierda.png")} className="-ml-[17vw] rotate-[22.56] w-[97vw] h-[103vw]"></Image>
          </View>

            {/* Cuadrado Arriba */}
          <View className="absolute w-[7vw] h-[7vw] ml-[65vw] mt-[18vw]">
            <View className="w-[7vw] h-[7vw] rotate-[50deg] bg-[#60BDFF]"></View>
          </View>

            {/* Cuadrado Abajo */}
          <View className="absolute w-[7vw] h-[7vw] ml-[10vw] mt-[39vw]">
            <View className="w-[7vw] h-[7vw] rotate-[50deg] bg-[#4ECCAF]"></View>
          </View>


          {/*Texto*/}
          <View className="absolute mt-[112vw] w-full px-auto">
            <Text style={{fontSize: width*0.08}} className="text-[#F2F2F2] text-center mt-[21vw]">Encuentra y Ayuda</Text>
            <Text style={{fontSize: width*0.045}} className="text-[#F2F2F2] text-center mt-[2vw] px-[3vw]">Tu colaboración puede salvar vidas y reunir a familias. Únete a nuestra misión.</Text>
          </View>

          <View className="flex mx-auto">
          <Button labelStyle={{height:"100%", marginTop: 48,alignContent:"center", fontSize: 20}}  className="bg-[#3E86B9] flex mx-auto w-[82vw] h-[14vw] rounded-md mt-[125vw] justify-center align-middle" contentStyle={{height:"100%", flexDirection:"row-reverse", display:"flex"}} mode="contained"  onPress={() => console.log('Pressed')}><Text>Empezar</Text></Button>
          </View>

          <View className="flex mx-auto">
          </View>
        </View>
    //   </SafeAreaView>
    // </SafeAreaProvider>
  );
}