import React, { useState, useContext } from 'react';
import { StyleSheet, View, ScrollView, TextInput, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import { TaskContext } from '../components/TaskContext';

export const TareasScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const { addTask } = useContext(TaskContext);
  const navigation = useNavigation();

  const handleAddTask = () => {
    addTask({ title, description, date, image });
    navigation.goBack();
  };

  const handlePickImage = async () => {
    if (Constants.platform.ios) {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('Lo sentimos, necesitamos permisos para acceder a la cámara.');
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha"
          value={date}
          onChangeText={setDate}
        />
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <Button title="Agregar imagen" onPress={handlePickImage} />
        <Button title="Guardar tarea" onPress={handleAddTask} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

