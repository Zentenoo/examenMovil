import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TaskProvider } from './components/TaskContext';
import { InicioScreen } from './screens/InicioScreen';
import { TareasScreen } from './screens/TareasScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicio">
          <Stack.Screen name="Inicio" component={InicioScreen} />
          <Stack.Screen name="Tareas" component={TareasScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
};

export default App;
