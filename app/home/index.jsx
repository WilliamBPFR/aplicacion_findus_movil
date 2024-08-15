import { Text, View, Image, Dimensions} from "react-native";

import { Link } from 'expo-router';

const { width, height } = Dimensions.get("window");
export default function Page() {
  return (
    <View className="flex-1 bg-[#1B434D]">
      {/* Circulo screen-52 */}
      <View className="w-screen-52 h-36 overflow-hidden ml-circulo_arriba">
        <View className="w-screen-52 h-screen-52 rounded-full bg-[#EAF2FF] mt-auto -translate-y-1/2"></View>
      </View>

        {/* Circulo circulo_arriba_izquierdo */}
      <View className="absolute w-circulo_arriba_izquierdo h-36 overflow-hidden ml-circulo_arriba_izquierdo">
        <View className="w-circulo_arriba_izquierdo h-circulo_arriba_izquierdo rounded-full bg-[#C4F0DF] mt-auto -translate-y-1/2"></View>
      </View>
    
        {/* Circulo circulo_central */}
      <View className="absolute ml-[7vw] w-circulo_central h-circulo_central mt-[39vw]">
        <View className="w-[87vw] h-[87vw] rounded-full bg-[#EAFFF7]"></View>
      </View>

      {/* Lineas de Atras*/}
      <View className="absolute w-[135vw] h-[51vh] overflow-hidden mt-[15vh]">
        <Image source={require("../../assets/home/lineas_fondo.png")} className="-ml-[15vw] rotate-[-17.41] w-[135vw] h-[51vh]"></Image>
      </View>

      {/* Imagen Mano Drecha */}
      <View className="absolute w-[89vw] h-[70vh] mt-[2vh] ml-[28vw]">
        <Image source={require("../../assets/home/mano_derecha.png")} className="-ml-[6vw] rotate-[22.56] w-[97vw] h-[60vh]"></Image>
      </View>

      {/* Imagen Mano Izquierda */}
      <View className="absolute w-[78vw] h-[92vw]  mt-[53vw]">
        <Image source={require("../../assets/home/mano_izquierda.png")} className="-ml-[15vw] rotate-[22.56] w-[97vw] h-[125vw]"></Image>
      </View>

      {/*Texto*/}
      <View className="absolute mt-[120vw] mx-auto">
        <Text style={{fontSize: width*0.08}} className="text-[#F2F2F2] text-center mt-[21vw]">Encuentra y Ayuda</Text>
        <Text style={{fontSize: width*0.06}} className="text-[#F2F2F2] text-center mt-[2vw]">Tu colaboración puede salvar vidas y reunir a familias. Únete a nuestra misión.</Text>
      </View>
    </View>
  );
} 