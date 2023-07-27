import Todo from "./todo.js";

//Master Page
function loadPage() {
    loadProjects();
    activeProject('personal');
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
    projectButton.addEventListener('click', (e) => {
        activeProject(e);
    });
    sidebar.appendChild(projectButton);
}

function createNewProjectButton() {
    const sidebar = document.getElementById('sidebar');
    const newProjectButton = document.createElement('button');
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

function activeProject(e) {
    const projectButtons = document.querySelectorAll('.project');
    projectButtons.forEach(button => button.classList.remove('active'));
    if(e == 'personal'){
        projectButtons[0].classList.add('active');
    } else {
        e.target.classList.add('active');
    }
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
