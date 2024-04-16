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
}

export default TodoList;
