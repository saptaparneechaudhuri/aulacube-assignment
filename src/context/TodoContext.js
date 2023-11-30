import { useState, useEffect, createContext } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todoItems, setTodoItems] = useState([]);
  const [todoCount, setTodoCount] = useState(0);

  const handleTodoCount = () => {
    // filter all the active todo items
    let newCount = todoItems.filter((item) => item.isActive === true);
    setTodoCount(newCount.length);
  };

  const handleActiveAndCompleted = (todoItem) => {
    todoItem.isActive = !todoItem.isActive;
    todoItem.isChecked = !todoItem.isChecked;
  };

  const addTodoItem = (newTodoItem) => {
    setTodoItems([
      ...todoItems,
      {
        id: `${todoItems.length + 1}`,
        title: `${newTodoItem.title}`,
        description: `${newTodoItem.description}`,
        priority: `${newTodoItem.priority}`,
        isActive: true,
        show: true,
        isChecked: false,
      },
    ]);
  };

  const editTodoItem = (itemData) => {
    // find if the item exits
    const existingItem = todoItems.find((item) => item.id === itemData.id);
    if (existingItem) {
      // console.log(itemData);

      setTodoItems((todos) =>
        todos.map((todo) => {
          if (todo.id === itemData.id) {
            return {
              ...todo,
              title: itemData.title,
              description: itemData.description,
              priority: itemData.priority,
              isActive: true,
              isChecked: false,
            };
          } else {
            return todo;
          }
        })
      );
    }
  };

  const removeTodoItem = (todoItemToRemove) => {
    // find the item to remove
    let existingItem = todoItems.find(
      (item) => item.id === todoItemToRemove.id
    );

    if (existingItem) {
      let newTodoItems = todoItems.filter(
        (item) => item.id !== todoItemToRemove.id
      );
      setTodoItems(newTodoItems);
    }
  };

  useEffect(() => {
    // update todo count, whenever the todoItems change
    handleTodoCount();
  }, [todoItems]);

  return (
    <TodoContext.Provider
      value={{
        todoItems,
        addTodoItem,
        editTodoItem,
        removeTodoItem,
        handleTodoCount,
        todoCount,

        handleActiveAndCompleted,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
