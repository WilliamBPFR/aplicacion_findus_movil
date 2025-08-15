import { Text, View, Image, Dimensions, StatusBar} from "react-native";
import { Button, IconButton} from 'react-native-paper';
import { useRouter } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { checkUserState } from "../scripts/authentication_logic";
import { obtenerRecibiendoNotificaciones } from "../services/userServices";
import * as Notifications from 'expo-notifications';
import { TrendingUpDown } from "lucide-react-native";


const { width, height } = Dimensions.get("window");
export default function Page() {
    const router = useRouter();
    const responseListener = useRef(null);

    async function registerForPushNotificationsAsync() {
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          handleRegistrationError('Permission not granted to get push token for push notification!');
          return;
        }
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
          handleRegistrationError('Project ID not found');
        }
        try {
          const pushTokenString = (
            await Notifications.getExpoPushTokenAsync({
              projectId,
            })
          ).data;
          console.log(pushTokenString);
          return pushTokenString;
        } catch (e) {
          handleRegistrationError(`${e}`);
        }
      } else {
        handleRegistrationError('Must use physical device for push notifications');
      }
    }
    
    useEffect(() => {
      registerForPushNotificationsAsync()
      .catch(error => setExpoPushToken(`${error}`));
      console.log("useEffect iniciado");

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  
          const idPublicacion = response?.notification?.request?.content?.data?.idpublicacion;
          console.log('Notificación recibida:', idPublicacion);
          console.log("Notificacion recibida:", response?.notification?.request?.content?.data);
  
          if (idPublicacion) {
              // Redirigir a la ruta correspondiente
              setTimeout(() => {
                router.push(`/publicacionDentroPublicacion/${idPublicacion}`);
            }, 500); // Retardo para asegurarse de que router esté listo
          } else {
              console.log("La notificación no contiene un idPublicacion válido.");
          }
      });
      
      // // Limpieza de listeners al desmontar el componente
      // return () => {
      //     console.log("Limpiando listeners de notificaciones");
      //     Notifications.removeNotificationSubscription(responseListener);
      // };
  }, []);
  
    const [logueado, setLogueado] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      console.log("useEffect");
      const verificar_estado = async () => {
        const logueado = await checkUserState();
        setLogueado(logueado);
        setLoading(false);
      }
      verificar_estado();
    }, []);

    console.log("logueado", logueado);
    console.log("loading", loading);
    

    if(loading) {
      return null
    }

    if (logueado) {
      router.push("/home");
    }

  return (
    // <SafeAreaProvider>
    //   <SafeAreaView style={{ flex: 1, backgroundColor: "#1B434D" }}>
        <View className="flex-1 bg-[#1B434D]">
          <StatusBar hidden={false} backgroundColor={"#1B434D"} barStyle={"light-content"} />
          {/* Circulo screen-52 */}
          <View className="w-[52vw]-52 h-[36vw] overflow-hidden ml-[3vw]">
            <View className="w-[52vw] h-[52vw] rounded-full bg-[#EAF2FF] mt-auto -translate-y-1/2"></View>
          </View>

            {/* Circulo circulo_arriba_izquierdo */}
          <View className="absolute w-[41vw] h-[36vw] overflow-hidden ml-[57vw]">
            <View className="w-[41vw] h-[41vw] rounded-full bg-[#C4F0DF] mt-auto -translate-y-1/2"></View>
          </View>

            {/* Circulo circulo_central */}
          <View className="absolute ml-[calc(8.4vw)] w-[84vw] h-[82vw] mt-[39vw]">
            <View className="w-[84vw] h-[82vw] rounded-full bg-[#EAFFF7]"></View>
          </View>

          {/* Lineas de Atras*/}
          <View className="absolute w-[135vw] h-[51vh] overflow-hidden mt-[15vh]">
            <Image source={require("../assets/home/lineas_fondo.png")} className="-ml-[15vw] rotate-[-17.41] w-[135vw] h-[51vh]"></Image>
          </View>

          {/* Imagen Mano Derecha */}
          <View className="absolute w-[89vw] h-[70vw] mt-[3vw] ml-[28vw]">
            <Image source={require("../assets/home/mano_derecha.png")} className="-ml-[6vw] rotate-[22.56] w-[97vw] h-[125vw]"></Image>
          </View>

          {/* Imagen Mano Izquierda */}
          <View className="absolute w-[78vw] h-[82vw]  mt-[61vw]">
            <Image source={require("../assets/home/mano_izquierda.png")} className="-ml-[17vw] rotate-[22.56] w-[97vw] h-[103vw]"></Image>
          </View>

            {/* Cuadrado Arriba */}
          <View className="absolute w-[7vw] h-[7vw] ml-[65vw] mt-[18vw]">
            <View className="w-[7vw] h-[7vw] rotate-[50deg] bg-[#60BDFF]"></View>
          </View>

            {/* Cuadrado Abajo */}
          <View className="absolute w-[7vw] h-[7vw] ml-[10vw] mt-[39vw]">
            <View className="w-[7vw] h-[7vw] rotate-[50deg] bg-[#4ECCAF]"></View>
          </View>


          {/*Texto*/}
          <View className="absolute mt-[112vw] w-full px-auto">
            <Text style={{fontSize: width*0.08}} className="text-[#F2F2F2] text-center mt-[21vw]">Encuentra y Ayuda</Text>
            <Text style={{fontSize: width*0.045}} className="text-[#F2F2F2] text-center mt-[2vw] px-[3vw]">Tu colaboración puede salvar vidas y reunir a familias. Únete a nuestra misión.</Text>
          </View>

          <View className="flex-co mx-auto">
            <Button
              labelStyle={{height:"100%", marginTop: 48,alignContent:"center", fontSize: 20}}
              className="bg-[#3E86B9] flex mx-auto w-[82vw] h-[14vw] rounded-md mt-[125vw] justify-center align-middle"
              contentStyle={{height:"100%", flexDirection:"row-reverse", display:"flex"}}
              mode="contained"
              onPress={() => router.push('../sign_up')}
            >
              <Text>
                Empezar
              </Text>
            </Button>
            <Button
              labelStyle={{height:"100%", marginTop: 48,alignContent:"center", fontSize: 20}}
              className="border-[#3E86B9] border- bg-transparent flex mx-auto w-[82vw] h-[14vw] rounded-md mt-[7vw] justify-center align-middle"
              contentStyle={{height:"100%", flexDirection:"row-reverse", display:"flex", borderColor:"#3E86B9", borderWidth:2, borderRadius:8}}
              mode="contained"
              onPress={() => router.push('../login')}
            >
              <Text>
                Ya soy miembro
              </Text>
            </Button>
          </View>

          {/* <View className="flex mx-auto">
          <Button
              labelStyle={{height:"100%", marginTop: 48,alignContent:"center", fontSize: 20}}
              className="bg-[#3E86B9] flex mx-auto w-[82vw] h-[14vw] rounded-md mt-[130vw] justify-center align-middle"
              contentStyle={{height:"100%", flexDirection:"row-reverse", display:"flex"}}
              mode="contained"
              onPress={() => router.push('../login')}
            >
              <Text>
                Empezar
              </Text>
            </Button>
          </View> */}
        </View>
    //   </SafeAreaView>
    // </SafeAreaProvider>
  );
}