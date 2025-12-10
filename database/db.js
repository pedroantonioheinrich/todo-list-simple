class Task {
    static tasks = [];

    static async addNewTask(taskObj) {
        try {
            const response = await fetch('http://localhost:3000/save-task', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskObj)
            });
            const data = await response.text();
            console.log(data);
            this.tasks.push(taskObj);
            return taskObj;
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    }

    static taskCount() {
        return this.tasks.length;
    }

    static seeAllTasks() {
        return this.tasks;
    }

    static getTaskById(id) {
        return this.tasks.find(e => e.id === id) || "Task ID not found!!";
    }

    static removeAll() {
        app.delete('/tasks', (req, res) => {
        fs.writeFile('userTasks.txt', JSON.stringify([], null, 2), (err) => {
            if (err) return res.status(500).send('Erro ao limpar');
            res.send('Todas as tarefas removidas!');
    });
});
        this.tasks = [];
        return this.tasks;
    }

    static removeTaskById(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        return this.tasks;
    }
}

export default Task;