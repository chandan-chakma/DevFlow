import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import {
    LuPlus,
    LuGitCompareArrows,
    LuMessageSquare,
    LuFilePenLine,
    LuTrash2,
    LuUpload,
    LuUsers,
    LuListTodo,
    LuCalendarDays,
    LuCheck,
} from 'react-icons/lu';
import UseAxiosSecures from '../../../Hooks/UseAxiosSecures.jsx';

const normalizeActivity = (item) => {
    const createdAt = new Date(item.createdAt);
    const action = (item.action || 'updated').toLowerCase();

    let type = 'updated';

    if (action.includes('creat')) type = 'created';
    else if (action.includes('status')) type = 'status';
    else if (action.includes('comment')) type = 'comment';
    else if (action.includes('delet')) type = 'deleted';

    const entity = item.entityType === 'project' ? 'project' : 'task';

    const titles = {
        created: `created a new ${entity}`,
        updated: `updated a ${entity}`,
        status: 'changed task status',
        comment: 'commented on a task',
        deleted: `deleted a ${entity}`,
    };

    return {
        id: item._id,
        date: [
            createdAt.getFullYear(),
            String(createdAt.getMonth() + 1).padStart(2, '0'),
            String(createdAt.getDate()).padStart(2, '0'),
        ].join('-'),
        time: createdAt.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        }),
        type,
        actor: item.performedBy?.name || 'A team member',
        title: titles[type],
        description: item.description,
        status: item.status,
        task: item.taskTitle,
    };
};

const activityStyles = {
    created: {
        icon: LuPlus,
        color: 'bg-emerald-500/15 text-emerald-600',
    },
    status: {
        icon: LuGitCompareArrows,
        color: 'bg-purple-500/20 text-purple-600',
    },
    comment: {
        icon: LuMessageSquare,
        color: 'bg-amber-500/20 text-amber-600',
    },
    updated: {
        icon: LuFilePenLine,
        color: 'bg-emerald-500/15 text-emerald-600',
    },
    deleted: {
        icon: LuTrash2,
        color: 'bg-orange-500/20 text-orange-600',
    },
};

const statusStyles = {
    'To Do': 'bg-purple-100 text-purple-700',
    'In Progress': 'bg-blue-100 text-blue-700',
    Done: 'bg-emerald-100 text-emerald-700',
};

const upcomingTasks = [
    {
        id: 1,
        date: 'Apr 18, 2025',
        title: 'API integration',
        status: 'In Progress',
        color: 'bg-blue-500',
    },
    {
        id: 2,
        date: 'Apr 20, 2025',
        title: 'Design system',
        status: 'To Do',
        color: 'bg-purple-500',
    },
    {
        id: 3,
        date: 'Apr 22, 2025',
        title: 'Testing & bug fixes',
        status: 'To Do',
        color: 'bg-emerald-500',
    },
    {
        id: 4,
        date: 'Apr 25, 2025',
        title: 'Deploy to production',
        status: 'To Do',
        color: 'bg-amber-500',
    },
];

