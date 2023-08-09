import Todo from "./todo";

const Storage = (() => {

    function loadProjects() {
        //Add Checking if the data exists or not
        const todo = JSON.parse(localStorage.getItem('todo'));
        const names = todo.map(obj => obj._name);
        return names;
    }

    return {loadProjects}
})();

export default Storage;