import {Text, View,Dimensions, StyleSheet } from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import React, { useEffect, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Icon } from 'react-native-paper';

const { width, height } = Dimensions.get("window");

export default function DropdownComponent({separation,label, id_name, placeholder,data,handleChange,value,pressed,error,handlePressed,valueField,labelField}) {
  const [isFocus, setIsFocus] = useState(false);
  const borderColor = (pressed && error) ? "#F26D6F" : "#C6DAEB";
  
    return (
      <View className={`flex flex-col`} style={{marginBottom: height*separation}}>
        <Text className=" mb-[calc(1.4vh)] text-[#233E58] text-[14px] font-medium">
          {label}
        </Text>

        <Dropdown
          className={`w-full  h-[calc(6.5vh)] border-[1px] bg-[#FFFBFE] rounded-[6px] px-[8px]`}
          style={{borderColor: borderColor}}
          placeholderStyle={{fontSize: 14,paddingLeft: 10, color: "#B7CBDB"}}
          selectedTextStyle={{fontSize: 14, paddingLeft: 10}}
          data={data}
          labelField={labelField}
          valueField={valueField}
          placeholder={!isFocus ? placeholder : '...'}
          value={value}
          onFocus={() => {
            setIsFocus(true)
            if(!pressed){
              console.log("pressed")
              handlePressed()
            }
          }}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            console.log("Valueeeeee",item[valueField]);
            handleChange(`${item[valueField]}`);
          }}   
        />
      </View>
    );   
}