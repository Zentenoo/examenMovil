import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY';

export class TaskStorage {
  async getTasks() {
    try {
      const tasksString = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      if (tasksString) {
        const tasks = JSON.parse(tasksString);
        return tasks;
      } else {
        return [];
      }
    } catch (error) {
      console.log('Error getting tasks from storage:', error);
      return [];
    }
  }

  async addTask(task) {
    try {
      const tasks = await this.getTasks();
      const newTasks = [...tasks, task];
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));
      return true;
    } catch (error) {
      console.log('Error adding task to storage:', error);
      return false;
    }
  }

  async deleteTask(taskId) {
    try {
      const tasks = await this.getTasks();
      const newTasks = tasks.filter((task) => task.id !== taskId);
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));
      return true;
    } catch (error) {
      console.log('Error deleting task from storage:', error);
      return false;
    }
  }
}

