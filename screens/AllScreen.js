import React, { Component, useState} from 'react';
import { Text, View, Alert, StyleSheet, TouchableOpacity,ScrollView, ImageBackground, KeyboardAvoidingView } from 'react-native';
import {TODOS} from '../constants/data';
import { TextInput } from 'react-native';

export default class AllScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList:TODOS,
      inputText:''
    };
  }
 
  onChangeText = text =>{
    this.setState(
      {
        inputText: text
      }
    );
  }

  onSubmitTodo = () => {
    const {todoList}= this.state;
    const newTodo = {
      body: this.state.inputText,
      status: 'Active',
      id: todoList.length + 1
    };
    const newTodoList = [...todoList, newTodo];
     this.setState({
      todoList: newTodoList,
      inputText:''
     });
    };

  render() {
    const {todoList,inputText}=this.state;
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
        backgroundColor: props.todo.status === 'Done' ? 'blue' : 'green'};
      return (
        <TouchableOpacity onPress={() => props.onToggleTodo(props.todo.id)} onLongPress={() => onLongPress(props.todo)}
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
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        style={{marginTop:460}}>
        {todoList.map((todo, idx) => {
          return (
            <TodoItem
              idx={idx}
              todo={todo}
              key={todo.body}
              onToggleTodo={onToggleTodo}
              onDeleteTodo={onDeleteTodo}
            />
          );
         })}
        <View style={styles.inputContainer}>
          <TextInput style={styles.todoInput}
            value={inputText}
             onChangeText={this.onChangeText}
          />
          <TouchableOpacity style={styles.button} onPress={this.onSubmitTodo} >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      </ScrollView>
     </ImageBackground>
    );
  }
}


AllScreen.navigationOptions = {
  title: 'To do list'
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
  todoInput: {
    width: '95%',
    minHeight: 30,
    color: 'white',
    borderWidth: 1,
    marginTop: '10%',
    marginBottom: '5%',
    borderColor: 'grey',
    borderRadius:10,
    height:30
  },
  inputContainer: {
    flex: 1,
    width: '95%',
    marginHorizontal:5,
    marginBottom: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  button: {
    height: 40,
    width: '50%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center',
   
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
