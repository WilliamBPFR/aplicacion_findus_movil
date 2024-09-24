import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';

export default function App() {
  const ctx = require.context("./app"); // Asegúrate de que las rutas estén en la carpeta app
  
  return (
    <ExpoRoot context={ctx} />
  );
}

registerRootComponent(App);