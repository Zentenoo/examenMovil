import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

export function TareasScreen({ navigation, setNotes }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const saveNote = () => {
  const note = {
    id: uuidv4(),
    title: title,
    content: content,
    date: new Date().toLocaleString(),
  };

  const notesFromStorage = JSON.parse(localStorage.getItem('notes') || '[]');
  localStorage.setItem('notes', JSON.stringify([...notesFromStorage, note]));
  navigation.goBack();
};


  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Título de la nota"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={{ fontSize: 18, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Contenido de la nota"
        value={content}
        onChangeText={(text) => setContent(text)}
        style={{ fontSize: 18, height: 200, textAlignVertical: 'top' }}
        multiline
      />
      <Button title="Guardar" onPress={saveNote} />
    </View>
  );
}
