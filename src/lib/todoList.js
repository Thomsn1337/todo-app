class TodoList {
    constructor(name) {
        this.name = name;
        this.id = Date.now();
        this.active = false;
        this.tasks = [];
        this.completed = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    addCompletedTask(task) {
        this.completed.push(task);
    }

    #getTaskIndex(task) {
        return this.tasks.indexOf(task);
    }

    #getCompletedTaskIndex(task) {
        return this.completed.indexOf(task);
    }

    deleteTask(task) {
        const index = this.#getTaskIndex(task);
        this.tasks.splice(index, 1);
    }

    deleteCompletedTask(task) {
        const index = this.#getCompletedTaskIndex(task);
        this.completed.splice(index, 1);
    }
}

export default TodoList;
