import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { InicioScreen } from './screens/InicioScreen';
import { TareasScreen } from './screens/TareasScreen';
import { CameraScreen } from './screens/CameraScreen';
import { DetallesScreen } from './screens/DetallesScreen';
import firebase from 'firebase/app';
import { TaskProvider } from './context/TaskContext';

const Stack = createStackNavigator();

// Inicializar Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDwyxVCGrd7lk-vajEg3BszgXbfwyg7gPM",
  authDomain: "listtareas-d2a75.firebaseapp.com",
  projectId: "listtareas-d2a75",
  storageBucket: "listtareas-d2a75.appspot.com",
  messagingSenderId: "227628769104",
  appId: "1:227628769104:web:933845acaa364ab0d39655"
});

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Inicio" component={InicioScreen} />
          <Stack.Screen name="Tareas" component={TareasScreen} />          
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Detalles" component={DetallesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}
