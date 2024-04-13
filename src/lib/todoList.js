class TodoList {
    constructor(name) {
        this.name = name;
        this.id = Date.now();
        this.tasks = [];
        this.completed = [];
    }
}

export default TodoList;
