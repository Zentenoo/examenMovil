import React, { createContext, useReducer } from 'react';

export const TaskContext = createContext();

const initialState = {
  tasks: []
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return { tasks: [...state.tasks, action.payload] };
    case 'REMOVE_TASK':
      return { tasks: state.tasks.filter(task => task.id !== action.payload) };
    default:
      return state;
  }
}

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const addTask = (task) => {
    dispatch({ type: 'ADD_TASK', payload: task });
  };

  const removeTask = (taskId) => {
    dispatch({ type: 'REMOVE_TASK', payload: taskId });
  };

  return (
    <TaskContext.Provider value={{ tasks: state.tasks, addTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};


