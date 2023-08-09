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

    return {getName, setName, pushTask, getTasks, _name};
};

export default Project;