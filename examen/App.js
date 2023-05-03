import React,{ useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {InicioScreen} from './screens/InicioScreen'
import {TareasScreen} from './screens/TareasScreen'
const Stack = createStackNavigator();
window.React = React;


export default function App () {
  const [notes, setNotes] = useState([]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio">
          {(props) => <InicioScreen {...props} notes={notes} />}
        </Stack.Screen>
        <Stack.Screen name="Tareas" component={TareasScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
