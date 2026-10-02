import React, { Activity } from 'react';
import { LuCalendarDays, LuCheck, LuCircleUserRound, LuClock3, LuFileCode2, LuFlag, LuFolderKanban, LuListTodo, LuPencil, LuShare2, LuTag, LuTrash2, LuUsers } from 'react-icons/lu';
import { PiMemberOf } from 'react-icons/pi';


const ProjectDetailsOverview = ({ project }) => {
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
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-8">


                {/* =================================================
                    LEFT COLUMN
                    ================================================== */}

                <div className="space-y-4 xl:col-span-5">


                    {/* Project Description */}
                    <section className="rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">

                        <div className="mb-4 flex items-center gap-2">
                            <LuFolderKanban
                                size={19}
                                className="text-muted"
                            />

                            <h2 className="font-bold">
                                Project Description
                            </h2>
                        </div>


                        <p className="text-sm leading-6 text-muted">
                            {/* {description} */}
                        </p>


                        {/* Divider */}
                        <div className="my-5 border-t border-base-300"></div>


                        {/* Key Features */}
                        <div>

                            <div className="mb-3 flex items-center gap-2">
                                <span className="text-lg">⭐</span>

                                <h3 className="font-bold">
                                    Key Features
                                </h3>
                            </div>


                            <div className="space-y-2">

                                {[
                                    "Create, edit and delete tasks",
                                    "Assign tasks to team members",
                                    "Set due dates and priorities",
                                    "Track project progress",
                                    "Real-time collaboration",
                                    "Responsive design for all devices",
                                ].map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 text-sm text-muted"
                                    >
                                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success text-white">
                                            <LuCheck size={10} />
                                        </span>

                                        {feature}
                                    </div>
                                ))}

                            </div>

                        </div>


                        {/* Divider */}
                        <div className="my-5 border-t border-base-300"></div>


                        {/* Project Info */}
                        <div>

                            <div className="mb-4 flex items-center gap-2">
                                <LuCircleUserRound
                                    size={18}
                                    className="text-muted"
                                />

                                <h3 className="font-bold">
                                    Project Info
                                </h3>
                            </div>


                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                                {/* Start Date */}
                                <div className="flex gap-3">
                                    <LuCalendarDays
                                        size={17}
                                        className="mt-1 text-muted"
                                    />

                                    <div>
                                        <p className="text-xs text-muted">
                                            {dateFormate(project.createdAt)}
                                        </p>

                                        <p className="mt-1 text-sm font-medium">
                                            {/* {formattedCreatedDate} */}
                                        </p>
                                    </div>
                                </div>


                                {/* Priority */}
                                <div className="flex gap-3">
                                    <LuFlag
                                        size={17}
                                        className="mt-1 text-muted"
                                    />

                                    <div>
                                        <p className="text-xs text-muted">
                                            Priority
                                        </p>

                                        <span className="mt-1 inline-block rounded-full bg-error/10 px-2 py-0.5 text-xs font-semibold capitalize text-error">
                                            {/* {priority} */}
                                        </span>
                                    </div>
                                </div>


                                {/* Due Date */}
                                <div className="flex gap-3">
                                    <LuCalendarDays
                                        size={17}
                                        className="mt-1 text-muted"
                                    />

                                    <div>
                                        <p className="text-xs text-muted">
                                            {dateFormate(project.dueDate)}
                                        </p>

                                        <p className="mt-1 text-sm font-medium">
                                            {/* {formattedDueDate} */}
                                        </p>
                                    </div>
                                </div>


                                {/* Technologies */}
                                <div className="flex gap-3">
                                    <LuFileCode2
                                        size={17}
                                        className="mt-1 text-muted"
                                    />

                                    <div>
                                        <p className="text-xs text-muted">
                                            Technologies
                                        </p>

                                        <p className="mt-1 text-sm font-medium">
                                            {/* {technologies.join(", ")} */}
                                        </p>
                                    </div>
                                </div>


                                {/* Status */}
                                <div className="flex gap-3">
                                    <LuClock3
                                        size={17}
                                        className="mt-1 text-muted"
                                    />

                                    <div>
                                        <p className="text-xs text-muted">
                                           {project.status}
                                        </p>

                                        <span className="mt-1 inline-block rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-semibold capitalize text-success">
                                            {status}
                                        </span>
                                    </div>
                                </div>


                                {/* Project Type */}
                                <div className="flex gap-3">
                                    <LuTag
                                        size={17}
                                        className="mt-1 text-muted"
                                    />

                                    <div>
                                        <p className="text-xs text-muted">
                                            Project Type
                                        </p>

                                        <p className="mt-1 text-sm font-medium">
                                            Web Application
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </section>


                    {/* Recent Activity */}
                    <section className="rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">

                        <div className="mb-4 flex items-center justify-between">

                            <div className="flex items-center gap-2">
                                <LuClock3
                                    size={18}
                                    className="text-muted"
                                />

                                <h2 className="font-bold">
                                    Recent Activity
                                </h2>
                            </div>

                            <button className="text-xs font-semibold text-primary hover:underline">
                                View All
                            </button>

                        </div>


                        <div className="space-y-4">

                            <Activity
                                name="Sarah Khan"
                                text='created a new task "Design landing page"'
                                time="2 hours ago"
                            />

                            <Activity
                                name="Imran Hossain"
                                text='updated the status "In Progress"'
                                time="5 hours ago"
                            />

                            <Activity
                                name="You"
                                text='added a new member "Nusrat Jahan"'
                                time="1 day ago"
                            />

                        </div>

                    </section>

                </div>


                {/* =================================================
                    RIGHT COLUMN
                    ================================================== */}

                <div className="space-y-4 xl:col-span-3">


                    {/* Team Members */}
                    <section className="rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">

                        <div className="mb-4 flex items-center justify-between">

                            <div className="flex items-center gap-2">
                                <LuUsers
                                    size={19}
                                    className="text-muted"
                                />

                                <h2 className="font-bold">
                                    Team Members
                                </h2>
                            </div>

                            <button className="btn btn-xs border-base-300 bg-base-100">
                                Manage
                            </button>

                        </div>


                        {/* Avatar row */}
                        <div className="mb-4 flex items-center">

                            {[
                                "https://i.pravatar.cc/100?img=47",
                                "https://i.pravatar.cc/100?img=12",
                                "https://i.pravatar.cc/100?img=33",
                            ].map((avatar, index) => (
                                <div
                                    key={index}
                                    className="-ml-2 first:ml-0 avatar"
                                >
                                    <div className="w-9 rounded-full border-2 border-base-100">
                                        <img src={avatar} alt="member" />
                                    </div>
                                </div>
                            ))}

                            <div className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary">
                                +1
                            </div>

                        </div>


                        {/* Members */}
                        <div className="space-y-4">

                            <PiMemberOf
                                image="https://i.pravatar.cc/100?img=47"
                                name="Sarah Khan"
                                role="Frontend Developer"
                            />

                            <PiMemberOf
                                image="https://i.pravatar.cc/100?img=12"
                                name="Imran Hossain"
                                role="Backend Developer"
                            />

                            <PiMemberOf
                                image="https://i.pravatar.cc/100?img=33"
                                name="Nusrat Jahan"
                                role="UI/UX Designer"
                            />

                        </div>

                    </section>


                    {/* Project Progress */}
                    <section className="rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">

                        <div className="mb-4 flex items-center gap-2">
                            <LuCircleUserRound
                                size={18}
                                className="text-muted"
                            />

                            <h2 className="font-bold">
                                Project Progress
                            </h2>
                        </div>


                        <div className="flex items-center gap-5">

                            {/* Circular progress */}
                            <div
                                className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full"
                            // style={{
                            //     background: `conic-gradient(#3b82f6 ${progress}%, #e5e7eb ${progress}% 100%)`,
                            // }}
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-base-100">
                                    <span className="text-sm font-bold text-primary">
                                        {/* {progress}% */}
                                    </span>
                                </div>
                            </div>


                            <div className="min-w-0 flex-1">

                                <p className="text-xs text-muted">
                                    4 of 8 tasks completed
                                </p>

                                <progress
                                    className="progress progress-primary mt-2 w-full"
                                    // value={progress}
                                    max="100"
                                ></progress>

                            </div>

                        </div>

                    </section>


                    {/* Quick Actions */}
                    <section className="rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">

                        <div className="mb-3 flex items-center gap-2">
                            <LuClock3
                                size={18}
                                className="text-muted"
                            />

                            <h2 className="font-bold">
                                Quick Actions
                            </h2>
                        </div>


                        <div className="space-y-2">

                            <button className="btn btn-sm w-full justify-center bg-primary text-white hover:bg-primary/90">
                                <LuListTodo size={15} />
                                View All Tasks
                            </button>

                            <button className="btn btn-sm w-full border-base-300 bg-base-100">
                                <LuPencil size={15} />
                                Edit Project
                            </button>

                            <button className="btn btn-sm w-full border-base-300 bg-base-100">
                                <LuTrash2 size={15} />
                                Delete Project
                            </button>

                            <button className="btn btn-sm w-full border-base-300 bg-base-100">
                                <LuShare2 size={15} />
                                Share Project
                            </button>

                        </div>

                    </section>


                    {/* Tags */}
                    <section className="rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">

                        <div className="mb-3 flex items-center gap-2">
                            <LuTag
                                size={17}
                                className="text-muted"
                            />

                            <h2 className="font-bold">
                                Tags
                            </h2>
                        </div>


                        <div className="flex flex-wrap gap-2">

                            {/* {tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                                    >
                                        {tag}
                                    </span>
                                ))} */}

                            <span className="rounded-full bg-base-200 px-2.5 py-1 text-xs font-medium text-muted">
                                Web App
                            </span>

                        </div>

                    </section>

                </div>

            </div>
            
        </div>
    );
};

export default ProjectDetailsOverview;