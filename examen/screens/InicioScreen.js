import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

export function InicioScreen({ navigation }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const notesFromStorage = JSON.parse(localStorage.getItem('notes') || '[]');
      setNotes(notesFromStorage);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Lista de notas</Text>
      {notes.length > 0 ? (
        notes.map((note, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{note.title}</Text>
            <Text style={{ fontSize: 16 }}>{note.content}</Text>
          </View>
        ))
      ) : (
        <Text style={{ fontSize: 18 }}>No hay notas guardadas</Text>
      )}
      <Button title="Agregar nota" onPress={() => navigation.navigate('Tareas', { setNotes })} />
    </View>
  );
}
