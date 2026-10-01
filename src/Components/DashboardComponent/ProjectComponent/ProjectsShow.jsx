import React, { useState } from 'react';
import { LuArrowDownUp, LuChevronDown,  } from 'react-icons/lu';
import UseAxiosSecures from '../../../Hooks/UseAxiosSecures.jsx';
import { useQuery } from '@tanstack/react-query';
import ProjectCard from './ProjectCard.jsx';

const ProjectsShow = () => {
    const axiosSecure = UseAxiosSecures();
    // for search project 
    const [search, setSearch] = useState('');
    // for filtering button
    // Active button 
    const [status, setStatus] = useState(''); 
    // sorting filter
    const [sort, setSort] = useState('latest');
    //    use tanstack state data 
    const { data:projects=[],isLoading,refetch} = useQuery({
        queryKey: ['projects',search,status,sort],
        queryFn: async () => {
            const res = await axiosSecure.get(`/projects?searchText=${search}&status=${status}&sort=${sort}`);
            // console.log(res);
            return res.data;
        }
    })

    // searchig handle  
    const handleSearchProjects = (e) => {
        const searching = e.target.value;
        // console.log(searching)
        setSearch(searching);
    }

    // filter status Active 
    const handleStatusProject = (selectedStatus) => {
        setStatus(selectedStatus);
        // console.log(status)
    }

    // filter sorting 
    const handleFilterSort = (selectedSort) => {
        setSort(selectedSort);
    };

    
    return (
        <div>
            {/* filter section  */}

            <div className='flex flex-col md:flex-row justify-around gap-8 my-8'>
                {/* searching project  */}
                <div className="flex-1">
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
                        <input onChange={handleSearchProjects} type="search" required placeholder="Search projects..." />
                    </label>
                </div>

                {/* Button  */}
                <div className='space-y-5 space-x-7 md:space-x-7 '>
                    <div className="indicator">
                        <span className="indicator-item badge badge-secondary">12</span>
                        <button onClick={() => handleStatusProject('')} className={`btn ${status === '' ?'btn-primary' : 'bg-[#FEFFFE]'} rounded-xl`}>All Projects</button>
                    </div>
                    <div className="indicator">
                        <span className="indicator-item badge badge-secondary">12</span>
                        <button onClick={() => handleStatusProject('active')} className={`btn ${status === 'active' ? 'btn-primary' : 'bg-[#FEFFFE]'} rounded-xl`}>Active</button>
                    </div>
                    <div className="indicator">
                        <span className="indicator-item badge badge-secondary">12</span>
                        <button className="btn bg-[#FEFFFE] rounded-xl">In Progress</button>
                    </div>
                    <div className="indicator">
                        <span className="indicator-item badge badge-secondary">12</span>
                        <button onClick={() => handleStatusProject('completed')} className={`btn ${status === 'completed' ? 'btn-primary' : 'bg-[#FEFFFE]'} rounded-xl`}>Completed</button>
                    </div>
                </div>

                {/* sort by update  */}
                <div className="dropdown dropdown-end">
                    <button
                        tabIndex={0}
                        role="button"
                        className="flex h-10 w-56 items-center justify-between rounded-xl border border-base-300 bg-base-100 px-5 text-lg font-semibold text-slate-500 shadow-sm hover:bg-base-200"
                    >
                        <div className="flex items-center gap-2">
                            <LuArrowDownUp
                                size={18}
                                className="text-slate-500"
                            />

                            <span>
                                Sort by: {
                                    sort === 'latest'
                                        ? 'Latest'
                                        : sort === 'oldest'
                                            ? 'Oldest'
                                            : sort === 'name-asc'
                                                ? 'Name: A → Z'
                                                : 'Name: Z → A'
                                }
                            </span>
                        </div>

                        <LuChevronDown
                            size={18}
                            className="text-slate-500"
                        />
                    </button>

                    <ul
                        tabIndex={-1}
                        className="menu dropdown-content z-50 mt-2 w-80 rounded-xl border border-base-300 bg-base-100 p-2 shadow-lg"
                    >
                        <li>
                            <button onClick={() => handleFilterSort('latest')}>
                                Latest
                            </button>
                        </li>

                        <li>
                            <button onClick={() => handleFilterSort('oldest')}>
                                Oldest
                            </button>
                        </li>

                        <li>
                            <button onClick={() => handleFilterSort('name-asc')}>
                                Name: A → Z
                            </button>
                        </li>

                        <li>
                            <button onClick={() => handleFilterSort('name-desc')}>
                                Name: Z → A
                            </button>
                        </li>
                    </ul>
                </div>


               

            </div>

            <div className='grid grid-cols-1  md:grid-cols-3 gap-5'>
                {
                    projects.map(project => <ProjectCard key={project._id} project={project} refetch={refetch}>
                    </ProjectCard>)

                }
              
            </div>
        </div>
    );
};

export default ProjectsShow;