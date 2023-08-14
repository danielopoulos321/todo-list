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
    clear('projects');
    _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].getProjects().forEach((project) => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU87QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7O0FBRUEsaUVBQWUsSUFBSTs7Ozs7O1VDcENuQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjZDOztBQUU3Qyx1REFBZSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Z1bmN0aW9ucy9sb2FkVUkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Z1bmN0aW9ucy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZnVuY3Rpb25zL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Z1bmN0aW9ucy90YXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvdG9kby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vc3RvcmFnZS5qc1wiO1xuXG4vL01hc3RlciBQYWdlXG5mdW5jdGlvbiBsb2FkUGFnZSgpIHtcbiAgICBsb2FkUHJvamVjdHMoKTtcbiAgICBhY3RpdmVQcm9qZWN0KCdwZXJzb25hbCcpO1xuICAgIGxvYWRQcm9qZWN0VGFza3MoJ1BlcnNvbmFsJyk7XG4gICAgY3JlYXRlTmV3VGFza0J1dHRvbigpO1xufVxuXG4vL1Byb2plY3QgRE9NIFxuZnVuY3Rpb24gbG9hZFByb2plY3RzKCkge1xuICAgIGNsZWFyKCdwcm9qZWN0cycpO1xuICAgIFN0b3JhZ2UuZ2V0UHJvamVjdHMoKS5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICAgIGNyZWF0ZVByb2plY3RzKHByb2plY3QuZ2V0TmFtZSgpKTtcbiAgICB9KTtcbiAgICBjcmVhdGVOZXdQcm9qZWN0QnV0dG9uKCk7ICAgIFxufVxuXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0cyhuYW1lKSB7XG4gICAgY29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMnKTtcbiAgICBjb25zdCBwcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgcHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0Jyk7XG4gICAgcHJvamVjdEJ1dHRvbi50ZXh0Q29udGVudCA9IG5hbWU7XG4gICAgcHJvamVjdEJ1dHRvbi5kYXRhc2V0Lm5hbWUgPSBuYW1lLnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgICBwcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBhY3RpdmVQcm9qZWN0KHRoaXMuZGF0YXNldC5uYW1lKTtcbiAgICAgICAgbG9hZFByb2plY3RUYXNrcyhlLnRhcmdldC50ZXh0Q29udGVudCk7XG4gICAgfSk7XG4gICAgcHJvamVjdHMuYXBwZW5kQ2hpbGQocHJvamVjdEJ1dHRvbik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5ld1Byb2plY3RCdXR0b24oKSB7XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cycpO1xuICAgIGNvbnN0IG5ld1Byb2plY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBuZXdQcm9qZWN0QnV0dG9uLnRleHRDb250ZW50ID0gJysgUHJvamVjdCc7XG4gICAgbmV3UHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0Jyk7XG4gICAgbmV3UHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RNb2RhbCcpO1xuICAgICAgICBwcm9qZWN0TW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfSk7XG4gICAgc2lkZWJhci5hcHBlbmRDaGlsZChuZXdQcm9qZWN0QnV0dG9uKTtcbn1cblxuZnVuY3Rpb24gYWN0aXZlUHJvamVjdChlKSB7XG4gICAgY29uc3QgcHJvamVjdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdCcpO1xuICAgIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnRQcm9qZWN0Jyk7XG4gICAgcHJvamVjdEJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICBpZihlID09ICdwZXJzb25hbCcpe1xuICAgICAgICBwcm9qZWN0QnV0dG9uc1swXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgcHJvamVjdE5hbWUuaW5uZXJIVE1MID0gcHJvamVjdEJ1dHRvbnNbMF0uZGF0YXNldC5uYW1lO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGxldCBkYXRhTmFtZSA9IGUucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICAgICAgICBjb25zdCBjdXJyZW50UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLW5hbWU9JHtkYXRhTmFtZX1dYCk7XG4gICAgICAgIGN1cnJlbnRQcm9qZWN0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICBwcm9qZWN0TmFtZS5pbm5lckhUTUwgPSBjdXJyZW50UHJvamVjdC5kYXRhc2V0Lm5hbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxufVxuXG4vL1Rhc2sgRE9NXG5mdW5jdGlvbiBjcmVhdGVOZXdUYXNrQnV0dG9uKCl7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlcicpO1xuICAgIGNvbnN0IG5ld1Rhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBuZXdUYXNrQnV0dG9uLnRleHRDb250ZW50ID0gJysgVG8tRG8nO1xuICAgIG5ld1Rhc2tCdXR0b24uc2V0QXR0cmlidXRlKCdpZCcsICduZXdUYXNrJyk7XG4gICAgbmV3VGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tNb2RhbCcpO1xuICAgICAgICB0YXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfSk7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKG5ld1Rhc2tCdXR0b24pO1xufVxuXG5mdW5jdGlvbiBsb2FkUHJvamVjdFRhc2tzIChwcm9qZWN0TmFtZSkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza3MnKTtcbiAgICBjb250ZW50LmlubmVySFRNTCA9ICcnO1xuICAgIGNvbnN0IGFsbFRhc2tzID0gU3RvcmFnZS5sb2FkVG9kbygpLmdldFByb2plY3QocHJvamVjdE5hbWUpLmdldFRhc2tzKCk7XG4gICAgYWxsVGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgICBjb25zdCBuZXdUYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG5ld1Rhc2suY2xhc3NMaXN0LmFkZCgndGFzaycpXG4gICAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgICAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgY29uc3Qgbm90ZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBuYW1lLnRleHRDb250ZW50ID0gdGFzay5nZXRUaXRsZSgpO1xuICAgICAgICBkYXRlLnRleHRDb250ZW50ID0gdGFzay5nZXREdWVEYXRlKCk7XG4gICAgICAgIG5vdGVzLnRleHRDb250ZW50ID0gdGFzay5nZXREZXNjcmlwdGlvbigpO1xuICAgICAgICBwcmlvcml0eS50ZXh0Q29udGVudCA9IHRhc2suZ2V0UHJpb3JpdHkoKTtcbiAgICAgICAgbmV3VGFzay5hcHBlbmRDaGlsZChuYW1lKTtcbiAgICAgICAgbmV3VGFzay5hcHBlbmRDaGlsZChkYXRlKTtcbiAgICAgICAgbmV3VGFzay5hcHBlbmRDaGlsZChub3Rlcyk7XG4gICAgICAgIG5ld1Rhc2suYXBwZW5kQ2hpbGQocHJpb3JpdHkpO1xuICAgICAgICBjb250ZW50LmFwcGVuZENoaWxkKG5ld1Rhc2spO1xuICAgIH0pXG59XG5cbi8vRXZlbnQgTGlzdGVuZXJzXG4gICAgLy9BZGQgUHJvamVjdCBCdXR0b25cbmNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RGb3JtJyk7XG5wcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3ROYW1lJyk7XG4gICAgU3RvcmFnZS5hZGRQcm9qZWN0KHByb2plY3ROYW1lLnZhbHVlKTtcbiAgICBsb2FkUHJvamVjdHMoKTtcbiAgICBhY3RpdmVQcm9qZWN0KHByb2plY3ROYW1lLnZhbHVlKTtcbiAgICByZXNldEZvcm0oJ3Byb2plY3QnKTtcbn0pO1xuXG4gICAgLy9BZGQgVGFzayBCdXR0b25cbmNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tGb3JtJyk7XG50YXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza05hbWUnKS52YWx1ZTtcbiAgICBsZXQgbm90ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza05vdGVzJykudmFsdWU7XG4gICAgbGV0IGRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza0RhdGUnKS52YWx1ZTtcbiAgICBsZXQgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpb3JpdHknKS52YWx1ZTtcbiAgICBjb25zdCBjdXJyZW50UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKS50ZXh0Q29udGVudDtcbiAgICBTdG9yYWdlLmFkZFRhc2soY3VycmVudFByb2plY3QsIG5hbWUsIG5vdGVzLCBkYXRlLCBwcmlvcml0eSk7XG4gICAgbG9hZFByb2plY3RUYXNrcyhjdXJyZW50UHJvamVjdCk7XG4gICAgcmVzZXRGb3JtKCd0YXNrJyk7XG59KTtcblxuICAgIC8vTW9kYWwgQ2xvc2UgQnV0dG9uc1xuY29uc3QgcHJvamVjdENsb3NlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RDbG9zZScpO1xuY29uc3QgdGFza0Nsb3NlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tDbG9zZScpO1xucHJvamVjdENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdG9nZ2xlTW9kYWwoJ3Byb2plY3QnKSk7XG50YXNrQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0b2dnbGVNb2RhbCgndGFzaycpKTtcblxuXG4vL0hlbHBlciBGdW5jdGlvbnNcbmZ1bmN0aW9uIGNsZWFyKGRpdk5hbWUpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkaXZOYW1lKTtcbiAgICBpZiAoZGl2LmlubmVySFRNTCAhPT0gJycpIHtcbiAgICAgICAgZGl2LmlubmVySFRNTCA9ICcnO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIHRvZ2dsZU1vZGFsKGNob2ljZSl7XG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtjaG9pY2V9TW9kYWxgKTtcbiAgICBpZiAobW9kYWwuc3R5bGUuZGlzcGxheSA9PSAnYmxvY2snKSB7XG4gICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZXNldEZvcm0oY2hvaWNlKXtcbiAgICB0b2dnbGVNb2RhbChjaG9pY2UpO1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtjaG9pY2V9Rm9ybWApO1xuICAgIGZvcm0ucmVzZXQoKTtcbn1cblxuZXhwb3J0IHsgbG9hZFBhZ2UgfTtcbiIsImltcG9ydCBUYXNrIGZyb20gXCIuL3Rhc2tcIjtcblxuY29uc3QgUHJvamVjdCA9IChuYW1lKSA9PiB7XG4gICAgbGV0IF9uYW1lID0gbmFtZTtcbiAgICBsZXQgX3Byb2plY3RUYXNrcyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIF9uYW1lO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXROYW1lKHZhbHVlKSB7XG4gICAgICAgIF9uYW1lID0gdmFsdWU7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHB1c2hUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpIHtcbiAgICAgICAgX3Byb2plY3RUYXNrcy5wdXNoKFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRUYXNrcygpIHtcbiAgICAgICAgcmV0dXJuIF9wcm9qZWN0VGFza3M7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IF9uYW1lLFxuICAgICAgICAgICAgcHJvamVjdFRhc2tzOiBfcHJvamVjdFRhc2tzLm1hcCh0YXNrID0+IHRhc2sudG9KU09OKCkpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtnZXROYW1lLCBzZXROYW1lLCBwdXNoVGFzaywgZ2V0VGFza3MsIF9uYW1lLCB0b0pTT059O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdDsiLCJpbXBvcnQgVG9kbyBmcm9tIFwiLi90b2RvXCI7XG5pbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0c1wiO1xuXG5jb25zdCBTdG9yYWdlID0gKCgpID0+IHtcblxuICAgIGZ1bmN0aW9uIGxvYWRUb2RvKCkge1xuICAgICAgICBjb25zdCBzZXJpYWxpemVkVG9kbyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG8nKSk7XG5cbiAgICAgICAgY29uc3QgdG9kbyA9IFRvZG8oKTtcbiAgICAgICAgaWYgKHNlcmlhbGl6ZWRUb2RvKSB7XG4gICAgICAgICAgICBsZXQgbmV3VG9kbyA9IHNlcmlhbGl6ZWRUb2RvLnByb2plY3RzLm1hcChwcm9qZWN0RGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IFByb2plY3QocHJvamVjdERhdGEubmFtZSk7XG5cbiAgICAgICAgICAgICAgICBwcm9qZWN0RGF0YS5wcm9qZWN0VGFza3MuZm9yRWFjaCh0YXNrRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHByb2plY3QucHVzaFRhc2sodGFza0RhdGEudGl0bGUsIHRhc2tEYXRhLmRlc2NyaXB0aW9uLCB0YXNrRGF0YS5kdWVEYXRlLCB0YXNrRGF0YS5wcmlvcml0eSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2plY3Q7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRvZG8uc2V0UHJvamVjdHMobmV3VG9kbyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvZG87XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2F2ZVRvZG8oZGF0YSkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kbycsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRQcm9qZWN0KHByb2plY3QpIHtcbiAgICAgICAgY29uc3QgdG9kb0xpc3QgPSBsb2FkVG9kbygpO1xuICAgICAgICB0b2RvTGlzdC5hZGRQcm9qZWN0KHByb2plY3QpO1xuICAgICAgICBzYXZlVG9kbyh0b2RvTGlzdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJvamVjdHMoKSB7XG4gICAgICAgIGNvbnN0IHRvZG9MaXN0ID0gbG9hZFRvZG8oKTtcbiAgICAgICAgcmV0dXJuIHRvZG9MaXN0LmdldFByb2plY3RzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVGFzayhjdXJyZW50UHJvamVjdCwgdGFza05hbWUsIHRhc2tOb3RlcywgdGFza0RhdGUsIHRhc2tEZXNjcmlwdGlvbikge1xuICAgICAgICBjb25zdCB0b2RvTGlzdCA9IGxvYWRUb2RvKCk7XG4gICAgICAgIHRvZG9MaXN0LmdldFByb2plY3QoY3VycmVudFByb2plY3QpLnB1c2hUYXNrKHRhc2tOYW1lLCB0YXNrTm90ZXMsIHRhc2tEYXRlLCB0YXNrRGVzY3JpcHRpb24pO1xuICAgICAgICBzYXZlVG9kbyh0b2RvTGlzdCk7XG4gICAgfVxuXG5cbiAgICByZXR1cm4ge2xvYWRUb2RvLCBhZGRQcm9qZWN0LCBnZXRQcm9qZWN0cywgYWRkVGFza31cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFN0b3JhZ2U7IiwiY29uc3QgVGFzayA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSA9PiB7XG5cbiAgICBsZXQgX3RpdGxlID0gdGl0bGU7XG4gICAgbGV0IF9kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIGxldCBfZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgbGV0IF9wcmlvcml0eSA9IHByaW9yaXR5O1xuXG4gICAgZnVuY3Rpb24gZ2V0VGl0bGUoKXtcbiAgICAgICAgcmV0dXJuIF90aXRsZTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0RGVzY3JpcHRpb24oKXtcbiAgICAgICAgcmV0dXJuIF9kZXNjcmlwdGlvbjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0RHVlRGF0ZSgpe1xuICAgICAgICByZXR1cm4gX2R1ZURhdGU7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldFByaW9yaXR5KCl7XG4gICAgICAgIHJldHVybiBfcHJpb3JpdHk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldFRpdGxlKHZhbHVlKXtcbiAgICAgICAgX3RpdGxlID0gdmFsdWU7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldERlc2NyaXB0aW9uKHZhbHVlKXtcbiAgICAgICAgX2Rlc2NyaXB0aW9uID0gdmFsdWU7XG4gICAgfTtcblxuXG4gICAgZnVuY3Rpb24gc2V0RHVlRGF0ZSh2YWx1ZSl7XG4gICAgICAgIF9kdWVEYXRlID0gdmFsdWU7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldFByaW9yaXR5KHZhbHVlKXtcbiAgICAgICAgX3ByaW9yaXR5ID0gdmFsdWU7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gICAgICAgIHJldHVybiBfdGl0bGUgKyAnICcgKyBfZGVzY3JpcHRpb24gKyAnICcgKyBfZHVlRGF0ZSArICcgJyArIF9wcmlvcml0eTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0aXRsZTogX3RpdGxlLCBcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBfZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBkdWVEYXRlOiBfZHVlRGF0ZSxcbiAgICAgICAgICAgIHByaW9yaXR5OiBfcHJpb3JpdHlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge2dldFRpdGxlLCBzZXRUaXRsZSwgZ2V0RGVzY3JpcHRpb24sIHNldERlc2NyaXB0aW9uLCBcbiAgICAgICAgZ2V0RHVlRGF0ZSwgc2V0RHVlRGF0ZSwgZ2V0UHJpb3JpdHksIHNldFByaW9yaXR5LCB0b1N0cmluZywgdG9KU09OfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2s7IiwiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdHNcIjtcblxuY29uc3QgVG9kbyA9ICgpID0+IHtcbiAgICBsZXQgcHJvamVjdHMgPSBbXTtcbiAgICBwcm9qZWN0cy5wdXNoKFByb2plY3QoJ1BlcnNvbmFsJykpO1xuICAgIHByb2plY3RzLnB1c2goUHJvamVjdCgnV29yaycpKTtcbiAgICBwcm9qZWN0cy5wdXNoKFByb2plY3QoJ1RyYXZlbCcpKTtcblxuXG4gICAgZnVuY3Rpb24gZ2V0UHJvamVjdHMoKXtcbiAgICAgICAgcmV0dXJuIHByb2plY3RzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFByb2plY3RzKGFycmF5KSB7XG4gICAgICAgIHByb2plY3RzID0gYXJyYXk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAgICAgICByZXR1cm4gcHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5nZXROYW1lKCkgPT09IHByb2plY3ROYW1lKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gICAgICAgIGlmIChwcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldE5hbWUoKSA9PT0gcHJvamVjdE5hbWUpKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIHByb2plY3RzLnB1c2goUHJvamVjdChwcm9qZWN0TmFtZSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByb2plY3RzOiBwcm9qZWN0cy5tYXAocHJvamVjdCA9PiBwcm9qZWN0LnRvSlNPTigpKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7Z2V0UHJvamVjdHMsIGdldFByb2plY3QsIGFkZFByb2plY3QsIHNldFByb2plY3RzLCB0b0pTT059XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUb2RvOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgTG9hZFVJIGZyb20gXCIuL2Z1bmN0aW9ucy9sb2FkVUlcIjtcblxuTG9hZFVJLmxvYWRQYWdlKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9