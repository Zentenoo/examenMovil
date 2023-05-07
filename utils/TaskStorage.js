import AsyncStorage from '@react-native-async-storage/async-storage';

export class TaskStorage {
  async getTasks() {
    const tasksString = await AsyncStorage.getItem('@tasks');
    return tasksString != null ? JSON.parse(tasksString) : [];
  }

  async addTask(task) {
    const tasks = await this.getTasks();
    tasks.push(task);
    await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
  }

  async deleteTask(taskId) {
    let tasks = await this.getTasks();
    tasks = tasks.filter((task) => task.id !== taskId);
    await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
  }
}


