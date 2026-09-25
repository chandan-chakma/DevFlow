import React from 'react';
import { Cell, Pie, PieChart, Tooltip, ResponsiveContainer, } from 'recharts';

const TasksPieChart = () => {
    const taskData = [
        {
            name: "To Do",
            value: 4,
            color: "#D9E0F0",
        },
        {
            name: "In Progress",
            value: 5,
            color: "#4F7DF3",
        },
        {
            name: "In Review",
            value: 4,
            color: "#F5B63F",
        },
        {
            name: "Done",
            value: 28,
            color: "#45B89C",
        },
    ];

    const totalTasks = taskData.reduce((sum, item) => sum + item.value, 0);

    const completed = taskData.find(
        (item) => item.name === "Done"
    )?.value || 0;

    const completedPercentage = Math.round(
        (completed / totalTasks) * 100
    );
    return (
        <div className='w-full rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm'>
            <h2 className='text-lg font-bold text-base-content'>Task Progress</h2>
            <div className="relative mx-auto mt-2 h-[240px] w-full max-w-[300px]">

                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>

                        <Pie
                            data={taskData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius="60%"
                            outerRadius="80%"
                            paddingAngle={2}
                            stroke="none"
                        >
                            {taskData.map((item, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={item.color}
                                />
                            ))}
                        </Pie>

                        <Tooltip />

                    </PieChart>
                </ResponsiveContainer>

                {/* Center content */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-base-content">
                        {completedPercentage}%
                    </span>

                    <span className="text-sm text-muted">
                        Completed
                    </span>
                </div>

            </div>
            {/* Legend */}
            <div className="mt-2 space-y-3">

                {taskData.map((item) => (
                    <div
                        key={item.name}
                        className="flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">

                            <span
                                className="h-3 w-3 rounded-full"
                                style={{
                                    backgroundColor: item.color,
                                }}
                            />

                            <span className="text-sm text-muted">
                                {item.name}
                            </span>

                        </div>

                        <span className="text-sm font-medium text-base-content">
                            {item.value}
                        </span>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default TasksPieChart;