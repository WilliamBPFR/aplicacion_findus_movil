import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { AuthProvider } from './scripts/authentication_logic';
import { ExpoRoot } from 'expo-router';
import { registerRootComponent } from 'expo';

export default function App() {
  const [logueado, setLogueado] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verificar_estado = async () => {
      const logueado = await checkUserState();  // Asegúrate de que checkUserState esté definida
      console.log("logueado", logueado);
      console.log("EN EL COMPONENTE APP.js")
      setLogueado(logueado);
      setLoading(false);
    };

    verificar_estado();
  }, []);

  // // Evita la redirección hasta que el estado esté cargado
  // useEffect(() => {
  //   if (!loading && logueado) {
  //     router.push("/home");
  //   }
  // }, [loading, logueado, router]);

  if (loading) {
    return null;  // O un componente de carga
  }

  if (logueado) {
    router.push("/home");
  }

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
