import "./list.css";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import TodoContext from "../../context/TodoContext";

import TodoItem from "../../components/todoItem/TodoItem";

const List = () => {
  const { todoItems, todoCount } = useContext(TodoContext);
  const [todoList, setTodoList] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(true);

  const showCompletedTask = () => {
    setShowAll(false);

    // select the completed items
    let activeItems = todoItems.filter((item) => item.isActive === false);
    setTodoList(activeItems);
  };

  const showActiveTask = () => {
    setShowAll(false);

    // select the active items
    let activeItems = todoItems.filter((item) => item.isActive === true);
    setTodoList(activeItems);
  };

  useEffect(() => {
    // if (showAll === true) {
    //   setTodoList(todoItems);
    // }

    if (filter === "all") {
      setTodoList(todoItems);
    } else if (filter === "active") {
      showActiveTask();
    } else if (filter === "completed") {
      showCompletedTask();
    }
  }, [todoList, todoItems, showAll, filter]);

  return (
    <section className="list-container">
      {/* display list items here */}
      {todoList.length > 0 &&
        todoList.map((item) => {
          return <TodoItem key={item.id} todoItem={item} />;
        })}

      <div className="list-footer">
        <div className="footer-1">{`${todoCount} items left`}</div>
        <div className="footer-2">
          <div
            id="all"
            className={`${filter === "all" ? "selected" : null}`}
            onClick={() => {
              setShowAll(true);
              setFilter("all");
            }}
          >
            All
          </div>
          <div
            id="active"
            className={`${filter === "active" ? "selected" : null}`}
            onClick={() => {
              setFilter("active");
              // showActiveTask();
            }}
          >
            Active
          </div>
          <div
            id="completed"
            className={`${filter === "completed" ? "selected" : null}`}
            onClick={() => {
              setFilter("completed");
              // showCompletedTask();
            }}
          >
            Completed
          </div>
        </div>

        <Link to="/" className="btn-back">
          Add Todo
        </Link>
      </div>
    </section>
  );
};

export default List;
