import { registerRootComponent } from 'expo';
import { SafeAreaView } from 'react-native';
import { AuthProvider } from './scripts/authentication_logic';
import { ExpoRoot } from 'expo-router';
//SafeAreaView



export default function App() {
  const ctx = require.context("./app"); // Asegúrate de que las rutas estén en la carpeta app  
  return (
      <SafeAreaView>
        <AuthProvider>
          <ExpoRoot context={ctx} />
        </AuthProvider>
      </SafeAreaView>
  );
}

registerRootComponent(App);