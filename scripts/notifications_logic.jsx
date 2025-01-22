import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Alert, SafeAreaView, StatusBar, AppState, } from 'react-native';

export const startNotifications = async () => {
    let {status} = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert(
            'Permiso necesario',
            'Has denegado el permiso de notificaciones. Actívalo desde la configuración del dispositivo.',
            [
              { text: 'OK' },
            ]
          );
          return False
    }
    
    return true
}

export const obtenerTokenNotificaciones = async () => {
    let {status} = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert(
            'Permiso necesario',
            'Has denegado el permiso de notificaciones. Actívalo desde la configuración del dispositivo.',
            [
                { text: 'OK' },
            ]
        );
        return null
    }

    if(Device.isDevice){
        const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
          console.log('Project ID not found');
          Alert.alert(
            'Error',
            'Error al obtener permisos de la notificaciones',
            [
              { text: 'OK' },
            ]
          );
          return
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
    }else {
        console.log('Debe usar un dispositivo físico para las notificaciones push');
        Alert.alert(
          'Error',
          'Para usar el servicio de notificaciones, debe usar un dispositivo físico',
          [
            { text: 'OK' },
          ]
        );
        return null
    }
}
