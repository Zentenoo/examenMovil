import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, ScrollView, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Task } from '../models/Task';
import TaskStorage from '../utils/TaskStorage';

export const TareasScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const handleSaveTask = async () => {
    if (!title.trim() || !description.trim() || !date.trim()) {
      alert('Todos los campos son requeridos');
      return;
    }

    const task = new Task(title, description, date, image);
    const taskStorage = new TaskStorage();
    await taskStorage.addTask(task);

    setTitle('');
    setDescription('');
    setDate('');
    setImage(null);

    navigation.goBack();
  };

  const handleSelectImage = () => {
    // Aquí debes implementar la lógica para seleccionar una imagen de la galería
    alert('Funcionalidad aún no implementada');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Descripción"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            multiline={true}
            numberOfLines={4}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Fecha"
            value={date}
            onChangeText={setDate}
            style={styles.input}
          />
        </View>
        <View style={styles.inputGroup}>
          <Button title="Seleccionar imagen" onPress={handleSelectImage} />
        </View>
        {image && (
          <View style={styles.imagePreview}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        )}
        <View style={styles.inputGroup}>
          <Button title="Guardar tarea" onPress={handleSaveTask} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginVertical: 10,
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 4,
    fontSize: 18,
  },
  imagePreview: {
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
});
