import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getTasks } from '../utils/TaskStorage';
import TaskCard from '../components/TaskCard';

export function InicioScreen () {
  const [tasks, setTasks] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadTasks();
    }
  }, [isFocused]);

  const loadTasks = async () => {
    const tasksData = await getTasks();
    setTasks(tasksData);
  };

  const renderItem = ({ item }) => <TaskCard task={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tareas</Text>
      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      ) : (
        <Text>No hay tareas</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});




