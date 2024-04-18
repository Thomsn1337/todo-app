import ListStorage from "./listStorage";
import TodoList from "./todoList";
import Task from "./task";

const StorageLoader = (function () {
    function init() {
        if (localStorage.length === 0) {
            const defaultList = new TodoList("Default");
            defaultList.active = true;
            ListStorage.addNewList(defaultList);

            const defaultTask = new Task(
                "Default task",
                "this is a default task",
                new Date(Date.now()),
                "medium",
                Date.now(),
            );
            defaultList.addTask(defaultTask);

            const completedTask = new Task(
                "Completed task",
                "this is a completed task",
                new Date(Date.now() + 100),
                "high",
                Date.now() + 100,
                "done",
            );
            defaultList.addCompletedTask(completedTask);
            localStorage.setItem("lists", JSON.stringify(ListStorage.lists));
        } else {
            loadLists();
        }
    }

    function loadLists() {
        const storedLists = JSON.parse(localStorage.getItem("lists"));
        storedLists.forEach((list) => {
            ListStorage.addNewList(
                new TodoList(list.name, list.id, list.active),
            );

            loadTasks(list);
        });
    }

    function loadTasks(list) {
        const storedList = ListStorage.getListById(list.id);

        list.tasks.forEach((task) => {
            storedList.addTask(
                new Task(
                    task.name,
                    task.description,
                    new Date(task.dueDate.slice(0, task.dueDate.indexOf("T"))),
                    task.priority,
                    task.id,
                    task.state,
                ),
            );
        });

        list.completed.forEach((task) => {
            storedList.addCompletedTask(
                new Task(
                    task.name,
                    task.description,
                    new Date(task.dueDate.slice(0, task.dueDate.indexOf("T"))),
                    task.priority,
                    task.id,
                    task.state,
                ),
            );
        });
        console.log(list);
        console.log(storedList);
    }

    function update() {
        localStorage.setItem("lists", JSON.stringify(ListStorage.lists));
    }

    return {
        init,
        update,
    };
})();

export default StorageLoader;
