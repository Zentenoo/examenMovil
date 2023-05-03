import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

export function TareasScreen ({ navigation, route }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { setNotes } = route.params;

  const saveNote = () => {
    const note = {
      id: uuidv4(),
      title: title,
      content: content,
      date: new Date().toLocaleString(),
    };

    const notesFromStorage = JSON.parse(localStorage.getItem('notes') || '[]');
    const updatedNotes = [...notesFromStorage, note];
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        onChangeText={setTitle}
        value={title}
      />
      <TextInput
        style={styles.contentInput}
        placeholder="Content"
        multiline={true}
        onChangeText={setContent}
        value={content}
      />
      <Button title="Guardar" onPress={saveNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentInput: {
    fontSize: 18,
    marginBottom: 20,
    flex: 1,
    textAlignVertical: 'top',
  },
});
