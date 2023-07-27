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
        _projectTasks.push(Task('test', 'test2', 'test3', 'test4'));
    };

    function getTasks() {
        return _projectTasks;
    };

    return {getName, setName, pushTask, getTasks};
};

export default Project;