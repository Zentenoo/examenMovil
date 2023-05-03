import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export function InicioScreen({ navigation, notes }) {
  return (
    <View style={styles.container}>
      {notes.map((note) => (
        <Text key={note.id} style={styles.note}>
          {note.text}
        </Text>
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Tareas')}
      >
        <Text style={styles.buttonText}>Agregar nota</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  note: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
