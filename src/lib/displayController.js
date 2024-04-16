import listForm from "../components/listForm";
import taskForm from "../components/taskForm";
import listItem from "../components/listItem";
import taskItem from "../components/taskItem";
import ListStorage from "./listStorage";
import TodoList from "./todoList";
import Task from "./task";

const DisplayController = (function() {
    const dialog = document.querySelector("dialog");
    const newListButton = document.querySelector("#new-list");
    const newTaskButton = document.querySelector("#new-task");

    function init() {
        if (ListStorage.lists.length === 0) {
            const defaultList = new TodoList("Default");
            defaultList.active = true;
            ListStorage.addNewList(defaultList);

            const defaultTask = new Task(
                "Default task",
                "this is a default task",
                new Date(Date.now()),
                "medium",
            );
            const defaultTask2 = new Task(
                "Default task",
                "this is a default task",
                new Date(Date.now() + 10),
                "low",
            );
            defaultList.addTask(defaultTask);
            defaultList.addTask(defaultTask2);

            const completedTask = new Task(
                "Completed task",
                "this is a completed task",
                new Date(Date.now() + 100),
                "high",
            );
            completedTask.state = "done";

            defaultList.addCompletedTask(completedTask);
            renderLists();
            renderTasks();
        }

        newListButton.addEventListener("click", () => {
            renderNewListForm();
        });

        newTaskButton.addEventListener("click", () => {
            renderNewTaskForm();
        });
    }

    function renderNewListForm() {
        clearDialog();

        const newListForm = listForm("New list");
        dialog.appendChild(newListForm);

        const closeButton = newListForm.querySelector("#form-close");
        closeButton.addEventListener("click", () => {
            dialog.close();
        });

        newListForm.addEventListener("submit", () => {
            const name = newListForm.querySelector("#list-name").value;
            ListStorage.addNewList(new TodoList(name));
            renderLists();
        });

        dialog.showModal();
    }

    function renderEditListForm(list) {
        clearDialog();

        const editListForm = listForm("Edit list");
        dialog.appendChild(editListForm);

        const closeButton = editListForm.querySelector("#form-close");
        closeButton.addEventListener("click", () => {
            dialog.close();
        });

        const inputField = editListForm.querySelector("input");
        inputField.value = list.name;

        editListForm.addEventListener("submit", () => {
            const name = editListForm.querySelector("#list-name").value;
            list.name = name;
            renderLists();
        });

        dialog.showModal();
    }

    function renderLists() {
        const listWrapper = document.querySelector(".list-wrapper ul");
        listWrapper.innerHTML = "";

        const lists = ListStorage.lists;
        lists.forEach((list) => {
            const item = listItem(list.name, list.id);
            listWrapper.appendChild(item);

            if (list.active) {
                item.classList.add("active");
            }

            const listName = item.querySelector(`#name-${list.id}`);
            listName.addEventListener("click", () => {
                ListStorage.resetActive();
                list.active = true;
                renderLists();
                renderTasks();
            });

            const editButton = item.querySelector(`#edit-${list.id}`);
            editButton.addEventListener("click", () => {
                renderEditListForm(list);
            });

            const deleteButton = item.querySelector(`#delete-${list.id}`);
            deleteButton.addEventListener("click", () => {
                ListStorage.deleteList(list);
                renderLists();
                if (list.active) {
                    clearTasks();
                }
            });
        });
    }

    function renderNewTaskForm() {
        const activeList = ListStorage.getActiveList();

        clearDialog();
        const newTaskForm = taskForm("New Task");
        dialog.appendChild(newTaskForm);

        const closeButton = newTaskForm.querySelector("#form-close");
        closeButton.addEventListener("click", () => {
            dialog.close();
        });

        newTaskForm.addEventListener("submit", () => {
            const title = newTaskForm.querySelector("#title").value;
            const description = newTaskForm.querySelector("#description").value;
            const dueDate = new Date(
                newTaskForm.querySelector("#due-date").value,
            );
            const priority = newTaskForm.querySelector("#priority").value;

            const task = new Task(title, description, dueDate, priority);
            activeList.addTask(task);
            renderTasks();
        });

        dialog.showModal();
    }

    function renderEditTaskForm(task) {
        clearDialog();

        const editTaskForm = taskForm("Edit task");
        dialog.appendChild(editTaskForm);

        const closeButton = editTaskForm.querySelector("#form-close");
        closeButton.addEventListener("click", () => {
            dialog.close();
        });

        editTaskForm.querySelector("#title").value = task.name;
        editTaskForm.querySelector("#description").value = task.description;
        editTaskForm.querySelector("#due-date").valueAsDate = task.dueDate;
        editTaskForm.querySelector("#priority").value = task.priority;

        editTaskForm.addEventListener("submit", () => {
            task.name = editTaskForm.querySelector("#title").value;
            task.description = editTaskForm.querySelector("#description").value;
            task.dueDate = editTaskForm.querySelector("#due-date").valueAsDate;
            task.priority = editTaskForm.querySelector("#priority").value;

            renderTasks();
        });

        dialog.showModal();
    }

    function renderTasks() {
        newTaskButton.classList.remove("hidden");
        const taskWrapper = document.querySelector(".task-wrapper");
        taskWrapper.innerHTML = "";

        const activeList = ListStorage.getActiveList();
        const activeTasks = activeList.tasks;
        const completedTasks = activeList.completed;

        if (activeTasks.length > 0) {
            const activeTaskWrapper = document.createElement("ul");
            activeTaskWrapper.classList.add("task-list");

            const title = document.createElement("h2");
            title.textContent = `Active tasks (${activeTasks.length})`;

            activeTasks.forEach((task) => {
                const item = taskItem(
                    task.name,
                    task.id,
                    task.dueDate,
                    task.priority,
                    task.state,
                );

                activeTaskWrapper.appendChild(item);

                const deleteButton = item.querySelector(`#delete-${task.id}`);
                deleteButton.addEventListener("click", () => {
                    activeList.deleteTask(task);
                    renderTasks();
                });

                const editButton = item.querySelector(`#edit-${task.id}`);
                editButton.addEventListener("click", () => {
                    renderEditTaskForm(task);
                });

                const toggleButton = item.querySelector(`#toggle-${task.id}`);
                toggleButton.addEventListener("click", () => {
                    activeList.markTaskDone(task);
                    renderTasks();
                });
            });

            taskWrapper.appendChild(title);
            taskWrapper.appendChild(activeTaskWrapper);
        }

        if (completedTasks.length > 0) {
            const completedTaskWrapper = document.createElement("ul");
            completedTaskWrapper.classList.add("task-list");

            const title = document.createElement("h2");
            title.textContent = `Completed tasks (${completedTasks.length})`;

            completedTasks.forEach((task) => {
                const item = taskItem(
                    task.name,
                    task.id,
                    task.dueDate,
                    task.priority,
                    task.state,
                );

                completedTaskWrapper.appendChild(item);

                const deleteButton = item.querySelector(`#delete-${task.id}`);
                deleteButton.addEventListener("click", () => {
                    activeList.deleteCompletedTask(task);
                    renderTasks();
                });

                const editButton = item.querySelector(`#edit-${task.id}`);
                editButton.addEventListener("click", () => {
                    renderEditTaskForm(task);
                });

                const toggleButton = item.querySelector(`#toggle-${task.id}`);
                toggleButton.addEventListener("click", () => {
                    activeList.markTaskUndone(task);
                    renderTasks();
                });
            });

            taskWrapper.appendChild(title);
            taskWrapper.appendChild(completedTaskWrapper);
        }
    }

    function clearDialog() {
        dialog.innerHTML = "";
    }

    function clearTasks() {
        newTaskButton.classList.add("hidden");
        document.querySelector(".task-wrapper").innerHTML = "";
    }

    return {
        init,
    };
})();

export default DisplayController;
