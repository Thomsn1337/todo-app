import listForm from "../components/listForm";

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
        dialog.appendChild(listForm("New list"));

        const closeButton = dialog.querySelector("#form-close");
        closeButton.addEventListener("click", () => {
            dialog.close();
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
