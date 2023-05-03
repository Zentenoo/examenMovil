import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const TaskItem = ({ task, onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.taskItem}>
        <View style={styles.taskText}>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text style={styles.taskDescription}>{task.description}</Text>
        </View>
        <View style={styles.taskIcons}>
          <Text style={styles.taskPriority}>{task.priority}</Text>
          <TouchableOpacity onPress={() => onDelete(task.id)}>
            <AntDesign name="delete" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    width: '100%',
  },
  taskText: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 16,
  },
  taskIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskPriority: {
    marginRight: 16,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#007AFF',
  },
});

