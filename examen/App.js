import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { InicioScreen } from './screens/InicioScreen';
import { TareasScreen } from './screens/TareasScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Inicio"
          component={InicioScreen}
          options={{ title: 'Tareas' }}
        />
        <Stack.Screen
          name="Tareas"
          component={TareasScreen}
          options={{ title: 'Nueva tarea' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

