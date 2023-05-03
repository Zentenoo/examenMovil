import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList,Button } from 'react-native';

export function InicioScreen ({ navigation, route }){
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      const notesFromStorage = JSON.parse(
        localStorage.getItem('notes') || '[]'
      );
      setNotes(notesFromStorage);
    };

    getNotes();
  }, []);

  useEffect(() => {
    if (route.params?.setNotes) {
      const updatedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
      setNotes(updatedNotes);
      route.params.setNotes(updatedNotes);
    }
  }, [route.params?.setNotes]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>
      <FlatList
        data={notes}
        keyExtractor={(note) => note.id}
        renderItem={({ item }) => (
          <View style={styles.note}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteContent}>{item.content}</Text>
            <Text style={styles.noteDate}>{item.date}</Text>
          </View>
        )}
      />
      <Button title="Agregar nota" onPress={() => navigation.navigate('Tareas', { setNotes })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  note: {
    marginBottom: 20,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteContent: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  noteDate: {
    fontSize: 14,
    color: '#666',
  },
});




