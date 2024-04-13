function listItem(name, id) {
    const item = document.createElement("li");
    item.classList.add("list-item");
    item.dataset.id = id;

    const listName = document.createElement("p");
    listName.textContent = name;
    listName.id = `name-${id}`;

    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("list-button-wrapper")

    const editButton = document.createElement("ion-icon");
    editButton.name = "create-outline";
    editButton.id = `edit-${id}`;

    const deleteButton = document.createElement("ion-icon");
    deleteButton.name = "trash-outline";
    deleteButton.id = `delete-${id}`;

    buttonWrapper.appendChild(editButton);
    buttonWrapper.appendChild(deleteButton);

    item.appendChild(listName);
    item.appendChild(buttonWrapper);

    return item;
}

export default listItem;
