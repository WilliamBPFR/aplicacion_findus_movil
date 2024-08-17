import {Text, View,Dimensions} from "react-native";
import { TextInput } from "react-native-paper" 

const { width, height } = Dimensions.get("window");


export default function InputSignUp({text, label, setText, placeholder, separation}) {
    return(
        <View className="flex flex-col">
            <Text className=" mb-[calc(1.4vh)] text-[#233E58] text-lg font-bold">
                {label}
            </Text>
            
            <TextInput
                value={text}
                onChangeText={text => setText(text)}
                mode="outlined"
                className={``}
                placeholder={placeholder}
                outlineStyle={{borderColor: "#C6DAEB", borderWidth: 1, borderRadius: 6}}
                style={{borderColor: "transparent", borderWidth: 0, borderRadius: 0, marginBottom: separation*height}}
            />
        </View>
    )
}