import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { TouchableOpacity, View, Image, StyleSheet, FlatList, Text } from "react-native";
import { useState, useCallback } from 'react';
import { Chip } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect } from "@react-navigation/native";
import TopBar from "../../../components/topbar.jsx";
import { publicacionesByUser, cerrarPublicacion } from "../../../services/publicacionServices.js";
import { obtenerToken } from "../../../services/userServices.js";
import { formatDistanceToNow, set } from 'date-fns';
import { es, id } from 'date-fns/locale';
import { Modal } from 'react-native-paper';  // Usamos el modal de react-native-paper
import { ActivityIndicator } from 'react-native'; // Importamos el ActivityIndicator
import LottieView from 'lottie-react-native'; // Importamos Lottie
import DropdownComponent from "../../../components/dropdown.jsx";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [desaparecidos, setDesaparecidos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal
  const [modalMessage, setModalMessage] = useState(""); // Mensaje para el modal
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false); // Modal de confirmación
  const [publicacionIdToClose, setPublicacionIdToClose] = useState(null); // ID de la publicación a cerrar
  const [estadoCierre, setEstadoCierre] = useState(null); // Estado de cierre de la publicación
  const [pressedEstadoCierre, setPressedEstadoCierre] = useState(false); // Estado de cierre de la publicación
  const [modalEstadoCierre, setModalEstadoCierre] = useState(false); // Estado de cierre de la publicación
  const [sendingEstado, setSendingEstado] = useState(false); // Estado de cierre de la publicación
  const handleSeleccionEstadoCierre = () => {
    console.log("Estado de cierre seleccionado: ", estadoCierre);
    if (estadoCierre === null) return;
    setModalEstadoCierre(false); // Cierra el modal de selección de estado de cierre
    setModalConfirmVisible(true); // Muestra el modal de confirmación
  }
  useFocusEffect(
    useCallback(() => {
      const obtenerPublicaciones = async () => {
        try {
          const token = obtenerToken();
          console.log("Token: ", token);
          const response = await publicacionesByUser(token);
          console.log("Respuesta del servidor: ", response);
          if (response.status === 200) {
            setDesaparecidos(response.data);
          } else {
            console.log("Error al obtener las publicaciones: ", response);
          }
        } catch (error) {
          console.log("Error al obtener las publicaciones: ", error);
        }
        setLoading(false);
      };
      obtenerPublicaciones();
    }, [])
  );

  // Función para abrir el modal de confirmación
  const handleConfirmClose = (id) => {
    setPublicacionIdToClose(id);
    setModalEstadoCierre(true); // Muestra el modal de confirmación
  };

  // Función para cerrar la publicación
  const handleCerrarPublicacion = async () => {
    if (publicacionIdToClose === null) return;

    try {
      setSendingEstado(true);
      const response = await cerrarPublicacion(publicacionIdToClose, estadoCierre);
      if (response.status === 200) {
        // Actualiza el estado de la publicación a "cerrada" (no elimina la publicación)
        setDesaparecidos(prevState =>
          prevState.map(item =>
            item.id === publicacionIdToClose
              ? { ...item, estado: { id: estadoCierre == 1 ? 4 : 5, nombreestado: estadoCierre == 1 ? "Cerrado - Resuelto": "Cerrado - No Resuelto" } } // Estado "cerrada"
              : item
          )
        );
        setModalMessage("Publicación cerrada correctamente");
        setModalVisible(true);
      } else {
        setModalMessage("Error al cerrar la publicación");
        setModalVisible(true);
      }
    } catch (error) {
      setModalMessage("Error al cerrar la publicación");
      setModalVisible(true);
    } finally {
      setSendingEstado(false);
    }

    // Cierra el modal de confirmación
    setModalConfirmVisible(false);
  };

  // Función para cancelar el cierre de la publicación
  const handleCancelarCerrar = () => {
    setModalConfirmVisible(false); // Cierra el modal de confirmación sin hacer nada
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.fotospublicacion[0]?.urlarchivo }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.nombredesaparecido}</Text>
        <Text>{formatDistanceToNow(new Date(item.fechadesaparicion), { addSuffix: true, locale: es })}</Text>
        <Chip
          style={[
            styles.chip,
            item.estado.id === 1 ? styles.chipActive :
            (item.estado.id === 2 || item.estado.id === 4 || item.estado.id === 5) ? styles.chipClosed :
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
      {item.estado.id === 1 && ( // Si la publicación está activa}
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push({
            pathname: "../../crearForm",
            params: { modo: "editar", registro: JSON.stringify(item) },
          })}
        >
          <AntDesign name="edit" size={24} color="#00886E" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleConfirmClose(item.id)} // Muestra el modal de confirmación
        >
          <AntDesign name="delete" size={24} color="#00886E" />
        </TouchableOpacity>
      </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.safeArea}>
        <StatusBar hidden={false} backgroundColor={"#F3F7FD"} barStyle={"dark-content"} />
        <TopBar/>
        <ActivityIndicator className="mt-[5vh]" animating={true} color={"#1DE9B6"} size={"large"} />
      </View>
    );
  }
  return (
    <View style={styles.safeArea}>
      <StatusBar hidden={false} backgroundColor={"#F3F7FD"} barStyle={"dark-content"} />
      <TopBar/>

      {/* FlatList para renderizar la lista */}
      {desaparecidos.length > 0 ? (
      <FlatList
        data={desaparecidos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
      />
      ) : (
        <Text
          className="text-center text-[#69cfbd] text-2xl font-bold mt-[5vh]"
        >
          No hay publicaciones
        </Text>
      )}

      {/* FAB - Botón flotante */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("../../crearForm")}
      >
        <AntDesign name="plus" size={32} color="#F3F7FD" style={styles.fabIcon} />
      </TouchableOpacity>

      <Modal
        visible={modalEstadoCierre}
        onDismiss={() => setModalEstadoCierre(false)}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <LottieView
            source={require('../../../assets/closed.json')}  // Ajusta la ruta a tu archivo Lottie
            className="w-[150px] h-[150px]"
            autoPlay
            loop={true}
                // style={styles.lottie}
          />
          <Text style={styles.modalText}>¿Con qué estado quiere cerrar la publicación?</Text>
          <View className="flex w-[60vw] ">
            <DropdownComponent
                separation={0.028}
                label={"Estado de Cierre"}
                placeholder={"Seleccione el estado de cierre"}
                id_name={"estadocierre"}
                data={[{nombre: "Caso Resuelto", id:1}, {nombre:"Caso No Resuelto", id:2}]}
                handleChange={setEstadoCierre}
                value={parseInt(estadoCierre)}
                pressed={pressedEstadoCierre}
                handlePressed={()=> setPressedEstadoCierre(true)}
                valueField={"id"}
                labelField={"nombre"}
            />
            {(estadoCierre === null && pressedEstadoCierre) && <Text style={{color: "red"}} className="mb-[1vh]">Seleccione un estado de cierre</Text>}
          </View>

           <TouchableOpacity
              onPress={handleSeleccionEstadoCierre}
              className=" w-[90%] h-[10%] rounded-md justify-center mb-[calc(1vh)]"
              disabled={estadoCierre === null}
              style={{backgroundColor: estadoCierre === null ? "#C6DAEB" : "#3E86B9"}}
            >
            <Text style={styles.modalButtonText} >Aceptar</Text>
          </TouchableOpacity>
          {/*<TouchableOpacity onPress={handleCancelarCerrar} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Cancelar</Text>
          </TouchableOpacity> */}
        </View>
      </Modal>

      {/* Modal de confirmación */}
      <Modal
        visible={modalConfirmVisible}
        onDismiss={handleCancelarCerrar} // Al hacer clic fuera del modal, se cancela
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          {/* Animación Lottie */}
          <LottieView
            source={require('../../../assets/publicacionAdentro/warning.json')}  // Ajusta la ruta a tu archivo Lottie
            autoPlay
            loop
            style={styles.lottie}
          />
          <Text style={styles.modalText}>¿Está seguro que desea cerrar esta publicación con estado <Text className="font-bold">{estadoCierre == 1 ? "Caso Resuelto": "Caso No Resuelto"}</Text>?</Text>
          <TouchableOpacity onPress={handleCerrarPublicacion} className="w-[100%] py-[10px] px-[20px] rounded-md justify-center mb-[calc(1vh)]" style={{backgroundColor: sendingEstado ? "#b0c5ac" : "#00886E"}} disabled={sendingEstado}>
            <Text style={styles.modalButtonText}>Aceptar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelarCerrar} className="w-[100%] py-[10px] px-[20px] rounded-md justify-center mb-[calc(1vh)]" style={{backgroundColor: sendingEstado ? "#b0c5ac" : "#00886E"}} disabled={sendingEstado}>
            <Text style={styles.modalButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal de notificación */}
      <Modal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{modalMessage}</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F7FD',
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
    backgroundColor: '#60BDFF',
    borderColor: '#B0BEC5',
  },
  chipActive: {
    backgroundColor: '#00D0A1',
    borderColor: '#00D0A1',
  },
  chipDisabled: {
    backgroundColor: '#C0C0C0',
    borderColor: '#8B8B8B',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconButton: {
    marginLeft: 10,
    padding: 5,
  },
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
    marginBottom: 5,
  },
  modalContainer: {
    // flex: 1, // Asegúrate de que el modal ocupe toda la pantalla
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400, // Opcional: para que no ocupe más de cierto tamaño
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center', // Asegura que el texto esté centrado
  },
  modalButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#00886E',
    borderRadius: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center', // Centra el texto

  },
  lottie: {
    width: 100,  // Ajusta el tamaño de la animación
    height: 100, // Ajusta el tamaño de la animación
  },
});
