/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/functions/loadUI.js":
/*!*********************************!*\
  !*** ./src/functions/loadUI.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadPage: () => (/* binding */ loadPage)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./src/functions/storage.js");


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
    _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].getProjects().forEach((project) => {
        createProjects(project.getName());
    });
    createNewProjectButton();
}

function createProjects(name) {
    const sidebar = document.getElementById('sidebar');
    const projectButton = document.createElement('button');
    projectButton.classList.add('project');
    projectButton.textContent = name;
    projectButton.dataset.name = name.replace(/\s/g, "");
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
        let dataName = e.replace(/\s/g, "");
        const currentProject = document.querySelector(`[data-name=${dataName}]`);
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
        const taskModal = document.getElementById('taskModal');
        taskModal.style.display = 'block';
    });
    content.appendChild(newTaskButton);
}

function loadProjectTasks (projectName) {
    const content = document.getElementById('content');
    content.innerHTML = '';
    const allTasks = _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].loadTodo().getProject(projectName).getTasks();
    allTasks.forEach((task) => {
        const newTask = document.createElement('div');
        newTask.classList.add('task')
        const name = document.createElement('h1');
        const date = document.createElement('h3');
        const notes = document.createElement('p');
        const priority = document.createElement('p');
        name.textContent = task.getTitle();
        date.textContent = task.getDueDate();
        notes.textContent = task.getDescription();
        priority.textContent = task.getPriority();
        newTask.appendChild(name);
        newTask.appendChild(date);
        newTask.appendChild(notes);
        newTask.appendChild(priority);
        content.appendChild(newTask);
    })
}

//Event Listeners
    //Add Project Button
const projectForm = document.getElementById('projectForm');
projectForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let projectName = document.getElementById('projectName');
    _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].addProject(projectName.value);
    loadProjects();
    activeProject(projectName.value);
    resetForm('project');
});

    //Add Task Button
const taskForm = document.getElementById('taskForm');
taskForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let name = document.getElementById('taskName').value;
    let notes = document.getElementById('taskNotes').value;
    let date = document.getElementById('taskDate').value;
    let priority = document.getElementById('priority').value;
    const currentProject = document.querySelector('.active').textContent;
    _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].addTask(currentProject, name, notes, date, priority);
    loadProjectTasks(currentProject);
    resetForm('task');
});

    //Modal Close Buttons
const projectClose = document.getElementById('projectClose');
const taskClose = document.getElementById('taskClose');
projectClose.addEventListener('click', () => toggleModal('project'));
taskClose.addEventListener('click', () => toggleModal('task'));


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




/***/ }),

/***/ "./src/functions/projects.js":
/*!***********************************!*\
  !*** ./src/functions/projects.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/functions/task.js");


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
        _projectTasks.push((0,_task__WEBPACK_IMPORTED_MODULE_0__["default"])(title, description, dueDate, priority));
    };

    function getTasks() {
        return _projectTasks;
    };

    function toJSON() {
        return {
            name: _name,
            projectTasks: _projectTasks.map(task => task.toJSON())
        };
    }

    return {getName, setName, pushTask, getTasks, _name, toJSON};
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);

/***/ }),

/***/ "./src/functions/storage.js":
/*!**********************************!*\
  !*** ./src/functions/storage.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ "./src/functions/todo.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ "./src/functions/projects.js");



const Storage = (() => {

    function loadTodo() {
        const serializedTodo = JSON.parse(localStorage.getItem('todo'));

        const todo = (0,_todo__WEBPACK_IMPORTED_MODULE_0__["default"])();
        if (serializedTodo) {
            let newTodo = serializedTodo.projects.map(projectData => {
                const project = (0,_projects__WEBPACK_IMPORTED_MODULE_1__["default"])(projectData.name);

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

    function addTask(currentProject, taskName, taskNotes, taskDate, taskDescription) {
        const todoList = loadTodo();
        todoList.getProject(currentProject).pushTask(taskName, taskNotes, taskDate, taskDescription);
        saveTodo(todoList);
    }


    return {loadTodo, addProject, getProjects, addTask}
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Storage);

/***/ }),

