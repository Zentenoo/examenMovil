import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TaskContext } from '../context/TaskContext';


export const DetallesScreen = ({ route }) => {
  const { tasks } = useContext(TaskContext);
  const { taskId } = route.params;

  // Buscar la tarea específica en la lista de tareas
  const task = tasks.find((t) => t.id === taskId);

  // Verificar si la tarea existe
  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tarea no encontrada</Text>
      </View>
    );
  }



  // Formatear la fecha si existe y es una instancia de Date
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text>{task.description}</Text>
      <Text>{task.date}</Text>
      {task.image && <Image source={{ uri: task.image }} style={styles.taskImage} />}
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
  taskImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  map: {
    flex: 1,
    marginTop: 20,
  },
});
