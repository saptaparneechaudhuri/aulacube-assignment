import { useState, useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

import "./todoItem.css";
import View from "../modal/View";

//Context
import TodoContext from "../../context/TodoContext";

const TodoItem = ({ todoItem }) => {
  const [showCheck, setShowCheck] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [priorityColor, setPriorityColor] = useState("");
  const { removeTodoItem, handleTodoCount, handleActiveAndCompleted } =
    useContext(TodoContext);

  const navigate = useNavigate();

  const checkList = (todoItemSelected) => {
    setShowCheck(!showCheck);

    // toggle isActive property of the todoitem and checked property
    handleActiveAndCompleted(todoItemSelected);

    // update the count
    handleTodoCount();
  };

  const handleDelete = (todoItemToDelete) => {
    removeTodoItem(todoItemToDelete);
  };

  useEffect(() => {
    if (todoItem.priority === "high") {
      setPriorityColor("#c1121f");
    } else if (todoItem.priority === "medium") {
      setPriorityColor("#fb8500");
    } else if (todoItem.priority === "low") {
      setPriorityColor("#ffb703");
    }
  }, [todoItem.priority]);

  return (
    <div className="todo-item-container">
      <div className={`todo-items`} onClick={() => checkList(todoItem)}>
        <div
          className={`${
            todoItem.isChecked === true ? "todo-icon checked" : "todo-icon"
          }`}
        >
          <i
            className={`${
              todoItem.isChecked ? "fa-solid fa-check icon-color" : "hidden"
            }`}
            id={todoItem.id}
          ></i>
        </div>
        <div
          className={`${
            todoItem.isChecked ? "todo-item checked" : "todo-item"
          }`}
        >
          {todoItem.title}{" "}
          <em style={{ color: `${priorityColor}` }}>({todoItem.priority})</em>
        </div>
      </div>
      <div className="cross">
        <p>
          <button onClick={() => setShowModal(true)} className="btn-view">
            View
          </button>

          {showModal &&
            createPortal(
              <View
                content={todoItem.description}
                deleteItem={() => handleDelete(todoItem)}
                editItem={() => navigate(`/?id=${todoItem.id}`)}
                onClose={() => {
                  setShowModal(false);
                }}
              />,
              document.body
            )}
        </p>
        <i
          className="fa-solid fa-xmark"
          onClick={() => handleDelete(todoItem)}
        ></i>
      </div>
    </div>
  );
};

export default TodoItem;
