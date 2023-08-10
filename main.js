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
/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo.js */ "./src/functions/todo.js");


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
    _todo_js__WEBPACK_IMPORTED_MODULE_0__["default"].getProjects().forEach((project) => {
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
    const allTasks = _todo_js__WEBPACK_IMPORTED_MODULE_0__["default"].getProject(projectName).getTasks();
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
    _todo_js__WEBPACK_IMPORTED_MODULE_0__["default"].addProject(projectName.value);
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
    _todo_js__WEBPACK_IMPORTED_MODULE_0__["default"].getProject(currentProject).pushTask(name, notes, date, priority);
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

    return {getName, setName, pushTask, getTasks};
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);

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


const Todo = (() => {
    let projects = [];
    projects.push((0,_projects__WEBPACK_IMPORTED_MODULE_0__["default"])('Personal'));
    projects.push((0,_projects__WEBPACK_IMPORTED_MODULE_0__["default"])('Work'));
    projects.push((0,_projects__WEBPACK_IMPORTED_MODULE_0__["default"])('Travel'));

    function getProjects(){
        return projects;
    }

    function getProject(projectName) {
        return projects.find((project) => project.getName() === projectName);
    }

    function addProject(projectName) {
        if (projects.find((project) => project.getName() === projectName))
            return
        projects.push((0,_projects__WEBPACK_IMPORTED_MODULE_0__["default"])(projectName));
    }
    
    return {getProjects, getProject, addProject}
})();

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
/* harmony import */ var _functions_todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions/todo */ "./src/functions/todo.js");



