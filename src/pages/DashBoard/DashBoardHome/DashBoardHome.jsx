import React from 'react';
import { LuCalendarDays } from 'react-icons/lu';
import { PiHandWavingFill } from 'react-icons/pi';
import { RiTargetFill } from 'react-icons/ri';
import State from '../../../Components/DashboardComponent/HomeDashboard/State.jsx';
import OverviewChart from '../../../Components/DashboardComponent/HomeDashboard/OverviewChart.jsx';
import TasksPieChart from '../../../Components/DashboardComponent/HomeDashboard/TasksPieChart.jsx';
import RecentProject from '../../../Components/DashboardComponent/HomeDashboard/RecentProject.jsx';
import RecentAcitvity from '../../../Components/DashboardComponent/HomeDashboard/RecentAcitvity.jsx';
import MyTasks from '../../../Components/DashboardComponent/HomeDashboard/MyTasks.jsx';
import Calendar from '../../../Components/DashboardComponent/HomeDashboard/Calendar.jsx';

const DashBoardHome = () => {
    return (
        <div className='grid grid-cols-12 gap-5'>
            <div className='col-span-9'>
                <section className='flex justify-between items-center'>
                    <div>
                        <div className='flex items-center'>
                            <h1 className='text-neutral text-2xl'>Good Morning, Chandan </h1> <PiHandWavingFill className='text-amber-500 ml-2' size={28} />
                        </div>
                        <p className='text-muted'>Here's what's happening with your projects today.</p>
                    </div>
                    <div className='flex gap-3'>
                        <div className='flex items-center gap-1'>
                            <LuCalendarDays />
                            <p>Tue, Apr 21,2026</p>
                        </div>
                        <div className="badge bg-[rgb(202,201,206)] text-primary">
                            keep going!
                            <RiTargetFill className='text-primary'
                            size={18}/>
                        </div>

                    </div>   
                </section>

                {/* state section  */}
                <State></State>

                
                {/* Charts */}
                <div className="mt-4 grid grid-cols-12 gap-3">

                    <div className="col-span-8">
                        <OverviewChart />
                    </div>

                    <div className="col-span-4">
                        <TasksPieChart />
                    </div>

                </div>

               
                <div className='mt-4 grid grid-cols-12 gap-3'>
                    {/* Recent Project  */}
                    <div className='col-span-8 min-w-0' >
                        <RecentProject></RecentProject>

                    </div>
                    <div className="col-span-4 min-w-0">
                        {/* My tasks  */}
                        <MyTasks></MyTasks>

                    </div>
                    
                   
                </div>
                
            </div>

            {/* sidebar  */}
            <div className='col-span-3'>
                <div>
                    <RecentAcitvity></RecentAcitvity>
                    <Calendar></Calendar>

                </div>
                

            </div>
        </div>
    );
};

export default DashBoardHome;