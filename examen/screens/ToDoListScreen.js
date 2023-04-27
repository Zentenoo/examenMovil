import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCATION_TASK_NAME = 'background-location-task';

const ToDoListScreen = () => {
  const [location, setLocation] = useState(null);
  const [tasks, setTasks] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getTasks();
      return () => {
        // cleanup function
      };
    }, [])
  );

  const getTasks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tasks');
      const savedTasks = jsonValue != null ? JSON.parse(jsonValue) : [];
      setTasks(savedTasks);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLocation = async (taskData) => {
    setLocation(taskData.locations[0].coords);
    TaskManager.unregisterAllTasksAsync();
  };

  const startLocationUpdates = async () => {
    try {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
        distanceInterval: 100,
        showsBackgroundLocationIndicator: true
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddTask = async () => {
    const newTask = {
      id: new Date().getTime().toString(),
      title: 'Nueva tarea',
      description: '',
      location: location,
      completed: false
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    try {
      const jsonValue = JSON.stringify(updatedTasks);
      await AsyncStorage.setItem('tasks', jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteTask = async (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    try {
      const jsonValue = JSON.stringify(updatedTasks);
      await AsyncStorage.setItem('tasks', jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.taskContainer} onPress={() => console.log(item)}>
      <View style={styles.taskDetails}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        {item.description && <Text style={styles.taskDescription}>{item.description}</Text>}
        {item.location && (
          <View style={styles.taskLocation}>
            <Ionicons name="location" size={16} color="black" style={styles.locationIcon} />
            <Text style={styles.taskLocationText}>{item.location.latitude.toFixed(4)}, {item.location.longitude.toFixed(4)}</Text>
          </View>
        )}
      </View>
      <IconButton icon="delete" color="#FF6347" size={20} onPress={() => handleDeleteTask(item.id)} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList data={tasks} renderItem={renderItem} keyExtractor={(item) => item.id} />
        <View style={styles.addButtonContainer}>
    <IconButton icon="plus" color="white" size={30} onPress={handleAddTask} style={styles.addButton} />
  </View>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#F5F5F5'
},
taskContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
backgroundColor: '#FFFFFF',
borderRadius: 10,
marginHorizontal: 20,
marginVertical: 10,
paddingHorizontal: 15,
paddingVertical: 10
},
taskDetails: {
flex: 1
},
taskTitle: {
fontSize: 18,
fontWeight: 'bold',
marginBottom: 5
},
taskDescription: {
fontSize: 16,
marginBottom: 5
},
taskLocation: {
flexDirection: 'row',
alignItems: 'center'
},
locationIcon: {
marginRight: 5
},
taskLocationText: {
fontSize: 16
},
addButtonContainer: {
position: 'absolute',
bottom: 20,
right: 20
},
addButton: {
backgroundColor: '#FF6347',
borderRadius: 30
}
});

export default ToDoListScreen;
