import React from "react";
import "./Todo.css";
const Todo = ({ todo, todoCheckedChanged, deleteTodo, a }) => {
  return (
    <li>
      <blockquote>{todo.namn}</blockquote>

      <p>Deadline: {todo.deadline} </p>
      <button onClick={() => deleteTodo(todo.uid)}>Ta bort todo</button>
      <input
        checked={todo.accomplished}
        type="checkbox"
        onChange={() => {
          todoCheckedChanged(todo.uid);
        }}
      />
    </li>
  );
};

export default Todo;
