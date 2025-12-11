class Task {
    static tasks = [];

    static async addNewTask(taskObj) {
        return this.tasks.push(taskObj)
    }

    static taskCount() {
        return this.tasks.length
    }

    static seeAllTasks() {
        return this.tasks;
    }

    static getTaskById(id) {
        return this.tasks.find(e => e.id === id) || "Task ID not found!!";
    }

    static removeAll() {
        this.tasks = [];
        return this.tasks;
    }

    static removeTaskById(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        return this.tasks;
    }
}

export default Task;