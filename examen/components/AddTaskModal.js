import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

export default function AddTaskModal({ visible, onCancel, onAddTask }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('low');
  const [taskNotes, setTaskNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [subtasks, setSubtasks] = useState([]);
  const [images, setImages] = useState([]);
  const [reminders, setReminders] = useState([]);

  const { colors } = useTheme();

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  const addSubtask = (subtaskTitle) => {
    setSubtasks([...subtasks, { title: subtaskTitle, completed: false }]);
  };

  const removeSubtask = (index) => {
    const newSubtasks = [...subtasks];
    newSubtasks.splice(index, 1);
    setSubtasks(newSubtasks);
  };

  const addImage = (image) => {
    setImages([...images, image]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const addReminder = (reminder) => {
    setReminders([...reminders, reminder]);
  };

  const removeReminder = (index) => {
    const newReminders = [...reminders];
    newReminders.splice(index, 1);
    setReminders(newReminders);
  };

  const addTask = () => {
    onAddTask({ 
      title: taskTitle, 
      priority: selectedPriority, 
      notes: taskNotes, 
      dueDate: selectedDate,
      subtasks: subtasks,
      images: images,
      reminders: reminders
    });
    setTaskTitle('');
    setSelectedPriority('low');
    setTaskNotes('');
    setSelectedDate(new Date());
    setSubtasks([]);
    setImages([]);
    setReminders([]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: colors.text }]}>New Task</Text>
        <TouchableOpacity onPress={onCancel}>
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TextInput
          style={[styles.input, { color: colors.text, borderBottomColor: colors.text }]}
          placeholder="Task title"
          placeholderTextColor={colors.placeholderText}
          value={taskTitle}
          onChangeText={setTaskTitle}
        />
        <View style={styles.priorityContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Priority:</Text>
          <TouchableOpacity
            style={[
              styles.priorityButton,
              selectedPriority === 'low' && { backgroundColor: colors.primary },
            ]}
            onPress={() => setSelectedPriority('low')}
          >
            <Text style={[styles.priorityButtonText,
selectedPriority === 'low' && { color: 'white' },
selectedPriority !== 'low' && { color: colors.text },
]}
>
Low
</Text>
<TouchableOpacity
style={[
styles.priorityButton,
selectedPriority === 'medium' && { backgroundColor: colors.primary },
]}
onPress={() => setSelectedPriority('medium')}
>
<Text style={[
styles.priorityButtonText,
selectedPriority === 'medium' && { color: 'white' },
selectedPriority !== 'medium' && { color: colors.text },
]}
>
Medium
</Text>
</TouchableOpacity>
<TouchableOpacity
style={[
styles.priorityButton,
selectedPriority === 'high' && { backgroundColor: colors.primary },
]}
onPress={() => setSelectedPriority('high')}
>
<Text style={[
styles.priorityButtonText,
selectedPriority === 'high' && { color: 'white' },
selectedPriority !== 'high' && { color: colors.text },
]}
>
High
</Text>
</TouchableOpacity>
</View>
<TextInput
style={[styles.input, { color: colors.text, borderBottomColor: colors.text }]}
placeholder="Task notes"
placeholderTextColor={colors.placeholderText}
value={taskNotes}
onChangeText={setTaskNotes}
/>
<TouchableOpacity
style={[styles.input, styles.dateInput, { borderBottomColor: colors.text }]}
onPress={() => setShowDatePicker(true)}
>
<Text style={[styles.label, { color: colors.text }]}>Due date:</Text>
<Text style={[styles.dateText, { color: colors.text }]}>
{selectedDate.toLocaleDateString()}
</Text>
</TouchableOpacity>
{showDatePicker && (
<DateTimePicker
value={selectedDate}
mode="date"
display="default"
onChange={onChangeDate}
minimumDate={new Date()}
/>
)}
<View style={styles.subtasksContainer}>
<Text style={[styles.label, { color: colors.text }]}>Subtasks:</Text>
<SubtasksInput onAddSubtask={addSubtask} />
<SubtasksList subtasks={subtasks} onRemoveSubtask={removeSubtask} />
</View>
<View style={styles.imagesContainer}>
<Text style={[styles.label, { color: colors.text }]}>Images:</Text>
<ImagesInput onAddImage={addImage} />
<ImagesList images={images} onRemoveImage={removeImage} />
</View>
<View style={styles.remindersContainer}>
<Text style={[styles.label, { color: colors.text }]}>Reminders:</Text>
<RemindersInput onAddReminder={addReminder} />
<RemindersList reminders={reminders} onRemoveReminder={removeReminder} />
</View>
</View>
<View style={styles.footer}>
<TouchableOpacity style={styles.addButton} onPress={addTask}>
<Text style={[styles.buttonText, { color: colors.text }]}>Add Task</Text>
</TouchableOpacity>
</View>
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
borderTopLeftRadius: 10,
borderTopRightRadius: 10,
overflow: 'hidden',
},
header: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
padding: 16,
borderBottomWidth: StyleSheet.hairlineWidth,
},
headerText: {
fontSize: 20,
fontWeight: 'bold',
