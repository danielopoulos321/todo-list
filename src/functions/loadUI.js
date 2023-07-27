import Todo from "./todo.js";

//Master Page
function loadPage() {
    loadProjects();
    createNewTaskButton();
}

//Project Related DOM
function loadProjects() {
    clear('sidebar');
    Todo.getProjects().forEach((project) => {
        createProjects(project.getName());
    });
    createNewProjectButton();
}

function createProjects(name) {
    const sidebar = document.getElementById('sidebar');
    const projectButton = document.createElement('button');
    projectButton.classList.add('project');
    projectButton.textContent = name;
    sidebar.appendChild(projectButton);
}

function createNewProjectButton() {
    const sidebar = document.getElementById('sidebar');
    const newProjectButton = document.createElement('button');
    newProjectButton.classList.add('project');
    newProjectButton.textContent = '+ Project';
    newProjectButton.addEventListener('click', () => {
        const projectName = window.prompt('Enter the project name:');
        if (projectName) {
            Todo.addProject(projectName);
            loadProjects();
        }
    });
    sidebar.appendChild(newProjectButton);
}

//Task Related DOM
function createNewTaskButton(){
    const content = document.getElementById('content');
    const newTaskButton = document.createElement('button');
    newTaskButton.textContent = '+ To-Do';
    content.appendChild(newTaskButton);
}


//Helper Functions
function clear(divName) {
    const div = document.getElementById(divName);
    if (div.innerHTML !== '') {
        div.innerHTML = '';
    }
}

export { loadPage };
