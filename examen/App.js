import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ToDoListScreen from './screens/ToDoListScreen';

const Stack = createStackNavigator();

export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={HomeScreen}/>
        <Stack.Screen name="ToDoListScreen" component={ToDoListScreen} options={{ title: 'Lista de tareas' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
