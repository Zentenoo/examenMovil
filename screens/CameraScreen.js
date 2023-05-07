import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

export const CameraScreen = ({ route }) => {
  const { setImage } = route.params;
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [isTakingPicture, setIsTakingPicture] = useState(false);
  const navigation = useNavigation();
  

  const handleTakePicture = async () => {
    if (cameraRef && !isTakingPicture) {
      setIsTakingPicture(true);
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.takePictureAsync(options);
      setPhoto(data);
      setIsTakingPicture(false);
    }
  };

  const handleSavePicture = () => {
    setImage(photo.uri);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={(ref) => setCameraRef(ref)}
        style={styles.camera}
        type={cameraType}
        flashMode={flashMode}
      />
      <View style={styles.controls}>
        <Button title="Tomar foto" onPress={handleTakePicture} />
        <Button
          title="Cambiar cámara"
          onPress={() =>
            setCameraType(
              cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            )
          }
        />
        <Button
          title={flashMode === Camera.Constants.FlashMode.on ? 'Apagar flash' : 'Encender flash'}
          onPress={() =>
            setFlashMode(
              flashMode === Camera.Constants.FlashMode.on
                ? Camera.Constants.FlashMode.off
                : Camera.Constants.FlashMode.on
            )
          }
        />
      </View>
      {photo && (
        <View style={styles.preview}>
          <Image source={{ uri: photo.uri }} style={styles.previewImage} />
          <Button title="Guardar foto" onPress={handleSavePicture} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  preview: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
});