/***/ "./src/functions/task.js":
/*!*******************************!*\
  !*** ./src/functions/task.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Task = (title, description, dueDate, priority) => {

    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority;

    function getTitle(){
        return _title;
    };

    function getDescription(){
        return _description;
    };

    function getDueDate(){
        return _dueDate;
    };

    function getPriority(){
        return _priority;
    };

    function setTitle(value){
        _title = value;
    };

    function setDescription(value){
        _description = value;
    };


    function setDueDate(value){
        _dueDate = value;
    };

    function setPriority(value){
        _priority = value;
    };

    function toString(){
        return _title + ' ' + _description + ' ' + _dueDate + ' ' + _priority;
    }

    function toJSON() {
        return {
            title: _title, 
            description: _description,
            dueDate: _dueDate,
            priority: _priority
        };
    }

    return {getTitle, setTitle, getDescription, setDescription, 
        getDueDate, setDueDate, getPriority, setPriority, toString, toJSON};
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Task);

/***/ }),

/***/ "./src/functions/todo.js":
/*!*******************************!*\
  !*** ./src/functions/todo.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/functions/projects.js");


const Todo = () => {
    let projects = [];
    projects.push((0,_projects__WEBPACK_IMPORTED_MODULE_0__["default"])('Personal'));
    projects.push((0,_projects__WEBPACK_IMPORTED_MODULE_0__["default"])('Work'));
    projects.push((0,_projects__WEBPACK_IMPORTED_MODULE_0__["default"])('Travel'));


    function getProjects(){
        return projects;
    }

    function setProjects(array) {
        projects = array;
    }

    function getProject(projectName) {
        return projects.find((project) => project.getName() === projectName);
    }

    function addProject(projectName) {
        if (projects.find((project) => project.getName() === projectName))
            return
        projects.push((0,_projects__WEBPACK_IMPORTED_MODULE_0__["default"])(projectName));
    }

    function toJSON() {
        return {
            projects: projects.map(project => project.toJSON())
        };
    }

    return {getProjects, getProject, addProject, setProjects, toJSON}
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Todo);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functions_loadUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/loadUI */ "./src/functions/loadUI.js");


