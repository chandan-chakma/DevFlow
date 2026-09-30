import React from 'react';
import { LuCalendarDays, LuEllipsis, LuFileCode2, LuUser } from 'react-icons/lu';

const ProjectCard = ({ project }) => {
    const { name, description, status, dueDate } = project;

    // change data format 
    const formattedDate = new Date(dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
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
                                        <button
                                            type="button"
                                            className="rounded-lg p-1 text-slate-500 transition hover:bg-base-200 hover:text-base-content"
                                        >
                                            <LuEllipsis size={23} />
                                        </button>
            
                                        {/* Status */}
                                        <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-500">
                                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                                            {status}
                                        </span>
            
                                    </div>
                                </div>
            
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
            
                            </div>
        </div>
    );
};

export default ProjectCard;