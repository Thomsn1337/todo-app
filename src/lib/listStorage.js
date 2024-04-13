const ListStorage = (function () {
    const lists = [];

    function addNewList(list) {
        lists.push(list);
    }

    return {
        lists,
        addNewList,
    };
})();

export default ListStorage;
