import Todo from "./todo";
import Project from "./projects";

const Storage = (() => {

    function loadTodo() {
        const serializedTodo = JSON.parse(localStorage.getItem('todo'));

        const todo = Todo();
        if (serializedTodo) {
            let newTodo = serializedTodo.projects.map(projectData => {
                const project = Project(projectData.name);

                projectData.projectTasks.forEach(taskData => {
                    project.pushTask(taskData.title, taskData.description, taskData.dueDate, taskData.priority);
                });
                return project;
            });
            todo.setProjects(newTodo);
        }
        return todo;
    }

    function saveTodo(data) {
        localStorage.setItem('todo', JSON.stringify(data));
    }

    function addProject(project) {
        const todoList = loadTodo();
        todoList.addProject(project);
        saveTodo(todoList);
    }

    function getProjects() {
        const todoList = loadTodo();
        return todoList.getProjects();
    }


    return {loadTodo, addProject, getProjects}
})();

export default Storage;