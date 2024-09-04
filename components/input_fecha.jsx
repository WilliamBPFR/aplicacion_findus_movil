import {Text, View,Dimensions } from "react-native";
import { TextInput } from "react-native-paper" 
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React,{ useEffect, useState } from "react";
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get("window");

export default function InputFecha({value, label, placeholder, fiedName, separation,id_name,setFieldValue, maxDate,showDateModal, setShowDateModal, pressed, handlePressed, error}) {

    const borderColor = (pressed && error) ? "#F26D6F" : "#C6DAEB";
    const hideDatePicker = () => {
        setShowDateModal(false);
    };

    const handleConfirm = (date) => {
        const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        setFieldValue(fiedName, localDate);
        hideDatePicker();
      };
    return(
        <View className="flex flex-col">
            <Text className=" mb-[calc(1.4vh)] text-[#233E58] text-[14px] font-medium">
                {label}
            </Text>
            
            <TextInput
                name={id_name}
                value={Intl.DateTimeFormat('es-ES').format(value)}
                editable={false}
                onPress={!pressed ? handlePressed : null}
                id={id_name}
                mode="outlined"
                className={"font-medium"}
                placeholder={placeholder}
                placeholderTextColor="#B7CBDB"
                outlineStyle={{borderColor: borderColor, borderWidth: 1, borderRadius: 6}}
                style={{fontSize: 14, borderColor: "transparent", borderWidth: 0, borderRadius: 0, marginBottom: separation*height}}
               right={<TextInput.Icon icon="calendar" forceTextInputFocus={false} onPress={()=> {
                setShowDateModal(true);
                console.log("MOSTRANDO MODAL")
            }}/>}
            />

            <DateTimePickerModal
                isVisible={showDateModal}
                mode="date"
                date={value}
                maximumDate={maxDate}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            >  
            </DateTimePickerModal>
        </View>
    )
}
