import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const TaskCard = ({ title, description, date, handleDelete }) => {
  return (
    <TouchableOpacity onPress={handleDelete}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
});

