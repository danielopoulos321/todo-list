import Storage from "./storage.js";
import { format, parseISO } from 'date-fns';
import Delete from "/src/assets/delete.svg";
import Edit from "/src/assets/edit.svg";
import Info from "/src/assets/info.svg";

//Master Page
function loadPage() {
    loadProjects();
    activeProject('personal');
    loadProjectTasks('Personal');
    createNewTaskButton();
}

//Project DOM 
function loadProjects() {
    clear('projects');
    Storage.getProjects().forEach((project) => {
        createProjects(project.getName());
    });
    createNewProjectButton();    
}

function createProjects(name) {
    const projects = document.getElementById('projects');
    const projectButton = document.createElement('button');
    projectButton.classList.add('project');
    projectButton.textContent = name;
    projectButton.dataset.name = name.replace(/\s/g, "");
    projectButton.addEventListener('click', function(e) {
        activeProject(this.dataset.name);
        loadProjectTasks(e.target.textContent);
    });
    projects.appendChild(projectButton);
}

function createNewProjectButton() {
    const sidebar = document.getElementById('projects');
    const newProjectButton = document.createElement('button');
    newProjectButton.textContent = '+ Project';
    newProjectButton.classList.add('project');
    newProjectButton.addEventListener('click', () => {
        const projectModal = document.getElementById('projectModal');
        projectModal.style.display = 'block';
    });
    sidebar.appendChild(newProjectButton);
}

function activeProject(e) {
    const projectButtons = document.querySelectorAll('.project');
    const projectName = document.getElementById('currentProject');
    projectButtons.forEach(button => button.classList.remove('active'));
    if(e == 'personal'){
        projectButtons[0].classList.add('active');
        projectName.innerHTML = projectButtons[0].dataset.name;
    } else if (typeof e === 'string') {
        let dataName = e.replace(/\s/g, "");
        const currentProject = document.querySelector(`[data-name=${dataName}]`);
        currentProject.classList.add('active');
        projectName.innerHTML = currentProject.dataset.name;
    } else {
        e.target.classList.add('active');
    }
}

//Task DOM
function createNewTaskButton(){
    const header = document.getElementById('header');
    const newTaskButton = document.createElement('button');
    newTaskButton.textContent = '+ To-Do';
    newTaskButton.setAttribute('id', 'newTask');
    newTaskButton.addEventListener('click', () => {
        const taskModal = document.getElementById('taskModal');
        taskModal.style.display = 'block';
    });
    header.appendChild(newTaskButton);
}

function loadProjectTasks (projectName) {
    const content = document.getElementById('tasks');
    content.innerHTML = '';
    const allTasks = Storage.loadTodo().getProject(projectName).getTasks();
    allTasks.forEach((task, index) => {
        const newTask = document.createElement('div');
        newTask.classList.add('task');

        const leftSide = document.createElement('div');
        leftSide.classList.add('leftSide');
        const rightSide = document.createElement('div');
        rightSide.classList.add('rightSide');

        const name = document.createElement('h2');
        const date = document.createElement('h3');
        const notes = document.createElement('p');
        notes.classList.add('notes');

        name.textContent = task.getTitle();
        date.textContent = format(parseISO(task.getDueDate()), 'MMM dd');
        notes.textContent = task.getDescription();
        newTask.classList.add(`priority-${task.getPriority()}`);

        const edit = new Image();
        edit.src = Edit;
        edit.classList.add('edit');
        edit.dataset.taskIndex = index;       

        const remove = new Image();
        remove.src = Delete;
        remove.classList.add('remove');
        remove.dataset.taskIndex = index;

        const info = new Image();
        info.src = Info;
        info.classList.add('info');
        info.dataset.taskIndex = index;

        leftSide.appendChild(name);
        rightSide.appendChild(date);
        rightSide.appendChild(info);
        rightSide.appendChild(edit);
        rightSide.appendChild(remove);
        newTask.appendChild(leftSide);
        newTask.appendChild(rightSide);
        content.appendChild(newTask);
    })
}

//Event Listeners
    //Add Project Button
const projectForm = document.getElementById('projectForm');
projectForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let projectName = document.getElementById('projectName');
    Storage.addProject(projectName.value);
    loadProjects();
    activeProject(projectName.value);
    resetForm('project');
});

//Task Submission Button
const taskForm = document.getElementById('taskForm');
let editingTask = null;
let currentIndex = null;
taskForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let name = document.getElementById('taskName').value;
    let notes = document.getElementById('taskNotes').value;
    let date = document.getElementById('taskDate').value;
    let priority = document.getElementById('priority').value;
    const currentProject = document.querySelector('.active').textContent;

    if (editingTask){
        Storage.updateTask(currentProject, currentIndex, name, notes, date, priority);
        editingTask = null;
        currentIndex = null;
    } else {
        Storage.addTask(currentProject, name, notes, date, priority);
    }
    loadProjectTasks(currentProject);
    resetForm('task');
});

//Edit Task Buttons
const taskContent = document.getElementById('tasks');
taskContent.addEventListener('click', function(e) {
    if (e.target.classList.contains('edit')) {
        currentIndex = e.target.dataset.taskIndex;
        const currentProject = document.querySelector('.active').textContent;
        editingTask = Storage.getTask(currentProject, currentIndex);
        document.getElementById('taskName').value = editingTask.getTitle();
        document.getElementById('taskNotes').value = editingTask.getDescription();
        document.getElementById('taskDate').value = editingTask.getDueDate();
        document.getElementById('priority').value = editingTask.getPriority();
        toggleModal('task');
    }
})

//Remove Task Buttons
taskContent.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove')) {
        currentIndex = e.target.dataset.taskIndex;
        const currentProject = document.querySelector('.active').textContent;
        Storage.deleteTask(currentProject, currentIndex);
        currentIndex = null;
        loadProjectTasks(currentProject);
    }
})

//Info Buttons
taskContent.addEventListener('click', function(e) {
    if (e.target.classList.contains('info')) {
        currentIndex = e.target.dataset.taskIndex;
        const currentProject = document.querySelector('.active').textContent;
        editingTask = Storage.getTask(currentProject, currentIndex);
        document.getElementById('infoDetails').textContent = editingTask.getDescription();
        toggleModal('info');
    }
})

//Modal Close Buttons
const projectClose = document.getElementById('projectClose');
const taskClose = document.getElementById('taskClose');
const infoClose = document.getElementById('infoClose');
projectClose.addEventListener('click', () => resetForm('project'));
taskClose.addEventListener('click', () => resetForm('task'));
infoClose.addEventListener('click', () => toggleModal('info'));


//Helper Functions
function clear(divName) {
    const div = document.getElementById(divName);
    if (div.innerHTML !== '') {
        div.innerHTML = '';
    }
};

function toggleModal(choice){
    const modal = document.getElementById(`${choice}Modal`);
    if (modal.style.display == 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
    }
}

function resetForm(choice){
    toggleModal(choice);
    const form = document.getElementById(`${choice}Form`);
    form.reset();
}

export { loadPage };
