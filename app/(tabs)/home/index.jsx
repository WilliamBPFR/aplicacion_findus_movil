import { Text, View, Image, Dimensions, StatusBar, ScrollView, view} from "react-native";
import TopBar from "../../../components/topbar.jsx";
import CardPublicacionesGrande from "../../../components/card_publicacion_grande_home.jsx";
import SliderPublicacionesRecientes from "../../../components/slider_arriba_publicaciones_recientes.jsx";
import { Divider } from "react-native-paper";
import { obtenerPublicacionesScrollGrande } from "../../../services/publicacionServices.js";
import { useEffect, useState, useCallback } from "react";
import { ActivityIndicator } from 'react-native-paper';


const { width, height } = Dimensions.get("window");


export default function Page() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // Para indicar carga adicional

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // //UseEffect para traer las publicaciones
  // useEffect(() => {
  //   const cargarDatos = async () => {
  //     console.log("Simulando carga...");
  //     await delay(0);
  //     obtenerPublicacionesScrollGrande(page, limit).then((response) => {
  //       if (response.status === 200) {
  //         console.log(response.data);
  //         setPublicaciones(response.data);
  //         setLoading(false);
  //         // setPage(page + 1);
  //       }
  //     });
  // }

  //   cargarDatos();
  // }, []);

  const cargarDatos = useCallback(async (pageNumber = 1) => {
    setLoading(true);
    await delay(500); // Simula una carga

    const response = await obtenerPublicacionesScrollGrande(pageNumber, limit);

    if (response.status === 200) {
      const nuevasPublicaciones = response.data;
      if (nuevasPublicaciones.length > 0) {
        setPublicaciones((prev) => [...prev, ...nuevasPublicaciones]);
        setHasMore(nuevasPublicaciones.length === limit); // Si no hay más publicaciones, setea `hasMore` a false
      } else {
        setHasMore(false);
      }
    }
    setLoading(false);
    setLoadingMore(false);
  }, [limit]);

  useEffect(() => {
    cargarDatos(page);
  }, [page]);

  const handleScroll = ({ nativeEvent }) => {
    const isAtBottom = 
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >= 
      nativeEvent.contentSize.height - 20;

    if (isAtBottom && hasMore && !loadingMore) {
      setLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  };

  if (loading && page === 1) {
    return (
      <View className="flex-1 bg-[#F#F7FD]">
         <StatusBar hidden={false} backgroundColor={"#C6DAEB"} barStyle={"light-content"} />
         <TopBar/>
        <ActivityIndicator className="mt-[5vh]" animating={true} color={"#1DE9B6"} size={"large"} />
      </View>
    );
  }
  return (
    <View className="flex-1 bg-[#F3F7FD]">
      <StatusBar hidden={false} backgroundColor={"#C6DAEB"} barStyle={"light-content"} />
      <TopBar/>
      <ScrollView className="flex-col ]" contentContainerStyle={{alignItems: "center", justifyContent: "center"}} onScroll={handleScroll}>
          {/*Componente Slider de Arriba*/}
          
          <SliderPublicacionesRecientes/>

          <Divider className="w-[100vh] mx-[5vw] bg-[#C6DAEB] h-[2px] mb-[2vh]"/>

          {publicaciones.map((publicacion,index) => (
            <>
              <CardPublicacionesGrande
                key={publicacion.id}
                idPublicacion={publicacion.id}
                nombreUsuario={publicacion.usuario.nombre + " " + publicacion.usuario.apellido}
                fechaCreacion={publicacion.fechacreacion}
                descripcion={publicacion.descripcionpersonadesaparecido}
                fotoPerfil={publicacion.usuario.urlfotoperfil}
                fotoDesaparecido={publicacion.fotospublicacion[0]?.urlarchivo}
                nombreDesaparecido={publicacion.nombredesaparecido}
              />
              {index !== publicaciones.length - 1 &&
                <Divider className="w-[100vh] mx-[5vw] bg-[#C6DAEB] h-[2px] mb-[2vh]"/>
              }
            </>
          ))}

          {loadingMore && <ActivityIndicator className="mb-[2vh]" animating={true} color="#1DE9B6" size="small" />}
          {!hasMore && <Text className="mb-[2vh]">No hay más publicaciones.</Text>}

          {/* <Divider className="w-[100vh] mx-[5vw] bg-[#C6DAEB] h-[2px] mb-[2vh]"/>

          <CardPublicacionesGrande/>

          <Divider className="w-[100vh] mx-[5vw] bg-[#C6DAEB] h-[2px] mb-[2vh]"/>

          <CardPublicacionesGrande/>

          <Divider className="w-[100vh] mx-[5vw] bg-[#C6DAEB] h-[2px] mb-[2vh]"/>

          <CardPublicacionesGrande/>

          <Divider className="w-[100vh] mx-[5vw] bg-[#C6DAEB] h-[2px] mb-[2vh]"/>

          <CardPublicacionesGrande/>

          <Divider className="w-[100vh] mx-[5vw] bg-[#C6DAEB] h-[2px] mb-[2vh]"/>

          <CardPublicacionesGrande/>

          <Divider className="w-[100vh] mx-[5vw] bg-[#C6DAEB] h-[2px] mb-[2vh]"/>

          <CardPublicacionesGrande/>

          <Divider className="w-[100vh] mx-[5vw] bg-[#C6DAEB] h-[2px] mb-[2vh]"/>

          <CardPublicacionesGrande/>

          <Divider className="w-[100vh] mx-[5vw] bg-[#C6DAEB] h-[2px] mb-[2vh]"/>

          <CardPublicacionesGrande/>

          <Divider className="w-[100vh] mx-[5vw] bg-[#C6DAEB] h-[2px] mb-[2vh]"/>

          <CardPublicacionesGrande/>

          <Divider className="w-[100vh] mx-[5vw] bg-[#C6DAEB] h-[2px] mb-[2vh]"/>

          <CardPublicacionesGrande/> */}
      </ScrollView>
    </View>
  );
}

