import React, { useState } from 'react';
import { LuArrowDownUp, LuChevronDown } from 'react-icons/lu';

const TasksShow = () => {

    // for search project 
    const [search, setSearch] = useState('');
    // for filtering button
      const [sort, setSort] = useState('latest');


    // const getStatusCount = (statusName) => {
    //     const item = statusCounts.find(
    //         item => item.status === statusName
    //     );

    //     return item ? item.count : 0;
    // };
    // searchig handle  
    const handleSearchTasks = (e) => {
        const searching = e.target.value;
        // console.log(searching)
        setSearch(searching);
    }



    return (
        <div>
            {/* filter section  */}

            <div className='flex flex-col md:flex-row justify-around gap-5 my-8'>
                {/* searching project  */}
                <div className="">
                    <label className="input rounded-lg">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input onChange={handleSearchTasks} type="search" required placeholder="Search projects..." />
                    </label>
                </div>

                <div className='grid grid-cols-4 gap-2'>
                    {/* Sort by project  */}
                    <div className="dropdown ">
                        <button
                            tabIndex={0}
                            role="button"
                            className="flex h-10 w-50 items-center justify-between rounded-xl border border-base-300 bg-base-100 px-3 text-lg font-semibold text-slate-500 shadow-sm hover:bg-base-200"
                        >
                            <div className="flex items-center gap-2 text-sm">
                                <LuArrowDownUp
                                    size={18}
                                    className="text-slate-500"
                                />
                                All Projects
                            </div>

                            <LuChevronDown
                                size={18}
                                className="text-slate-500"
                            />
                        </button>

                        <ul
                            tabIndex={-1}
                            className="menu dropdown-content z-50 mt-2 w-40 rounded-xl border border-base-300 bg-base-100 p-2 shadow-lg"
                        >
                            <li>
                                <button>
                                    Latest
                                </button>
                            </li>

                            <li>
                                <button>
                                    Oldest
                                </button>
                            </li>

                            <li>
                                <button>
                                    Name: A → Z
                                </button>
                            </li>

                            <li>
                                <button>
                                    Name: Z → A
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Sort by status  */}
                    <div className="dropdown ">
                        <button
                            tabIndex={0}
                            role="button"
                            className="flex h-10 w-50 items-center justify-between rounded-xl border border-base-300 bg-base-100 px-3 text-lg font-semibold text-slate-500 shadow-sm hover:bg-base-200"
                        >
                            <div className="flex items-center gap-2 text-sm">
                                <LuArrowDownUp
                                    size={18}
                                    className="text-slate-500"
                                />
                                All Status
                            </div>

                            <LuChevronDown
                                size={18}
                                className="text-slate-500"
                            />
                        </button>

                        <ul
                            tabIndex={-1}
                            className="menu dropdown-content z-50 mt-2 w-40 rounded-xl border border-base-300 bg-base-100 p-2 shadow-lg"
                        >
                            <li>
                                <button>
                                    Latest
                                </button>
                            </li>

                            <li>
                                <button>
                                    Oldest
                                </button>
                            </li>

                            <li>
                                <button>
                                    Name: A → Z
                                </button>
                            </li>

                            <li>
                                <button>
                                    Name: Z → A
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Sort by priority */}
                    <div className="dropdown ">
                        <button
                            tabIndex={0}
                            role="button"
                            className="flex h-10 w-50 items-center justify-between rounded-xl border border-base-300 bg-base-100 px-3 text-lg font-semibold text-slate-500 shadow-sm hover:bg-base-200"
                        >
                            <div className="flex items-center gap-2 text-sm">
                                <LuArrowDownUp
                                    size={18}
                                    className="text-slate-500"
                                />
                                All Priority
                            </div>

                            <LuChevronDown
                                size={18}
                                className="text-slate-500"
                            />
                        </button>

                        <ul
                            tabIndex={-1}
                            className="menu dropdown-content z-50 mt-2 w-40 rounded-xl border border-base-300 bg-base-100 p-2 shadow-lg"
                        >
                            <li>
                                <button>
                                    Latest
                                </button>
                            </li>

                            <li>
                                <button>
                                    Oldest
                                </button>
                            </li>

                            <li>
                                <button>
                                    Name: A → Z
                                </button>
                            </li>

                            <li>
                                <button>
                                    Name: Z → A
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* sort by update  */}
                    <div className="dropdown ">
                        <button
                            tabIndex={0}
                            role="button"
                            className="flex h-10 w-56 items-center justify-between rounded-xl border border-base-300 bg-base-100 px-3 text-lg font-semibold text-slate-500 shadow-sm hover:bg-base-200"
                        >
                            <div className="flex items-center gap-2 text-sm">
                                <LuArrowDownUp
                                    size={18}
                                    className="text-slate-500"
                                />
                                Sort by:
                            </div>

                            <LuChevronDown
                                size={18}
                                className="text-slate-500"
                            />
                        </button>

                        <ul
                            tabIndex={-1}
                            className="menu dropdown-content z-50 mt-2 w-40 rounded-xl border border-base-300 bg-base-100 p-2 shadow-lg"
                        >
                            <li>
                                <button>
                                    Latest
                                </button>
                            </li>

                            <li>
                                <button>
                                    Oldest
                                </button>
                            </li>

                            <li>
                                <button>
                                    Name: A → Z
                                </button>
                            </li>

                            <li>
                                <button>
                                    Name: Z → A
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            {/* Button  */}
            <div className='flex items-center gap-5 '>
                <div>
                    <button className={`btn ${status === '' ? 'btn-primary' : 'bg-[#FEFFFE]'} rounded-xl`} >All
                        <span className='bg-accent text-accent-content rounded-2xl w-6 ml-2'>12</span>
                    </button>
               </div>

                <div>
                    <button className={`btn ${status === 'active' ? 'btn-primary' : 'bg-[#FEFFFE]'} rounded-xl text-error`}>To Do
                        <span className='bg-[#F8E7ED] text-error rounded-2xl w-6 ml-2'>12</span>

                    </button>
                </div>

                <div>
                    <button className={`btn ${status === 'active' ? 'btn-primary' : 'bg-[#FEFFFE]'} rounded-xl text-[#4E8FF2]`}>In Progress
                        <span className='bg-[#F8E7ED] text-[#4E8FF2] rounded-2xl w-6 ml-2'>12</span>
                    </button>
                </div>

                <div>
                    <button className={`btn ${status === 'completed' ? 'btn-primary' : 'bg-[#FEFFFE]'} rounded-xl text-success`}>Done
                        <span className='bg-[#F8E7ED] text-success rounded-2xl w-6 ml-2'>12</span>
                    </button>

                </div>
               
           
                
                    
              
                    
        
                
            </div>

            <div className='grid grid-cols-1  md:grid-cols-3 gap-5'>
                {/* {
                    projects.map(project => <ProjectCard key={project._id} project={project} refetch={refetch}>
                    </ProjectCard>)

                } */}

            </div>
        </div>
    );
};

export default TasksShow;