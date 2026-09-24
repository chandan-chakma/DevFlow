import React from 'react';
import { LuCalendarDays } from 'react-icons/lu';
import { PiHandWavingFill } from 'react-icons/pi';
import { RiTargetFill } from 'react-icons/ri';
import State from '../../../Components/DashboardComponent/State.jsx';
import OverviewChart from '../../../Components/DashboardComponent/OverviewChart.jsx';
import TasksPieChart from '../../../Components/DashboardComponent/TasksPieChart.jsx';
import RecentProject from '../../../Components/DashboardComponent/RecentProject.jsx';
import RecentAcitvity from '../../../Components/DashboardComponent/RecentAcitvity.jsx';
import MyTasks from '../../../Components/DashboardComponent/MyTasks.jsx';
import Calendar from '../../../Components/DashboardComponent/Calendar.jsx';

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

                
                <div className='flex items-center gap-3 mt-4'>
                    {/* Project OverviewChart  */}
                    <OverviewChart></OverviewChart>
                    {/* task Pice chart component  */}
                    <TasksPieChart></TasksPieChart>
                </div>

               
                <div className='flex justify-center items-center gap-2 mt-6'>
                    {/* Recent Project  */}
                    <RecentProject></RecentProject>
                    {/* My tasks  */}
                    <MyTasks></MyTasks>
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