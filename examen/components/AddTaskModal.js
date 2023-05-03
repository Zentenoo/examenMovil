import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { AntDesign } from '@expo/vector-icons';
import { createTask } from '../utils/tasks';

export const AddTaskModal = ({ visible, onClose, onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [priority, setPriority] = useState('normal');
  const [notes, setNotes] = useState('');

  const handleSaveTask = async () => {
    await createTask(taskName, dueDate, priority, notes);
    onAddTask();
    setTaskName('');
    setDueDate(null);
    setPriority('normal');
    setNotes('');
  };

  const handleDatePickerConfirm = (date) => {
    setDueDate(date);
    setIsDatePickerVisible(false);
  };

  const handleDatePickerCancel = () => {
    setIsDatePickerVisible(false);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View>
        <View>
          <TouchableOpacity onPress={onClose}>
            <AntDesign name="close" size={24} />
          </TouchableOpacity>
          <Text >Agregar tarea</Text>
          <TextInput
            placeholder="Nombre de la tarea"
            value={taskName}
            onChangeText={(text) => setTaskName(text)}
          />
          <TouchableOpacity  onPress={() => setIsDatePickerVisible(true)}>
            <Text>
              Fecha de vencimiento: {dueDate ? dueDate.toLocaleString() : 'No definido'}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleDatePickerConfirm}
            onCancel={handleDatePickerCancel}
          />
          <View>
            <Text >Prioridad:</Text>
            <Picker
              selectedValue={priority}
              onValueChange={(value) => setPriority(value)}
            >
              <Picker.Item label="Baja" value="low" />
              <Picker.Item label="Normal" value="normal" />
              <Picker.Item label="Alta" value="high" />
            </Picker>
          </View>
          <TextInput
            placeholder="Notas adicionales"
            value={notes}
            onChangeText={(text) => setNotes(text)}
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity onPress={handleSaveTask}>
            <Text >Guardar tarea</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};