import Task from "./task";

const Project = (name) => {
    let _name = name;
    let _projectTasks = [];

    function getName() {
        return _name;
    };

    function setName(value) {
        _name = value;
    };

    function pushTask(title, description, dueDate, priority) {
        _projectTasks.push(Task(title, description, dueDate, priority));
    };

    function getTasks() {
        return _projectTasks;
    };

    function deleteTask(index) {
        _projectTasks.splice(index, 1);
    }

    function toJSON() {
        return {
            name: _name,
            projectTasks: _projectTasks.map(task => task.toJSON())
        };
    }

    return {getName, setName, pushTask, getTasks, _name, toJSON, deleteTask};
};

export default Project;