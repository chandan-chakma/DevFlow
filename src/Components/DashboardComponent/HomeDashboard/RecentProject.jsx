import React from 'react';
import { SlOptions } from 'react-icons/sl';
import { TbBriefcase, TbChecklist, TbDeviceMobile, TbDeviceProjector, TbShoppingCart } from 'react-icons/tb';

const RecentProject = () => {
    return (
        <div className='w-full min-w-0 rounded-xl border border-base-300 bg-white p-5 shadow-sm'>
            <div className='flex justify-between items-center'>
                <h1 className='text-neutral text-2xl'>Recent Projects</h1>
                <button className='text-primary'>View All</button>
            </div>

            {/* show Recent Project  */}
            <div className="flex min-w-0 items-center gap-4 border-b border-base-300 py-4">

                <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100">
                        <TbDeviceProjector
                            size={27}
                            className="text-primary"
                        />
                    </div>

                    <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-neutral">
                            DevFlow Web App
                        </h3>
                        <p className="truncate text-sm text-muted">
                            Project management platform
                        </p>
                    </div>
                </div>

                <div className="flex min-w-0 flex-1 items-center gap-2">
                    <progress
                        className="progress progress-primary w-full"
                        value="75"
                        max="100"
                    ></progress>

                    <span className="w-10 shrink-0 text-sm text-muted">
                        75%
                    </span>
                </div>

                <span className="w-24 shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-center text-sm font-semibold text-success">
                    Active
                </span>

                <button className="shrink-0 rounded-lg p-2 text-neutral hover:bg-base-200">
                    <SlOptions size={18} />
                </button>
            </div>

            {/* Project 2 */}
            <div className="flex min-w-0 items-center gap-4 border-b border-base-300 py-4">

                <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                        <TbShoppingCart
                            size={27}
                            className="text-blue-500"
                        />
                    </div>

                    <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-neutral">
                            E-commerce Website
                        </h3>
                        <p className="truncate text-sm text-muted">
                            Online store with modern UI
                        </p>
                    </div>
                </div>

                <div className="flex min-w-0 flex-1 items-center gap-2">
                    <progress
                        className="progress progress-primary w-full"
                        value="75"
                        max="100"
                    ></progress>

                    <span className="w-10 shrink-0 text-sm text-muted">
                        75%
                    </span>
                </div>

                <span className="w-24 shrink-0 rounded-full bg-blue-50 px-3 py-1 text-center text-sm font-semibold text-blue-500">
                    In Progress
                </span>

                <button className="shrink-0 rounded-lg p-2 text-neutral hover:bg-base-200">
                    <SlOptions size={18} />
                </button>
            </div>

            {/* Project 3 */}
            <div className="flex min-w-0 items-center gap-4 border-b border-base-300 py-4">

                <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                        <TbDeviceMobile
                            size={27}
                            className="text-emerald-500"
                        />
                    </div>

                    <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-neutral">
                            Mobile App
                        </h3>
                        <p className="truncate text-sm text-muted">
                            React Native mobile application
                        </p>
                    </div>
                </div>

                <div className="flex min-w-0 flex-1 items-center gap-2">
                    <progress
                        className="progress progress-primary w-full"
                        value="75"
                        max="100"
                    ></progress>

                    <span className="w-10 shrink-0 text-sm text-muted">
                        75%
                    </span>
                </div>

                <span className="w-24 shrink-0 rounded-full bg-amber-50 px-3 py-1 text-center text-sm font-semibold text-amber-500">
                    On Hold
                </span>

                <button className="shrink-0 rounded-lg p-2 text-neutral hover:bg-base-200">
                    <SlOptions size={18} />
                </button>
            </div>

            {/* Project 4 */}
            <div className="flex min-w-0 items-center gap-4 border-b border-base-300 py-4">

                <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pink-100">
                        <TbBriefcase
                            size={27}
                            className="text-pink-500"
                        />
                    </div>

                    <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-neutral">
                            Portfolio Website
                        </h3>
                        <p className="truncate text-sm text-muted">
                            Personal portfolio website
                        </p>
                    </div>
                </div>

                <div className="flex min-w-0 flex-1 items-center gap-2">
                    <progress
                        className="progress progress-primary w-full"
                        value="75"
                        max="100"
                    ></progress>

                    <span className="w-10 shrink-0 text-sm text-muted">
                        75%
                    </span>
                </div>

                <span className="w-24 shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-center text-sm font-semibold text-success">
                    Active
                </span>

                <button className="shrink-0 rounded-lg p-2 text-neutral hover:bg-base-200">
                    <SlOptions size={18} />
                </button>
            </div>

            {/* Project 5 */}
            <div className="flex items-center gap-5 py-4">

                <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-700">
                        <TbChecklist
                            size={27}
                            className="text-white"
                        />
                    </div>

                    <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-neutral">
                            Task Manager
                        </h3>
                        <p className="truncate text-sm text-muted">
                            Simple task management tool
                        </p>
                    </div>
                </div>

                <div className="flex min-w-0 flex-1 items-center gap-2">
                    <progress
                        className="progress progress-primary w-full"
                        value="75"
                        max="100"
                    ></progress>

                    <span className="w-10 shrink-0 text-sm text-muted">
                        75%
                    </span>
                </div>

                <span className="w-24 shrink-0 rounded-full bg-blue-50 px-3 py-1 text-center text-sm font-semibold text-blue-500">
                    In Progress
                </span>

                <button className="shrink-0 rounded-lg p-2 text-neutral hover:bg-base-200">
                    <SlOptions size={18} />
                </button>
            </div>

{/* 
            <div className='flex justify-center items-center gap-5 mt-5 border-b-2 border-muted py-5'>
                <div className='flex justify-center items-center gap-2'>
                    <div className='bg-base-300 rounded-md w-15 h-14 flex justify-center items-center'>
                        <TbDeviceProjector size={28} className='text-primary' />
                    </div>

                    <div>
                        <h2 className='text-md text-neutral'>DevFlow Web App</h2>
                        <p className='text-sm text-muted'>Project management platform</p>
                    </div>
                </div>
               
                
                <div>
                    <progress class="progress progress-primary w-30" value="70" max="100"></progress><span className='ml-2'>70%</span>
                </div>
                <div className="badge bg-[#E4F9F1] text-success">
                    Active
                </div>
               
                <SlOptions className='text-neutral' size={18}/>
            </div> */}

            
    
           
            
        </div>
    );
};

export default RecentProject;