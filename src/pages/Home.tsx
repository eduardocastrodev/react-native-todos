import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { ItemWrapper } from '../components/ItemWrapper';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const repeatedTitle = tasks.find( item => item.title === newTaskTitle );
    if ( repeatedTitle ) {
      Alert.alert(
        "Task já cadastrada", 
        "Você não pode cadastrar uma task com o mesmo nome"
      );

      return;
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks( oldTasks => [ ...oldTasks, newTask ]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const foundItem = updatedTasks.find( item => item.id === id );

    if ( !foundItem ) return;

    foundItem.done = !foundItem.done;

    return setTasks( updatedTasks );
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => { return; }, 
          style: "cancel"
        },
        { text: "Sim",
          onPress: () => {
            const updateTasks = tasks.filter( item => item.id !== id);

            setTasks( updateTasks );
          },
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})