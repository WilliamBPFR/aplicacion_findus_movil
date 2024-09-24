import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Feather'; // Asegúrate de instalar react-native-vector-icons

const { width, height } = Dimensions.get("window");
export default function ImagePickerComponent ({ 
  onImagePicked, 
  containerStyle,
  label, 
  textStyle, 
  iconStyle,
  pressed,
  error,
  separation, 
}) {
  const [imageName, setImageName] = useState(null);
  const borderColor = (pressed && error) ? "#F26D6F" : "#C6DAEB";

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const name = uri.split('/').pop(); // Obtener el nombre del archivo de la URI
      setImageName(name);
      if (onImagePicked) {
        onImagePicked(uri);
      }
    }
  };

  return (
    <View className={`flex flex-col`} style={{marginBottom: height*separation}}>
      <Text className=" mb-[calc(1.4vh)] text-[#233E58] text-[14px] font-medium">
        {label}
      </Text>
      <TouchableOpacity 
        style={[styles.input, { borderColor: borderColor, height:55 }]} 
        onPress={pickImage}
      >
        <Icon name="download" size={30} color="#254E70" style={[styles.icon, iconStyle]} />
        <Text style={styles.uploadText}>Subir imagen</Text>
      </TouchableOpacity>
      {imageName && <Text style={[styles.imageName, textStyle]}>{imageName}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginBottom: 10,
    color: '#325979',
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#F3F7FD', // Color de fondo similar a un input
    
  },
  icon: {
    marginRight: 10, // Espacio entre el ícono y el texto
  },
  uploadText: {
    fontSize: 14,
    color: '#254E70',
  },
  imageName: {
    marginTop: 10,
    fontSize: 16,
    color: '#254E70',
  },
});

// export default ImagePickerComponent;
