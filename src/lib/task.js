class Task {
    constructor(name, description, dueDate, priority) {
        this.id = Date.now();
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.state = "progress";
    }
}

export default Task;
