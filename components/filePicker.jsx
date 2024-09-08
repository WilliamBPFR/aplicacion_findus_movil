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

const { width, height } = Dimensions.get("window");

const DocumentPickerComponent = ({
  onDocumentPicked,
  containerStyle,
  label,
  textStyle,
  iconStyle,
  separation,
  pressed,
  error,
}) => {
  const [documentName, setDocumentName] = useState(null);
  const borderColor = pressed && error ? "#F26D6F" : "#C6DAEB";

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      // Permitir cualquier tipo de archivo
      
    });

    if (result.type === "success") {
      const { name, uri } = result; // Asegúrate de obtener el nombre y la URI correctamente
      setDocumentName(name); // Mostrar el nombre del archivo
      if (onDocumentPicked) {
        onDocumentPicked(uri); // Pasar la URI al callback
      }
    } else {
      console.log("Document selection was canceled");
    }
  };

  return (
    <View
      className={`flex flex-col`}
      style={{ marginBottom: height * separation }}
    >
      <Text className=" mb-[calc(1.4vh)] text-[#233E58] text-[14px] font-medium">{label}</Text>
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
};

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

export default DocumentPickerComponent;
