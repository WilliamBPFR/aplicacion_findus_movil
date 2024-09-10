import React from 'react';
import { ExpoRoot } from 'expo-router';

import { KeyboardProvider } from "react-native-keyboard-controller";


export default function App() {
  return (
    
    <ExpoRoot wrapper={KeyboardProvider}>
      
    </ExpoRoot>
  );


}
