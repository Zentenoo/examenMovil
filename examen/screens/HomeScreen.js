import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { launchCameraAsync } from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export function HomeScreen ({navigation}){
  const [imageUri, setImageUri] = useState(null);

  const openCamera = async () => {
    const result = await launchCameraAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      quality: 1
    });
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <View style={styles.buttonContainer}>
        <Button title="Abrir cámara" onPress={openCamera} />
        <Button title="Lista de tareas" onPress={() => navigation.navigate('ToDoListScreen')} />
      </View>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  buttonContainer: {
    marginTop: 20
  },
  image: {
    marginTop: 20,
    width: 200,
    height: 200
  }
});


