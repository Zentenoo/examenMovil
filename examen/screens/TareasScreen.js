import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export function TareasScreen() {
  const [noteText, setNoteText] = useState('');
  const navigation = useNavigation();

  const saveNote = () => {
  const newNote = { id: Date.now(), text: noteText };
  setNotes([...notes, newNote]);
  navigation.goBack();
};


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setNoteText}
        value={noteText}
        placeholder="Escribe una nota..."
        multiline={true}
      />
      <Button title="Guardar" onPress={saveNote} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    height: 200,
    fontSize: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
});
