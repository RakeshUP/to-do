import React, { useState, useEffect } from 'react';
import ToDoInput from './components/Input';
import ToDoListItem from './components/ListItem';
import './App.css';

const serverURL = 'http://localhost:5000/todo';

const App = () => {
  const [listOfTodos, updateTodos] = useState([]);

  useEffect(() => {
    fetch(serverURL)
      .then(response => response.json())
      .then(updateTodos);
  }, []);

  const submitHandler = event => {
    event.preventDefault();
    const formNode = event.target;
    const todoItem = formNode.elements[0].value;
    formNode.elements[0].value = "";

    const data = {
      todoItem,
      isCompleted: false,
    };

    fetch(serverURL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(updateTodos);
  };

  const listHandler = (eventName, event) => {
    if (eventName === "Delete") {
      fetch(`${serverURL}/${event._id}`, {
        method: 'DELETE'
      })
        .then(response => response.json)
        .then(updateTodos);
    } else {
      fetch(`${serverURL}/${event._id}`, {
        method: 'PUT',
        body: JSON.stringify(event),
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then(updateTodos);
    }
  }

  return (
    <div className="App">
      <ToDoInput submitHandler={submitHandler} />
      {listOfTodos.map((todo) => {
        return <ToDoListItem key={todo._id} index={todo._id} listHandler={listHandler}
          defaultValue={todo.todoItem} isCompleted={todo.isCompleted} />
      })}
    </div>
  );
}

export default App;
