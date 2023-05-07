import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TaskContext } from '../context/TaskContext';

export const DetallesScreen = ({ route }) => {
  const { tasks } = useContext(TaskContext);
  const task = tasks.find((t) => t.id === route.params.taskId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text>{task.date}</Text>
      {task.image && (
        <Image source={{ uri: task.image }} style={styles.taskImage} />
      )}
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
});


