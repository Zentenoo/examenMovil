import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Switch,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import firebase from 'firebase/app';
import 'firebase/firestore';

export function TareasScreen () {
  const [tareas, setTareas] = useState([]);
  const [tareaTexto, setTareaTexto] = useState('');
  const [prioridad, setPrioridad] = useState('Media');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [nota, setNota] = useState('');
  const [imagen, setImagen] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [recordatorio, setRecordatorio] = useState(false);
  const [subtareas, setSubtareas] = useState([]);

  const db = firebase.firestore();

  const mostrarDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const ocultarDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setFechaVencimiento(date);
    ocultarDatePicker();
  };

  const elegirImagen = async () => {
    let permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permiso.granted === false) {
      alert('Se necesita permiso para acceder a la galería de fotos.');
      return;
    }
    let resultado = await ImagePicker.launchImageLibraryAsync();
    if (!resultado.cancelled) {
      setImagen(resultado.uri);
    }
  };

  const agregarTarea = () => {
    if (tareaTexto === '') {
      alert('Ingrese un nombre para la tarea.');
      return;
    }
    const nuevaTarea = {
      id: Date.now().toString(),
      tareaTexto,
      prioridad,
      fechaVencimiento,
      nota,
      imagen,
      ubicacion,
      recordatorio,
      subtareas,
      completado: false,
    };
    db.collection('tareas')
      .doc(nuevaTarea.id)
      .set(nuevaTarea)
      .then(() => {
        setTareas([...tareas, nuevaTarea]);
        setTareaTexto('');
        setPrioridad('Media');
        setFechaVencimiento('');
        setNota('');
        setImagen(null);
        setUbicacion(null);
        setRecordatorio(false);
        setSubtareas([]);
        if (recordatorio && fechaVencimiento) {
          const notificacionId = Notifications.scheduleNotificationAsync({
            content: {
              title: 'Tarea pendiente',
              body: tareaTexto,
            },
            trigger: {
              date: fechaVencimiento,
            },
          });
          db.collection('notificaciones')
            .doc(nuevaTarea.id)
            .set({ notificacionId });
        }
      })
      .catch((error) => {
        console.error('Error al agregar tarea: ', error);
      });
  };

  const eliminarTarea = (id) => {
    db.collection('tareas')
      .doc(id)
      .delete()
      .then(())=> {setTareas(tareas.filter((tarea) => tarea.id !== id));
cancelarNotificacion(id);
})
.catch((error) => {
console.error('Error al eliminar tarea: ', error);
});
};

const completarTarea = (id) => {
db.collection('tareas')
.doc(id)
.update({ completado: true })
.then(() => {
setTareas(
tareas.map((tarea) =>
tarea.id === id ? { ...tarea, completado: true } : tarea
)
);
cancelarNotificacion(id);
})
.catch((error) => {
console.error('Error al completar tarea: ', error);
});
};

const mostrarSubtareas = (id) => {
const tareaSeleccionada = tareas.find((tarea) => tarea.id === id);
setSubtareas(tareaSeleccionada.subtareas);
};

const agregarSubtarea = () => {
if (tareaTexto === '') {
alert('Ingrese un nombre para la subtarea.');
return;
}
const nuevaSubtarea = {
id: Date.now().toString(),
tareaTexto,
completado: false,
};
setSubtareas([...subtareas, nuevaSubtarea]);
setTareaTexto('');
};

const eliminarSubtarea = (id) => {
setSubtareas(subtareas.filter((subtarea) => subtarea.id !== id));
};

const completarSubtarea = (id) => {
setSubtareas(
subtareas.map((subtarea) =>
subtarea.id === id ? { ...subtarea, completado: true } : subtarea
)
);
};

const cancelarNotificacion = async (id) => {
const notificacion = await db
.collection('notificaciones')
.doc(id)
.get();
if (notificacion.exists) {
const notificacionId = notificacion.data().notificacionId;
Notifications.cancelScheduledNotificationAsync(notificacionId);
db.collection('notificaciones').doc(id).delete();
}
};

