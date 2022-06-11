import React, { useState, useEffect, useMemo } from "react";
import TodoList from "./TodoList/TodoList";
import ".././index.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("alla");
  useEffect(() => {
    const fetchedTodos = JSON.parse(localStorage.getItem("List of Todos"));
    if (fetchedTodos) setTodos(fetchedTodos);
  }, []);
  useEffect(() => {
    localStorage.setItem("List of Todos", JSON.stringify(todos));
  }, [todos]);
  const filteredTodos = useMemo(() => {
    if (status === "alla") return todos;
    switch (status) {
      case "avklarade":
        return todos.filter((todo) => todo.accomplished === true);
      case "oavklarade":
        return todos.filter((todo) => todo.accomplished === false);
      case "missade":
        return todos.filter((todo) => todo.expired === true);
      default:
        return todos;
    }
  }, [status, todos]);
  return (
    <TodoList
      todos={todos}
      setTodos={setTodos}
      setStatus={setStatus}
      filteredTodos={filteredTodos}
    />
  );
};

export default App;
