class Task {
    constructor(
        name,
        description,
        dueDate,
        priority,
        id = Date.now(),
        state = "progress",
    ) {
        this.name = name;
        this.id = id;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.state = state;
    }
}

export default Task;