const formatActivityDate = (dateString) => {
    if (!dateString) return 'Unknown date';

    // Your grouped activity date should be YYYY-MM-DD
    const date = new Date(dateString + 'T12:00:00');

    if (Number.isNaN(date.getTime())) {
        console.error('Invalid activity date:', dateString);
        return 'Unknown date';
    }

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};
const formatActivityHeading = (dateString) => {
    const activityDate = new Date(`${dateString}T00:00:00`);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (activityDate.getTime() === today.getTime()) {
        return `Today, ${formatActivityDate(dateString)}`;
    }

    if (activityDate.getTime() === yesterday.getTime()) {
        return `Yesterday, ${formatActivityDate(dateString)}`;
    }

    return formatActivityDate(dateString);
};
const ProjectDetailsActivity = ({ project }) => {
    console.log(project._id)
    const axiosSecure = UseAxiosSecures();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filter, setFilter] = useState('all');
    const [showAllUpcoming, setShowAllUpcoming] = useState(false);

    // now get the activities\ 
    const { data: activities = [],isLoading,isError } = useQuery({
        queryKey: ['projectActivites', project?._id], 
        queryFn: async () => {
            const res = await axiosSecure.get(`/projects/${project._id}/activities`);
            console.log(res);
            return res.data.map(normalizeActivity);
        },
        enabled: Boolean(project?._id),
    })

    const filteredActivities = activities.filter(
        (activity) => filter === 'all' || activity.type === filter
    );

    const groupedActivities = filteredActivities.reduce((groups, activity) => {
        if (!groups[activity.date]) groups[activity.date] = [];
        groups[activity.date].push(activity);
        return groups;
    }, {});

    const activityCounts = activities.reduce((counts, activity) => {
        counts[activity.type] = (counts[activity.type] || 0) + 1;
        return counts;
    }, {});

    const activityDates = new Set(activities.map((activity) => activity.date));

    const visibleUpcoming = showAllUpcoming
        ? upcomingTasks
        : upcomingTasks.slice(0, 4);

    return (
        <div className="grid grid-cols-1 items-start gap-5 2xl:grid-cols-[290px_minmax(0,1fr)_260px] xl:grid-cols-[270px_minmax(0,1fr)]">

            {/* LEFT SIDEBAR: CALENDAR */}
            <section className="min-w-0 rounded-xl border border-base-300 bg-base-100 p-4 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                    <LuCalendarDays className="text-primary" size={18} />
                    <h2 className="text-lg font-semibold">Project Calendar</h2>
                </div>

                <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    className="devflow-calendar"
                    tileContent={({ date, view }) => {
                        if (view !== 'month') return null;

                        const dateKey = [
                            date.getFullYear(),
                            String(date.getMonth() + 1).padStart(2, '0'),
                            String(date.getDate()).padStart(2, '0'),
                        ].join('-');

                        return activityDates.has(dateKey) ? (
                            <span className="mx-auto mt-1 block h-1.5 w-1.5 rounded-full bg-success" />
                        ) : null;
                    }}
                />

                <div className="mt-5 space-y-4 border-t border-base-300 pt-5">
                    {[
                        { type: 'created', label: 'Task Created', color: 'bg-blue-500' },
                        { type: 'updated', label: 'Task Updated', color: 'bg-emerald-500' },
                        { type: 'comment', label: 'Comment Added', color: 'bg-amber-500' },
                        { type: 'status', label: 'Status Changed', color: 'bg-purple-500' },
                    ].map((item) => (
                        <div
                            key={item.type}
                            className="flex items-center justify-between gap-2 text-sm"
                        >
                            <span className="flex items-center gap-2">
                                <span
                                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${item.color}`}
                                />
                                {item.label}
                            </span>

                            <span className="text-base-content/60">
                                {activityCounts[item.type] || 0}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* CENTER: ACTIVITY TIMELINE */}
            <section className="min-w-0 rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-semibold">Project Activity</h2>
                        <p className="mt-1 text-sm text-base-content/60">
                            Recent updates from your team
                        </p>
                    </div>

                    <select
                        className="select select-bordered select-sm w-36"
                        value={filter}
                        onChange={(event) => setFilter(event.target.value)}
                    >
                        <option value="all">All Activity</option>
                        <option value="created">Task Created</option>
                        <option value="updated">Task Updated</option>
                        <option value="comment">Comment Added</option>
                        <option value="status">Status Changed</option>
                        <option value="deleted">Task Deleted</option>
                    </select>
                </div>

                <div className="space-y-7">
                    {Object.entries(groupedActivities).map(([date, activities]) => (
                        <div key={date}>
                            <h3 className="mb-5 text-sm font-semibold">
                              { formatActivityHeading(date)}
                            </h3>

                            <div className="space-y-5">
                                {activities.map((activity, index) => {
                                    const style = activityStyles[activity.type];
                                    const Icon = style.icon;

                                    return (
                                        <div
                                            key={activity.id}
                                            className="relative flex gap-3 sm:gap-4"
                                        >
                                            {index !== activities.length - 1 && (
                                                <div className="absolute bottom-[-20px] left-5 top-10 w-px bg-base-300" />
                                            )}

                                            <div
                                                className={`relative z - 10 flex h - 10 w - 10 shrink - 0 items - center justify - center rounded - full ${ style.color } `}
                                            >
                                                <Icon size={18} />
                                            </div>

                                            <div className="min-w-0 flex-1 pb-1">
                                                <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                                                    <p className="text-sm text-base-content">
                                                        <span className="font-medium">
                                                            {activity.actor}
                                                        </span>{' '}
                                                        {activity.title}
                                                    </p>
                                                    <time className="shrink-0 text-xs text-base-content/60">
                                                        {activity.time}
                                                    </time>
                                                </div>

                                                <p className="mt-1 text-sm leading-5 text-base-content/65">
                                                    {activity.description}
                                                </p>

                                                {(activity.status || activity.task) && (
                                                    <span
                                                        className={`mt - 2 inline - flex rounded - full px - 2.5 py - 1 text - xs font - medium ${
    activity.status
        ? statusStyles[activity.status]
        : 'bg-purple-100 text-purple-700'
} `}
                                                    >
                                                        {activity.status || activity.task}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {Object.keys(groupedActivities).length === 0 && (
                        <div className="py-12 text-center text-sm text-base-content/60">
                            No activities found for this filter.
                        </div>
                    )}
                </div>
            </section>

            {/* RIGHT SIDEBAR */}
            <aside className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-1">

                {/* Project Progress */}
                <section className="rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">
                    <h2 className="text-sm font-semibold">Project Progress</h2>

                    <div className="mt-4 flex items-center gap-4">
                        <div
                            className="radial-progress text-primary"
                            style={{
                                '--value': 60,
                                '--size': '5.5rem',
                                '--thickness': '5px',
                            }}
                            role="progressbar"
                            aria-valuenow={60}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        >
                            <span className="text-base font-bold text-base-content">
                                60%
                            </span>
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-xs text-base-content/70">
                                <strong className="text-base-content">12</strong> of 20 tasks
                            </p>
                            <progress
                                className="progress progress-primary mt-2 w-full"
                                value="60"
                                max="100"
                            />
                        </div>
                    </div>
                </section>

                {/* Upcoming Tasks */}
                <section className="rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="text-sm font-semibold">Upcoming</h2>
                        <button
                            type="button"
                            className="text-xs font-medium text-primary hover:underline"
                            onClick={() => setShowAllUpcoming(!showAllUpcoming)}
                        >
                            {showAllUpcoming ? 'Show less' : 'View all'}
                        </button>
                    </div>

                    <div className="mt-5 space-y-6">
                        {visibleUpcoming.map((task) => (
                            <div key={task.id}>
                                <p className="mb-2 text-sm text-base-content/70">
                                    {task.date}
                                </p>

                                <div className="flex items-start gap-3">
                                    <span className={`mt - 1.5 h - 2.5 w - 2.5 shrink - 0 rounded - full ${ task.color } `} />

                                    <div className="min-w-0">
                                        <p className="text-sm text-base-content/80">
                                            {task.title}
                                        </p>
                                        <span
                                            className={`mt - 2 inline - flex rounded - full px - 2 py - 0.5 text - xs font - medium ${ statusStyles[task.status] } `}
                                        >
                                            {task.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Quick Actions */}
                <section className="rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm sm:col-span-2 2xl:col-span-1">
                    <h2 className="text-sm font-semibold">Quick Actions</h2>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                        <button
                            type="button"
                            className="group flex flex-col items-center gap-2 rounded-lg p-2 transition hover:bg-base-200"
                            onClick={() => window.dispatchEvent(new CustomEvent('devflow:add-task'))}
                        >
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5 text-primary transition group-hover:bg-primary/10">
                                <LuPlus size={22} />
                            </span>
                            <span className="text-center text-xs">Add Task</span>
                        </button>

                        <button
                            type="button"
                            className="group flex flex-col items-center gap-2 rounded-lg p-2 transition hover:bg-base-200"
                            onClick={() => window.dispatchEvent(new CustomEvent('devflow:upload-file'))}
                        >
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5 text-primary transition group-hover:bg-primary/10">
                                <LuUpload size={21} />
                            </span>
                            <span className="text-center text-xs">Upload File</span>
                        </button>

                        <button
                            type="button"
                            className="group flex flex-col items-center gap-2 rounded-lg p-2 transition hover:bg-base-200"
                            onClick={() => window.dispatchEvent(new CustomEvent('devflow:invite-member'))}
                        >
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5 text-primary transition group-hover:bg-primary/10">
                                <LuUsers size={21} />
                            </span>
                            <span className="text-center text-xs">Invite Member</span>
                        </button>
                    </div>
                </section>
            </aside>
        </div>
    );
};

export default ProjectDetailsActivity;
