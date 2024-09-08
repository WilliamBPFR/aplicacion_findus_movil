import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const { width, height } = Dimensions.get("window");

const MapInput = ({ onLocationSelect, separation, pressed, error }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [region, setRegion] = useState(null); // Guarda la región actual
  const [marker, setMarker] = useState(null); // Guarda la posición del marcador
  const [location, setLocation] = useState("");

  const borderColor = pressed && error ? "#F26D6F" : "#C6DAEB";

  // Solicita permisos y obtiene la ubicación actual del dispositivo
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Se necesita el permiso para acceder a la ubicación.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarker({ latitude, longitude });
    setLocation(`Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`);
  };

  const handleLocationConfirm = () => {
    setModalVisible(false);
    if (onLocationSelect && marker) {
      onLocationSelect(marker);
    }
  };

  return (
    <View
      className={`flex flex-col`}
      style={{ marginBottom: height * separation }}
    >
      <Text className=" mb-[calc(1.4vh)] text-[#233E58] text-[14px] font-medium">
        Ubicación
      </Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.input, { borderColor: borderColor, height: 55 }]}
      >
        {!location && (
          <FontAwesome5
            name="map-marked-alt" // Ícono de marcador
            size={24}
            color="#254E70"
            style={styles.icon} // Estilo del ícono
          />
        )}
        <TextInput
          placeholderTextColor={"#254E70"}
          color={location ? "#254E70" : "#B7CBDB"} // Si tiene valor cambia color del texto
          placeholder="Selecciona una ubicación"
          value={location}
          editable={false} // Añadí estilo para el TextInput
        />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.mapContainer}>
          {region && (
            <MapView
              style={styles.map}
              region={region}
              onPress={handleMapPress}
            >
              {marker && <Marker coordinate={marker} />}
            </MapView>
          )}
          <View style={styles.buttonContainer}>
            <Button
              title="Confirmar ubicación"
              onPress={handleLocationConfirm}
            />
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: "#F3F7FD", // Color de fondo similar a un input
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  icon: {
    marginRight: 10, // Espacio entre el ícono y el texto
  },
  uploadText: {
    fontSize: 16,
    color: "#254E70",
    
  },
});

export default MapInput;
