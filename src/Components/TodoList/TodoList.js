import React, { useState } from "react";
import Todo from "../Todo/Todo";
import "./TodoList.css";
import { nanoid } from "nanoid"; //Nanoid is included in create-react-app
const TodoList = ({ todos, setTodos, setStatus, filteredTodos }) => {
  const [todoText, setTodoText] = useState("");
  const [todoTime, setTodoTime] = useState("");
  const addTodo = (event) => {
    const namn = todoText;
    if (!namn) return;
    if (!todoTime) return;
    setTodos((previousTodos) => {
      return [
        ...previousTodos,
        {
          uid: nanoid(),
          namn,
          accomplished: false,
          deadline: todoTime,
          expired: false,
        },
      ];
    });
    setTodoText("");
    setTodoTime("");
  };
  const todoCheckedChanged = (uid) => {
    const todoCopy = [...todos]; //Create shallow copy of the array to prevent conflict and to not mutate array
    const updatedTodo = todoCopy.find((todo) => todo.uid === uid);
    updatedTodo.accomplished = !updatedTodo.accomplished;
    setTodos(todoCopy);
  };
  const deleteTodo = (uid) => {
    const todoCopy = [...todos];
    const todosAfterDelete = todoCopy.filter((todo) => todo.uid !== uid);
    setTodos(todosAfterDelete);
  };
  const checkIfTimeExpired = (todo) => {
    const updateTodoToExpired = (todo) => {
      if (todo.expired) return;
      const todoCopy = [...todos]; //Create shallow copy of the array to prevent conflict and to not mutate array
      const updatedTodo = todoCopy.find(
        (todoCopy) => todoCopy.uid === todo.uid
      );
      updatedTodo.expired = true;
      // setTodos(todoCopy);
    };
    const currentDate = new Date();
    const todoHour = todo.deadline[0] + todo.deadline[1];
    const todoMinutes = todo.deadline[3] + todo.deadline[4];
    if (todoHour - currentDate.getHours() < 0) {
      updateTodoToExpired(todo);
      return false;
    }
    if (
      todoHour - currentDate.getHours() <= 0 &&
      todoMinutes - currentDate.getMinutes() < 0
    ) {
      updateTodoToExpired(todo);

      return false;
    }
    return true;
  };
  const onSelectChange = (event) => {
    setStatus(event.target.value);
  };
  const onToDoInPutChange = (event) => {
    if (event.target.value.length > 60) return;
    setTodoText(event.target.value);
  };
  return (
    <>
      <div className="addingTodo">
        <input
          className="todoListInput"
          type="text"
          onChange={onToDoInPutChange}
          value={todoText}
        />
        <input
          className="todoListInput"
          type="time"
          value={todoTime}
          onChange={(event) => setTodoTime(event.target.value)}
        />
        <button className="button" onClick={addTodo}>
          Lägg till todo
        </button>
        <select className="todoListInput" onChange={onSelectChange}>
          <option value="all">Visa alla</option>
          <option value="avklarade">Visa avlarade</option>
          <option value="oavklarade">Visa oavklarade</option>
          <option value="missade">Visa missade</option>
        </select>
      </div>
      <ul className="todo-list">
        {filteredTodos.map((todo, i) => {
          return (
            <div
              key={i}
              className={`todo ${
                checkIfTimeExpired(todo) ? "active" : "expired"
              }`}
            >
              <Todo
                todo={todo}
                todoCheckedChanged={todoCheckedChanged}
                deleteTodo={deleteTodo}
              />
            </div>
          );
        })}
      </ul>
    </>
  );
};

export default TodoList;
