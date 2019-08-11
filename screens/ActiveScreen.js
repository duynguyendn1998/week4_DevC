import React, { Component, useState} from 'react';
import { Text, Alert, StyleSheet, TouchableOpacity,ScrollView, ImageBackground } from 'react-native';
import {TODOS} from '../constants/data';

export default class CompleteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList:TODOS
    };
  }
  render() {
    const {todoList}=this.state;
    onToggleTodo = (id) => {
      const todo = todoList.find(todo => todo.id === id);
      todo.status = todo.status === 'Done' ? 'Active' : 'Done';
      const foundIndex = todoList.findIndex(todo => todo.id === id);
      todoList[foundIndex] = todo;
      const newTodoList = [...todoList];
      this.setState({ todoList:newTodoList, });

      setTimeout(() => {
        this.props.navigation.navigate('SingleTodo', {
          updatedTodo: todo
        });
      }, 1000);
  }

  onLongPress = todo => {
    const prompt = `"${todo.body}"`;
    Alert.alert(
      'Delete your todo?',
      prompt,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => onDeleteTodo(todo.id) }
      ],
      { cancelable: true }
    );
  };

  onDeleteTodo = id => {
    const newTodoList = todoList.filter(todo => todo.id !== id);
    this.setState({
      todoList:newTodoList,
    });
  };
 
  TodoItem = props => {
    const statusStyle = {
      backgroundColor:'green'};
      return (
        <TouchableOpacity  onPress={() => props.onToggleTodo(props.todo.id)} onLongPress={() => onLongPress(props.todo)}
          key={props.todo.body}
          style={[styles.todoItem, statusStyle]}>
          <Text style={styles.todoText}>
            {props.idx + 1}: {props.todo.body}
          </Text>
        </TouchableOpacity>
      );
    }; 
    
    return (
    <ImageBackground style={styles.container} source = {{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Tqai5T0HKoas7lKn3UCH3kEEi2_o0vDBhZqN49DRisIp9jKF'}} >
      <ScrollView>
        {todoList.map((todo, idx) => {
          if(todo.status ==='Active')
          {
            return (
              <TodoItem 
                idx={idx}
                todo={todo}
                key={todo.body}
                onToggleTodo={onToggleTodo}
                onDeleteTodo={onDeleteTodo}
              />
            );
          }
        
         })}
      </ScrollView>
     </ImageBackground>
    );
  }
}


CompleteScreen.navigationOptions = {
  title: 'Complete Screen'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    height:'100%',
    alignItems: 'center',
    backgroundColor: 'black',
    justifyContent: 'center',
    //marginHorizontal:'5%'
  },
  todoItem: {
    margin: 5,
    padding: 10,
    width: '95%',
    minHeight: 20,
    color: 'white',
    borderRadius: 5,
    flexWrap: 'wrap'
  },
  todoText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    
  },
});
