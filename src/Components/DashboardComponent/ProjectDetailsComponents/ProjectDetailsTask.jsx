import { LucideMoreHorizontal } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegFlag } from 'react-icons/fa';
import { LuCalendarDays, LuCheck, LuChevronDown, LuCircle, LuCircleDot, LuDownload, LuFileImage, LuFlag, LuFolderPlus, LuLightbulb, LuMessageCircle, LuPaperclip, LuPlus, LuSearch, LuSend, LuTag, LuUsers, LuX } from 'react-icons/lu';
import { RiProjector2Line } from 'react-icons/ri';
import UseAxiosSecures from '../../../Hooks/UseAxiosSecures.jsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ProjectDetailsTask = ({ project }) => {
    // console.log(project)
    const { _id:id } = project
    // console.log(_id)
    const axiosSecure = UseAxiosSecures();
    const openaddTaskModalRef = useRef();
    const handleAddTaskModal = () => {
        openaddTaskModalRef.current.showModal();
    }

    const { register, handleSubmit, formState:{ errors } } = useForm()
    
    // using tanstak library usemutation for refetch ui
    const queryClient = useQueryClient();
    const postTaskMutation = useMutation({
        mutationFn: async (postTask) => {
            const res = await axiosSecure.post(`/projects/${id}/tasks`,postTask)
            // console.log(res);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey:['project-tasks',id]
            })
            if (data.insertedId) {
                Swal.fire({
                    title: "Task successfully created!",
                    icon: "success",
                    draggable: true,
                    timer: 2500
                });
            }
        },
        onError: (error) => {
            Swal.fire({
                title: "Failed to create project",
                text: "Something went wrong.",
                icon: "error"
            });

                    
        }
    })
    const onSubmit = (data) => {
        // console.log(data)
        postTaskMutation.mutate(data);
        openaddTaskModalRef.current.close()
    }
    // ---------------------------------------------------------
    // Selected task
    // ---------------------------------------------------------

    const [selectedTask, setSelectedTask] = useState({
        id: 4,
        title: "Build authentication system",
        description:
            "Implement login, register and JWT-based authentication for the application.",
        dueDate: "Apr 18, 2025",
        priority: "High",
        status: "in-progress",
        assignee: {
            name: "Sarah Khan",
            role: "Frontend Developer",
            image: "https://i.pravatar.cc/100?img=11",
        },
        labels: ["Authentication", "Frontend"],
        attachments: [
            {
                name: "auth-flow.png",
                size: "2.4 MB",
            },
        ],
        comments: [
            {
                name: "Sarah Khan",
                time: "2 hours ago",
                image: "https://i.pravatar.cc/100?img=11",
                text: "I've started working on the login page. Will push the code today.",
            },
            {
                name: "Imran Hossain",
                time: "1 hour ago",
                image: "https://i.pravatar.cc/100?img=15",
                text: "Looks good! Let me know if you need any help.",
            },
        ],
    });


    // ---------------------------------------------------------
    // Mock task data
    // Later this will come from MongoDB
    // ---------------------------------------------------------

    const tasks = {
        todo: [
            {
                id: 1,
                title: "Design landing page",
                description:
                    "Create a modern and responsive landing page for the application.",
                dueDate: "Apr 20, 2025",
                priority: "High",
                status: "todo",
                members: [
                    "https://i.pravatar.cc/100?img=12",
                    "https://i.pravatar.cc/100?img=13",
                    "https://i.pravatar.cc/100?img=14",
                ],
            },
            {
                id: 2,
                title: "Set up database schema",
                description:
                    "Design and implement MongoDB schema for the application.",
                dueDate: "Apr 22, 2025",
                priority: "Medium",
                status: "todo",
                members: [
                    "https://i.pravatar.cc/100?img=14",
                    "https://i.pravatar.cc/100?img=15",
                ],
            },
            {
                id: 3,
                title: "Write API documentation",
                description:
                    "Document all API endpoints with examples and usage details.",
                dueDate: "Apr 25, 2025",
                priority: "Low",
                status: "todo",
                members: [
                    "https://i.pravatar.cc/100?img=16",
                ],
            },
        ],

        inProgress: [
            {
                id: 4,
                title: "Build authentication system",
                description:
                    "Implement login, register and JWT-based authentication for the application.",
                dueDate: "Apr 18, 2025",
                priority: "High",
                status: "in-progress",
                members: [
                    "https://i.pravatar.cc/100?img=11",
                    "https://i.pravatar.cc/100?img=12",
                ],
            },
            {
                id: 5,
                title: "Create project CRUD API",
                description:
                    "Build endpoints for creating, reading, updating and deleting projects.",
                dueDate: "Apr 21, 2025",
                priority: "Medium",
                status: "in-progress",
                members: [
                    "https://i.pravatar.cc/100?img=14",
                    "https://i.pravatar.cc/100?img=15",
                ],
            },
            {
                id: 6,
                title: "Develop task management UI",
                description:
                    "Build task list, add/edit/delete functionality.",
                dueDate: "Apr 24, 2025",
                priority: "High",
                status: "in-progress",
                members: [
                    "https://i.pravatar.cc/100?img=16",
                ],
            },
            {
                id: 7,
                title: "Implement real-time updates",
                description:
                    "Use Socket.IO for live project and task updates.",
                dueDate: "Apr 28, 2025",
                priority: "Medium",
                status: "in-progress",
                members: [
                    "https://i.pravatar.cc/100?img=17",
                    "https://i.pravatar.cc/100?img=18",
                ],
            },
        ],

        done: [
            {
                id: 8,
                title: "Setup project structure",
                description:
                    "Initialize Next.js project with Tailwind CSS and DaisyUI.",
                dueDate: "Apr 10, 2025",
                priority: "Low",
                status: "done",
                members: [
                    "https://i.pravatar.cc/100?img=19",
                    "https://i.pravatar.cc/100?img=20",
                ],
            },
            {
                id: 9,
                title: "Configure environment",
                description:
                    "Set up environment variables and API configuration.",
                dueDate: "Apr 12, 2025",
                priority: "Medium",
                status: "done",
                members: [
                    "https://i.pravatar.cc/100?img=21",
                ],
            },
            {
                id: 10,
                title: "Create login page UI",
                description:
                    "Design and implement the login page with form validation.",
                dueDate: "Apr 14, 2025",
                priority: "Low",
                status: "done",
                members: [
                    "https://i.pravatar.cc/100?img=22",
                ],
            },
            {
                id: 11,
                title: "Deploy frontend to Vercel",
                description:
                    "Deploy the application to Vercel for production.",
                dueDate: "Apr 16, 2025",
                priority: "Low",
                status: "done",
                members: [
                    "https://i.pravatar.cc/100?img=23",
                ],
            },
        ],
    };


    // ---------------------------------------------------------
    // Priority styles
    // ---------------------------------------------------------

    const priorityStyle = (priority) => {

        if (priority === "High") {
            return "bg-red-50 text-red-500";
        }

        if (priority === "Medium") {
            return "bg-amber-50 text-amber-500";
        }

        return "bg-green-50 text-green-500";
    };


    // ---------------------------------------------------------
    // Select task
    // ---------------------------------------------------------

    const handleSelectTask = (task) => {

        setSelectedTask({
            ...task,

            assignee: {
                name: "Sarah Khan",
                role: "Frontend Developer",
                image:
                    task.members?.[0] ||
                    "https://i.pravatar.cc/100?img=11",
            },

            labels: ["Authentication", "Frontend"],

            attachments: [
                {
                    name: "auth-flow.png",
                    size: "2.4 MB",
                },
            ],

            comments: [
                {
                    name: "Sarah Khan",
                    time: "2 hours ago",
                    image: "https://i.pravatar.cc/100?img=11",
                    text:
                        "I've started working on the login page. Will push the code today.",
                },
                {
                    name: "Imran Hossain",
                    time: "1 hour ago",
                    image: "https://i.pravatar.cc/100?img=15",
                    text:
                        "Looks good! Let me know if you need any help.",
                },
            ],
        });
    };


    return (
        <div className="w-full">

            {/* =====================================================
                MAIN GRID
            ====================================================== */}

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">


                {/* =================================================
                    LEFT SIDE
                ================================================== */}

                <div className="min-w-0 xl:col-span-8">


                    {/* =================================================
                        SEARCH + FILTERS
                    ================================================== */}

                    <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-base-300 bg-base-100 p-3">


                        {/* Search */}

                        <div className="flex h-11 min-w-55 flex-1 items-center gap-2 rounded-lg border border-base-300 px-3">

                            <LuSearch
                                size={19}
                                className="shrink-0 text-muted"
                            />

                            <input
                                type="text"
                                placeholder="Search tasks..."
                                className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
                            />

                        </div>


                        {/* Status */}

                        <div className="dropdown">

                            <button
                                tabIndex={0}
                                type="button"
                                className="flex h-11 min-w-35 items-center justify-between gap-5 rounded-lg border border-base-300 bg-base-100 px-4 text-sm font-medium"
                            >

                                <span>All Status</span>

                                <LuChevronDown
                                    size={17}
                                    className="text-muted"
                                />

                            </button>

                            <ul
                                tabIndex={-1}
                                className="menu dropdown-content z-50 mt-2 w-40 rounded-lg border border-base-300 bg-base-100 p-2 shadow-lg"
                            >
                                <li>
                                    <button>All Status</button>
                                </li>

                                <li>
                                    <button>To Do</button>
                                </li>

                                <li>
                                    <button>In Progress</button>
                                </li>

                                <li>
                                    <button>Done</button>
                                </li>
                            </ul>

                        </div>


                        {/* Priority */}

                        <div className="dropdown">

                            <button
                                tabIndex={0}
                                type="button"
                                className="flex h-11 min-w-35 items-center justify-between gap-5 rounded-lg border border-base-300 bg-base-100 px-4 text-sm font-medium"
                            >

                                <span>All Priority</span>

                                <LuChevronDown
                                    size={17}
                                    className="text-muted"
                                />

                            </button>

                            <ul
                                tabIndex={-1}
                                className="menu dropdown-content z-50 mt-2 w-40 rounded-lg border border-base-300 bg-base-100 p-2 shadow-lg"
                            >
                                <li>
                                    <button>All Priority</button>
                                </li>

                                <li>
                                    <button>High</button>
                                </li>

                                <li>
                                    <button>Medium</button>
                                </li>

                                <li>
                                    <button>Low</button>
                                </li>
                            </ul>

                        </div>


                        {/* Due Date */}

                        <div className="dropdown">

                            <button
                                tabIndex={0}
                                type="button"
                                className="flex h-11 min-w-40 items-center justify-between gap-5 rounded-lg border border-base-300 bg-base-100 px-4 text-sm font-medium"
                            >

                                <span>Due Date (Newest)</span>

                                <LuChevronDown
                                    size={17}
                                    className="text-muted"
                                />

                            </button>

                            <ul
                                tabIndex={-1}
                                className="menu dropdown-content z-50 mt-2 w-48 rounded-lg border border-base-300 bg-base-100 p-2 shadow-lg"
                            >
                                <li>
                                    <button>Due Date (Newest)</button>
                                </li>

                                <li>
                                    <button>Due Date (Oldest)</button>
                                </li>
                            </ul>

                        </div>

                    </div>


                    {/* =================================================
                        KANBAN
                    ================================================== */}

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">


                        {/* =================================================
                            TO DO COLUMN
                        ================================================== */}

                        <div className="min-w-0 rounded-xl border border-blue-100 bg-blue-50/40 p-3">


                            {/* Column Header */}

                            <div className="mb-3 flex items-center justify-between px-1">

                                <div className="flex items-center gap-2">

                                    <LuCircle
                                        size={21}
                                        className="fill-transparent text-blue-500"
                                    />

                                    <h3 className="text-sm font-bold text-slate-700">
                                        To Do
                                    </h3>

                                </div>


                                <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-600">
                                    {tasks.todo.length}
                                </span>

                            </div>


                            {/* Tasks */}

                            <div className="space-y-3">

                                {tasks.todo.map((task) => (

                                    <div
                                        key={task.id}
                                        onClick={() =>
                                            handleSelectTask(task)
                                        }
                                        className={`cursor-pointer rounded-xl border bg-base-100 p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${selectedTask?.id === task.id
                                                ? "border-primary"
                                                : "border-base-300"
                                            }`}
                                    >

                                        {/* Title */}

                                        <h4 className="mb-1 text-sm font-bold text-slate-700">
                                            {task.title}
                                        </h4>


                                        {/* Description */}

                                        <p className="mb-3 line-clamp-2 text-xs leading-5 text-muted">
                                            {task.description}
                                        </p>


                                        {/* Date */}

                                        <div className="mb-3 flex items-center gap-2 text-xs text-muted">

                                            <LuCalendarDays size={14} />

                                            <span>
                                                {task.dueDate}
                                            </span>

                                        </div>


                                        {/* Priority */}

                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${priorityStyle(
                                                task.priority
                                            )}`}
                                        >
                                            {task.priority}
                                        </span>


                                        {/* Bottom */}

                                        <div className="mt-3 flex items-center justify-between">

                                            <div className="flex -space-x-2">

                                                {task.members.map(
                                                    (
                                                        member,
                                                        index
                                                    ) => (

                                                        <img
                                                            key={index}
                                                            src={member}
                                                            alt=""
                                                            className="h-7 w-7 rounded-full border-2 border-white object-cover"
                                                        />

                                                    )
                                                )}

                                                {task.members.length >=
                                                    3 && (
                                                        <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-blue-50 text-[10px] font-bold text-blue-500">
                                                            +1
                                                        </span>
                                                    )}

                                            </div>


                                            <LuCircle
                                                size={18}
                                                className="text-muted"
                                            />

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>


                        {/* =================================================
                            IN PROGRESS COLUMN
                        ================================================== */}

                        <div className="min-w-0 rounded-xl border border-purple-100 bg-purple-50/40 p-3">


                            {/* Header */}

                            <div className="mb-3 flex items-center justify-between px-1">

                                <div className="flex items-center gap-2">

                                    <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary">

                                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>

                                    </div>

                                    <h3 className="text-sm font-bold text-slate-700">
                                        In Progress
                                    </h3>

                                </div>


                                <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-bold text-primary">
                                    {tasks.inProgress.length}
                                </span>

                            </div>


                            {/* Tasks */}

                            <div className="space-y-3">

                                {tasks.inProgress.map((task) => (

                                    <div
                                        key={task.id}
                                        onClick={() =>
                                            handleSelectTask(task)
                                        }
                                        className={`cursor-pointer rounded-xl border bg-base-100 p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${selectedTask?.id === task.id
                                                ? "border-primary"
                                                : "border-base-300"
                                            }`}
                                    >

                                        <h4 className="mb-1 text-sm font-bold text-slate-700">
                                            {task.title}
                                        </h4>


                                        <p className="mb-3 line-clamp-2 text-xs leading-5 text-muted">
                                            {task.description}
                                        </p>


                                        <div className="mb-3 flex items-center gap-2 text-xs text-muted">

                                            <LuCalendarDays size={14} />

                                            <span>
                                                {task.dueDate}
                                            </span>

                                        </div>


                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${priorityStyle(
                                                task.priority
                                            )}`}
                                        >
                                            {task.priority}
                                        </span>


                                        <div className="mt-3 flex items-center justify-between">

                                            <div className="flex -space-x-2">

                                                {task.members.map(
                                                    (
                                                        member,
                                                        index
                                                    ) => (

                                                        <img
                                                            key={index}
                                                            src={member}
                                                            alt=""
                                                            className="h-7 w-7 rounded-full border-2 border-white object-cover"
                                                        />

                                                    )
                                                )}

                                            </div>


                                            <LuCircle
                                                size={18}
                                                className="text-muted"
                                            />

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>


                        {/* =================================================
                            DONE COLUMN
                        ================================================== */}

                        <div className="min-w-0 rounded-xl border border-green-100 bg-green-50/40 p-3">


                            {/* Header */}

                            <div className="mb-3 flex items-center justify-between px-1">

                                <div className="flex items-center gap-2">

                                    <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-success">

                                        <LuCheck
                                            size={13}
                                            className="text-success"
                                        />

                                    </div>

                                    <h3 className="text-sm font-bold text-slate-700">
                                        Done
                                    </h3>

                                </div>


                                <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-600">
                                    {tasks.done.length}
                                </span>

                            </div>


                            {/* Tasks */}

                            <div className="space-y-3">

                                {tasks.done.map((task) => (

                                    <div
                                        key={task.id}
                                        onClick={() =>
                                            handleSelectTask(task)
                                        }
                                        className={`cursor-pointer rounded-xl border bg-base-100 p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${selectedTask?.id === task.id
                                                ? "border-primary"
                                                : "border-base-300"
                                            }`}
                                    >

                                        <div className="flex items-start justify-between gap-2">

                                            <h4 className="mb-1 text-sm font-bold text-slate-700">
                                                {task.title}
                                            </h4>

                                            <LuCheck
                                                size={17}
                                                className="shrink-0 rounded-full bg-green-100 p-0.5 text-green-600"
                                            />

                                        </div>


                                        <p className="mb-3 line-clamp-2 text-xs leading-5 text-muted">
                                            {task.description}
                                        </p>


                                        <div className="mb-3 flex items-center gap-2 text-xs text-muted">

                                            <LuCalendarDays size={14} />

                                            <span>
                                                {task.dueDate}
                                            </span>

                                        </div>


                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${priorityStyle(
                                                task.priority
                                            )}`}
                                        >
                                            {task.priority}
                                        </span>


                                        <div className="mt-3 flex items-center justify-between">

                                            <div className="flex -space-x-2">

                                                {task.members.map(
                                                    (
                                                        member,
                                                        index
                                                    ) => (

                                                        <img
                                                            key={index}
                                                            src={member}
                                                            alt=""
                                                            className="h-7 w-7 rounded-full border-2 border-white object-cover"
                                                        />

                                                    )
                                                )}

                                            </div>


                                            <LucideMoreHorizontal
                                                size={18}
                                                className="text-muted"
                                            />

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    RIGHT TASK DETAILS PANEL
                ================================================== */}

                <div className="min-w-0 xl:col-span-4">

                    <div className="sticky top-4 overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-sm">


                        {/* =================================================
                            DETAILS HEADER
                        ================================================== */}

                        <div className="border-b border-base-300 p-4">


                            {/* Top row */}

                            <div className="mb-3 flex items-center justify-between">


                                {/* Status */}

                                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">

                                    <span className="h-2 w-2 rounded-full bg-primary"></span>

                                    In Progress

                                </span>


                                {/* Add Task */}

                                <button onClick={handleAddTaskModal} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-content shadow-sm transition hover:bg-accent-content">

                                    <LuPlus size={17} />

                                    Add Task

                                </button>

                                {/* add task Modal  */}
                                {/* Open the modal using document.getElementById('ID').showModal() method */}
                                {/* <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}
                                <dialog ref={openaddTaskModalRef} className="modal modal-bottom sm:modal-middle">
                                    <div className="modal-box max-w-2xl">
                                        <div className="flex items-start justify-between px-7 pt-7">
                                            <div className="flex items-center gap-4">

                                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                                                    <LuFolderPlus size={28} />
                                                </div>

                                                <div>
                                                    <h2 className="text-2xl font-bold text-base-content">
                                                        Create New Task
                                                    </h2>

                                                    <p className="mt-1 text-sm text-muted">
                                                        Fill in the details below to create a new task.
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
                                                    Create Task
                                                </button>

                                            </div>

                                        </form>
                                    </div>
                                </dialog>

                            </div>


                            {/* Task title + close */}

                            <div className="flex items-start justify-between gap-3">

                                <div>

                                    <h2 className="text-lg font-bold leading-6 text-slate-800">
                                        {selectedTask?.title}
                                    </h2>

                                    <p className="mt-2 text-sm leading-5 text-muted">
                                        {selectedTask?.description}
                                    </p>

                                </div>


                                <button
                                    onClick={() =>
                                        setSelectedTask(null)
                                    }
                                    className="shrink-0 rounded-lg p-1.5 text-muted hover:bg-base-200 hover:text-base-content"
                                >

                                    <LuX size={18} />

                                </button>

                            </div>

                        </div>


                        {/* =================================================
                            DETAILS CONTENT
                        ================================================== */}

                        <div className="space-y-5 p-4">


                            {/* =================================================
                                DUE DATE
                            ================================================== */}

                            <div>

                                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">

                                    <LuCalendarDays
                                        size={19}
                                        className="text-muted"
                                    />

                                    <span>
                                        Due Date
                                    </span>

                                </div>

                                <p className="ml-7 text-sm font-medium text-slate-700">
                                    {selectedTask?.dueDate}
                                </p>

                            </div>


                            {/* =================================================
                                PRIORITY
                            ================================================== */}

                            <div>

                                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">

                                    <LuFlag
                                        size={19}
                                        className="text-muted"
                                    />

                                    <span>
                                        Priority
                                    </span>

                                </div>

                                <div className="ml-7">

                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${priorityStyle(
                                            selectedTask?.priority
                                        )}`}
                                    >
                                        {selectedTask?.priority}
                                    </span>

                                </div>

                            </div>


                            {/* =================================================
                                ASSIGNEE
                            ================================================== */}

                            <div>

                                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">

                                    <LuUsers
                                        size={19}
                                        className="text-muted"
                                    />

                                    <span>
                                        Assignee
                                    </span>

                                </div>


                                <div className="ml-7 flex items-center gap-3">

                                    <img
                                        src={
                                            selectedTask?.assignee?.image
                                        }
                                        alt=""
                                        className="h-9 w-9 rounded-full object-cover"
                                    />

                                    <div>

                                        <p className="text-sm font-semibold text-slate-700">
                                            {selectedTask?.assignee?.name}
                                        </p>

                                        <p className="text-xs text-muted">
                                            {selectedTask?.assignee?.role}
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                                LABELS
                            ================================================== */}

                            <div>

                                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">

                                    <LuTag
                                        size={19}
                                        className="text-muted"
                                    />

                                    <span>
                                        Labels
                                    </span>

                                </div>


                                <div className="ml-7 flex flex-wrap gap-2">

                                    {selectedTask?.labels?.map(
                                        (label, index) => (

                                            <span
                                                key={label}
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${index === 0
                                                        ? "bg-primary/10 text-primary"
                                                        : "bg-blue-50 text-blue-500"
                                                    }`}
                                            >
                                                {label}
                                            </span>

                                        )
                                    )}

                                </div>

                            </div>


                            {/* =================================================
                                ATTACHMENTS
                            ================================================== */}

                            <div>

                                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">

                                    <LuPaperclip
                                        size={19}
                                        className="text-muted"
                                    />

                                    <span>
                                        Attachments
                                    </span>

                                </div>


                                {selectedTask?.attachments?.map(
                                    (file) => (

                                        <div
                                            key={file.name}
                                            className="ml-7 flex items-center justify-between rounded-lg border border-base-300 p-3"
                                        >

                                            <div className="flex min-w-0 items-center gap-3">

                                                <div className="shrink-0 rounded-lg bg-primary/10 p-2 text-primary">

                                                    <LuFileImage
                                                        size={20}
                                                    />

                                                </div>


                                                <div className="min-w-0">

                                                    <p className="truncate text-xs font-semibold">
                                                        {file.name}
                                                    </p>

                                                    <p className="text-[11px] text-muted">
                                                        {file.size}
                                                    </p>

                                                </div>

                                            </div>


                                            <button className="rounded-md p-1.5 text-muted hover:bg-base-200">

                                                <LuDownload
                                                    size={17}
                                                />

                                            </button>

                                        </div>

                                    )
                                )}

                            </div>


                            {/* =================================================
                                DESCRIPTION
                            ================================================== */}

                            <div>

                                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">

                                    <LuFileImage
                                        size={19}
                                        className="text-muted"
                                    />

                                    <span>
                                        Description
                                    </span>

                                </div>


                                <p className="ml-7 text-sm leading-6 text-muted">
                                    {selectedTask?.description}

                                    {" "}

                                    Implement secure authentication
                                    system using Firebase Auth and JWT
                                    tokens. Include login, register,
                                    forgot password and protected routes.
                                </p>

                            </div>


                            {/* =================================================
                                COMMENTS
                            ================================================== */}

                            <div className="border-t border-base-300 pt-4">


                                <div className="mb-4 flex items-center gap-2 text-sm font-semibold">

                                    <LuMessageCircle
                                        size={18}
                                    />

                                    <span>
                                        Comments (3)
                                    </span>

                                </div>


                                {/* Comment 1 */}

                                <div className="mb-4 flex gap-3">

                                    <img
                                        src="https://i.pravatar.cc/100?img=11"
                                        alt=""
                                        className="h-8 w-8 shrink-0 rounded-full object-cover"
                                    />

                                    <div className="min-w-0">

                                        <div className="flex flex-wrap items-center gap-2">

                                            <p className="text-xs font-semibold">
                                                Sarah Khan
                                            </p>

                                            <span className="text-[10px] text-muted">
                                                2 hours ago
                                            </span>

                                        </div>

                                        <p className="mt-1 text-xs leading-5 text-muted">
                                            I've started working on the
                                            login page. Will push the
                                            code today.
                                        </p>

                                    </div>

                                </div>


                                {/* Comment 2 */}

                                <div className="mb-4 flex gap-3">

                                    <img
                                        src="https://i.pravatar.cc/100?img=15"
                                        alt=""
                                        className="h-8 w-8 shrink-0 rounded-full object-cover"
                                    />

                                    <div className="min-w-0">

                                        <div className="flex flex-wrap items-center gap-2">

                                            <p className="text-xs font-semibold">
                                                Imran Hossain
                                            </p>

                                            <span className="text-[10px] text-muted">
                                                1 hour ago
                                            </span>

                                        </div>

                                        <p className="mt-1 text-xs leading-5 text-muted">
                                            Looks good! Let me know if
                                            you need any help.
                                        </p>

                                    </div>

                                </div>


                                {/* Comment Input */}

                                <div className="flex items-center gap-2">

                                    <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        className="h-10 min-w-0 flex-1 rounded-lg border border-base-300 bg-base-100 px-3 text-xs outline-none placeholder:text-muted focus:border-primary"
                                    />

                                    <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-content transition hover:bg-accent-content">

                                        <LuSend
                                            size={17}
                                        />

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default ProjectDetailsTask;