import listForm from "../components/listForm";
import listItem from "../components/listItem";
import TodoList from "./todoList";
import ListStorage from "./listStorage";

const DisplayController = (function () {
    const dialog = document.querySelector("dialog");
    const newListButton = document.querySelector("#new-list");

    function init() {
        if (ListStorage.lists.length === 0) {
            ListStorage.addNewList(new TodoList("Default"));
            renderLists();
        }

        newListButton.addEventListener("click", () => {
            renderNewListForm();
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
            });

            const editButton = item.querySelector(`#edit-${list.id}`);
            editButton.addEventListener("click", () => {
                renderEditListForm(list);
            });

            const deleteButton = item.querySelector(`#delete-${list.id}`);
            deleteButton.addEventListener("click", () => {
                ListStorage.deleteList(list);
                renderLists();
            });
        });
    }

    function clearDialog() {
        dialog.innerHTML = "";
    }

    return {
        init,
    };
})();

export default DisplayController;
