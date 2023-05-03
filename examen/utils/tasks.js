import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_STORAGE_KEY = 'tasks';

export const createTask = async (name, dueDate, priority, notes) => {
  const task = {
    id: Date.now().toString(),
    name,
    dueDate: dueDate ? dueDate.getTime() : null,
    priority,
    notes,
    isCompleted: false,
  };

  try {
    const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    tasks.push(task);
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error(error);
  }
};

export const getTasks = async () => {
  try {
    const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    return tasks;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const completeTask = async (id) => {
  try {
    const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex >= 0) {
      tasks[taskIndex].isCompleted = true;
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteTask = async (id) => {
  try {
    const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    const updatedTasks = tasks.filter((task) => task.id !== id);
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
  } catch (error) {
    console.error(error);
  }
};