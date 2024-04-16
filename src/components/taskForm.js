import inputField from "./inputField";
import selectField from "./selectField";

function taskForm() {
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

    return form;
}

export default taskForm;
