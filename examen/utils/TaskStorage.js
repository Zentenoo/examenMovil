import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@tasks';

export const getTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error getting tasks from storage', e);
    return [];
  }
};

export const addTask = async task => {
  try {
    const tasks = await getTasks();
    tasks.push(task);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error('Error adding task to storage', e);
  }
};

export const deleteTask = async taskId => {
  try {
    let tasks = await getTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error('Error deleting task from storage', e);
  }
};

export const updateTask = async updatedTask => {
  try {
    let tasks = await getTasks();
    const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = updatedTask;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  } catch (e) {
    console.error('Error updating task in storage', e);
  }
};
