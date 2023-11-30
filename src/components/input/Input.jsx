import "./input.css";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// Context
import TodoContext from "../../context/TodoContext";

const initialState = {
  title: "",
  description: "",
  priority: "high",
};

const Input = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addTodoItem, todoItems, editTodoItem } = useContext(TodoContext);
  const [formFields, setFormFields] = useState(initialState);
  const [error, setError] = useState(initialState);

  const navigate = useNavigate();
  const todoItemId = searchParams.get("id");

  const handleInputValueChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const hanldeError = (formFields) => {
    if (formFields.title === "") {
      setError({ ...error, title: "Title is required" });
    }

    if (formFields.description === "") {
      setError({ ...error, description: "Description is required" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    hanldeError(formFields);

    // all fields are complete
    if (formFields.title && formFields.description && formFields.priority) {
      if (todoItemId) {
        editTodoItem(formFields);
      } else {
        addTodoItem(formFields);
      }

      navigate("/list");
    }
  };

  useEffect(() => {
    if (todoItemId) {
      // find the item
      let todoItem = todoItems.find(
        (item) => item.id === searchParams.get("id")
      );
      // console.log(todoItem);
      setFormFields(todoItem);
    }
  }, [todoItemId]);
  return (
    <div className="input-container">
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          <label>Task title</label>
          <input
            type="text"
            name="title"
            className="input"
            value={formFields.title}
            placeholder="Add a new task"
            onChange={handleInputValueChange}
          />
          <p className="error">{error.title}</p>
        </div>

        <div className="form-fields">
          <label>Description</label>
          <textarea
            name="description"
            className="input textarea"
            value={formFields.description}
            rows={4}
            cols={40}
            onChange={handleInputValueChange}
          />
          <p className="error">{error.description}</p>
        </div>

        <div className="form-fields">
          <label>Priority Level</label>
          <select
            name="priority"
            className="input"
            value={formFields.priority}
            onChange={handleInputValueChange}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <button className="btn" type="submit">
          {todoItemId ? "Edit" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default Input;
