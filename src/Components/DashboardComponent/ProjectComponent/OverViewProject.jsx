import { LucideFolderPlus } from 'lucide-react';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { GoFileDirectoryFill } from 'react-icons/go';
import { LuCalendarDays, LuChevronDown, LuFolderPlus, LuLightbulb, LuX } from 'react-icons/lu';


const OverViewProject = () => {
    const openProjectModalRef = useRef();
    const handleOpenProjectModal = () => {
        console.log("open modal")
        openProjectModalRef.current.showModal();
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            status: "active",
        },
    });

    const onSubmit = (data) => {
        console.log("Project data:", data);

        // This will later call:
        // axiosSecure.post("/api/projects", data)
    };
    return (
        <div>
            {/* Title section  */}
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <div className='bg-[#E8ECFE] rounded-xl w-14 h-14 flex justify-center items-center'>
                        <GoFileDirectoryFill size={30} className='text-primary' />
                    </div>
                    <div>
                        <h1 className='text-3xl'>Projects</h1>
                        <p className='text-muted text-sm'>Manage and collaborate on your projects.</p>
                    </div>
                </div>

                <div>
                    <button onClick={handleOpenProjectModal} className='btn btn-primary'><FaPlus />New Project
                    </button>
                </div>
                
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}
            <dialog ref={openProjectModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-2xl">
                    <div className="flex items-start justify-between px-7 pt-7">

                        <div className="flex items-center gap-4">

                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                                <LuFolderPlus size={28} />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-base-content">
                                    Create New Project
                                </h2>

                                <p className="mt-1 text-sm text-muted">
                                    Fill in the details below to create a new project.
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

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="space-y-6 px-7 py-6">

                            {/* Project Name */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-base-content">
                                    Project Name <span className="text-error">*</span>
                                </label>

                                <div className="relative">

                                    <LucideFolderPlus
                                        size={20}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type="text"
                                        placeholder="e.g. DevFlow Web App"
                                        className={`input h-14 w-full rounded-xl border bg-base-100 pl-12 pr-4 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.name
                                            ? "border-error"
                                            : "border-base-300"
                                            }`}
                                        {...register("name", {
                                            required: "Project name is required",
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
                                        rows={5}
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

                                {/* Status */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-base-content">
                                        Status
                                    </label>

                                    <div className="relative">

                                        <span className="pointer-events-none absolute left-4 top-1/2 z-10 h-3 w-3 -translate-y-1/2 rounded-full bg-success" />

                                        <select
                                            className="select h-14 w-full appearance-none rounded-xl border border-base-300 bg-base-100 pl-10 pr-10 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                                            {...register("status")}
                                        >
                                            <option value="active">
                                                Active
                                            </option>

                                            <option value="planning">
                                                Planning
                                            </option>

                                            <option value="on-hold">
                                                On Hold
                                            </option>

                                            <option value="completed">
                                                Completed
                                            </option>
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
                                            className="input h-14 w-full rounded-xl border border-base-300 bg-base-100 pl-12 pr-4 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                                            {...register("dueDate")}
                                        />

                                    </div>
                                </div>

                            </div>

                            {/* Information Box */}
                            <div className="rounded-xl bg-accent/60 p-5">

                                <div className="flex gap-4">

                                    <div className="shrink-0 text-primary">
                                        <LuLightbulb size={28} />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-primary">
                                            Project will be created with:
                                        </h3>

                                        <ul className="mt-2 space-y-2 text-sm text-slate-600">

                                            <li className="flex items-center gap-2">
                                                <span className="font-bold text-primary">
                                                    ✓
                                                </span>
                                                Progress set to 0%
                                            </li>

                                            <li className="flex items-center gap-2">
                                                <span className="font-bold text-primary">
                                                    ✓
                                                </span>
                                                You will be set as the owner
                                            </li>

                                            <li className="flex items-center gap-2">
                                                <span className="font-bold text-primary">
                                                    ✓
                                                </span>
                                                Created timestamp added automatically
                                            </li>

                                        </ul>
                                    </div>

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
                                Create Project
                            </button>

                        </div>

                    </form>
                    {/* <div className="modal-action">
                        <form method="dialog"> */}
                            {/* if there is a button in form, it will close the modal */}
                            {/* <button className="btn">Close</button>
                        </form>
                    </div> */}
                </div>
            </dialog>
            
        </div>
    );
};

export default OverViewProject;