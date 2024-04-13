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

    return {
        lists,
        addNewList,
        deleteList,
    };
})();

export default ListStorage;
