const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

let tasks = [
  { id: 1, text: "Estudar Node.js" },
  { id: 2, text: "Separar repositórios" }
];

// Listar tarefas
app.get("/tasks", (req, res) => res.json(tasks));

// Adicionar tarefa
app.post("/tasks", (req, res) => {
  const newTask = { id: Date.now(), text: req.body.text };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Deletar tarefa
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.sendStatus(204);
});

// Editar tarefa
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.text = req.body.text;
    res.json(task);
  } else {
    res.sendStatus(404);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend rodando na porta http://localhost:${PORT}`));
