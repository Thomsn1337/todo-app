import inputField from "./inputField";

function listForm(title) {
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

    const nameInput = inputField("List name");

    const submitButton = document.createElement("button");
    submitButton.classList.add("submit");
    submitButton.id = "list-submit";
    submitButton.type = "submit";
    submitButton.textContent = "Save";

    form.appendChild(formHeader);
    form.appendChild(nameInput);
    form.appendChild(submitButton);

    return form;
}

export default listForm;
