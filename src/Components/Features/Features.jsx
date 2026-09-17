import { Astroid, BellRing, BuildingComplexPlus, ClipboardCheck, UserGroup, UsersRound } from 'lucide-react';
import React from 'react';

const Features = () => {
    return (
        <div className='text-center bg-base-100 py-6'>
            <h2 className='text-xl text-primary'>FEATURES</h2>
            <h1 className='text-5xl text-neutral font-bold mb-5'>Everything you need to build</h1>
            <p className='text-muted text-xs'>From planing to deployment,DevFlow gives you the tools to stay organize,<br></br> collaborate with your team, and ship great product</p>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-5'>
                <div className="flex items-center gap-5 rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">

                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E7E5FD] text-primary">
                        <ClipboardCheck size={24} />
                    </div>

                    {/* Content */}
                    <div>
                        <h3 className="text-base font-semibold text-base-content">
                            Project Management
                        </h3>

                        <p className="mt-2 max-w-sm text-sm leading-5 text-muted">
                            Organize your work, set milestones,
                            <br className="hidden sm:block" />
                            and track progress with ease.
                        </p>
                    </div>

                </div>
                <div className="flex items-center gap-5 rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">

                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E5F3FD] text-secondary">
                        <UsersRound size={24} />
                    </div>

                    {/* Content */}
                    <div>
                        <h3 className="text-base font-semibold text-base-content">
                            Task Management
                        </h3>

                        <p className="mt-2 max-w-sm text-sm leading-5 text-muted">
                            Create,assign and manage tasks
                            <br className="hidden sm:block" />
                            with deadline and priorities.
                        </p>
                    </div>

                </div>
                <div className="flex items-center gap-5 rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">

                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E4F8ED] text-success">
                        <UserGroup size={24} />
                    </div>

                    {/* Content */}
                    <div>
                        <h3 className="text-base font-semibold text-base-content">
                            Team Collaboration
                        </h3>

                        <p className="mt-2 max-w-sm text-sm leading-5 text-muted">
                            Work together with your team
                            <br className="hidden sm:block" />
                            in real-time, share files and updates.
                        </p>
                    </div>

                </div>
                <div className="flex items-center gap-5 rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">

                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF8ED] text-warning">
                        <BuildingComplexPlus size={24} />
                    </div>

                    {/* Content */}
                    <div>
                        <h3 className="text-base font-semibold text-base-content">
                            Kanban Board
                        </h3>

                        <p className="mt-2 max-w-sm text-sm leading-5 text-muted">
                            Visualize your workflow and
                            <br className="hidden sm:block" />
                            move tasks with a sample drag & drop.
                        </p>
                    </div>

                </div>
                <div className="flex items-center gap-5 rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">

                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F1EBFE] text-primary">
                        <BellRing size={24} />
                    </div>

                    {/* Content */}
                    <div>
                        <h3 className="text-base font-semibold text-base-content">
                            Analytics & Reports
                        </h3>

                        <p className="mt-2 max-w-sm text-sm leading-5 text-muted">
                            Get insights into your project
                            <br className="hidden sm:block" />
                            perfomance and team productivity.
                        </p>
                    </div>

                </div>
                <div className="flex items-center gap-5 rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">

                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F3EFFE] text-primary">
                        <Astroid size={24} />
                    </div>

                    {/* Content */}
                    <div>
                        <h3 className="text-base font-semibold text-base-content">
                            AI Assistant
                        </h3>

                        <p className="mt-2 max-w-sm text-sm leading-5 text-muted">
                            Get smart suggestions, break down
                            <br className="hidden sm:block" />
                            tasks,and plan your next steps.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Features;