_functions_loadUI__WEBPACK_IMPORTED_MODULE_0__.loadPage();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBOztBQUVBLFlBQVk7QUFDWjs7QUFFQSxpRUFBZSxJQUFJOzs7Ozs7VUNwQ25CO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNONkM7O0FBRTdDLHVEQUFlLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZnVuY3Rpb25zL2xvYWRVSS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZnVuY3Rpb25zL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZnVuY3Rpb25zL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Z1bmN0aW9ucy90b2RvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3RvcmFnZSBmcm9tIFwiLi9zdG9yYWdlLmpzXCI7XG5cbi8vTWFzdGVyIFBhZ2VcbmZ1bmN0aW9uIGxvYWRQYWdlKCkge1xuICAgIGxvYWRQcm9qZWN0cygpO1xuICAgIGFjdGl2ZVByb2plY3QoJ3BlcnNvbmFsJyk7XG4gICAgbG9hZFByb2plY3RUYXNrcygnUGVyc29uYWwnKTtcbiAgICBjcmVhdGVOZXdUYXNrQnV0dG9uKCk7XG59XG5cbi8vUHJvamVjdCBET00gXG5mdW5jdGlvbiBsb2FkUHJvamVjdHMoKSB7XG4gICAgY2xlYXIoJ3NpZGViYXInKTsgICAgXG4gICAgU3RvcmFnZS5nZXRQcm9qZWN0cygpLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgICAgY3JlYXRlUHJvamVjdHMocHJvamVjdC5nZXROYW1lKCkpO1xuICAgIH0pO1xuICAgIGNyZWF0ZU5ld1Byb2plY3RCdXR0b24oKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdHMobmFtZSkge1xuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZWJhcicpO1xuICAgIGNvbnN0IHByb2plY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBwcm9qZWN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QnKTtcbiAgICBwcm9qZWN0QnV0dG9uLnRleHRDb250ZW50ID0gbmFtZTtcbiAgICBwcm9qZWN0QnV0dG9uLmRhdGFzZXQubmFtZSA9IG5hbWUucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICAgIHByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBhY3RpdmVQcm9qZWN0KGUpO1xuICAgICAgICBsb2FkUHJvamVjdFRhc2tzKGUudGFyZ2V0LnRleHRDb250ZW50KTtcbiAgICB9KTtcbiAgICBzaWRlYmFyLmFwcGVuZENoaWxkKHByb2plY3RCdXR0b24pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOZXdQcm9qZWN0QnV0dG9uKCkge1xuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZWJhcicpO1xuICAgIGNvbnN0IG5ld1Byb2plY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBuZXdQcm9qZWN0QnV0dG9uLnRleHRDb250ZW50ID0gJysgUHJvamVjdCc7XG4gICAgbmV3UHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RNb2RhbCcpO1xuICAgICAgICBwcm9qZWN0TW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfSk7XG4gICAgc2lkZWJhci5hcHBlbmRDaGlsZChuZXdQcm9qZWN0QnV0dG9uKTtcbn1cblxuZnVuY3Rpb24gYWN0aXZlUHJvamVjdChlKSB7XG4gICAgY29uc3QgcHJvamVjdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdCcpO1xuICAgIHByb2plY3RCdXR0b25zLmZvckVhY2goYnV0dG9uID0+IGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgaWYoZSA9PSAncGVyc29uYWwnKXtcbiAgICAgICAgcHJvamVjdEJ1dHRvbnNbMF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbGV0IGRhdGFOYW1lID0gZS5yZXBsYWNlKC9cXHMvZywgXCJcIik7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtbmFtZT0ke2RhdGFOYW1lfV1gKTtcbiAgICAgICAgY3VycmVudFByb2plY3QuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxufVxuXG4vL1Rhc2sgRE9NXG5mdW5jdGlvbiBjcmVhdGVOZXdUYXNrQnV0dG9uKCl7XG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXInKTtcbiAgICBjb25zdCBuZXdUYXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgbmV3VGFza0J1dHRvbi50ZXh0Q29udGVudCA9ICcrIFRvLURvJztcbiAgICBuZXdUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCB0YXNrTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza01vZGFsJyk7XG4gICAgICAgIHRhc2tNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9KTtcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tCdXR0b24pO1xufVxuXG5mdW5jdGlvbiBsb2FkUHJvamVjdFRhc2tzIChwcm9qZWN0TmFtZSkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpO1xuICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgY29uc3QgYWxsVGFza3MgPSBTdG9yYWdlLmxvYWRUb2RvKCkuZ2V0UHJvamVjdChwcm9qZWN0TmFtZSkuZ2V0VGFza3MoKTtcbiAgICBhbGxUYXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1Rhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbmV3VGFzay5jbGFzc0xpc3QuYWRkKCd0YXNrJylcbiAgICAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICBjb25zdCBub3RlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIG5hbWUudGV4dENvbnRlbnQgPSB0YXNrLmdldFRpdGxlKCk7XG4gICAgICAgIGRhdGUudGV4dENvbnRlbnQgPSB0YXNrLmdldER1ZURhdGUoKTtcbiAgICAgICAgbm90ZXMudGV4dENvbnRlbnQgPSB0YXNrLmdldERlc2NyaXB0aW9uKCk7XG4gICAgICAgIHByaW9yaXR5LnRleHRDb250ZW50ID0gdGFzay5nZXRQcmlvcml0eSgpO1xuICAgICAgICBuZXdUYXNrLmFwcGVuZENoaWxkKG5hbWUpO1xuICAgICAgICBuZXdUYXNrLmFwcGVuZENoaWxkKGRhdGUpO1xuICAgICAgICBuZXdUYXNrLmFwcGVuZENoaWxkKG5vdGVzKTtcbiAgICAgICAgbmV3VGFzay5hcHBlbmRDaGlsZChwcmlvcml0eSk7XG4gICAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3VGFzayk7XG4gICAgfSlcbn1cblxuLy9FdmVudCBMaXN0ZW5lcnNcbiAgICAvL0FkZCBQcm9qZWN0IEJ1dHRvblxuY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdEZvcm0nKTtcbnByb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdE5hbWUnKTtcbiAgICBTdG9yYWdlLmFkZFByb2plY3QocHJvamVjdE5hbWUudmFsdWUpO1xuICAgIGxvYWRQcm9qZWN0cygpO1xuICAgIGFjdGl2ZVByb2plY3QocHJvamVjdE5hbWUudmFsdWUpO1xuICAgIHJlc2V0Rm9ybSgncHJvamVjdCcpO1xufSk7XG5cbiAgICAvL0FkZCBUYXNrIEJ1dHRvblxuY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza0Zvcm0nKTtcbnRhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrTmFtZScpLnZhbHVlO1xuICAgIGxldCBub3RlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrTm90ZXMnKS52YWx1ZTtcbiAgICBsZXQgZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrRGF0ZScpLnZhbHVlO1xuICAgIGxldCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmlvcml0eScpLnZhbHVlO1xuICAgIGNvbnN0IGN1cnJlbnRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFjdGl2ZScpLnRleHRDb250ZW50O1xuICAgIFN0b3JhZ2UuYWRkVGFzayhjdXJyZW50UHJvamVjdCwgbmFtZSwgbm90ZXMsIGRhdGUsIHByaW9yaXR5KTtcbiAgICBsb2FkUHJvamVjdFRhc2tzKGN1cnJlbnRQcm9qZWN0KTtcbiAgICByZXNldEZvcm0oJ3Rhc2snKTtcbn0pO1xuXG4gICAgLy9Nb2RhbCBDbG9zZSBCdXR0b25zXG5jb25zdCBwcm9qZWN0Q2xvc2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdENsb3NlJyk7XG5jb25zdCB0YXNrQ2xvc2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza0Nsb3NlJyk7XG5wcm9qZWN0Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0b2dnbGVNb2RhbCgncHJvamVjdCcpKTtcbnRhc2tDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRvZ2dsZU1vZGFsKCd0YXNrJykpO1xuXG5cbi8vSGVscGVyIEZ1bmN0aW9uc1xuZnVuY3Rpb24gY2xlYXIoZGl2TmFtZSkge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRpdk5hbWUpO1xuICAgIGlmIChkaXYuaW5uZXJIVE1MICE9PSAnJykge1xuICAgICAgICBkaXYuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gdG9nZ2xlTW9kYWwoY2hvaWNlKXtcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2Nob2ljZX1Nb2RhbGApO1xuICAgIGlmIChtb2RhbC5zdHlsZS5kaXNwbGF5ID09ICdibG9jaycpIHtcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlc2V0Rm9ybShjaG9pY2Upe1xuICAgIHRvZ2dsZU1vZGFsKGNob2ljZSk7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2Nob2ljZX1Gb3JtYCk7XG4gICAgZm9ybS5yZXNldCgpO1xufVxuXG5leHBvcnQgeyBsb2FkUGFnZSB9O1xuIiwiaW1wb3J0IFRhc2sgZnJvbSBcIi4vdGFza1wiO1xuXG5jb25zdCBQcm9qZWN0ID0gKG5hbWUpID0+IHtcbiAgICBsZXQgX25hbWUgPSBuYW1lO1xuICAgIGxldCBfcHJvamVjdFRhc2tzID0gW107XG5cbiAgICBmdW5jdGlvbiBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gX25hbWU7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldE5hbWUodmFsdWUpIHtcbiAgICAgICAgX25hbWUgPSB2YWx1ZTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcHVzaFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkge1xuICAgICAgICBfcHJvamVjdFRhc2tzLnB1c2goVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldFRhc2tzKCkge1xuICAgICAgICByZXR1cm4gX3Byb2plY3RUYXNrcztcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdG9KU09OKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogX25hbWUsXG4gICAgICAgICAgICBwcm9qZWN0VGFza3M6IF9wcm9qZWN0VGFza3MubWFwKHRhc2sgPT4gdGFzay50b0pTT04oKSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge2dldE5hbWUsIHNldE5hbWUsIHB1c2hUYXNrLCBnZXRUYXNrcywgX25hbWUsIHRvSlNPTn07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0OyIsImltcG9ydCBUb2RvIGZyb20gXCIuL3RvZG9cIjtcbmltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3RzXCI7XG5cbmNvbnN0IFN0b3JhZ2UgPSAoKCkgPT4ge1xuXG4gICAgZnVuY3Rpb24gbG9hZFRvZG8oKSB7XG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWRUb2RvID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kbycpKTtcblxuICAgICAgICBjb25zdCB0b2RvID0gVG9kbygpO1xuICAgICAgICBpZiAoc2VyaWFsaXplZFRvZG8pIHtcbiAgICAgICAgICAgIGxldCBuZXdUb2RvID0gc2VyaWFsaXplZFRvZG8ucHJvamVjdHMubWFwKHByb2plY3REYXRhID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gUHJvamVjdChwcm9qZWN0RGF0YS5uYW1lKTtcblxuICAgICAgICAgICAgICAgIHByb2plY3REYXRhLnByb2plY3RUYXNrcy5mb3JFYWNoKHRhc2tEYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdC5wdXNoVGFzayh0YXNrRGF0YS50aXRsZSwgdGFza0RhdGEuZGVzY3JpcHRpb24sIHRhc2tEYXRhLmR1ZURhdGUsIHRhc2tEYXRhLnByaW9yaXR5KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvamVjdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdG9kby5zZXRQcm9qZWN0cyhuZXdUb2RvKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9kbztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzYXZlVG9kbyhkYXRhKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvJywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFByb2plY3QocHJvamVjdCkge1xuICAgICAgICBjb25zdCB0b2RvTGlzdCA9IGxvYWRUb2RvKCk7XG4gICAgICAgIHRvZG9MaXN0LmFkZFByb2plY3QocHJvamVjdCk7XG4gICAgICAgIHNhdmVUb2RvKHRvZG9MaXN0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcm9qZWN0cygpIHtcbiAgICAgICAgY29uc3QgdG9kb0xpc3QgPSBsb2FkVG9kbygpO1xuICAgICAgICByZXR1cm4gdG9kb0xpc3QuZ2V0UHJvamVjdHMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUYXNrKGN1cnJlbnRQcm9qZWN0LCB0YXNrTmFtZSwgdGFza05vdGVzLCB0YXNrRGF0ZSwgdGFza0Rlc2NyaXB0aW9uKSB7XG4gICAgICAgIGNvbnN0IHRvZG9MaXN0ID0gbG9hZFRvZG8oKTtcbiAgICAgICAgdG9kb0xpc3QuZ2V0UHJvamVjdChjdXJyZW50UHJvamVjdCkucHVzaFRhc2sodGFza05hbWUsIHRhc2tOb3RlcywgdGFza0RhdGUsIHRhc2tEZXNjcmlwdGlvbik7XG4gICAgICAgIHNhdmVUb2RvKHRvZG9MaXN0KTtcbiAgICB9XG5cblxuICAgIHJldHVybiB7bG9hZFRvZG8sIGFkZFByb2plY3QsIGdldFByb2plY3RzLCBhZGRUYXNrfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgU3RvcmFnZTsiLCJjb25zdCBUYXNrID0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpID0+IHtcblxuICAgIGxldCBfdGl0bGUgPSB0aXRsZTtcbiAgICBsZXQgX2Rlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgbGV0IF9kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICBsZXQgX3ByaW9yaXR5ID0gcHJpb3JpdHk7XG5cbiAgICBmdW5jdGlvbiBnZXRUaXRsZSgpe1xuICAgICAgICByZXR1cm4gX3RpdGxlO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXREZXNjcmlwdGlvbigpe1xuICAgICAgICByZXR1cm4gX2Rlc2NyaXB0aW9uO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXREdWVEYXRlKCl7XG4gICAgICAgIHJldHVybiBfZHVlRGF0ZTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0UHJpb3JpdHkoKXtcbiAgICAgICAgcmV0dXJuIF9wcmlvcml0eTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0VGl0bGUodmFsdWUpe1xuICAgICAgICBfdGl0bGUgPSB2YWx1ZTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0RGVzY3JpcHRpb24odmFsdWUpe1xuICAgICAgICBfZGVzY3JpcHRpb24gPSB2YWx1ZTtcbiAgICB9O1xuXG5cbiAgICBmdW5jdGlvbiBzZXREdWVEYXRlKHZhbHVlKXtcbiAgICAgICAgX2R1ZURhdGUgPSB2YWx1ZTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0UHJpb3JpdHkodmFsdWUpe1xuICAgICAgICBfcHJpb3JpdHkgPSB2YWx1ZTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICAgICAgcmV0dXJuIF90aXRsZSArICcgJyArIF9kZXNjcmlwdGlvbiArICcgJyArIF9kdWVEYXRlICsgJyAnICsgX3ByaW9yaXR5O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRpdGxlOiBfdGl0bGUsIFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IF9kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGR1ZURhdGU6IF9kdWVEYXRlLFxuICAgICAgICAgICAgcHJpb3JpdHk6IF9wcmlvcml0eVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7Z2V0VGl0bGUsIHNldFRpdGxlLCBnZXREZXNjcmlwdGlvbiwgc2V0RGVzY3JpcHRpb24sIFxuICAgICAgICBnZXREdWVEYXRlLCBzZXREdWVEYXRlLCBnZXRQcmlvcml0eSwgc2V0UHJpb3JpdHksIHRvU3RyaW5nLCB0b0pTT059O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVGFzazsiLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0c1wiO1xuXG5jb25zdCBUb2RvID0gKCkgPT4ge1xuICAgIGxldCBwcm9qZWN0cyA9IFtdO1xuICAgIHByb2plY3RzLnB1c2goUHJvamVjdCgnUGVyc29uYWwnKSk7XG4gICAgcHJvamVjdHMucHVzaChQcm9qZWN0KCdXb3JrJykpO1xuICAgIHByb2plY3RzLnB1c2goUHJvamVjdCgnVHJhdmVsJykpO1xuXG5cbiAgICBmdW5jdGlvbiBnZXRQcm9qZWN0cygpe1xuICAgICAgICByZXR1cm4gcHJvamVjdHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0UHJvamVjdHMoYXJyYXkpIHtcbiAgICAgICAgcHJvamVjdHMgPSBhcnJheTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gICAgICAgIHJldHVybiBwcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldE5hbWUoKSA9PT0gcHJvamVjdE5hbWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFByb2plY3QocHJvamVjdE5hbWUpIHtcbiAgICAgICAgaWYgKHByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuZ2V0TmFtZSgpID09PSBwcm9qZWN0TmFtZSkpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgcHJvamVjdHMucHVzaChQcm9qZWN0KHByb2plY3ROYW1lKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9KU09OKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJvamVjdHM6IHByb2plY3RzLm1hcChwcm9qZWN0ID0+IHByb2plY3QudG9KU09OKCkpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtnZXRQcm9qZWN0cywgZ2V0UHJvamVjdCwgYWRkUHJvamVjdCwgc2V0UHJvamVjdHMsIHRvSlNPTn1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG87IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBMb2FkVUkgZnJvbSBcIi4vZnVuY3Rpb25zL2xvYWRVSVwiO1xuXG5Mb2FkVUkubG9hZFBhZ2UoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=