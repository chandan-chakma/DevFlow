import React from 'react';
import { LuArrowDownUp, LuCalendarDays, LuChevronDown, LuEllipsis, LuFileCode2, LuUsers } from 'react-icons/lu';

const ProjectsShow = () => {
    return (
        <div>
            {/* filter section  */}

            <div className='flex justify-around gap-8 my-8'>
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
                        <input type="search" required placeholder="Search projects..." />
                    </label>
                </div>

                {/* Button  */}
                <div className='space-x-7'>
                    <div className="indicator">
                        <span className="indicator-item badge badge-secondary">12</span>
                        <button className="btn btn-primary rounded-xl">All Projects</button>
                    </div>
                    <div className="indicator">
                        <span className="indicator-item badge badge-secondary">12</span>
                        <button className="btn bg-[#FEFFFE] rounded-xl">Active</button>
                    </div>
                    <div className="indicator">
                        <span className="indicator-item badge badge-secondary">12</span>
                        <button className="btn bg-[#FEFFFE] rounded-xl">In Progress</button>
                    </div>
                    <div className="indicator">
                        <span className="indicator-item badge badge-secondary">12</span>
                        <button className="btn bg-[#FEFFFE] rounded-xl">Completed</button>
                    </div>
                </div>

                {/* sort by update  */}
                <div className="dropdown dropdown-end">
                    <button
                        tabIndex={0}
                        type="button"
                        className="flex h-10 w-56 items-center justify-between rounded-xl border border-base-300 bg-base-100 px-5 text-lg font-semibold text-slate-500 shadow-sm hover:bg-base-200"
                    >
                        <div className="flex items-center gap-2">
                            <LuArrowDownUp
                                size={18}
                                className="text-slate-500"
                            />

                            <span>Sort by: Latest</span>
                        </div>

                        <LuChevronDown
                            size={18}
                            className="text-slate-500"
                        />
                    </button>

                    <ul
                        tabIndex={0}
                        className="menu dropdown-content z-50 mt-2 w-80 rounded-xl border border-base-300 bg-base-100 p-2 shadow-lg"
                    >
                        <li>
                            <button>Latest</button>
                        </li>

                        <li>
                            <button>Oldest</button>
                        </li>

                        <li>
                            <button>Name: A → Z</button>
                        </li>

                        <li>
                            <button>Name: Z → A</button>
                        </li>
                    </ul>
                </div>

            </div>

            <div className='grid grid-cols-3 gap-5'>
                


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
                                Active
                            </span>

                        </div>
                    </div>

                    {/* Project information */}
                    <div className="mt-5">

                        <h2 className="text-2xl font-bold text-base-content">
                            DevFlow Web App
                        </h2>

                        <p className="mt-2 max-w-md text-base leading-7 text-slate-400">
                            Project management platform for teams with real-time
                            collaboration.
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
                            <LuUsers size={22} />

                            <span className="whitespace-nowrap text-sm font-medium">
                                6 members
                            </span>
                        </div>

                        {/* Due date */}
                        <div className="flex items-center gap-2 text-slate-400">
                            <LuCalendarDays size={21} />

                            <span className="whitespace-nowrap text-sm font-medium">
                                Dec 25, 2026
                            </span>
                        </div>

                    </div>

                </div>

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
                                Active
                            </span>

                        </div>
                    </div>

                    {/* Project information */}
                    <div className="mt-5">

                        <h2 className="text-2xl font-bold text-base-content">
                            DevFlow Web App
                        </h2>

                        <p className="mt-2 max-w-md text-base leading-7 text-slate-400">
                            Project management platform for teams with real-time
                            collaboration.
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
                            <LuUsers size={22} />

                            <span className="whitespace-nowrap text-sm font-medium">
                                6 members
                            </span>
                        </div>

                        {/* Due date */}
                        <div className="flex items-center gap-2 text-slate-400">
                            <LuCalendarDays size={21} />

                            <span className="whitespace-nowrap text-sm font-medium">
                                Dec 25, 2026
                            </span>
                        </div>

                    </div>

                </div>

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
                                Active
                            </span>

                        </div>
                    </div>

                    {/* Project information */}
                    <div className="mt-5">

                        <h2 className="text-2xl font-bold text-base-content">
                            DevFlow Web App
                        </h2>

                        <p className="mt-2 max-w-md text-base leading-7 text-slate-400">
                            Project management platform for teams with real-time
                            collaboration.
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
                            <LuUsers size={22} />

                            <span className="whitespace-nowrap text-sm font-medium">
                                6 members
                            </span>
                        </div>

                        {/* Due date */}
                        <div className="flex items-center gap-2 text-slate-400">
                            <LuCalendarDays size={21} />

                            <span className="whitespace-nowrap text-sm font-medium">
                                Dec 25, 2026
                            </span>
                        </div>

                    </div>

                </div>

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
                                Active
                            </span>

                        </div>
                    </div>

                    {/* Project information */}
                    <div className="mt-5">

                        <h2 className="text-2xl font-bold text-base-content">
                            DevFlow Web App
                        </h2>

                        <p className="mt-2 max-w-md text-base leading-7 text-slate-400">
                            Project management platform for teams with real-time
                            collaboration.
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
                            <LuUsers size={22} />

                            <span className="whitespace-nowrap text-sm font-medium">
                                6 members
                            </span>
                        </div>

                        {/* Due date */}
                        <div className="flex items-center gap-2 text-slate-400">
                            <LuCalendarDays size={21} />

                            <span className="whitespace-nowrap text-sm font-medium">
                                Dec 25, 2026
                            </span>
                        </div>

                    </div>

                </div>

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
                                Active
                            </span>

                        </div>
                    </div>

                    {/* Project information */}
                    <div className="mt-5">

                        <h2 className="text-2xl font-bold text-base-content">
                            DevFlow Web App
                        </h2>

                        <p className="mt-2 max-w-md text-base leading-7 text-slate-400">
                            Project management platform for teams with real-time
                            collaboration.
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
                            <LuUsers size={22} />

                            <span className="whitespace-nowrap text-sm font-medium">
                                6 members
                            </span>
                        </div>

                        {/* Due date */}
                        <div className="flex items-center gap-2 text-slate-400">
                            <LuCalendarDays size={21} />

                            <span className="whitespace-nowrap text-sm font-medium">
                                Dec 25, 2026
                            </span>
                        </div>

                    </div>

                </div>

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
                                Active
                            </span>

                        </div>
                    </div>

                    {/* Project information */}
                    <div className="mt-5">

                        <h2 className="text-2xl font-bold text-base-content">
                            DevFlow Web App
                        </h2>

                        <p className="mt-2 max-w-md text-base leading-7 text-slate-400">
                            Project management platform for teams with real-time
                            collaboration.
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
                            <LuUsers size={22} />

                            <span className="whitespace-nowrap text-sm font-medium">
                                6 members
                            </span>
                        </div>

                        {/* Due date */}
                        <div className="flex items-center gap-2 text-slate-400">
                            <LuCalendarDays size={21} />

                            <span className="whitespace-nowrap text-sm font-medium">
                                Dec 25, 2026
                            </span>
                        </div>

                    </div>

                </div>

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
                                Active
                            </span>

                        </div>
                    </div>

                    {/* Project information */}
                    <div className="mt-5">

                        <h2 className="text-2xl font-bold text-base-content">
                            DevFlow Web App
                        </h2>

                        <p className="mt-2 max-w-md text-base leading-7 text-slate-400">
                            Project management platform for teams with real-time
                            collaboration.
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
                            <LuUsers size={22} />

                            <span className="whitespace-nowrap text-sm font-medium">
                                6 members
                            </span>
                        </div>

                        {/* Due date */}
                        <div className="flex items-center gap-2 text-slate-400">
                            <LuCalendarDays size={21} />

                            <span className="whitespace-nowrap text-sm font-medium">
                                Dec 25, 2026
                            </span>
                        </div>

                    </div>

                </div>

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
                                Active
                            </span>

                        </div>
                    </div>

                    {/* Project information */}
                    <div className="mt-5">

                        <h2 className="text-2xl font-bold text-base-content">
                            DevFlow Web App
                        </h2>

                        <p className="mt-2 max-w-md text-base leading-7 text-slate-400">
                            Project management platform for teams with real-time
                            collaboration.
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
                            <LuUsers size={22} />

                            <span className="whitespace-nowrap text-sm font-medium">
                                6 members
                            </span>
                        </div>

                        {/* Due date */}
                        <div className="flex items-center gap-2 text-slate-400">
                            <LuCalendarDays size={21} />

                            <span className="whitespace-nowrap text-sm font-medium">
                                Dec 25, 2026
                            </span>
                        </div>

                    </div>

                </div>

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
                                Active
                            </span>

                        </div>
                    </div>

                    {/* Project information */}
                    <div className="mt-5">

                        <h2 className="text-2xl font-bold text-base-content">
                            DevFlow Web App
                        </h2>

                        <p className="mt-2 max-w-md text-base leading-7 text-slate-400">
                            Project management platform for teams with real-time
                            collaboration.
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
                            <LuUsers size={22} />

                            <span className="whitespace-nowrap text-sm font-medium">
                                6 members
                            </span>
                        </div>

                        {/* Due date */}
                        <div className="flex items-center gap-2 text-slate-400">
                            <LuCalendarDays size={21} />

                            <span className="whitespace-nowrap text-sm font-medium">
                                Dec 25, 2026
                            </span>
                        </div>

                    </div>

                </div>

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
                                Active
                            </span>

                        </div>
                    </div>

                    {/* Project information */}
                    <div className="mt-5">

                        <h2 className="text-2xl font-bold text-base-content">
                            DevFlow Web App
                        </h2>

                        <p className="mt-2 max-w-md text-base leading-7 text-slate-400">
                            Project management platform for teams with real-time
                            collaboration.
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
                            <LuUsers size={22} />

                            <span className="whitespace-nowrap text-sm font-medium">
                                6 members
                            </span>
                        </div>

                        {/* Due date */}
                        <div className="flex items-center gap-2 text-slate-400">
                            <LuCalendarDays size={21} />

                            <span className="whitespace-nowrap text-sm font-medium">
                                Dec 25, 2026
                            </span>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default ProjectsShow;