_functions_loadUI__WEBPACK_IMPORTED_MODULE_0__.loadPage();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Z1bmN0aW9ucy90YXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvdG9kby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRvZG8gZnJvbSBcIi4vdG9kby5qc1wiO1xuXG4vL01hc3RlciBQYWdlXG5mdW5jdGlvbiBsb2FkUGFnZSgpIHtcbiAgICBsb2FkUHJvamVjdHMoKTtcbiAgICBhY3RpdmVQcm9qZWN0KCdwZXJzb25hbCcpO1xuICAgIGxvYWRQcm9qZWN0VGFza3MoJ1BlcnNvbmFsJyk7XG4gICAgY3JlYXRlTmV3VGFza0J1dHRvbigpO1xufVxuXG4vL1Byb2plY3QgRE9NIFxuZnVuY3Rpb24gbG9hZFByb2plY3RzKCkge1xuICAgIGNsZWFyKCdzaWRlYmFyJyk7XG4gICAgVG9kby5nZXRQcm9qZWN0cygpLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgICAgY3JlYXRlUHJvamVjdHMocHJvamVjdC5nZXROYW1lKCkpO1xuICAgIH0pO1xuICAgIGNyZWF0ZU5ld1Byb2plY3RCdXR0b24oKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdHMobmFtZSkge1xuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZWJhcicpO1xuICAgIGNvbnN0IHByb2plY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBwcm9qZWN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QnKTtcbiAgICBwcm9qZWN0QnV0dG9uLnRleHRDb250ZW50ID0gbmFtZTtcbiAgICBwcm9qZWN0QnV0dG9uLmRhdGFzZXQubmFtZSA9IG5hbWUucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICAgIHByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBhY3RpdmVQcm9qZWN0KGUpO1xuICAgICAgICBsb2FkUHJvamVjdFRhc2tzKGUudGFyZ2V0LnRleHRDb250ZW50KTtcbiAgICB9KTtcbiAgICBzaWRlYmFyLmFwcGVuZENoaWxkKHByb2plY3RCdXR0b24pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOZXdQcm9qZWN0QnV0dG9uKCkge1xuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZWJhcicpO1xuICAgIGNvbnN0IG5ld1Byb2plY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBuZXdQcm9qZWN0QnV0dG9uLnRleHRDb250ZW50ID0gJysgUHJvamVjdCc7XG4gICAgbmV3UHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RNb2RhbCcpO1xuICAgICAgICBwcm9qZWN0TW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfSk7XG4gICAgc2lkZWJhci5hcHBlbmRDaGlsZChuZXdQcm9qZWN0QnV0dG9uKTtcbn1cblxuZnVuY3Rpb24gYWN0aXZlUHJvamVjdChlKSB7XG4gICAgY29uc3QgcHJvamVjdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdCcpO1xuICAgIHByb2plY3RCdXR0b25zLmZvckVhY2goYnV0dG9uID0+IGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgaWYoZSA9PSAncGVyc29uYWwnKXtcbiAgICAgICAgcHJvamVjdEJ1dHRvbnNbMF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbGV0IGRhdGFOYW1lID0gZS5yZXBsYWNlKC9cXHMvZywgXCJcIik7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtbmFtZT0ke2RhdGFOYW1lfV1gKTtcbiAgICAgICAgY3VycmVudFByb2plY3QuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxufVxuXG4vL1Rhc2sgRE9NXG5mdW5jdGlvbiBjcmVhdGVOZXdUYXNrQnV0dG9uKCl7XG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXInKTtcbiAgICBjb25zdCBuZXdUYXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgbmV3VGFza0J1dHRvbi50ZXh0Q29udGVudCA9ICcrIFRvLURvJztcbiAgICBuZXdUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCB0YXNrTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza01vZGFsJyk7XG4gICAgICAgIHRhc2tNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9KTtcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tCdXR0b24pO1xufVxuXG5mdW5jdGlvbiBsb2FkUHJvamVjdFRhc2tzIChwcm9qZWN0TmFtZSkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpO1xuICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgY29uc3QgYWxsVGFza3MgPSBUb2RvLmdldFByb2plY3QocHJvamVjdE5hbWUpLmdldFRhc2tzKCk7XG4gICAgYWxsVGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgICBjb25zdCBuZXdUYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG5ld1Rhc2suY2xhc3NMaXN0LmFkZCgndGFzaycpXG4gICAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgICAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgY29uc3Qgbm90ZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBuYW1lLnRleHRDb250ZW50ID0gdGFzay5nZXRUaXRsZSgpO1xuICAgICAgICBkYXRlLnRleHRDb250ZW50ID0gdGFzay5nZXREdWVEYXRlKCk7XG4gICAgICAgIG5vdGVzLnRleHRDb250ZW50ID0gdGFzay5nZXREZXNjcmlwdGlvbigpO1xuICAgICAgICBwcmlvcml0eS50ZXh0Q29udGVudCA9IHRhc2suZ2V0UHJpb3JpdHkoKTtcbiAgICAgICAgbmV3VGFzay5hcHBlbmRDaGlsZChuYW1lKTtcbiAgICAgICAgbmV3VGFzay5hcHBlbmRDaGlsZChkYXRlKTtcbiAgICAgICAgbmV3VGFzay5hcHBlbmRDaGlsZChub3Rlcyk7XG4gICAgICAgIG5ld1Rhc2suYXBwZW5kQ2hpbGQocHJpb3JpdHkpO1xuICAgICAgICBjb250ZW50LmFwcGVuZENoaWxkKG5ld1Rhc2spO1xuICAgIH0pXG59XG5cbi8vRXZlbnQgTGlzdGVuZXJzXG4gICAgLy9BZGQgUHJvamVjdCBCdXR0b25cbmNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RGb3JtJyk7XG5wcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3ROYW1lJyk7XG4gICAgVG9kby5hZGRQcm9qZWN0KHByb2plY3ROYW1lLnZhbHVlKTtcbiAgICBsb2FkUHJvamVjdHMoKTtcbiAgICBhY3RpdmVQcm9qZWN0KHByb2plY3ROYW1lLnZhbHVlKTtcbiAgICByZXNldEZvcm0oJ3Byb2plY3QnKTtcbn0pO1xuXG4gICAgLy9BZGQgVGFzayBCdXR0b25cbmNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tGb3JtJyk7XG50YXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza05hbWUnKS52YWx1ZTtcbiAgICBsZXQgbm90ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza05vdGVzJykudmFsdWU7XG4gICAgbGV0IGRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza0RhdGUnKS52YWx1ZTtcbiAgICBsZXQgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpb3JpdHknKS52YWx1ZTtcbiAgICBjb25zdCBjdXJyZW50UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKS50ZXh0Q29udGVudDtcbiAgICBUb2RvLmdldFByb2plY3QoY3VycmVudFByb2plY3QpLnB1c2hUYXNrKG5hbWUsIG5vdGVzLCBkYXRlLCBwcmlvcml0eSk7XG4gICAgbG9hZFByb2plY3RUYXNrcyhjdXJyZW50UHJvamVjdCk7XG4gICAgcmVzZXRGb3JtKCd0YXNrJyk7XG59KTtcblxuICAgIC8vTW9kYWwgQ2xvc2UgQnV0dG9uc1xuY29uc3QgcHJvamVjdENsb3NlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RDbG9zZScpO1xuY29uc3QgdGFza0Nsb3NlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tDbG9zZScpO1xucHJvamVjdENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdG9nZ2xlTW9kYWwoJ3Byb2plY3QnKSk7XG50YXNrQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0b2dnbGVNb2RhbCgndGFzaycpKTtcblxuXG4vL0hlbHBlciBGdW5jdGlvbnNcbmZ1bmN0aW9uIGNsZWFyKGRpdk5hbWUpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkaXZOYW1lKTtcbiAgICBpZiAoZGl2LmlubmVySFRNTCAhPT0gJycpIHtcbiAgICAgICAgZGl2LmlubmVySFRNTCA9ICcnO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIHRvZ2dsZU1vZGFsKGNob2ljZSl7XG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtjaG9pY2V9TW9kYWxgKTtcbiAgICBpZiAobW9kYWwuc3R5bGUuZGlzcGxheSA9PSAnYmxvY2snKSB7XG4gICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZXNldEZvcm0oY2hvaWNlKXtcbiAgICB0b2dnbGVNb2RhbChjaG9pY2UpO1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtjaG9pY2V9Rm9ybWApO1xuICAgIGZvcm0ucmVzZXQoKTtcbn1cblxuZXhwb3J0IHsgbG9hZFBhZ2UgfTtcbiIsImltcG9ydCBUYXNrIGZyb20gXCIuL3Rhc2tcIjtcblxuY29uc3QgUHJvamVjdCA9IChuYW1lKSA9PiB7XG4gICAgbGV0IF9uYW1lID0gbmFtZTtcbiAgICBsZXQgX3Byb2plY3RUYXNrcyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIF9uYW1lO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXROYW1lKHZhbHVlKSB7XG4gICAgICAgIF9uYW1lID0gdmFsdWU7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHB1c2hUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpIHtcbiAgICAgICAgX3Byb2plY3RUYXNrcy5wdXNoKFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRUYXNrcygpIHtcbiAgICAgICAgcmV0dXJuIF9wcm9qZWN0VGFza3M7XG4gICAgfTtcblxuICAgIHJldHVybiB7Z2V0TmFtZSwgc2V0TmFtZSwgcHVzaFRhc2ssIGdldFRhc2tzfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3Q7IiwiY29uc3QgVGFzayA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSA9PiB7XG5cbiAgICBsZXQgX3RpdGxlID0gdGl0bGU7XG4gICAgbGV0IF9kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIGxldCBfZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgbGV0IF9wcmlvcml0eSA9IHByaW9yaXR5O1xuXG4gICAgZnVuY3Rpb24gZ2V0VGl0bGUoKXtcbiAgICAgICAgcmV0dXJuIF90aXRsZTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0RGVzY3JpcHRpb24oKXtcbiAgICAgICAgcmV0dXJuIF9kZXNjcmlwdGlvbjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0RHVlRGF0ZSgpe1xuICAgICAgICByZXR1cm4gX2R1ZURhdGU7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldFByaW9yaXR5KCl7XG4gICAgICAgIHJldHVybiBfcHJpb3JpdHk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldFRpdGxlKHZhbHVlKXtcbiAgICAgICAgX3RpdGxlID0gdmFsdWU7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldERlc2NyaXB0aW9uKHZhbHVlKXtcbiAgICAgICAgX2Rlc2NyaXB0aW9uID0gdmFsdWU7XG4gICAgfTtcblxuXG4gICAgZnVuY3Rpb24gc2V0RHVlRGF0ZSh2YWx1ZSl7XG4gICAgICAgIF9kdWVEYXRlID0gdmFsdWU7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldFByaW9yaXR5KHZhbHVlKXtcbiAgICAgICAgX3ByaW9yaXR5ID0gdmFsdWU7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gICAgICAgIHJldHVybiBfdGl0bGUgKyAnICcgKyBfZGVzY3JpcHRpb24gKyAnICcgKyBfZHVlRGF0ZSArICcgJyArIF9wcmlvcml0eTtcbiAgICB9XG5cbiAgICByZXR1cm4ge2dldFRpdGxlLCBzZXRUaXRsZSwgZ2V0RGVzY3JpcHRpb24sIHNldERlc2NyaXB0aW9uLCBcbiAgICAgICAgZ2V0RHVlRGF0ZSwgc2V0RHVlRGF0ZSwgZ2V0UHJpb3JpdHksIHNldFByaW9yaXR5LCB0b1N0cmluZ307XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUYXNrOyIsImltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3RzXCI7XG5cbmNvbnN0IFRvZG8gPSAoKCkgPT4ge1xuICAgIGxldCBwcm9qZWN0cyA9IFtdO1xuICAgIHByb2plY3RzLnB1c2goUHJvamVjdCgnUGVyc29uYWwnKSk7XG4gICAgcHJvamVjdHMucHVzaChQcm9qZWN0KCdXb3JrJykpO1xuICAgIHByb2plY3RzLnB1c2goUHJvamVjdCgnVHJhdmVsJykpO1xuXG4gICAgZnVuY3Rpb24gZ2V0UHJvamVjdHMoKXtcbiAgICAgICAgcmV0dXJuIHByb2plY3RzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByb2plY3QocHJvamVjdE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuZ2V0TmFtZSgpID09PSBwcm9qZWN0TmFtZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkUHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAgICAgICBpZiAocHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5nZXROYW1lKCkgPT09IHByb2plY3ROYW1lKSlcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBwcm9qZWN0cy5wdXNoKFByb2plY3QocHJvamVjdE5hbWUpKTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHtnZXRQcm9qZWN0cywgZ2V0UHJvamVjdCwgYWRkUHJvamVjdH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG87IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBMb2FkVUkgZnJvbSBcIi4vZnVuY3Rpb25zL2xvYWRVSVwiO1xuaW1wb3J0IFRvZG8gZnJvbSBcIi4vZnVuY3Rpb25zL3RvZG9cIjtcblxuTG9hZFVJLmxvYWRQYWdlKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=