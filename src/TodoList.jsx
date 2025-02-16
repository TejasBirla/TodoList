import { useState, useEffect } from "react";
import "./todoList.css";
import icon from "./assets/icon.png";
import "react-toastify/dist/ReactToastify.css";
import "./todoList.css";
import { toast, ToastContainer } from "react-toastify";

const TodoList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue.trim() === "") {
      toast.error("You must write something!", { position: "top-right" });
      return;
    }
      const taskExists = tasks.some(
        (task) => task.text.toLowerCase() === inputValue.trim().toLowerCase()
      );

      if (taskExists) {
        toast.warning("Task already exists!", { position: "top-right" });
        return;
      }
    setTasks([...tasks, { text: inputValue, completed: false }]);
    setInputValue("");
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <div className="to-do-app">
        <h2>
          To-Do List <img src={icon} alt="icon" />
        </h2>
        <div className="row">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add your text"
          />
          <button onClick={addTask} id="input_btn">
            Add
          </button>
        </div>
        <ul id="list_container">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={task.completed ? "checked" : ""}
              onClick={() => toggleTask(index)}
            >
              {task.text}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(index);
                }}
              >
                ×
              </span>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TodoList;
