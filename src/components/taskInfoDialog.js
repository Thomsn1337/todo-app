import { format } from "date-fns";

function taskInfoDialog(task) {
    const content = document.createElement("div");
    content.classList.add("task-info");

    const dialogHeader = document.createElement("div");
    dialogHeader.classList.add("form-header");

    const dialogTitle = document.createElement("h2");
    dialogTitle.textContent = "Information";

    const closeIcon = document.createElement("ion-icon");
    closeIcon.name = "close-circle-outline";
    closeIcon.id = "form-close";

    dialogHeader.appendChild(dialogTitle);
    dialogHeader.appendChild(closeIcon);

    const nameWrapper = document.createElement("div");
    nameWrapper.classList.add("info-wrapper");

    const nameLabel = document.createElement("h3");
    nameLabel.textContent = "Task name";

    const taskName = document.createElement("p");
    taskName.textContent = task.name;

    nameWrapper.appendChild(nameLabel);
    nameWrapper.appendChild(taskName);

    const descWrapper = document.createElement("div");
    descWrapper.classList.add("info-wrapper");

    const descriptionLabel = document.createElement("h3");
    descriptionLabel.textContent = "Description";

    const taskDescription = document.createElement("p");
    taskDescription.id = "task-desc";
    if (task.description === "") {
        taskDescription.textContent = "No description provided...";
    } else {
        taskDescription.textContent = task.description;
    }

    descWrapper.appendChild(descriptionLabel);
    descWrapper.appendChild(taskDescription);

    const dateWrapper = document.createElement("div");
    dateWrapper.classList.add("info-wrapper");

    const dateLabel = document.createElement("h3");
    dateLabel.textContent = "Due date";

    const taskDate = document.createElement("p");
    taskDate.textContent = format(task.dueDate, "dd MMMM yyyy");

    dateWrapper.appendChild(dateLabel);
    dateWrapper.appendChild(taskDate);

    const prioWrapper = document.createElement("div");
    prioWrapper.classList.add("info-wrapper");

    const priorityLabel = document.createElement("h3");
    priorityLabel.textContent = "Priority";

    const taskPriority = document.createElement("p");
    taskPriority.textContent =
        task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

    prioWrapper.appendChild(priorityLabel);
    prioWrapper.appendChild(taskPriority);

    const stateWrapper = document.createElement("div");
    stateWrapper.classList.add("info-wrapper");

    const stateLabel = document.createElement("h3");
    stateLabel.textContent = "State";

    const taskState = document.createElement("p");
    if (task.state === "progress") {
        taskState.textContent = "In progress";
    } else if (task.state === "done") {
        taskState.textContent = "Completed";
    }

    stateWrapper.appendChild(stateLabel);
    stateWrapper.appendChild(taskState);

    content.appendChild(dialogHeader);
    content.appendChild(nameWrapper);
    content.appendChild(descWrapper);
    content.appendChild(dateWrapper);
    content.appendChild(prioWrapper);
    content.appendChild(stateWrapper);

    return content;
}

export default taskInfoDialog;
