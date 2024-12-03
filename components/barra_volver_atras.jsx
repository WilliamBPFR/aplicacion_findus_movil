import {View,Image, TouchableOpacity} from "react-native";

export default function BarraVolverAtras({accionAtras}) {
    return (
         <View className="flex ">
         {/* Imagen Izquierda */}
         <View className="flex w-[10vw] mx-[2vw] my-[1vh]">
             <TouchableOpacity onPress={accionAtras}>
                 <Image source={require("../assets/sign_up/flecha-izquierda.png")} className="w-[10vw] h-[calc(4.5vh)]"></Image>
             </TouchableOpacity>
         </View>
     </View>
    );
}