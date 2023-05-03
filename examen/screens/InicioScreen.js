import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { getTasks } from '../utils/TaskStorage';

const InicioScreen = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updateTasks();
    });
    return unsubscribe;
  }, [navigation]);

  const updateTasks = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.taskContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};
