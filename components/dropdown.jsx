import { SelectList } from "react-native-dropdown-select-list";
import {Text, View,Dimensions } from "react-native";
import {FontAwesome} from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function DropdownComponent({setSelectedValue, data, placeholder, separation, pressed, error, label}) {

    const borderColor = (pressed && error) ? "#F26D6F" : "#C6DAEB";

    return (
      <View className="flex flex-col">
        <Text className=" mb-[calc(1.4vh)] text-[#233E58] text-[14px] font-medium">
          {label}
        </Text>
        <SelectList
          setSelected={setSelectedValue}
          data={data}
          arrowicon={
            <FontAwesome name="chevron-down" size={20} color={"#254E70"} />
          }
          
          boxStyles={{
            borderColor: borderColor,
            borderWidth: 1,
            borderRadius: 6,
            height: 55,
            backgroundColor: "white",
            alignItems: "center",
            marginBottom: separation * height,
            
          }}
          dropdownStyles={{
            marginTop: -22,
            borderColor: borderColor,
            borderWidth: 1,
            borderRadius: 6,
            backgroundColor: "white",
            marginBottom: separation * height,
            
          }}
          placeholder={placeholder}
          search={false}
          inputStyles={{
              fontSize: 14,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 0,
              color: "#254E70",
          }}
          dropdownTextStyles={
            {
              fontSize: 14,
              color: "#254E70",
            }
          }
          
        />
      </View>
    );
}