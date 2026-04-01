const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Store todos in memory
let todos = [];
let id = 1;

// GET all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST add new todo
app.post('/todos', (req, res) => {
  const todo = { id: id++, text: req.body.text };
  todos.push(todo);
  res.json(todo);
});

// DELETE a todo
app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  res.json({ message: 'Deleted' });
});

// Start server on port 5000
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});