import listForm from "../components/listForm";
import listItem from "../components/listItem";
import TodoList from "./todoList";
import ListStorage from "./listStorage";

const DisplayController = (function () {
    const dialog = document.querySelector("dialog");
    const newListButton = document.querySelector("#new-list");

    function init() {
        newListButton.addEventListener("click", () => {
            renderNewListForm();
        });
    }

    function renderNewListForm() {
        clearDialog();

        const newListForm = listForm("New List");
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

    function renderLists() {
        const listWrapper = document.querySelector(".list-wrapper ul");
        listWrapper.innerHTML = "";

        const lists = ListStorage.lists;
        lists.forEach((list) => {
            const item = listItem(list.name, list.id);
            listWrapper.appendChild(item);

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
        renderLists,
    };
})();

export default DisplayController;
