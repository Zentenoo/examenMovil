import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { InicioScreen } from './screens/InicioScreen';
import { TareasScreen } from './screens/TareasScreen';
import { CameraScreen } from './screens/CameraScreen';
import { DetallesScreen } from './screens/DetallesScreen';

import { TaskProvider } from './context/TaskContext';

const Stack = createStackNavigator();

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


