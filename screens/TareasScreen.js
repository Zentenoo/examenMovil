import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import DatePicker from 'react-native-datepicker';
import { requestCameraPermissionsAsync } from 'expo-camera';
import {firestore} from '../firebase'
import { TaskContext } from '../context/TaskContext';

export const TareasScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [image, setImage] = useState(null);
  const { addTask } = useContext(TaskContext);
  const navigation = useNavigation();

  const handleSaveTask = () => {
    if (!selectedDate) {
      setSelectedDate(new Date()); // Asignar la fecha actual si no se ha seleccionado ninguna fecha
    }

    const newTask = { title, description, date: selectedDate, image };
    firestore
      .collection('tareas') // Nombre de la colección donde se guardarán las tareas
      .add(newTask)
      .then((docRef) => {
        console.log('Tarea guardada con ID:', docRef.id);
        addTask(newTask); // Agregar la tarea en el contexto TaskContext
        navigation.navigate('Inicio', { newTask });
      })
      .catch((error) => {
        console.error('Error al guardar la tarea:', error);
      });
  };

  const handleOpenCamera = async () => {
    const { status } = await requestCameraPermissionsAsync();

    if (status === 'granted') {
      navigation.navigate('Camera', { setImage });
    } else {
      alert('Se requieren permisos para acceder a la cámara');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Descripción:</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} />
      <Text style={styles.label}>Fecha:</Text>
      <DatePicker
        style={styles.input}
        date={selectedDate}
        mode="date"
        placeholder="Selecciona una fecha"
        format="DD/MM/YYYY"
        minDate={new Date()}
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        customStyles={{
          dateInput: {
            borderWidth: 0,
          },
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateText: {
            fontSize: 18,
          },
        }}
        onDateChange={(date) => setSelectedDate(date)}
      />
      <Text style={styles.label}>Imagen:</Text>
      <Button title="Tomar foto" onPress={handleOpenCamera} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Cambiar fecha" onPress={() => setSelectedDate(new Date())} />
      <Button title="Guardar tarea" onPress={handleSaveTask} />
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
});
