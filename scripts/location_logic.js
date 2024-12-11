import * as Location from 'expo-location';
import { Alert, AppState } from 'react-native';
import { actualizarUbicacionUsuarioBD, obtenerToken } from '../services/userServices';
let locationWatcher = null;

export const startLocationUpdates = async () => {
  // Solicitar permisos para acceder a la ubicación
  let  status_foreground  = await Location.requestForegroundPermissionsAsync();
  let status_background = await Location.requestBackgroundPermissionsAsync();

  console.log('Permisos de ubicación foreground:', status_foreground.status);
  console.log('Permisos de ubicación background:', status_background.status);
  if (status_foreground.status !== 'granted' || status_background.status !== 'granted') {
    alert('No ha accedido a los permisos de ubicación. Le recomendamos que los active para tener la experiencia completa de a aplicación.');
    return;
  }

  // Verificar si la app está activa o en segundo plano
  const appState = AppState.currentState;
  console.log('Estado de la app:', appState);
  const isAppActive = appState === 'active'; // Verifica si está en foreground
  
  // if (isAppActive) {
    console.log('La app está activa:', isAppActive);

    // Si está activa, actualizamos cada 1 minuto o cada vez que se mueva más de 10 metros
    locationWatcher = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High, // Precisión alta
        // timeInterval: 300000, // Actualiza cada 1 minuto (60000 ms)
        distanceInterval: 250, // Actualiza cuando se mueve más de 250 metros
      },
      (location) => {
        // console.log("Ubicación actualizada:", location.coords.latitude, location.coords.longitude);
        const { latitude, longitude } = location.coords;
        try {
          const data = {
            latitud: latitude,
            longitud: longitude,
          }
          actualizarUbicacionUsuarioBD(data,obtenerToken()).then((response) => {
            if (response.status === 200) {
              console.log("Ubicación actualizada en BD:", latitude, longitude);
            }
            else {
              console.log("Error al actualizar ubicación en BD:", response);
            }
          });
        } catch (error) {
          console.error("Error al actualizar ubicación en BD:", error);
        }
        // Alert.alert(`Ubicación actualizada en ACTIVE: ${latitude}, ${longitude}`);
        // console.log("Ubicación actualizada:", latitude, longitude);
        // sendLocationToBackend(latitude, longitude);
      }
    );
}

export const actuaizar_ubicacion_manual = async () => {
  let status_foreground  = await Location.requestForegroundPermissionsAsync();

  console.log('Permisos de ubicación foreground:', status_foreground.status);
  if (status_foreground.status !== 'granted') {
    alert('No ha accedido a los permisos de ubicación. Le recomendamos que los active para tener la experiencia completa de a aplicación.');
    return false;
  }

  let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});

  const { latitude, longitude } = location.coords;

  try {
    const data = {
      latitud: latitude,
      longitud: longitude,
    }
    actualizarUbicacionUsuarioBD(data,obtenerToken()).then((response) => {
      if (response.status === 200) {
        console.log("Ubicación actualizada en BD:", latitude, longitude);
        return true;
      }
      else {
        console.log("Error al actualizar ubicación en BD:", response.data );
        return false;
      }
    });
  } catch (error) {
    console.error("Error al actualizar ubicación en BD:", error);
    return false;
  }
}


// Detener la actualización cuando ya no se necesite
const stopLocationUpdates = async () => {
  if (locationWatcher) {
    locationWatcher.remove(); // Detenemos la actualización de la ubicación
  }
};
