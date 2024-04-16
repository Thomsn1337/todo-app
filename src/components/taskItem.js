import { format } from "date-fns";

function taskItem(name, id, dueDate, priority, state) {
    const item = document.createElement("li");
    item.classList.add("task-item");
    item.classList.add(`priority-${priority}`);
    item.dataset.id = id;

    const taskName = document.createElement("p");
    taskName.textContent = name;
    taskName.id = `name-${id}`;
    taskName.classList.add("task-name");

    const taskDueDate = document.createElement("p");
    taskDueDate.textContent = format(dueDate, "dd MMM yyyy");
    taskDueDate.id = `date-${id}`;
    taskDueDate.classList.add("date");

    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("task-button-wrapper");

    const deleteButton = document.createElement("ion-icon");
    deleteButton.name = "trash-outline";
    deleteButton.id = `delete-${id}`;
    deleteButton.title = "Delete task";

    const editButton = document.createElement("ion-icon");
    editButton.name = "create-outline";
    editButton.id = `edit-${id}`;
    editButton.title = "Edit task";

    const infoButton = document.createElement("ion-icon");
    infoButton.name = "information-circle-outline";
    infoButton.id = `info-${id}`;
    infoButton.title = "Show info";

    const toggleButton = document.createElement("ion-icon");
    if (state === "progress") {
        toggleButton.name = "checkmark-circle-outline";
        toggleButton.title = "Mark done";
    } else if (state === "done") {
        toggleButton.name = "close-circle-outline";
        toggleButton.title = "Mark undone";
    }
    toggleButton.id = `toggle-${id}`;

    buttonWrapper.appendChild(deleteButton);
    buttonWrapper.appendChild(editButton);
    buttonWrapper.appendChild(infoButton);
    buttonWrapper.appendChild(toggleButton);

    item.appendChild(taskName);
    item.appendChild(taskDueDate);
    item.appendChild(buttonWrapper);

    return item;
}

export default taskItem;
