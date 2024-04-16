import inputField from "./inputField";
import textareaField from "./textareaField";
import selectField from "./selectField";

function taskForm(title) {
    const form = document.createElement("form");
    form.method = "dialog";

    const formHeader = document.createElement("div");
    formHeader.classList.add("form-header");

    const formTitle = document.createElement("h2");
    formTitle.textContent = title;

    const closeIcon = document.createElement("ion-icon");
    closeIcon.name = "close-circle-outline";
    closeIcon.id = "form-close";

    formHeader.appendChild(formTitle);
    formHeader.appendChild(closeIcon);

    const titleInput = inputField("Title");
    const descriptionInput = textareaField("Description");
    const dueDateInput = inputField("Due date", "date");
    const priorityInput = selectField("Priority", ["low", "medium", "high"]);

    const submitButton = document.createElement("button");
    submitButton.classList.add("submit");
    submitButton.id = "list-submit";
    submitButton.type = "submit";
    submitButton.textContent = "Save";

    form.appendChild(formHeader);
    form.appendChild(titleInput);
    form.appendChild(descriptionInput);
    form.appendChild(dueDateInput);
    form.appendChild(priorityInput);
    form.appendChild(submitButton);

    return form;
}

export default taskForm;
