import React, {useEffect, useState} from "react";
import { ScrollView, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import TopBar from "../../../components/topbar";
import InputSignUp from "../../../components/input_sign_up";
import { Binoculars } from "lucide-react-native";
import { obtenerPublicacionesFiltros, obtenerToken } from "../../../services/userServices";
import CardPublicacionesBusqueda from "../../../components/card_publicacion_busqueda";
import { formatearFecha } from "../../../services/publicacionServices";
import { ActivityIndicator } from 'react-native-paper';



export default function Page () {
  const [text, setText] = useState("");
  const [ page, setPage] = useState(1);
  const [limit, setLimit] = useState(10)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    console.log(text);
    if(text.length > 0){
      setLoading(true);
      obtenerPublicacionesFiltros(page, limit, text,obtenerToken()).then((response) => {
        if (response.status === 200) {
          setData(response.data);
          setLoading(false);
        }
        console.log(response);
      }).catch((error) => {
        console.log(error);
        setLoading(false); 
      });
    }else{
      setData([]);
    }
  }, [text]);

  return (
    <View className="flex-1 bg-[#F3F7FD]">
      <StatusBar hidden={false} backgroundColor={"#C6DAEB"} barStyle={"light-content"} />
      <TopBar/>
      <ScrollView className="flex-col" contentContainerStyle={{alignItems: "center", justifyContent: "center"}}>
          <View className="w-full mt-[3vh]">
            <Text className="ml-[7%] text-2xl font-bold text-[#233E58]">
              Buscar Publicación
            </Text>
          </View>

          <View className="w-[90%]">
            <InputSignUp separation={0.0} placeholder="Busscar por nombre de publicación" handleChange={setText}/>
          </View>  
          <View className="w-[90%]">
            {loading && (
              <View className="flex-row w-full p-4 mt-[15vh] flex content-center justify-center align-middle">
                <ActivityIndicator animating={true} color="#233E58" size="large"/>
              </View>
            )}  
            {(data.length > 0 && text.length > 0 && !loading) ? (
              <View className="flex-col w-full rounded-lg shadow-md  mt-4"> 
                  {data.map((item, index) => (
                    <CardPublicacionesBusqueda 
                      key={index} 
                      nombredesaparecido={item.nombredesaparecido} 
                      fechadesaparecido={formatearFecha(item.fechadesaparicion)} 
                      urlfoto={item.fotospublicacion[0].urlarchivo} 
                      idpublicacion={item.id}
                    />
                  ))}
              </View>
            ) : (!loading) && (
              <View className="flex-row w-full p-4 mt-[15vh] flex content-center justify-center align-middle">
                <View className="flex-col flex content-center justify-center align-middle">
                  <Binoculars size={50} color="#233E58" style={{margin: "auto"}}/>
                  <Text className="text-lg font-bold text-[#233E58]">No hay resultados</Text>
                </View>
              </View>
            ) }
            
          </View>
      </ScrollView>
    </View>
  );
};


