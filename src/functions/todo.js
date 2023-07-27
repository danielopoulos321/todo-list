import Project from "./projects";

const Todo = (() => {
    let projects = [];
    projects.push(Project('Personal'));
    projects.push(Project('Work'));
    projects.push(Project('Travel'));

    function getProjects(){
        return projects;
    }

    function getProject(projectName) {
        return projects.find((project) => project.getName() === projectName);
    }

    function addProject(projectName) {
        if (projects.find((project) => project.getName() === projectName))
            return
        projects.push(Project(projectName));
    }
    
    return {getProjects, getProject, addProject}
})();

export default Todo;