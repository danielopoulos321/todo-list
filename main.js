(()=>{"use strict";const t=t=>{let e=t,n=[];return{getName:function(){return e},setName:function(t){e=t},pushTask:function(t,e,o,c){n.push(((t,e,n,o)=>{let c=t,r=e,u=n,i=o;return{getTitle:function(){return c},setTitle:function(t){c=t},getDescription:function(){return r},setDescription:function(t){r=t},getDueDate:function(){return u},setDueDate:function(t){u=t},getPriority:function(){return i},setPriority:function(t){i=t}}})("test","test2","test3","test4"))},getTasks:function(){return n}}},e=(()=>{let e=[];return e.push(t("Personal")),e.push(t("Work")),e.push(t("Travel")),{getProjects:function(){return e},getProject:function(t){return e.find((e=>e.getName()===t))},addProject:function(n){e.find((t=>t.getName()===n))||e.push(t(n))}}})();(function t(){!function(t){const e=document.getElementById("sidebar");""!==e.innerHTML&&(e.innerHTML="")}(),e.getProjects().forEach((t=>{!function(t){const e=document.getElementById("sidebar"),n=document.createElement("button");n.classList.add("project"),n.textContent=t,e.appendChild(n)}(t.getName())})),function(){const n=document.getElementById("sidebar"),o=document.createElement("button");o.classList.add("project"),o.textContent="+ Project",o.addEventListener("click",(()=>{const n=window.prompt("Enter the project name:");n&&(e.addProject(n),t())})),n.appendChild(o)}()})(),function(){const t=document.getElementById("content"),e=document.createElement("button");e.textContent="+ To-Do",t.appendChild(e)}()})();