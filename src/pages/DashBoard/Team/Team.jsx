import React, { useState } from 'react';
import {
    Users,
    Search,
    CalendarCheck,
    ChartNoAxesColumn,
    FolderKanban,
    ChevronRight,
    SlidersHorizontal,
    CheckCircle2,
    Clock3,
    AlertCircle,
} from 'lucide-react';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecures from '../../../Hooks/UseAxiosSecures.jsx';
import { FaUserGroup } from 'react-icons/fa6';
import { FiUsers } from 'react-icons/fi';
import { BiTask } from 'react-icons/bi';
import { TfiAlarmClock } from 'react-icons/tfi';
import { RiProjectorLine } from 'react-icons/ri';

const teamMembers = [
    {
        id: 1,
        name: 'Alex Morgan',
        role: 'Manager',
        avatar: 'https://i.pravatar.cc/100?img=12',
        projects: ['DevFlow Website', 'AI Dashboard'],
        openTasks: 5,
        inProgress: 3,
        completed: 12,
        overdue: 2,
        online: true,
    },
    {
        id: 2,
        name: 'Jamie Lee',
        role: 'Developer',
        avatar: 'https://i.pravatar.cc/100?img=47',
        projects: ['DevFlow Website', 'AI Dashboard', 'Mobile App'],
        openTasks: 4,
        inProgress: 2,
        completed: 8,
        overdue: 1,
        online: true,
    },
    {
        id: 3,
        name: 'Taylor Chen',
        role: 'Developer',
        avatar: 'https://i.pravatar.cc/100?img=11',
        projects: ['DevFlow Website'],
        openTasks: 2,
        inProgress: 1,
        completed: 5,
        overdue: 0,
        online: true,
    },
    {
        id: 4,
        name: 'Morgan Reed',
        role: 'Developer',
        avatar: 'https://i.pravatar.cc/100?img=44',
        projects: ['AI Dashboard', 'Mobile App'],
        openTasks: 3,
        inProgress: 2,
        completed: 7,
        overdue: 1,
        online: false,
    },
    {
        id: 5,
        name: 'Casey Wilson',
        role: 'Developer',
        avatar: 'https://i.pravatar.cc/100?img=13',
        projects: ['DevFlow Website'],
        openTasks: 1,
        inProgress: 0,
        completed: 4,
        overdue: 0,
        online: true,
    },
    {
        id: 6,
        name: 'Riley Patel',
        role: 'Developer',
        avatar: 'https://i.pravatar.cc/100?img=49',
        projects: ['AI Dashboard', 'Mobile App'],
        openTasks: 3,
        inProgress: 2,
        completed: 6,
        overdue: 1,
        online: false,
    },
    {
        id: 7,
        name: 'Jordan Kim',
        role: 'Developer',
        avatar: 'https://i.pravatar.cc/100?img=60',
        projects: ['Mobile App'],
        openTasks: 2,
        inProgress: 1,
        completed: 3,
        overdue: 0,
        online: true,
    },
    {
        id: 8,
        name: 'Quinn Foster',
        role: 'Designer',
        avatar: 'https://i.pravatar.cc/100?img=45',
        projects: ['DevFlow Website', 'AI Dashboard'],
        openTasks: 1,
        inProgress: 1,
        completed: 4,
        overdue: 0,
        online: false,
    },
];

