import { Slot } from 'expo-router';
import React, { useEffect } from 'react';
import { startLocationUpdates } from '../scripts/location_logic';
import { startNotifications } from '../scripts/notifications_logic';
import { SafeAreaView, StatusBar,} from 'react-native';
import * as Notifications from 'expo-notifications';
import { useRouter } from "expo-router";
import { checkUserState } from "../scripts/authentication_logic";
import { useState } from 'react';
import { guardarRecibiendoNotificaciones, obtenerFotoPerfil } from '../services/userServices';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native';


export default function Layout() {
  const router = useRouter();
  const [notificaciones, setNotificaciones] = useState(false);
  useEffect(() => {
    (async () => {
        try {
          await startLocationUpdates();
          console.log('Actualizaciones de ubicación iniciadas');
          const derechoNotificaciones = await startNotifications();

          if (!derechoNotificaciones) {
            return
          }
          console.log('Permisos de notificaciones concedidos');

        } catch (error) {
            console.error('Error al iniciar la actualización de ubicación:', error);
        }
        // }
    })();


  }, []);





  // setInterval(() => {
  //   const appState = AppState.currentState;
  //   console.log('Estado de la app:', appState);
  //   const isAppActive = appState === 'active'; // Verifica si está en foreground
    
  //   // if (isAppActive) {
  //     console.log('La app está activa:', isAppActive);
  // }
  // , 5000);  

  // if (notificaciones) {
  //   return(
  //     <View className="flex-1 bg-[#F#F7FD]">
  //     <StatusBar hidden={false} backgroundColor={"#C6DAEB"} barStyle={"light-content"} />
  //    <ActivityIndicator className="mt-[5vh]" animating={true} color={"#1DE9B6"} size={"large"} />
  //  </View>
  //   )
  // }

  return (
    <SafeAreaView style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <Slot />
    </SafeAreaView>

  );
}




// import React, { useEffect, useState } from "react";
// import { Text } from "react-native";
// import { Slot, useRouter, useSegments } from "expo-router";  // Importa los hooks necesarios
// import BaseNavigator from "./BottomNavigator/index";  // Ajusta la ruta al archivo BaseNavigator
// import Paper from "./paper/index";  // Ajusta la ruta al archivo Paper

// const Layout = () => {
//   const [isRegistered, setIsRegistered] = useState(null);  // Cambia el estado inicial a null
//   const segments = useSegments();  // Obtiene los segmentos de la ruta actual
//   const router = useRouter();

//   useEffect(() => {
//     // Simula la verificación del estado de registro del usuario
//     const checkUserRegistration = async () => {
//       try {
//         const userRegistered = await isUserRegistered();  // Función que verifica el estado de registro
//         console.log("Usuario registrado:", userRegistered);
//         setIsRegistered(userRegistered);
//       } catch (error) {
//         console.error("Error verificando el estado de registro del usuario:", error);
//         // Maneja el error de manera apropiada
//       }
//     };

//     checkUserRegistration();
//   }, []);  // Dependencias vacías, solo se ejecuta al montar el componente

//   useEffect(() => {
//     if (isRegistered === false) {
//       // Redirige a la pantalla de bienvenida si el usuario no está registrado
//       console.log("Usuario no registrado, redirigiendo a la pantalla de registro");
//       router.push("/paper");  // Usa `replace` para reemplazar la entrada actual en el historial
//     }
//   }, [isRegistered, router]);  // Solo vuelve a ejecutarse si `isRegistered` cambia

//   if (isRegistered === null) {
//     // Muestra un estado de carga mientras verificamos el estado de registro
//     return <Text>Loading...</Text>  // Puedes mostrar un componente de carga si prefieres
//   }

//   // Define una lógica para verificar si estamos en la pantalla de login o signup
//   const isAuthScreen = segments.includes("login") || segments.includes("signup");

//   return (
//     <>
//       {/* {isAuthScreen || isRegistered === false ? (
//         <Slot />  
//       ) : (
//         <BaseNavigator>
//           <Slot />  
//         </BaseNavigator>
        
//       )} */}
//       <Slot />
      
//     </>
//   );
// };

// export default Layout;

// // Esta es una función simulada para verificar el registro del usuario
// const isUserRegistered = async () => {
//   // Simulación de verificación (deberías implementar tu lógica aquí)
//   // Ejemplo: obtener el estado desde almacenamiento local o una llamada a API
//   return true;  // Cambia esto según tu lógica real
// };

