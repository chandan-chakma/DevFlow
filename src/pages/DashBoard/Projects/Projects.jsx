import React from 'react';
import OverViewProject from '../../../Components/DashboardComponent/ProjectComponent/OverViewProject.jsx';
import ProjectsShow from '../../../Components/DashboardComponent/ProjectComponent/ProjectsShow.jsx';

const Projects = () => {
    return (
        <div>
            <OverViewProject></OverViewProject>
            <ProjectsShow></ProjectsShow>
        </div>
    );
};

export default Projects;