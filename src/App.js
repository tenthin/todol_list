

import { useState, useEffect} from "react";
import "./App.css";

function App() {
  // At the very top of App.js
console.log("LocalStorage on load:", localStorage.getItem("tasks"));
  const [text, setText] = useState("");
  const [task, setTask] = useState([]);

  //Load task from localstorage when the app starts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTask(savedTasks);
  }, []);

  // Save tasks to localStorage whenever task changes:
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  },[task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    setTask([...task, { text, done: false }]);
    setText("");
  };

  const handleDelete = (indexToDelete) => {
    setTask(task.filter((_, index) => index !== indexToDelete));
  };

  const handleToggle = (index) => {
    const updatedTasks = task.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    );
    setTask(updatedTasks);
  };

  const handleClearAll = () =>{
    setTask([]);
  }

  return (
    <div className="App">
      <div className="title">
        <h1>To Do App</h1>
      </div>

      <form onSubmit={handleSubmit} className="list">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <div className="clear">
        <button onClick={handleClearAll}>Clear All</button>
      </div>
      <div className="task">
        <ol>
          {task.map((item, index) => (
            <li
              key={index}
              style={{
                textDecoration: item.done ? "line-through" : "none",
                color: item.done ? "gray" : "black",
              }}
            >
              {item.text}
              <button onClick={() => handleToggle(index)}>Done</button>
              <button onClick={() => handleDelete(index)}>X</button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
