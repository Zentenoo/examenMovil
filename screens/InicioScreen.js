import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Button } from 'react-native';
import { TaskContext } from '../context/TaskContext';
import { firestore } from '../firebase';

export const InicioScreen = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = firestore.collection('tareas').onSnapshot((snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasks);
    });
  
    return () => unsubscribe();
  }, []);
  const { tasks } = useContext(TaskContext);

  console.log(tasks)

  const handleTaskPress = (taskId) => {
    navigation.navigate('Detalles', { taskId });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleTaskPress(item.id)} style={styles.taskButton}>
        <View style={styles.task}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text>{item.date}</Text>
          {item.image && (
            <Image source={{ uri: item.image }} style={styles.taskImage} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todas las tareas</Text>
      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
        />
      ) : (
        <Text style={styles.empty}>No hay tareas</Text>
      )}
      <Button title="Agregar" onPress={() => navigation.navigate('Tareas')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  taskButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTitle: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  taskImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  empty: {
    fontStyle: 'italic',
  },
});


