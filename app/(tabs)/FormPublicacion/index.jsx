import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { TouchableOpacity, View, Image, StyleSheet, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from 'react';
import { Chip } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TopBar from "../../../components/topbar";


export default function Page() {
  const router = useRouter(); // Usar router para la navegación
  const [desaparecidos, setDesaparecidos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = [
        {
          id: '1',
          nombre: 'Juan Pérez',
          fecha: '2024-09-01',
          estado: 'Activo',
          imagen: 'https://via.placeholder.com/100',
        },
        {
          id: '2',
          nombre: 'Ana Gómez',
          fecha: '2024-08-25',
          estado: 'Cerrado',
          imagen: 'https://via.placeholder.com/100',
        },
        {
          id: '3',
          nombre: 'Pedro Rodríguez',
          fecha: '2024-08-15',
          estado: 'Inactivo',
          imagen: 'https://via.placeholder.com/100',
        },
        {
          id: '4',
          nombre: 'María López',
          fecha: '2024-08-10',
          estado: 'Activo',
          imagen: 'https://via.placeholder.com/100',
        },
        {
          id: '5',
          nombre: 'José Martínez',
          fecha: '2024-08-05',
          estado: 'Activo',
          imagen: 'https://via.placeholder.com/100',
        },
        // {
        //   id: '6',
        //   nombre: 'Laura Hernández',
        //   fecha: '2024-08-01',
        //   estado: 'Cerrado',
        //   imagen: 'https://via.placeholder.com/100',
        // },
        // {
        //   id: '7',
        //   nombre: 'Carlos Sánchez',
        //   fecha: '2024-07-25',
        //   estado: 'Activo',
        //   imagen: 'https://via.placeholder.com/100',
        // },
        // {
        //   id: '8',
        //   nombre: 'Sofía Pérez',
        //   fecha: '2024-07-15',
        //   estado: 'Inactivo',
        //   imagen: 'https://via.placeholder.com/100',
        // },
        // {
        //   id: '9',
        //   nombre: 'Javier Gómez',
        //   fecha: '2024-07-10',
        //   estado: 'Activo',
        //   imagen: 'https://via.placeholder.com/100',
        // },
        // {
        //   id: '10',
        //   nombre: 'Diana Rodríguez',
        //   fecha: '2024-07-05',
        //   estado: 'Activo',
        //   imagen: 'https://via.placeholder.com/100',
        // },
      ];
      setDesaparecidos(data);
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagen }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.nombre}</Text>
        <Text>{item.fecha}</Text>
        <Chip
        style={[
          styles.chip,
          item.estado === 'Activo' ? styles.chipActive :
          item.estado === 'Cerrado' ? styles.chipClosed :
          styles.chipDisabled
        ]}
        textStyle={styles.chipText}
      >
        {item.estado}
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