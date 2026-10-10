import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { LuArrowDownUp, LuCalendarDays, LuChevronDown, LuEllipsis, LuFolderPlus, LuX } from 'react-icons/lu';
import UseAxiosSecures from '../../../Hooks/UseAxiosSecures.jsx';
import Swal from 'sweetalert2';
import { FaRegFlag } from 'react-icons/fa';
import { RiProjector2Line } from 'react-icons/ri';
import { useForm } from 'react-hook-form';

const TasksShow = () => {
    const axiosSecure = UseAxiosSecures();
    // for show defult data in update task 
    const [selectedTask, setSelectedTask] = useState(null);
    const { register, handleSubmit,reset, formState: { errors } } = useForm()
    // for search project 
    const [search, setSearch] = useState('');
    
    // for filtering button
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [sort, setSort] = useState('latest');
    

    //    use tanstack state data  get task data
    const {data:tasks=[] } = useQuery({
        queryKey:['tasks',search,status,priority,sort],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks?searchText=${search}&status=${status}&priority=${priority}&sort=${sort}`)
            // console.log(res)
            return res.data
        }
    })

    // update task 
    const openaddTaskModalRef = useRef();

    const handleUpdateTask = (task) => {
        setSelectedTask(task);
        reset({
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate,
            status: task.status
        });
        // console.log(task)
        openaddTaskModalRef.current.showModal();
    }

    // update api use useMutation 
    const updateTaskMutation = useMutation({
        mutationFn: async ({id, taskData}) => {
            const res = await axiosSecure.patch(`/tasks/${id}`,taskData)
            return res.data
        }, 
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            if (data.modifiedCount) {
                Swal.fire({
                    title: "Updated!",
                    text: "Task has been updated successfully.",
                    icon: "success"
                });
            }
        }
    })
        // update modal data 
    const onSubmit = (data) => {
        if (selectedTask) {
            updateTaskMutation.mutate({
                id: selectedTask._id,
                taskData: data
            })
  
        }
        
        openaddTaskModalRef.current.close()
    }

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
                        <input onChange={handleSearchTasks} type="search" required placeholder="Search projects..." />
                    </label>
                </div>

                <div className='flex items-center gap-5'>
                    {/* Sort by task status */}
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
                                {status ===''?'All Tasks': status}
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
                                <button onClick={()=>setStatus('')}>
                                    All Tasks
                                </button>
                            </li>

                            <li>
                                <button onClick={()=>setStatus('To Do')}>
                                    To Do
                                </button>
                            </li>

                            <li>
                                <button onClick={()=>setStatus('In Progress')}>
                                    In Progress
                                </button>
                            </li>

                            <li>
                                <button onClick={()=>setStatus('Done')}>
                                    Done
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
                                {priority===''?'All Priority':priority}
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
                                <button onClick={() => setPriority('')}>
                                    All Priority
                                </button>
                            </li>
                            <li>
                                <button onClick={()=>setPriority('High')}>
                                    High
                                </button>
                            </li>

                            <li>
                                <button onClick={()=>setPriority("Medium")}>
                                    Medium
                                </button>
                            </li>

                            <li>
                                <button onClick={()=>setPriority('Low')}>
                                    Low
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
                                Sort by:{
                                    sort==='latest'?'latest':sort
                                }
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
                                <button onClick={()=>setSort('latest')}>
                                    Latest
                                </button>
                            </li>

                            <li>
                                <button onClick={()=>setSort('oldest')}>
                                    Oldest
                                </button>
                            </li>

                            <li>
                                <button onClick={() => setSort('due-asc')}>
                                    DueDate
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
                                tasks.length === 0 ?
                                    (<tr>
                                        <td colSpan="7" className="py-10 text-center text-2xl text-error">
                                            No task found
                                        </td>
                                    </tr>):
                                (tasks.map(task =>
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
                                                        <button onClick={()=>handleUpdateTask(task)} type="button">
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
                                ))
                            }

                        </tbody>

                    </table>

                    
                    <dialog ref={openaddTaskModalRef} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box max-w-2xl">
                            <div className="flex items-start justify-between px-7 pt-7">
                                <div className="flex items-center gap-4">

                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                                        <LuFolderPlus size={28} />
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-bold text-base-content">
                                            Edit Task
                                        </h2>

                                        <p className="mt-1 text-sm text-muted">
                                            Edit the task details below.
                                        </p>
                                    </div>

                                </div>
                                <div className="">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button
                                            className="btn rounded-lg p-2 text-slate-400 transition hover:bg-base-200 hover:text-base-content"
                                        >
                                            <LuX size={18} />
                                        </button>
                                    </form>
                                </div>
                            </div>


                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-6 px-7 py-6">

                                    {/* Project Name */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-base-content">
                                            Task Name <span className="text-error">*</span>
                                        </label>

                                        <div className="relative">

                                            <RiProjector2Line
                                                size={20}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 z-5 text-slate-400"
                                            />

                                            <input
                                                type="text"
                                                placeholder="e.g. Build authentication system"
                                                className={`input h-10 w-full rounded-xl border bg-base-100 pl-12 pr-4 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.title
                                                    ? "border-error"
                                                    : "border-base-300"
                                                    }`}
                                                {...register("title", {
                                                    required: "Task name is required",
                                                    minLength: {
                                                        value: 3,
                                                        message:
                                                            "Project name must be at least 3 characters",
                                                    },
                                                })}
                                            />

                                        </div>

                                        {errors.name && (
                                            <p className="mt-1.5 text-sm text-error">
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-base-content">
                                            Description <span className="text-error">*</span>
                                        </label>

                                        <div className="relative">

                                            <LuFolderPlus
                                                size={20}
                                                className="absolute left-4 top-5 text-slate-400"
                                            />

                                            <textarea
                                                rows={4}
                                                maxLength={500}
                                                placeholder="Describe your project, goals and objectives..."
                                                className={`textarea min-h-32 w-full resize-none rounded-xl border bg-base-100 pl-12 pr-4 pt-4 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.description
                                                    ? "border-error"
                                                    : "border-base-300"
                                                    }`}
                                                {...register("description", {
                                                    required: "Project description is required",
                                                    maxLength: {
                                                        value: 500,
                                                        message:
                                                            "Description cannot exceed 500 characters",
                                                    },
                                                })}
                                            />

                                        </div>

                                        {errors.description && (
                                            <p className="mt-1.5 text-sm text-error">
                                                {errors.description.message}
                                            </p>
                                        )}

                                        <p className="mt-1 text-right text-xs text-muted">
                                            Maximum 500 characters
                                        </p>
                                    </div>

                                    {/* Status + Due Date */}
                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                                        {/* Priority */}
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-base-content">
                                                Priority <span className="text-error">*</span>
                                            </label>

                                            <div className="relative text-warning">
                                                <FaRegFlag
                                                    size={20}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-5 text-slate-400 text-warning"
                                                />

                                                <select
                                                    className="select h-10 w-full appearance-none rounded-xl border border-base-300 bg-base-100 pl-10 pr-10 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                                                    {...register("priority")}
                                                >
                                                    <option value="High">
                                                        High
                                                    </option>

                                                    <option value="Medium">
                                                        Medium
                                                    </option>

                                                    <option value="Low">
                                                        Low
                                                    </option>
                                                    {/* 
                                                                                                                <option value="completed">
                                                                                                                    Completed
                                                                                                                </option> */}
                                                </select>

                                                <LuChevronDown
                                                    size={20}
                                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                                />

                                            </div>
                                        </div>

                                        {/* Due Date */}
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-base-content">
                                                Due Date
                                            </label>

                                            <div className="relative">

                                                <LuCalendarDays
                                                    size={20}
                                                    className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                                                />

                                                <input
                                                    type="date"
                                                    className="input h-10 w-full rounded-xl border border-base-300 bg-base-100 pl-12 pr-4 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                                                    {...register("dueDate")}
                                                />

                                            </div>
                                        </div>

                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-base-content">
                                            Status
                                        </label>

                                        <div className="relative">

                                            <span className="pointer-events-none absolute left-4 top-1/2 z-10 h-3 w-3 -translate-y-1/2 rounded-full bg-success" />

                                            <select
                                                className="select h-10 w-full appearance-none rounded-xl border border-base-300 bg-base-100 pl-10 pr-10 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                                                {...register("status")}
                                            >
                                                <option value="To Do">
                                                    To Do
                                                </option>

                                                <option value="In Progress">
                                                    In Progress
                                                </option>

                                                <option value="Done">
                                                    Done
                                                </option>

                                                <option value="Completed">
                                                    Completed
                                                </option>
                                            </select>

                                            <LuChevronDown
                                                size={20}
                                                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                        </div>
                                    </div>


                                </div>
                                {/* Footer */}
                                <div className="flex justify-end gap-3 border-t border-base-300 px-7 py-5">
                                    <form method="dialog">
                                        <button
                                            className="h-12 rounded-xl border border-base-300 bg-base-100 px-7 font-semibold text-slate-600 transition hover:bg-base-200"
                                        >
                                            Cancel
                                        </button>
                                    </form>


                                    <button
                                        type="submit"
                                        className="h-12 rounded-xl bg-primary px-7 font-semibold text-white shadow-sm transition hover:bg-[#4525D9] hover:shadow-md"
                                    >
                                        Update Task
                                    </button>

                                </div>

                            </form>
                        </div>
                    </dialog>
                </div>

            </div>
        </div>
    );
};

export default TasksShow;