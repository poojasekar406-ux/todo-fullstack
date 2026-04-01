import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Load todos from backend when page opens
  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  // Add new todo
  const addTodo = () => {
    if (!input.trim()) return;
    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    })
      .then((res) => res.json())
      .then((todo) => {
        setTodos([...todos, todo]);
        setInput("");
      });
  };

  // Delete a todo
  const deleteTodo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" })
      .then(() => setTodos(todos.filter((t) => t.id !== id)));
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center", color: "#4A90E2" }}>📝 Todo App</h1>

      {/* Input Box */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task..."
          style={{ flex: 1, padding: "10px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <button
          onClick={addTodo}
          style={{ padding: "10px 20px", backgroundColor: "#4A90E2", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "16px" }}
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      {todos.map((todo) => (
        <div key={todo.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", marginBottom: "10px", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
          <span style={{ fontSize: "16px" }}>{todo.text}</span>
          <button
            onClick={() => deleteTodo(todo.id)}
            style={{ backgroundColor: "#e74c3c", color: "white", border: "none", borderRadius: "6px", padding: "6px 12px", cursor: "pointer" }}
          >
            ❌ Delete
          </button>
        </div>
      ))}

      {todos.length === 0 && (
        <p style={{ textAlign: "center", color: "#aaa" }}>No tasks yet. Add one above! 🎯</p>
      )}
    </div>
  );
}

export default App;
