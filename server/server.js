import express from 'express'
import cors from 'cors';
import fs from 'fs'

const app = express()
app.use(cors());
app.use(express.json())

app.post('/save-task', (req, res) => {
  const newTask = req.body;

  fs.readFile('userTasks.txt', 'utf8', (err, data) => {
    const tasks = err ? [] : JSON.parse(data);
    tasks.push(newTask);

    fs.writeFile('userTasks.txt', JSON.stringify(tasks, null, 2), (err) => {
        if (err) return res.status(500).send("Erro ao salvar");
        res.send("Salvo com sucesso!");
    });
  });
});

app.get('/tasks', (req, res) => {
    fs.readFile('userTasks.txt', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Erro ao ler tarefas');
        res.json(JSON.parse(data));
    });
});
app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile('userTasks.txt', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Erro ao ler tarefas');
    let tasks = JSON.parse(data);
    tasks = tasks.filter(t => t.id !== id);
    fs.writeFile('userTasks.txt', JSON.stringify(tasks, null, 2), (err) => {
      if (err) return res.status(500).send('Erro ao salvar');
      res.send('Tarefa removida com sucesso!');
    });
  });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000 🚀'));