const roleStyles = {
    Manager: 'bg-purple-100 text-purple-700',
    Developer: 'bg-blue-100 text-blue-700',
    Designer: 'bg-pink-100 text-pink-700',
};
const Team = () => {
    const axiosSecure = UseAxiosSecures();
    const [search, setSearch] = useState('');
    const [selectedRole, setSelectedRole] = useState('All Roles');
    const [selectedProject, setSelectedProject] = useState('All Projects');

    const projects = [
        ...new Set(teamMembers.flatMap((member) => member.projects)),
    ];

    const filteredMembers = useMemo(() => {
        return teamMembers.filter((member) => {
            const matchesSearch =
                member.name.toLowerCase().includes(search.toLowerCase());

            const matchesRole =
                selectedRole === 'All Roles' || member.role === selectedRole;

            const matchesProject =
                selectedProject === 'All Projects' ||
                member.projects.includes(selectedProject);

            return matchesSearch && matchesRole && matchesProject;
        });
    }, [search, selectedRole, selectedProject]);

    const totalActiveTasks = teamMembers.reduce(
        (total, member) => total + member.openTasks + member.inProgress,
        0
    );

    const totalOverdueTasks = teamMembers.reduce(
        (total, member) => total + member.overdue,
        0
    );

    const summaryCards = [
        {
            label: 'Total Members',
            value: teamMembers.length,
            icon: Users,
            iconStyle: 'bg-primary/10 text-primary',
        },
        {
            label: 'Active Tasks',
            value: totalActiveTasks,
            icon: CalendarCheck,
            iconStyle: 'bg-success/10 text-success',
        },
        {
            label: 'Overdue Tasks',
            value: totalOverdueTasks,
            icon: ChartNoAxesColumn,
            iconStyle: 'bg-error/10 text-error',
        },
        {
            label: 'Projects',
            value: projects.length,
            icon: FolderKanban,
            iconStyle: 'bg-info/10 text-info',
        },
    ];
    //  get team member summary or team 
    const {
        data: summary=[],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['team-summary'],
        queryFn: async () => {
            const res = await axiosSecure.get('/team/summary');
            console.log(res.data);
            return res.data;
        },
    });

    return (
        <div className="min-h-screen bg-base-200/50 p-4 sm:p-6 lg:p-8">
            {/* Page heading */}
            <div className="mb-7 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Users size={28} />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-base-content sm:text-3xl">
                            Team
                        </h1>
                        <p className="mt-1 text-sm text-base-content/60 sm:text-base">
                            People you collaborate with across your projects
                        </p>
                    </div>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                    <div
                        className="card border border-base-300/60 bg-base-100 shadow-sm"
                    >
                        <div className="card-body flex-row items-center gap-2 p-2 sm:p-4">
                            <div
                                className='bg-[#E8ECFE] flex h-11 w-11 shrink-0 items-center justify-center rounded-xl'
                            >
                                <FiUsers size={22} className='text-primary' />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs text-base-content/60 sm:text-sm">
                                    Team Member
                                </p>
                                <p className="text-2xl font-bold text-base-content">
                                    {summary.totalMembers}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="card border border-base-300/60 bg-base-100 shadow-sm"
                    >
                        <div className="card-body flex-row items-center gap-3 p-3 sm:p-4">
                            <div
                                className='bg-[#DAF8EF] flex h-11 w-11 shrink-0 items-center justify-center rounded-xl'
                            >
                                <BiTask size={22} className='text-success' />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs text-base-content/60 sm:text-sm">
                                    Active Task
                                </p>
                                <p className="text-2xl font-bold text-base-content">
                                    {summary.activeTasks}
                                </p>
                            </div>
                        </div>
                    </div>


                    <div
                        className="card border border-base-300/60 bg-base-100 shadow-sm"
                    >
                        <div className="card-body flex-row items-center gap-3 p-3 sm:p-4">
                            <div
                                className='bg-#FDE5E6 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl'
                            >
                                <TfiAlarmClock size={22} className='text-error' />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs text-base-content/60 sm:text-sm">
                                    Overdue Tasks
                                </p>
                                <p className="text-2xl font-bold text-base-content">
                                    {summary.overdueTasks}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="card border border-base-300/60 bg-base-100 shadow-sm"
                    >
                        <div className="card-body flex-row items-center gap-3 p-3 sm:p-4">
                            <div
                                className='bg-[#DDE9FE] flex h-11 w-11 shrink-0 items-center justify-center rounded-xl'
                            >
                                <RiProjectorLine size={22} className='text-info' />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs text-base-content/60 sm:text-sm">
                                    Team Projects
                                </p>
                                <p className="text-2xl font-bold text-base-content">
                                    {summary.totalProjects}
                                </p>
                            </div>
                        </div>
                    </div>
                  
                        
                       
                         
                
                </div>
            </div>

            {/* Search and filters */}
            <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-base-300/60 bg-base-100 p-3 shadow-sm lg:flex-row lg:items-center">
                <label className="input input-bordered flex w-full items-center gap-2 bg-base-100 lg:flex-1">
                    <Search size={19} className="text-base-content/50" />

                    <input
                        type="text"
                        placeholder="Search team members..."
                        className="grow"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />

                    {search && (
                        <button
                            type="button"
                            className="btn btn-ghost btn-xs"
                            onClick={() => setSearch('')}
                            aria-label="Clear search"
                        >
                            ✕
                        </button>
                    )}
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <select
                        className="select select-bordered w-full bg-base-100 sm:w-40"
                        value={selectedRole}
                        onChange={(event) => setSelectedRole(event.target.value)}
                        aria-label="Filter by role"
                    >
                        <option>All Roles</option>
                        <option>Manager</option>
                        <option>Developer</option>
                        <option>Designer</option>
                    </select>

                    <select
                        className="select select-bordered w-full bg-base-100 sm:w-48"
                        value={selectedProject}
                        onChange={(event) => setSelectedProject(event.target.value)}
                        aria-label="Filter by project"
                    >
                        <option>All Projects</option>
                        {projects.map((project) => (
                            <option key={project}>{project}</option>
                        ))}
                    </select>

                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => {
                            setSearch('');
                            setSelectedRole('All Roles');
                            setSelectedProject('All Projects');
                        }}
                        title="Reset filters"
                    >
                        <SlidersHorizontal size={18} />
                        <span className="sm:hidden">Reset filters</span>
                    </button>
                </div>
            </div>

            {/* Results count */}
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-base-content/70">
                    Team members
                    <span className="ml-2 badge badge-ghost">
                        {filteredMembers.length}
                    </span>
                </h2>
            </div>

            {/* Team member cards */}
            {filteredMembers.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
                    {filteredMembers.map((member) => (
                        <div
                            key={member.id}
                            className="card border border-base-300/60 bg-base-100 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="card-body gap-5 p-5">
                                {/* Member information */}
                                <div className="flex items-start gap-3">
                                    <div className="avatar relative shrink-0">
                                        <div className="w-14 rounded-full ring-2 ring-base-200">
                                            <img src={member.avatar} alt={member.name} />
                                        </div>

                                        <span
                                            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-base-100 ${member.online ? 'bg-success' : 'bg-base-300'
                                                }`}
                                            title={member.online ? 'Online' : 'Offline'}
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="truncate font-bold text-base-content">
                                            {member.name}
                                        </h3>

                                        <span
                                            className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-medium ${roleStyles[member.role] ||
                                                'bg-base-200 text-base-content'
                                                }`}
                                        >
                                            {member.role}
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-ghost btn-sm btn-square text-base-content/50"
                                        aria-label={`View ${member.name}`}
                                        title={`View ${member.name}`}
                                        onClick={() => {
                                            // We'll connect this to a member details page later.
                                            console.log('Selected member:', member);
                                        }}
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>

                                {/* Shared projects */}
                                <div className="flex items-center gap-2 text-sm text-base-content/60">
                                    <FolderKanban size={16} />

                                    <span>
                                        {member.projects.length}{' '}
                                        {member.projects.length === 1
                                            ? 'shared project'
                                            : 'shared projects'}
                                    </span>
                                </div>

                                {/* Task statistics */}
                                <div className="grid grid-cols-3 gap-2 border-t border-base-200 pt-4">
                                    <div>
                                        <p className="text-xl font-bold text-primary">
                                            {member.openTasks}
                                        </p>
                                        <p className="text-xs text-base-content/60">
                                            Open tasks
                                        </p>
                                    </div>

                                    <div className="border-l border-base-200 pl-3">
                                        <p className="text-xl font-bold text-warning">
                                            {member.inProgress}
                                        </p>
                                        <p className="text-xs text-base-content/60">
                                            In progress
                                        </p>
                                    </div>

                                    <div className="border-l border-base-200 pl-3">
                                        <p className="text-xl font-bold text-success">
                                            {member.completed}
                                        </p>
                                        <p className="text-xs text-base-content/60">
                                            Completed
                                        </p>
                                    </div>
                                </div>

                                {/* Overdue task indicator */}
                                {member.overdue > 0 && (
                                    <div className="flex items-center gap-2 rounded-lg bg-error/5 px-3 py-2 text-sm text-error">
                                        <AlertCircle size={16} />
                                        {member.overdue} overdue{' '}
                                        {member.overdue === 1 ? 'task' : 'tasks'}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="card border border-base-300/60 bg-base-100">
                    <div className="card-body items-center py-16 text-center">
                        <div className="rounded-full bg-base-200 p-4">
                            <Users size={32} className="text-base-content/50" />
                        </div>

                        <h3 className="mt-2 text-lg font-bold">No team members found</h3>

                        <p className="max-w-sm text-sm text-base-content/60">
                            Try another search term or change your filters.
                        </p>

                        <button
                            className="btn btn-primary mt-2"
                            onClick={() => {
                                setSearch('');
                                setSelectedRole('All Roles');
                                setSelectedProject('All Projects');
                            }}
                        >
                            Clear filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Team;