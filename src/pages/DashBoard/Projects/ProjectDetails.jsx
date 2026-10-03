import React, { act, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UseAxiosSecures from '../../../Hooks/UseAxiosSecures.jsx';
import { useQuery } from '@tanstack/react-query';
import { PiMemberOf } from 'react-icons/pi';
import { LuCalendarDays, LuCircleUserRound, LuClock3, LuEllipsis, LuFlag, LuFolderKanban, LuListTodo, LuPencil, LuRocket, LuUsers } from 'react-icons/lu';
import { Activity } from 'lucide-react';
import Loading from '../../../Components/Loading/Loading.jsx';
import ProjectDetailsOverview from '../../../Components/DashboardComponent/ProjectDetailsComponents/ProjectDetailsOverview.jsx';
import ProjectDetailsTask from '../../../Components/DashboardComponent/ProjectDetailsComponents/ProjectDetailsTask.jsx';

const ProjectDetails = () => {
    const { id } = useParams();
    const axiosSecure = UseAxiosSecures();
    // tab 
    const [activeTab, setActiveTab] = useState('overview');
    // const [project, setProject] = useState([]);
    // get data for single project 
    const {data:project,isLoading } = useQuery({
        queryKey: ['project', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/projects/${id}`)
            console.log(res)
            return res.data;
        }
    })
    // const {createdAt,dueDate } = project;
    if (isLoading) {
        return <Loading></Loading>

    }
    // useEffect(() => {
    //     const res = axiosSecure.get(`/dashboard/projects/${id}`)
    //     console.log(res)
    //     return res.data
    // },[id,axiosSecure])
    // change data formate
    const dateFormate = (date) => {
        const formattedDate = new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

        return formattedDate;
        
    }
  
    return (
        <div>
            <h1>Project Details{ id}</h1>
            <div className="space-y-4">

                {/* =====================================================
                PROJECT HEADER
            ====================================================== */}

                <section className="rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                        {/* Left side */}
                        <div className="flex min-w-0 items-start gap-4">

                            {/* Project Icon */}
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                                <LuRocket size={30} />
                            </div>

                            <div className="min-w-0">

                                <h1 className="text-2xl font-bold text-base-content">
                                    {project.name}
                                </h1>

                                <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">
                                    {project.description }
                                </p>

                                {/* Tags */}
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary" >
                                        Frontend
                                    </span>
                                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary" >
                                        React
                                    </span>
                                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary" >
                                        Tailwind
                                    </span>


                                </div>

                            </div>
                        </div>


                        {/* Right side */}
                        <div className="flex shrink-0 flex-col gap-4 lg:min-w-[280px]">

                            {/* Actions */}
                            <div className="flex justify-between items-center gap-2">

                                <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold capitalize text-success">
                                    <span className="mr-1 inline-block h-2 w-2 rounded-full bg-success"></span>
                                    {project.status}
                                </span>

                                <div>
                                    <button className="btn btn-sm border-base-300 bg-base-100">
                                        <LuPencil size={15} />
                                        Edit
                                    </button>

                                    <button className="btn btn-sm border-base-300 bg-base-100 ml-3">
                                        <LuEllipsis size={17} />
                                    </button>

                                </div>
                            </div>


                            {/* Project metadata */}
                            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">

                                <div className="flex items-center gap-2">
                                    <LuCalendarDays
                                        size={15}
                                        className="text-muted"
                                    />
                                    <span className="text-muted">
                                        Created
                                    </span>
                                </div>

                                <span className="text-right font-medium">
                                    {dateFormate(project.createdAt)}
                                </span>


                                <div className="flex items-center gap-2">
                                    <LuCalendarDays
                                        size={15}
                                        className="text-muted"
                                    />
                                    <span className="text-muted">
                                        Due Date
                                    </span>
                                </div>

                                <span className="text-right font-medium">
                                    {dateFormate(project.dueDate)}
                                </span>


                                <div className="flex items-center gap-2">
                                    <LuFlag
                                        size={15}
                                        className="text-muted"
                                    />
                                    <span className="text-muted">
                                        Priority
                                    </span>
                                </div>

                                <span className="justify-self-end rounded-full bg-error/10 px-2.5 py-0.5 text-xs font-semibold capitalize text-error">
                                    {/* {priority} */}
                                </span>


                                <div className="flex items-center gap-2">
                                    <LuCircleUserRound
                                        size={15}
                                        className="text-muted"
                                    />
                                    <span className="text-muted">
                                        Created By
                                    </span>
                                </div>

                                <span className="text-right font-medium">
                                    Rahim Ahmed
                                </span>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =====================================================
                PROJECT TABS
            ====================================================== */}

                <div className="rounded-xl border border-base-300 bg-base-100 shadow-sm">

                    <div className="flex overflow-x-auto">

                        <button onClick={() => setActiveTab('overview')} className={`flex items-center gap-2 border-b-2  px-5 py-3 text-sm font-medium text-muted ${activeTab === 'overview'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted hover:border-primary hover:text-primary'}`}>
                            <LuFolderKanban size={17} />
                            Overview
                        </button>

                        <button onClick={() => setActiveTab('task')} className={`flex items-center gap-2 border-b-2  px-5 py-3 text-sm font-medium text-muted ${activeTab === 'task'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted hover:border-primary hover:text-primary'}`}>
                            <LuListTodo size={17} />
                            Tasks
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                                8
                            </span>
                        </button>

                        <button onClick={() => setActiveTab('members')} className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-medium text-muted ${activeTab === 'members'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted hover:border-primary hover:text-primary'}`}>
                            <LuUsers size={17} />
                            Members

                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                                3
                            </span>
                        </button>

                        <button onClick={() => setActiveTab('activity')} className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-medium text-muted ${activeTab === 'activity'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted hover:border-primary hover:text-primary'}hover:text-base-content`}>
                            <LuClock3 size={17} />
                            Activity
                        </button>

                    </div>

                </div>


                {/* =====================================================
                MAIN CONTENT
                    ====================================================== */}
                {
                    activeTab === 'overview' && (
                        <ProjectDetailsOverview project={project}></ProjectDetailsOverview>
                    )
                    
                }
                {
                    activeTab === 'task' && (
                        <ProjectDetailsTask project={project}></ProjectDetailsTask>
                    )
                }
                {
                    activeTab === 'members' && (
                        <ProjectDetailsTask project={project}></ProjectDetailsTask>
                    )
                }
                {
                    activeTab === 'activity' && (
                        <ProjectDetailsTask project={project}></ProjectDetailsTask>
                    )
                }

             

            </div>
        </div>
    );
};

export default ProjectDetails;