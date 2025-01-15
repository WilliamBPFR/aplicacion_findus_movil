import {Text, TouchableOpacity, View,Image, StyleSheet} from "react-native";
import {Icon} from "react-native-paper";
import { Divider } from "react-native-paper";



export default function CardAvistamiento({nombreQuienVio, dondeVio, descripcion, urlfotoAvistamiento, cantItems, numItem, avistamientoverificado=true}) {
    return(
      <View className="flex w-[100%] mt-[3%] ">
            <View className="ml-[1vw]">
                <View className="flex-row justify-between w-[98%] mx-[2%]">
                    <Text className="text-[#254E70] font-bold text-[15px]">{ ((numItem) == 0) ? "Último Avistamiento" : `Avistamiento #${(cantItems - numItem)}`}</Text>
                    <Icon size={20}  color={avistamientoverificado ? "#4ECCAF": "#C1C1C1"} source={"check-circle"} allowFontScaling={true}/>
                </View>
                <View className="flex-row mx-auto mt-[2%] rounded-lg">
                    <Image
                        source={{uri: urlfotoAvistamiento}}
                        className="w-[35%] h-[100%] rounded-lg"
                    />

                    <View className="flex-col max-w-[60%] mx-auto ml-[3%]">
                        <Text className="text-[15px] text-[#254E70] mb-[1.5%]"><Text className="font-bold">Quién lo vió:</Text> {nombreQuienVio}</Text>
                        <Text className="text-[15px] text-[#254E70] mb-[1.5%]"><Text className="font-bold">Dónde lo vió:</Text> {dondeVio}</Text>
                        <Text className="text-[15px] text-[#254E70] mb-[1.5%]"><Text className="font-bold">Descripción:</Text> {descripcion}</Text>
                    </View> 
                </View>
            </View>
            <Divider className="w-[98%] h-[2px] bg-[#254E70] rounded-3xl mx-[2%] mt-[4%]"/>
      </View>
    )
}
