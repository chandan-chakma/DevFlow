import React from 'react';
import { BiTask } from 'react-icons/bi';
import { FaRegFolder } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { IoArrowUp } from 'react-icons/io5';
import { MdTaskAlt } from 'react-icons/md';
import UseAxiosSecures from '../../../Hooks/UseAxiosSecures.jsx';
import { useQuery } from '@tanstack/react-query';

const State = () => {
    const axiosSecure = UseAxiosSecures();

    const { data: overview = [] } = useQuery({
        queryKey: ['dashboard-summary'],
        queryFn: async () => {
            const res = await axiosSecure.get('/dashboard/summary');
            console.log(res);
            return res.data;
        }
    });
    const { completedTasks, totalMembers, totalProjects, totalTasks, newProjectsThisWeek, completedToday, newMembersThisWeek,completedTasksChange} = overview.stats;
    console.log(overview.stats)
    return (
        <div className='mt-4'>
            <section className='grid grid-cols-4 gap-2'>
                {/* total project  */}
                <div className="stats shadow bg-white">
                    <div className="stat">
                        <div className='w-14 h-14 bg-base-300 rounded-lg py-4 flex justify-center items-center'>
                            <FaRegFolder size={28}
                                className='text-primary' />
                        </div>

                        <div className='mt-3'>
                            <h1 className='text-2xl'>{totalProjects}</h1>
                            <p className='text-muted my-2'>Total Projects</p>
                            <div className='flex items-center gap-1 text-success'>
                                <IoArrowUp />
                                <p className='text-xs'> {newProjectsThisWeek??0} new this week</p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Total task  */}

                <div className="stats shadow bg-white">
                    <div className="stat">
                        <div className='w-14 h-14 bg-[#DAF8EF] rounded-lg py-4 flex justify-center items-center'>
                            <BiTask size={28}
                                className='text-success' />
                        </div>

                        <div className='mt-3'>
                            <h1 className='text-2xl'>{totalTasks}</h1>
                            <p className='text-muted my-2'>Total Tasks</p>
                            <div className='flex items-center gap-1 text-success'>
                                <IoArrowUp />
                                <p className='text-xs'> {completedToday ?? 0} completed today</p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Team members  */}
                <div className="stats shadow bg-white">
                    <div className="stat">
                        <div className='w-14 h-14 bg-[#DDE9FE] rounded-lg py-4 flex justify-center items-center'>
                            <FiUsers size={28}
                                className='text-info' />
                        </div>

                        <div className='mt-3'>
                            <h1 className='text-2xl'>{totalMembers}</h1>
                            <p className='text-muted my-2'>Team Members</p>
                            <div className='flex items-center gap-1 text-success'>
                                <IoArrowUp />
                                <p className='text-xs'> {newMembersThisWeek ?? 0} new member</p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* complete task  */}
                <div className="stats shadow bg-white">
                    <div className="stat">
                        <div className='w-14 h-14 bg-[#FFF0DD] rounded-lg py-4 flex justify-center items-center'>
                            <MdTaskAlt size={28}
                                className='text-warning' />
                        </div>

                        <div className='mt-3'>
                            <h1 className='text-2xl'>{completedTasks}</h1>
                            <p className='text-muted my-2'>Completed Tasks</p>
                            <div className='flex items-center gap-1 text-warning'>
                                <IoArrowUp />
                                <p className='text-xs'>{ completedTasksChange > 0 ? "+" : ""}
                                    {completedTasksChange ?? 0}% from last week</p>
                            </div>

                        </div>
                    </div>
                </div>
                                
            
            </section>
        </div>
    );
};

export default State;