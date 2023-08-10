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
    Todo.getProject(currentProject).pushTask(name, notes, date, priority);
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


    return {loadTodo, addProject, getProjects}
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
        getDueDate, setDueDate, getPriority, setPriority, toString};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUk7Ozs7OztVQ3BDbkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ042Qzs7QUFFN0MsdURBQWUsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvbG9hZFVJLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Z1bmN0aW9ucy9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvdGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZnVuY3Rpb25zL3RvZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdG9yYWdlIGZyb20gXCIuL3N0b3JhZ2UuanNcIjtcblxuLy9NYXN0ZXIgUGFnZVxuZnVuY3Rpb24gbG9hZFBhZ2UoKSB7XG4gICAgbG9hZFByb2plY3RzKCk7XG4gICAgYWN0aXZlUHJvamVjdCgncGVyc29uYWwnKTtcbiAgICBsb2FkUHJvamVjdFRhc2tzKCdQZXJzb25hbCcpO1xuICAgIGNyZWF0ZU5ld1Rhc2tCdXR0b24oKTtcbn1cblxuLy9Qcm9qZWN0IERPTSBcbmZ1bmN0aW9uIGxvYWRQcm9qZWN0cygpIHtcbiAgICBjbGVhcignc2lkZWJhcicpOyAgICBcbiAgICBTdG9yYWdlLmdldFByb2plY3RzKCkuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgICBjcmVhdGVQcm9qZWN0cyhwcm9qZWN0LmdldE5hbWUoKSk7XG4gICAgfSk7XG4gICAgY3JlYXRlTmV3UHJvamVjdEJ1dHRvbigpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0cyhuYW1lKSB7XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlYmFyJyk7XG4gICAgY29uc3QgcHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHByb2plY3RCdXR0b24uY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpO1xuICAgIHByb2plY3RCdXR0b24udGV4dENvbnRlbnQgPSBuYW1lO1xuICAgIHByb2plY3RCdXR0b24uZGF0YXNldC5uYW1lID0gbmFtZS5yZXBsYWNlKC9cXHMvZywgXCJcIik7XG4gICAgcHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGFjdGl2ZVByb2plY3QoZSk7XG4gICAgICAgIGxvYWRQcm9qZWN0VGFza3MoZS50YXJnZXQudGV4dENvbnRlbnQpO1xuICAgIH0pO1xuICAgIHNpZGViYXIuYXBwZW5kQ2hpbGQocHJvamVjdEJ1dHRvbik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5ld1Byb2plY3RCdXR0b24oKSB7XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlYmFyJyk7XG4gICAgY29uc3QgbmV3UHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIG5ld1Byb2plY3RCdXR0b24udGV4dENvbnRlbnQgPSAnKyBQcm9qZWN0JztcbiAgICBuZXdQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdE1vZGFsJyk7XG4gICAgICAgIHByb2plY3RNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9KTtcbiAgICBzaWRlYmFyLmFwcGVuZENoaWxkKG5ld1Byb2plY3RCdXR0b24pO1xufVxuXG5mdW5jdGlvbiBhY3RpdmVQcm9qZWN0KGUpIHtcbiAgICBjb25zdCBwcm9qZWN0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0Jyk7XG4gICAgcHJvamVjdEJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICBpZihlID09ICdwZXJzb25hbCcpe1xuICAgICAgICBwcm9qZWN0QnV0dG9uc1swXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlID09PSAnc3RyaW5nJykge1xuICAgICAgICBsZXQgZGF0YU5hbWUgPSBlLnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgICAgICAgY29uc3QgY3VycmVudFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1uYW1lPSR7ZGF0YU5hbWV9XWApO1xuICAgICAgICBjdXJyZW50UHJvamVjdC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG59XG5cbi8vVGFzayBET01cbmZ1bmN0aW9uIGNyZWF0ZU5ld1Rhc2tCdXR0b24oKXtcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlcicpO1xuICAgIGNvbnN0IG5ld1Rhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBuZXdUYXNrQnV0dG9uLnRleHRDb250ZW50ID0gJysgVG8tRG8nO1xuICAgIG5ld1Rhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhc2tNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrTW9kYWwnKTtcbiAgICAgICAgdGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH0pO1xuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3VGFza0J1dHRvbik7XG59XG5cbmZ1bmN0aW9uIGxvYWRQcm9qZWN0VGFza3MgKHByb2plY3ROYW1lKSB7XG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50Jyk7XG4gICAgY29udGVudC5pbm5lckhUTUwgPSAnJztcbiAgICBjb25zdCBhbGxUYXNrcyA9IFN0b3JhZ2UubG9hZFRvZG8oKS5nZXRQcm9qZWN0KHByb2plY3ROYW1lKS5nZXRUYXNrcygpO1xuICAgIGFsbFRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBuZXdUYXNrLmNsYXNzTGlzdC5hZGQoJ3Rhc2snKVxuICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICAgICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgIGNvbnN0IG5vdGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgbmFtZS50ZXh0Q29udGVudCA9IHRhc2suZ2V0VGl0bGUoKTtcbiAgICAgICAgZGF0ZS50ZXh0Q29udGVudCA9IHRhc2suZ2V0RHVlRGF0ZSgpO1xuICAgICAgICBub3Rlcy50ZXh0Q29udGVudCA9IHRhc2suZ2V0RGVzY3JpcHRpb24oKTtcbiAgICAgICAgcHJpb3JpdHkudGV4dENvbnRlbnQgPSB0YXNrLmdldFByaW9yaXR5KCk7XG4gICAgICAgIG5ld1Rhc2suYXBwZW5kQ2hpbGQobmFtZSk7XG4gICAgICAgIG5ld1Rhc2suYXBwZW5kQ2hpbGQoZGF0ZSk7XG4gICAgICAgIG5ld1Rhc2suYXBwZW5kQ2hpbGQobm90ZXMpO1xuICAgICAgICBuZXdUYXNrLmFwcGVuZENoaWxkKHByaW9yaXR5KTtcbiAgICAgICAgY29udGVudC5hcHBlbmRDaGlsZChuZXdUYXNrKTtcbiAgICB9KVxufVxuXG4vL0V2ZW50IExpc3RlbmVyc1xuICAgIC8vQWRkIFByb2plY3QgQnV0dG9uXG5jb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0Rm9ybScpO1xucHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0TmFtZScpO1xuICAgIFN0b3JhZ2UuYWRkUHJvamVjdChwcm9qZWN0TmFtZS52YWx1ZSk7XG4gICAgbG9hZFByb2plY3RzKCk7XG4gICAgYWN0aXZlUHJvamVjdChwcm9qZWN0TmFtZS52YWx1ZSk7XG4gICAgcmVzZXRGb3JtKCdwcm9qZWN0Jyk7XG59KTtcblxuICAgIC8vQWRkIFRhc2sgQnV0dG9uXG5jb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrRm9ybScpO1xudGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tOYW1lJykudmFsdWU7XG4gICAgbGV0IG5vdGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tOb3RlcycpLnZhbHVlO1xuICAgIGxldCBkYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tEYXRlJykudmFsdWU7XG4gICAgbGV0IHByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaW9yaXR5JykudmFsdWU7XG4gICAgY29uc3QgY3VycmVudFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJykudGV4dENvbnRlbnQ7XG4gICAgVG9kby5nZXRQcm9qZWN0KGN1cnJlbnRQcm9qZWN0KS5wdXNoVGFzayhuYW1lLCBub3RlcywgZGF0ZSwgcHJpb3JpdHkpO1xuICAgIGxvYWRQcm9qZWN0VGFza3MoY3VycmVudFByb2plY3QpO1xuICAgIHJlc2V0Rm9ybSgndGFzaycpO1xufSk7XG5cbiAgICAvL01vZGFsIENsb3NlIEJ1dHRvbnNcbmNvbnN0IHByb2plY3RDbG9zZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0Q2xvc2UnKTtcbmNvbnN0IHRhc2tDbG9zZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrQ2xvc2UnKTtcbnByb2plY3RDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRvZ2dsZU1vZGFsKCdwcm9qZWN0JykpO1xudGFza0Nsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdG9nZ2xlTW9kYWwoJ3Rhc2snKSk7XG5cblxuLy9IZWxwZXIgRnVuY3Rpb25zXG5mdW5jdGlvbiBjbGVhcihkaXZOYW1lKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGl2TmFtZSk7XG4gICAgaWYgKGRpdi5pbm5lckhUTUwgIT09ICcnKSB7XG4gICAgICAgIGRpdi5pbm5lckhUTUwgPSAnJztcbiAgICB9XG59O1xuXG5mdW5jdGlvbiB0b2dnbGVNb2RhbChjaG9pY2Upe1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7Y2hvaWNlfU1vZGFsYCk7XG4gICAgaWYgKG1vZGFsLnN0eWxlLmRpc3BsYXkgPT0gJ2Jsb2NrJykge1xuICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVzZXRGb3JtKGNob2ljZSl7XG4gICAgdG9nZ2xlTW9kYWwoY2hvaWNlKTtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7Y2hvaWNlfUZvcm1gKTtcbiAgICBmb3JtLnJlc2V0KCk7XG59XG5cbmV4cG9ydCB7IGxvYWRQYWdlIH07XG4iLCJpbXBvcnQgVGFzayBmcm9tIFwiLi90YXNrXCI7XG5cbmNvbnN0IFByb2plY3QgPSAobmFtZSkgPT4ge1xuICAgIGxldCBfbmFtZSA9IG5hbWU7XG4gICAgbGV0IF9wcm9qZWN0VGFza3MgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBfbmFtZTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0TmFtZSh2YWx1ZSkge1xuICAgICAgICBfbmFtZSA9IHZhbHVlO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBwdXNoVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gICAgICAgIF9wcm9qZWN0VGFza3MucHVzaChUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0VGFza3MoKSB7XG4gICAgICAgIHJldHVybiBfcHJvamVjdFRhc2tzO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiBfbmFtZSxcbiAgICAgICAgICAgIHByb2plY3RUYXNrczogX3Byb2plY3RUYXNrcy5tYXAodGFzayA9PiB0YXNrLnRvSlNPTigpKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7Z2V0TmFtZSwgc2V0TmFtZSwgcHVzaFRhc2ssIGdldFRhc2tzLCBfbmFtZSwgdG9KU09OfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3Q7IiwiaW1wb3J0IFRvZG8gZnJvbSBcIi4vdG9kb1wiO1xuaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdHNcIjtcblxuY29uc3QgU3RvcmFnZSA9ICgoKSA9PiB7XG5cbiAgICBmdW5jdGlvbiBsb2FkVG9kbygpIHtcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZFRvZG8gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RvJykpO1xuXG4gICAgICAgIGNvbnN0IHRvZG8gPSBUb2RvKCk7XG4gICAgICAgIGlmIChzZXJpYWxpemVkVG9kbykge1xuICAgICAgICAgICAgbGV0IG5ld1RvZG8gPSBzZXJpYWxpemVkVG9kby5wcm9qZWN0cy5tYXAocHJvamVjdERhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBQcm9qZWN0KHByb2plY3REYXRhLm5hbWUpO1xuXG4gICAgICAgICAgICAgICAgcHJvamVjdERhdGEucHJvamVjdFRhc2tzLmZvckVhY2godGFza0RhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0LnB1c2hUYXNrKHRhc2tEYXRhLnRpdGxlLCB0YXNrRGF0YS5kZXNjcmlwdGlvbiwgdGFza0RhdGEuZHVlRGF0ZSwgdGFza0RhdGEucHJpb3JpdHkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9qZWN0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0b2RvLnNldFByb2plY3RzKG5ld1RvZG8pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2RvO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNhdmVUb2RvKGRhdGEpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG8nLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkUHJvamVjdChwcm9qZWN0KSB7XG4gICAgICAgIGNvbnN0IHRvZG9MaXN0ID0gbG9hZFRvZG8oKTtcbiAgICAgICAgdG9kb0xpc3QuYWRkUHJvamVjdChwcm9qZWN0KTtcbiAgICAgICAgc2F2ZVRvZG8odG9kb0xpc3QpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByb2plY3RzKCkge1xuICAgICAgICBjb25zdCB0b2RvTGlzdCA9IGxvYWRUb2RvKCk7XG4gICAgICAgIHJldHVybiB0b2RvTGlzdC5nZXRQcm9qZWN0cygpO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHtsb2FkVG9kbywgYWRkUHJvamVjdCwgZ2V0UHJvamVjdHN9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBTdG9yYWdlOyIsImNvbnN0IFRhc2sgPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkgPT4ge1xuXG4gICAgbGV0IF90aXRsZSA9IHRpdGxlO1xuICAgIGxldCBfZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICBsZXQgX2R1ZURhdGUgPSBkdWVEYXRlO1xuICAgIGxldCBfcHJpb3JpdHkgPSBwcmlvcml0eTtcblxuICAgIGZ1bmN0aW9uIGdldFRpdGxlKCl7XG4gICAgICAgIHJldHVybiBfdGl0bGU7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldERlc2NyaXB0aW9uKCl7XG4gICAgICAgIHJldHVybiBfZGVzY3JpcHRpb247XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldER1ZURhdGUoKXtcbiAgICAgICAgcmV0dXJuIF9kdWVEYXRlO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRQcmlvcml0eSgpe1xuICAgICAgICByZXR1cm4gX3ByaW9yaXR5O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXRUaXRsZSh2YWx1ZSl7XG4gICAgICAgIF90aXRsZSA9IHZhbHVlO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXREZXNjcmlwdGlvbih2YWx1ZSl7XG4gICAgICAgIF9kZXNjcmlwdGlvbiA9IHZhbHVlO1xuICAgIH07XG5cblxuICAgIGZ1bmN0aW9uIHNldER1ZURhdGUodmFsdWUpe1xuICAgICAgICBfZHVlRGF0ZSA9IHZhbHVlO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXRQcmlvcml0eSh2YWx1ZSl7XG4gICAgICAgIF9wcmlvcml0eSA9IHZhbHVlO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB0b1N0cmluZygpe1xuICAgICAgICByZXR1cm4gX3RpdGxlICsgJyAnICsgX2Rlc2NyaXB0aW9uICsgJyAnICsgX2R1ZURhdGUgKyAnICcgKyBfcHJpb3JpdHk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9KU09OKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGl0bGU6IF90aXRsZSwgXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogX2Rlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZHVlRGF0ZTogX2R1ZURhdGUsXG4gICAgICAgICAgICBwcmlvcml0eTogX3ByaW9yaXR5XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtnZXRUaXRsZSwgc2V0VGl0bGUsIGdldERlc2NyaXB0aW9uLCBzZXREZXNjcmlwdGlvbiwgXG4gICAgICAgIGdldER1ZURhdGUsIHNldER1ZURhdGUsIGdldFByaW9yaXR5LCBzZXRQcmlvcml0eSwgdG9TdHJpbmd9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVGFzazsiLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0c1wiO1xuXG5jb25zdCBUb2RvID0gKCkgPT4ge1xuICAgIGxldCBwcm9qZWN0cyA9IFtdO1xuICAgIHByb2plY3RzLnB1c2goUHJvamVjdCgnUGVyc29uYWwnKSk7XG4gICAgcHJvamVjdHMucHVzaChQcm9qZWN0KCdXb3JrJykpO1xuICAgIHByb2plY3RzLnB1c2goUHJvamVjdCgnVHJhdmVsJykpO1xuXG5cbiAgICBmdW5jdGlvbiBnZXRQcm9qZWN0cygpe1xuICAgICAgICByZXR1cm4gcHJvamVjdHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0UHJvamVjdHMoYXJyYXkpIHtcbiAgICAgICAgcHJvamVjdHMgPSBhcnJheTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gICAgICAgIHJldHVybiBwcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldE5hbWUoKSA9PT0gcHJvamVjdE5hbWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFByb2plY3QocHJvamVjdE5hbWUpIHtcbiAgICAgICAgaWYgKHByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuZ2V0TmFtZSgpID09PSBwcm9qZWN0TmFtZSkpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgcHJvamVjdHMucHVzaChQcm9qZWN0KHByb2plY3ROYW1lKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9KU09OKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJvamVjdHM6IHByb2plY3RzLm1hcChwcm9qZWN0ID0+IHByb2plY3QudG9KU09OKCkpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtnZXRQcm9qZWN0cywgZ2V0UHJvamVjdCwgYWRkUHJvamVjdCwgc2V0UHJvamVjdHMsIHRvSlNPTn1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG87IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBMb2FkVUkgZnJvbSBcIi4vZnVuY3Rpb25zL2xvYWRVSVwiO1xuXG5Mb2FkVUkubG9hZFBhZ2UoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=