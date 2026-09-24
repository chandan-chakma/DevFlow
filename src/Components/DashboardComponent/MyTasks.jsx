import React from 'react';
import { FiEye, FiMoreHorizontal } from 'react-icons/fi';

const MyTasks = () => {
    return (
        <div className="w-full rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-base-content">
                    My Tasks
                </h2>

                <button className="text-sm font-semibold text-primary hover:text-accent-content">
                    View all
                </button>
            </div>

            {/* Task 1 */}
            <div className="flex items-center gap-3 border-b border-base-300 py-3">
                <button className="h-6 w-6 shrink-0 rounded-full border-2 border-slate-300 hover:border-primary"></button>

                <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-base-content">
                        Design landing page
                    </h3>

                    <div className="mt-1.5 flex items-center gap-3">
                        <span className="rounded-full bg-red-50 px-3 py-0.5 text-xs font-semibold text-red-400">
                            High
                        </span>

                        <span className="text-xs font-medium text-slate-400">
                            Apr 23, 2025
                        </span>
                    </div>
                </div>

                <button className="shrink-0 text-slate-400 hover:text-base-content">
                    <FiMoreHorizontal size={20} />
                </button>
            </div>

            {/* Task 2 */}
            <div className="flex items-center gap-3 border-b border-base-300 py-3">
                <button className="h-6 w-6 shrink-0 rounded-full border-2 border-slate-300 hover:border-primary"></button>

                <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-base-content">
                        Implement authentication
                    </h3>

                    <div className="mt-1.5 flex items-center gap-3">
                        <span className="rounded-full bg-red-50 px-3 py-0.5 text-xs font-semibold text-red-400">
                            High
                        </span>

                        <span className="text-xs font-medium text-slate-400">
                            Apr 24, 2025
                        </span>
                    </div>
                </div>

                <button className="shrink-0 text-slate-400 hover:text-base-content">
                    <FiMoreHorizontal size={20} />
                </button>
            </div>

            {/* Task 3 */}
            <div className="flex items-center gap-3 border-b border-base-300 py-3">
                <button className="h-6 w-6 shrink-0 rounded-full border-2 border-slate-300 hover:border-primary"></button>

                <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-base-content">
                        API integration
                    </h3>

                    <div className="mt-1.5 flex items-center gap-3">
                        <span className="rounded-full bg-amber-50 px-3 py-0.5 text-xs font-semibold text-amber-500">
                            Medium
                        </span>

                        <span className="text-xs font-medium text-slate-400">
                            Apr 26, 2025
                        </span>
                    </div>
                </div>

                <button className="shrink-0 text-slate-400 hover:text-base-content">
                    <FiMoreHorizontal size={20} />
                </button>
            </div>

            {/* Task 4 */}
            <div className="flex items-center gap-3 border-b border-base-300 py-3">
                <button className="h-6 w-6 shrink-0 rounded-full border-2 border-slate-300 hover:border-primary"></button>

                <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-base-content">
                        Fix responsive issues
                    </h3>

                    <div className="mt-1.5 flex items-center gap-3">
                        <span className="rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-semibold text-emerald-500">
                            Low
                        </span>

                        <FiEye size={13} className="text-emerald-400" />

                        <span className="text-xs font-medium text-slate-400">
                            Apr 28, 2025
                        </span>
                    </div>
                </div>

                <button className="shrink-0 text-slate-400 hover:text-base-content">
                    <FiMoreHorizontal size={20} />
                </button>
            </div>

            {/* Task 5 */}
            <div className="flex items-center gap-3 py-3">
                <button className="h-6 w-6 shrink-0 rounded-full border-2 border-slate-300 hover:border-primary"></button>

                <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-base-content">
                        Write documentation
                    </h3>

                    <div className="mt-1.5 flex items-center gap-3">
                        <span className="rounded-full bg-amber-50 px-3 py-0.5 text-xs font-semibold text-amber-500">
                            Medium
                        </span>

                        <span className="text-xs font-medium text-slate-400">
                            Apr 30, 2025
                        </span>
                    </div>
                </div>

                <button className="shrink-0 text-slate-400 hover:text-base-content">
                    <FiMoreHorizontal size={20} />
                </button>
            </div>

        </div>
    );
};

export default MyTasks;