import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import axios from 'axios'; // Usa axios para enviar el token al backend

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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
      alert('Permission not granted for push notifications');
      return;
    }

    const projectId = Constants.expoConfig.extra.eas.projectId ?? Constants.easConfig.projectId;
    const pushToken = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
    console.log("Push Token:", pushToken);
    return pushToken;
  } else {
    alert('Must use physical device for push notifications');
  }
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      if (token) {
        setExpoPushToken(token);

        // Envía el token al backend para registrarlo
        await axios.post('https://tu-backend.com/api/register-token', {
          token: token,
        });
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Your Expo Push Token: {expoPushToken}</Text>
      <Button
        title="Test Notification"
        onPress={async () => {
          await axios.post('https://tu-backend.com/api/send-notification', {
            token: expoPushToken,
          });
        }}
      />
    </View>
  );
}