const mostrarProximasTareas = () => {
const ahora = new Date();
const proximasTareas = tareas.filter(
(tarea) =>
tarea.fechaVencimiento &&
tarea.completado === false &&
tarea.fechaVencimiento.toDate() >= ahora
);
setTareas(proximasTareas);
};

const mostrarTareasCompletadas = () => {
const tareasCompletadas = tareas.filter(
(tarea) => tarea.completado === true
);
setTareas(tareasCompletadas);
};

const cargarUbicacion = async () => {
let permiso = await Location.requestForegroundPermissionsAsync();
if (permiso.status !== 'granted') {
alert('Se necesita permiso para acceder a la ubicación del dispositivo.');
return;
}
let ubicacionActual = await Location.getCurrentPositionAsync({});
setUbicacion({
latitud: ubicacionActual.coords.latitude,
longitud: ubicacionActual.coords.longitude,
});
};

return (
<View style={styles.container}>
<Text style={styles.titulo}>Tareas</Text>
<TextInput
style={styles.input}
placeholder="Ingrese una tarea"
value={tareaTexto}
onChangeText={(texto) => setTareaTexto(texto)}
/>
<View style={styles.botones}>
<TouchableOpacity
style={styles.botonAgregar}
onPress={agregarTarea}

<Text style={styles.textoBoton}>Agregar</Text>
</TouchableOpacity>
<TouchableOpacity
style={styles.botonCancelar}
onPress={() => setTareaTexto('')}

<Text style={styles.textoBoton}>Cancelar</Text>
</TouchableOpacity>
</View>
<ScrollView>
{tareas.length > 0 ? (
tareas.map((tarea) => (
<Tarea
key={tarea.id}
tarea={tarea}
eliminarTarea={eliminarTarea}
completarTarea={completarTarea}
mostrarSubtareas={mostrarSubtareas}
/>
))
) : (
<Text>No hay tareas</Text>
)}
</ScrollView>
<Modal visible={modalVisible} animationType="slide">
<View style={styles.subtareaContainer}>
<TextInput
style={styles.input}
placeholder="Ingrese una subtarea"
value={tareaTexto}
onChangeText={(texto) => setTareaTexto(texto)}
/>
<View style={styles.botones}>
<TouchableOpacity
style={styles.botonAgregar}
onPress={agregarSubtarea}

<Text style={styles.textoBoton}>Agregar</Text>
</TouchableOpacity>
<TouchableOpacity
style={styles.botonCancelar}
onPress={() => {
setTareaTexto('');
setModalVisible(false);
}}

<Text style={styles.textoBoton}>Cancelar</Text>
</TouchableOpacity>
</View>
<ScrollView>
{subtareas.length > 0 ? (
subtareas.map((subtarea) => (
<Subtarea
key={subtarea.id}
subtarea={subtarea}
eliminarSubtarea={eliminarSubtarea}
completarSubtarea={completarSubtarea}
/>
))
) : (
<Text>No hay subtareas</Text>
)}
</ScrollView>
</View>
</Modal>
<View style={styles.botonesFiltro}>
<TouchableOpacity
style={styles.botonFiltro}
onPress={() => {
setFiltro('todas');
setTareas(todasTareas);
}}

<Text
style={[
styles.textoBotonFiltro,
filtro === 'todas' && styles.textoBotonFiltroSeleccionado,
]}

Todas
</Text>
</TouchableOpacity>
<TouchableOpacity
style={styles.botonFiltro}
onPress={() => {
setFiltro('proximas');
mostrarProximasTareas();
}}

<Text
style={[
styles.textoBotonFiltro,
filtro === 'proximas' && styles.textoBotonFiltroSeleccionado,
]}

Proximas
</Text>
</TouchableOpacity>
<TouchableOpacity
style={styles.botonFiltro}
onPress={() => {
setFiltro('completadas');
mostrarTareasCompletadas();
}}

<Text
style={[
styles.textoBotonFiltro,
filtro === 'completadas' && styles.textoBotonFiltroSeleccionado,
]}

Completadas
</Text>
</TouchableOpacity>
<TouchableOpacity
style={styles.botonUbicacion}
onPress={cargarUbicacion}

<Text style={styles.textoBoton}>Cargar Ubicación</Text>
</TouchableOpacity>
</View>
</View>
);
}
