import listForm from "../components/listForm";
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
        });

        dialog.showModal();
    }

    function clearDialog() {
        dialog.innerHTML = "";
    }

    return {
        init,
    };
})();

export default DisplayController;
