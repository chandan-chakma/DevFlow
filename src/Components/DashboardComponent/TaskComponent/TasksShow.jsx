import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { LuArrowDownUp, LuChevronDown, LuEllipsis } from 'react-icons/lu';
import UseAxiosSecures from '../../../Hooks/UseAxiosSecures.jsx';
import Swal from 'sweetalert2';

const TasksShow = () => {
    const axiosSecure = UseAxiosSecures();
    // for search project 
    const [search, setSearch] = useState('');
    // for filtering button
    const [sort, setSort] = useState('latest');
    

    //    use tanstack state data  get task data
    const {data:tasks=[] } = useQuery({
        queryKey:['tasks'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tasks')
            // console.log(res)
            return res.data
        }
    })

    // delete task mutation 
     const queryClient = useQueryClient()
    const deleteTaskMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/tasks/${id}`)
            // console.log(res)
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        }
    })




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

    // delete Task 
    const handleDeleteTask = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTaskMutation.mutate(id)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });                    
    }

        // change date format 
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };



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

            <div className='mt-5'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>Task</th>
                                <th>Project</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Due Date</th>
                                <th>Assignee</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                tasks.map(task =>
                                    <tr key={ task._id}>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div className='min-w-0'>
                                                    <div className="font-bold">{task.title}</div>
                                                    <div className="w-72 truncate text-sm opacity-50">{task.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                           {task.projectName}
                                        </td>
                                        <td>
                                            <span className={`p-2 rounded-lg ${task.status === 'To Do'
                                                ? 'bg-[#FEE1E4] text-error'
                                                    : task.status === 'In Progress'
                                                    ? 'bg-[#DEEDFE] text-info'
                                                        : task.status === 'Done'
                                                        ? 'bg-[#DDF6F2] text-success'
                                                            : ''
                                                }`}>
                                                {task.status}

                                            </span>
                                            
                                        </td>
                                        <td>
                                            <span className={`p-2 rounded-lg ${task.priority === 'High'
                                                ? 'bg-[#FEE1E4] text-error'
                                                : task.priority === 'Medium'
                                                    ? 'bg-[#FFEFD8] text-warning'
                                                    : task.priority === 'Done'
                                                        ? 'bg-[#DDF6F2] text-success'
                                                        : ''
                                                }`}>
                                                {task.priority}

                                            </span>
                                        </td>
                                        <td>{formatDate(task.dueDate)}</td>
                                        <td>
                                            
                                        </td>
                                        <th>
                                            {/* More button */}
                                            <div className="dropdown dropdown-end">
                                                <button
                                                    tabIndex={0}
                                                    type="button"
                                                    className="rounded-lg p-1.5 text-slate-500 transition hover:bg-base-200 hover:text-base-content"
                                                >
                                                    <LuEllipsis size={23} />
                                                </button>

                                                <ul
                                                    tabIndex={-1}
                                                    className="menu dropdown-content z-50 mt-2 w-40 rounded-xl border border-base-300 bg-base-100 p-2 shadow-lg"
                                                >
                                                    <li>
                                                        <button type="button">
                                                            View
                                                        </button>
                                                    </li>

                                                    <li>
                                                        <button type="button">
                                                            Edit
                                                        </button>
                                                    </li>

                                                    <li>
                                                        <button onClick={()=>handleDeleteTask(task._id)}
                                                            type="button"
                                                            className="text-error"
                                                        >
                                                            Delete
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                            
                                                                   
                                        </th>
                                    </tr>
                                )
                            }

                        </tbody>

                    </table>
                </div>

            </div>
        </div>
    );
};

export default TasksShow;