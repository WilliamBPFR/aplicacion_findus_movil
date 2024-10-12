import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Icon from "react-native-vector-icons/Feather"; // Asegúrate de instalar react-native-vector-icons
// import * as Permissions from 'expo-permissions';


const { width, height } = Dimensions.get("window");

export default function DocumentPickerComponent({
  onDocumentPicked,
  containerStyle,
  label,
  textStyle,
  iconStyle,
  separation,
  pressed,
  error,
}) {
  const [documentName, setDocumentName] = useState(null);
  const borderColor = pressed && error ? "#F26D6F" : "#C6DAEB";

  const pickDocument = async () => {
    // Solicitar permisos de almacenamiento
    
  
    try {
      const result = await DocumentPicker.getDocumentAsync({});
  
      if (!result.canceled) {
        if (result.assets && result.assets.length > 0) {
          const { uri, mimeType, name } = result.assets[0];
  
          console.log("Document URI:", uri);
          const base64 = await convertToBase64(uri);
          setDocumentName(name);
  
          if (onDocumentPicked) {
            onDocumentPicked({ base64, fileName: name, mimeType });
          }
        } else {
          console.log("No document found in assets");
        }
      } else {
        console.log("Document selection was canceled");
      }
    } catch (error) {
      console.error("Error picking document: ", error);
    }
  };
  

  // Función para convertir el documento a base64
  const convertToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob); // Convertir a base64
    });
  };

  return (
    <View
      style={[{ marginBottom: height * separation }, containerStyle]}
    >
      <Text style={[styles.label, textStyle]}>
        {label}
      </Text>
      <TouchableOpacity
        style={[styles.input, { borderColor: borderColor }]}
        onPress={pickDocument}
      >
        <Icon
          name="download"
          size={30}
          color="#254E70"
          style={[styles.icon, iconStyle]}
        />
        <Text style={styles.uploadText}>Subir documento</Text>
      </TouchableOpacity>
      {documentName && (
        <Text style={[styles.documentName, textStyle]}>{documentName}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    marginBottom: 10,
    color: "#325979",
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: "#F3F7FD", // Color de fondo similar a un input
  },
  icon: {
    marginRight: 10, // Espacio entre el ícono y el texto
  },
  uploadText: {
    fontSize: 14,
    color: "#254E70",
  },
  documentName: {
    marginTop: 10,
    fontSize: 16,
    color: "#254E70",
  },
});
