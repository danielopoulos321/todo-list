import Todo from "./todo.js";

//Master Page
function loadPage() {
    loadProjects();
    activeProject('personal');
    loadProjectTasks('Personal');
    createNewTaskButton();
}

//Project DOM 
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
    projectButton.dataset.name = name;
    projectButton.addEventListener('click', (e) => {
        activeProject(e);
        loadProjectTasks(e.target.textContent);
    });
    sidebar.appendChild(projectButton);
}

function createNewProjectButton() {
    const sidebar = document.getElementById('sidebar');
    const newProjectButton = document.createElement('button');
    newProjectButton.textContent = '+ Project';
    newProjectButton.addEventListener('click', () => {
        const projectModal = document.getElementById('projectModal');
        projectModal.style.display = 'block';
    });
    sidebar.appendChild(newProjectButton);
}

function activeProject(e) {
    const projectButtons = document.querySelectorAll('.project');
    projectButtons.forEach(button => button.classList.remove('active'));
    if(e == 'personal'){
        projectButtons[0].classList.add('active');
    } else if (typeof e === 'string') {
        const currentProject = document.querySelector(`[data-name=${e}]`);
        currentProject.classList.add('active');
    } else {
        e.target.classList.add('active');
    }
}

//Task DOM
function createNewTaskButton(){
    const content = document.getElementById('header');
    const newTaskButton = document.createElement('button');
    newTaskButton.textContent = '+ To-Do';
    newTaskButton.addEventListener('click', () => {
        const currentProject = document.querySelector('.active').textContent;
        Todo.getProject(currentProject).pushTask('test', 'test2', 'test3', 'test4');
        loadProjectTasks(currentProject);
    });
    content.appendChild(newTaskButton);
}

function loadProjectTasks (projectName) {
    const content = document.getElementById('content');
    content.innerHTML = '';
    const allTasks = Todo.getProject(projectName).getTasks();
    allTasks.forEach((task) => {
        const newTask = document.createElement('div');
        const name = document.createElement('h1');
        name.textContent = task.getTitle();
        newTask.appendChild(name);
        content.appendChild(newTask);
    })
}

//Event Listeners
const projectForm = document.getElementById('newProject');
projectForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let title = document.getElementById('title').value;
    Todo.addProject(title);
    loadProjects();
    activeProject(title);
    toggleProjectModal();
});

const closeBTNs = document.querySelectorAll('.close');
closeBTNs.forEach((button) => {
    button.addEventListener('click', toggleProjectModal);
});



//Helper Functions
function clear(divName) {
    const div = document.getElementById(divName);
    if (div.innerHTML !== '') {
        div.innerHTML = '';
    }
};

function toggleProjectModal(){
    const projectModal = document.getElementById('projectModal');
    if (projectModal.style.display == 'block') {
        projectModal.style.display = 'none';
    } else {
        projectModal.style.display = 'block';
    }
}

export { loadPage };
