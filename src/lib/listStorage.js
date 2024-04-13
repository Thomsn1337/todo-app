const ListStorage = (function () {
    const lists = [];

    function addNewList(list) {
        lists.push(list);
    }

    function deleteList(list) {
        const index = getListIndex(list);
        lists.splice(index, 1);
    }

    function getListIndex(list) {
        return lists.indexOf(list);
    }

    function getActiveList() {
        return lists.find((list) => list.active === true);
    }

    function resetActive() {
        const activeList = getActiveList();
        if (!activeList) {
            return;
        }

        activeList.active = false;
    }

    return {
        lists,
        addNewList,
        deleteList,
        resetActive,
    };
})();

export default ListStorage;
