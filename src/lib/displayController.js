import listForm from "../components/listForm";
import taskForm from "../components/taskForm";
import listItem from "../components/listItem";
import taskItem from "../components/taskItem";
import taskInfoDialog from "../components/taskInfoDialog";
import ListStorage from "./listStorage";
import TodoList from "./todoList";
import Task from "./task";
import StorageLoader from "./storageLoader";

const DisplayController = (function () {
    const dialog = document.querySelector("dialog");
    const newListButton = document.querySelector("#new-list");
    const newTaskButton = document.querySelector("#new-task");

    function init() {
        newListButton.addEventListener("click", () => {
            renderNewListForm();
            StorageLoader.update();
        });

        newTaskButton.addEventListener("click", () => {
            renderNewTaskForm();
            StorageLoader.update();
        });

        StorageLoader.init();

        renderLists();
        renderTasks();
    }

    function renderNewListForm() {
        clearDialog();

        const newListForm = listForm("New list");
        dialog.appendChild(newListForm);

        const closeButton = newListForm.querySelector("#form-close");
        closeButton.addEventListener("click", () => {
            dialog.close();
            clearDialog();
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
            clearDialog();
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
        const listWrapper = document.querySelector(".list-wrapper");
        listWrapper.innerHTML = "";

        const listTitle = document.createElement("h2");
        listTitle.textContent = `Lists (${ListStorage.lists.length})`;

        const listContainer = document.createElement("ul");

        const lists = ListStorage.lists;
        lists.forEach((list) => {
            const item = listItem(list.name, list.id);
            listContainer.appendChild(item);

            if (list.active) {
                item.classList.add("active");
            }

            const listName = item.querySelector(`#name-${list.id}`);
            listName.addEventListener("click", () => {
                ListStorage.resetActive();
                list.active = true;
                StorageLoader.update();
                renderLists();
                renderTasks();
            });

            const editButton = item.querySelector(`#edit-${list.id}`);
            editButton.addEventListener("click", () => {
                renderEditListForm(list);
                StorageLoader.update();
            });

            const deleteButton = item.querySelector(`#delete-${list.id}`);
            deleteButton.addEventListener("click", () => {
                ListStorage.deleteList(list);
                StorageLoader.update();
                renderLists();
                if (list.active) {
                    clearTasks();
                }
            });
        });

        listWrapper.appendChild(listTitle);
        listWrapper.appendChild(listContainer);
    }

    function renderNewTaskForm() {
        const activeList = ListStorage.getActiveList();

        clearDialog();
        const newTaskForm = taskForm("New Task");
        dialog.appendChild(newTaskForm);

        const closeButton = newTaskForm.querySelector("#form-close");
        closeButton.addEventListener("click", () => {
            dialog.close();
            clearDialog();
        });

        newTaskForm.addEventListener("submit", () => {
            const title = newTaskForm.querySelector("#title").value;
            const description = newTaskForm.querySelector("#description").value;
            console.log(newTaskForm.querySelector("#due-date").value);
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
            clearDialog();
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

    function renderTaskInfo(task) {
        clearDialog();
        dialog.id = "task-info";

        const taskInfo = taskInfoDialog(task);
        dialog.appendChild(taskInfo);

        const closeButton = taskInfo.querySelector("#form-close");
        closeButton.addEventListener("click", () => {
            dialog.close();
            clearDialog();
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
            const title = document.createElement("h2");
            title.textContent = `Active tasks (${activeTasks.length})`;
            title.id = "active-tasks";

            const activeTaskWrapper = document.createElement("ul");
            activeTaskWrapper.classList.add("task-list");

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
                    StorageLoader.update();
                    renderTasks();
                });

                const editButton = item.querySelector(`#edit-${task.id}`);
                editButton.addEventListener("click", () => {
                    StorageLoader.update();
                    renderEditTaskForm(task);
                });

                const infoButton = item.querySelector(`#info-${task.id}`);
                infoButton.addEventListener("click", () => {
                    renderTaskInfo(task);
                });

                const toggleButton = item.querySelector(`#toggle-${task.id}`);
                toggleButton.addEventListener("click", () => {
                    activeList.markTaskDone(task);
                    StorageLoader.update();
                    renderTasks();
                });
            });

            taskWrapper.appendChild(title);
            taskWrapper.appendChild(activeTaskWrapper);
        }

        if (completedTasks.length > 0) {
            const title = document.createElement("h2");
            title.textContent = `Completed tasks (${completedTasks.length})`;
            title.id = "completed-tasks";

            const completedTaskWrapper = document.createElement("ul");
            completedTaskWrapper.classList.add("task-list");

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
                    StorageLoader.update();
                    renderTasks();
                });

                const editButton = item.querySelector(`#edit-${task.id}`);
                editButton.addEventListener("click", () => {
                    StorageLoader.update();
                    renderEditTaskForm(task);
                });

                const infoButton = item.querySelector(`#info-${task.id}`);
                infoButton.addEventListener("click", () => {
                    renderTaskInfo(task);
                });

                const toggleButton = item.querySelector(`#toggle-${task.id}`);
                toggleButton.addEventListener("click", () => {
                    activeList.markTaskUndone(task);
                    StorageLoader.update();
                    renderTasks();
                });
            });

            taskWrapper.appendChild(title);
            taskWrapper.appendChild(completedTaskWrapper);
        }
    }

    function clearDialog() {
        dialog.innerHTML = "";
        dialog.id = "";
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
