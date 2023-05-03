import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getAllTasks } from '../utils/tasks';
import AddTaskModal from '../components/AddTaskModal';

export const TareasScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddTask = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleAddNewTask = () => {
    setIsModalVisible(false);
    getAllTasks().then((data) => setTasks(data));
  };

  useEffect(() => {
    getAllTasks().then((data) => setTasks(data));
  }, []);

  const renderTask = ({ item }) => {
    return (
      <TouchableOpacity style={styles.task}>
        <View style={styles.taskLeft}>
          <MaterialIcons name="check-box-outline-blank" size={24} />
          <View>
            <Text style={styles.taskName}>{item.name}</Text>
            <Text style={styles.taskDueDate}>
              {item.dueDate ? item.dueDate.toLocaleString() : 'Sin fecha de vencimiento'}
            </Text>
          </View>
        </View>
        <MaterialIcons name="chevron-right" size={24} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.tasksList}
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <MaterialIcons name="add" size={24} />
      </TouchableOpacity>
      <AddTaskModal visible={isModalVisible} onClose={handleCloseModal} onAddTask={handleAddNewTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tasksList: {
    width: '100%',
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    width: '100%',
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDueDate: {
    fontSize: 16,
    color: '#777',
  },
  addButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

