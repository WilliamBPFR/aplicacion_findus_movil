import { Text, View, Image, Dimensions, StatusBar, ScrollView, view} from "react-native";
import TopBar from "../../../components/topbar.jsx";
import CardMaterialesEducativos from "../../../components/card_materiales_educativos.jsx";
import { obtenerRecursosEducativosActivos } from "../../../services/recursosEducativos.js";
import { useEffect,useState,useCallback } from "react";
import { ActivityIndicator } from 'react-native-paper';
import { RefreshControl } from 'react-native';

const { width, height } = Dimensions.get("window");

export default function Page() {
  const [recursosEducativos, setRecursosEducativos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // Para indicar carga adicional
  const [loadingMoreTop, setLoadingMoreTop] = useState(false); // Para indicar carga adicional


  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  // useEffect(() => {
  //   obtenerRecursosEducativosActivos().then((response) => {
  //     console.log(response.data);
  //     setRecursosEducativos(response.data);
  //   })
  // }, [])

  

  const cargarDatos = useCallback(async (pageNumber = 1) => {
    setLoading(true);
    await delay(500); // Simula una carga
    const response = await obtenerRecursosEducativosActivos(pageNumber, limit);

    if (response.status === 200) {
      console.log("LLEGUE DE LA PETICION")
      console.log(response.data);
      const nuevaosRecursos = response.data;
      if (nuevaosRecursos.length > 0) {
        if (pageNumber === 1) {
          setRecursosEducativos(nuevaosRecursos);
        } else {
          setRecursosEducativos((prev) => [...prev, ...nuevaosRecursos]);
        
        }
        setHasMore(nuevaosRecursos.length === limit); // Si no hay más publicaciones, setea `hasMore` a false
      } else {
        setHasMore(false);
      }
    }
    setLoading(false);
    setLoadingMore(false);
    setLoadingMoreTop(false);
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

  useEffect(() => {
    if (loadingMoreTop) {
      setPage(1);
      cargarDatos(1);
    }
  }
  , [loadingMoreTop]);

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
      <ScrollView className="flex-col" contentContainerStyle={{alignItems: "center", justifyContent: "center"}} onScroll={handleScroll}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setLoadingMoreTop(true);
            }}
            colors={["#1DE9B6"]}
            progressBackgroundColor={"#C6DAEB"}
          />
        }
      >
          <View className="w-full mt-[3vh]">
            <Text className="ml-[7%] text-2xl font-bold text-[#233E58]">
              Material Educativo
            </Text>

            <Text className="ml-[7%] mt-[1vh] text-lg font-bold text-[#233E58]">
              Cosas que puedes aprender hoy
            </Text>
          </View>

          <View className="flex-col w-[90%]  mt-[3%] rounded-lg" >
            {recursosEducativos.length > 0 && 
                recursosEducativos.map((recurso) => (
                  <CardMaterialesEducativos
                    key={recurso.id}
                    nombreMaterial={recurso.nombre}
                    urlAMaterial={recurso.urlmaterial}
                    nombreTipoMaterial={recurso.categoriamaterial.nombrecategoriamaterial}
                    idTipoMaterial={recurso.categoriamaterial.id}
                  />
                ))
              }
          {/* <CardMaterialesEducativos idTipoMaterial={1}/>
          <CardMaterialesEducativos idTipoMaterial={2}/>
          <CardMaterialesEducativos idTipoMaterial={4}/>
          <CardMaterialesEducativos idTipoMaterial={1}/>
          <CardMaterialesEducativos idTipoMaterial={2}/>
          <CardMaterialesEducativos idTipoMaterial={3}/> */}
              {loadingMore && <ActivityIndicator className="mb-[2vh]" animating={true} color="#1DE9B6" size="small" />}
              {!hasMore && <Text className="mb-[2vh] font-bold text-center">No hay más recursos.</Text>}
          </View>
          
      </ScrollView>
    </View>
  );
}
