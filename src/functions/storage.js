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

    function addTask(currentProject, taskName, taskDescription, taskDate, taskPriority) {
        const todoList = loadTodo();
        todoList.getProject(currentProject).pushTask(taskName, taskDescription, taskDate, taskPriority);
        saveTodo(todoList);
    }

    function getTask(currentProject, index) {
        const todoList = loadTodo();
        return todoList.getProject(currentProject).getTasks()[index];
    }

    function updateTask(currentProject, index, taskName, taskDescription, taskDate, taskPriority) {
        const todoList = loadTodo();
        todoList.getProject(currentProject).getTasks()[index].setTitle(taskName);
        todoList.getProject(currentProject).getTasks()[index].setDescription(taskDescription);
        todoList.getProject(currentProject).getTasks()[index].setDueDate(taskDate);
        todoList.getProject(currentProject).getTasks()[index].setPriority(taskPriority);
        saveTodo(todoList);
    }

    function deleteTask(currentProject, currentIndex) {
        const todoList = loadTodo();
        todoList.getProject(currentProject).deleteTask(currentIndex);
        saveTodo(todoList);
    }


    return {loadTodo, addProject, getProjects, addTask, getTask, updateTask, deleteTask}
})();

export default Storage;