import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const InicioScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de tareas</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Tareas')}
      >
        <Text style={styles.buttonText}>Ver tareas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

