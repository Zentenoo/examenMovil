import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import TaskCard from '../components/TaskCard';

import TaskStorage from '../utils/TaskStorage';

export const InicioScreen = () => {
  const [tasks, setTasks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTasks();
    });

    return unsubscribe;
  }, [navigation]);

  const getTasks = async () => {
    const taskStorage = new TaskStorage();
    const storedTasks = await taskStorage.getTasks();
    setTasks(storedTasks);
  };

  const handleAddTask = () => {
    navigation.navigate('Tareas');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            handleDelete={getTasks}
          >
            {task.image && (
              <Image source={{ uri: task.image }} style={styles.image} />
            )}
          </TaskCard>
        ))}
      </ScrollView>
      <Button title="Agregar tarea" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    marginVertical: 10,
  },
});





