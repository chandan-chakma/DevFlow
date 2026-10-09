import React from 'react';
import { LuCalendarDays, LuEllipsis, LuFileCode2, LuUser } from 'react-icons/lu';
import Swal from 'sweetalert2';
import UseAxiosSecures from '../../../Hooks/UseAxiosSecures.jsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';

const ProjectCard = ({ project,refetch }) => {
    const axiosSecure = UseAxiosSecures()
    const { _id,name, description, status, dueDate } = project;

    // change data format 
    const formattedDate = new Date(dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    // using tanstak library usemutation for refetch ui
    const queryClient = useQueryClient()

    const deleteProjectMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/projects/${id}`)
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
                
        }
       
        
    })

    const handleDeleteProject = (id) => {
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
                deleteProjectMutation.mutate(id)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
           
            }
                
              
        });
        
    }

    return (
        <div>
            <div className="w-full max-w-xl rounded-2xl border border-base-300 bg-base-100 p-7 shadow-sm transition-shadow duration-200 hover:shadow-md">

                {/* Top section */}
                <div className="flex items-start justify-between">

                    {/* Project icon */}
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#EEE9FF]">
                        <LuFileCode2
                            size={42}
                            strokeWidth={2.5}
                            className="text-primary"
                        />
                    </div>

                    {/* Right side */}
                    <div className="flex flex-col items-end gap-4">

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
                                    <button onClick={() => handleDeleteProject(_id)}
                                        type="button"
                                        className="text-error"
                                    >
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Status */}
                        <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-500">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                            {status}
                        </span>

                    </div>
                </div>

                <Link to={`/dashboard/projects/${_id}`}>

                    {/* Project information */}
                    <div className="mt-5">

                        <h2 className="text-2xl font-bold text-base-content">
                            {name}
                        </h2>

                        <p className="mt-2 max-w-md text-base leading-7 text-slate-400">
                            {description}
                        </p>

                    </div>

                    {/* Progress */}
                    <div className="mt-7 flex items-center gap-5">

                        <progress
                            className="progress progress-primary h-3 w-full"
                            value="75"
                            max="100"
                        ></progress>

                        <span className="shrink-0 text-base font-semibold text-slate-500">
                            75%
                        </span>

                    </div>

                    {/* Bottom information */}
                    <div className="mt-7 flex flex-wrap items-center justify-between gap-4">

                        {/* Members */}
                        <div className="flex items-center gap-3">

                            {/* Avatar group */}
                            <div className="flex -space-x-3">

                                <div className="avatar">
                                    <div className="h-9 w-9 rounded-full border-2 border-white">
                                        <img
                                            src="https://i.pravatar.cc/100?img=12"
                                            alt="Member"
                                        />
                                    </div>
                                </div>

                                <div className="avatar">
                                    <div className="h-9 w-9 rounded-full border-2 border-white">
                                        <img
                                            src="https://i.pravatar.cc/100?img=32"
                                            alt="Member"
                                        />
                                    </div>
                                </div>

                                <div className="avatar">
                                    <div className="h-9 w-9 rounded-full border-2 border-white">
                                        <img
                                            src="https://i.pravatar.cc/100?img=45"
                                            alt="Member"
                                        />
                                    </div>
                                </div>

                                <div className="avatar">
                                    <div className="h-9 w-9 rounded-full border-2 border-white">
                                        <img
                                            src="https://i.pravatar.cc/100?img=52"
                                            alt="Member"
                                        />
                                    </div>
                                </div>

                                {/* More members */}
                                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-xs font-semibold text-slate-500">
                                    +3
                                </div>

                            </div>

                        </div>

                        {/* Member count */}
                        <div className="flex items-center gap-2 text-slate-400">
                            <LuUser size={22} />

                            <span className="whitespace-nowrap text-sm font-medium">
                                6 members
                            </span>
                        </div>

                        {/* Due date */}
                        <div className="flex items-center gap-2 text-slate-400">
                            <LuCalendarDays size={21} />

                            <span className="whitespace-nowrap text-sm font-medium">
                                {formattedDate}
                            </span>
                        </div>

                    </div>
                </Link>

            </div>
            
               
           
        </div>
    );
};

export default ProjectCard;