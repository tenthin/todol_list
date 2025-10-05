import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [task, setTask] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    setTask([...task, text]);
    setText("");
  };

  const handleDelete = (indexToDelete) => {
    setTask(task.filter((_, index) => index !== indexToDelete));
  };

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
      <div className="task">
        <ol>
          {task.map((item, index) => (
            <li key={index}>
              {item}a
              <button onClick={() => handleDelete(index)}>X</button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
