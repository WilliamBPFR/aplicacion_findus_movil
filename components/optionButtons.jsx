import {Text, TouchableOpacity, View, Image} from "react-native";
import {ChevronRight } from "lucide-react-native";

export default function OptionsButtons({label, icon, onPress, rojo=false}) {
    return(
      <TouchableOpacity 
        className="flex flex-row items-center justify-between rounded-lg  border-[calc(2.5px)] w-[90%] h-[8vh] px-[3vw] mb-[2vh]"
        style={{borderColor: rojo ? "#f79191" : "#90CEB7"}}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <View className="flex-row items-center align-middle">

          {icon} 
          <Text className="text-[#254E70] font-semibold text-lg ml-[calc(2.5vw)]">
              {label}
          </Text>
        </View>

        <ChevronRight size={25} color="#254E70" source={"chevron-right"} allowFontScaling={true}/>
      </TouchableOpacity>
    )
}