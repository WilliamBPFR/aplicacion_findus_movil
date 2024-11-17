import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { TouchableOpacity, View, Image, StyleSheet, FlatList, Text } from "react-native";
import { useState, useCallback } from 'react';
import { Chip } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect } from "@react-navigation/native";
import TopBar from "../../../components/topbar.jsx";
import { publicacionesByUser } from "../../../services/publicacionServices.js";
import { obtenerToken } from "../../../services/userServices.js";
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';


export default function Page() {
  const router = useRouter(); 
  const [desaparecidos, setDesaparecidos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const obtenerPublicaciones = async () => {
        try {
          const token = obtenerToken();
          console.log("Token: ", token);
          const response = await publicacionesByUser(token);
          console.log("Respuesta del servidor: ", response);
          if (response.status === 200) {
            console.log("Publicaciones: ", response.data);
            console.log("Fotos publicaciones: ", response.data[0].fotospublicacion.urlarchivo);
            setDesaparecidos(response.data);
          } else {
            console.log("Error al obtener las publicaciones: ", response);
          }
        } catch (error) {
          console.log("Error al obtener las publicaciones: ", error);
        }
      };
      
      obtenerPublicaciones();
    }, [])
  );


  const renderItem = ({ item }) => (

    // Estructura de cada tarjeta
    <View style={styles.card}>
      <Image source={{ uri: item.fotospublicacion[0]?.urlarchivo }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.nombredesaparecido}</Text>
        <Text>{formatDistanceToNow(new Date(item.fechadesaparicion), { addSuffix: true, locale: es })}</Text>
        <Chip
        style={[
          styles.chip,
          item.estado.id === 1 ? styles.chipActive :
          item.estado.id === 2 ? styles.chipClosed :
          styles.chipDisabled
        ]}
        textStyle={styles.chipText}
      >
        {item.estado.nombreestado}
      </Chip>
      <Chip
          style={[styles.chip, item.verificado ? styles.chipActive : styles.chipDisabled]}
          textStyle={styles.chipText}
        >
          {item.verificado ? "Verificado" : "No verificado"}
        </Chip>
      </View>
    </View>
  );

  return (
    
    <View style={styles.safeArea}>
      <StatusBar
        hidden={false}
        backgroundColor={"#F3F7FD"}
        barStyle={"dark-content"}
      />
      <TopBar/>
      {/* FlatList para renderizar la lista */}
      <FlatList
        data={desaparecidos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
      />

      {/* FAB - Botón flotante */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push("../../crearForm")} // Redirige a la pantalla de crearForm
      >
        <AntDesign name="plus" size={32} color="#F3F7FD" style={styles.fabIcon} />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F7FD',
  },
  backButtonContainer: {
    marginHorizontal: '4.5vw',
    marginVertical: '1vh',
  },
  backButton: {
    width: '10vw',
    height: '4.5vh',
  },
  flatListContent: {
    paddingBottom: '1.5vh',
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chip: {
    marginTop: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    height: 30,
    justifyContent: 'center',
    minWidth: 80,
  },
  chipText: {
    fontSize: 14,
    textAlign: 'center',
    includeFontPadding: false,
  },
  chipClosed: {
    backgroundColor: '#60BDFF', // Gris claro
    borderColor: '#B0BEC5', // Gris oscuro
  },
  chipActive: {
    backgroundColor: '#00D0A1', // Verde esmeralda
    borderColor: '#00D0A1', // Color similar al fondo
  },
  chipDisabled: {
    backgroundColor: '#C0C0C0', // Gris
    borderColor: '#8B8B8B', // Gris más oscuro
  },
  chipText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#FFFFFF', // Texto blanco por defecto, puedes ajustar según el fondo
  },
  // Estilos del FAB
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#00886E',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  fabIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    fontSize: 40,
    color: 'white',
    alignSelf: 'center',
    
  },
});