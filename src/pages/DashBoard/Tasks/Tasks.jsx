import React from 'react';
import TaskOverview from '../../../Components/DashboardComponent/TaskComponent/TaskOverview.jsx';
import TasksShow from '../../../Components/DashboardComponent/TaskComponent/TasksShow.jsx';

const Tasks = () => {
    return (
        <div>
            <TaskOverview></TaskOverview>
            <TasksShow></TasksShow>
        </div>
    );
};

export default Tasks;