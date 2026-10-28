import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Cell, Pie, PieChart, Tooltip, ResponsiveContainer, } from 'recharts';
import UseAxiosSecures from '../../../Hooks/UseAxiosSecures.jsx';

const TasksPieChart = () => {
    const axiosSecure = UseAxiosSecures();

    const { data:taskChart=[] } = useQuery({
        queryKey: ['taskStatusChart'],
        queryFn: async () => {
            const res = await axiosSecure.get('/dashboard/task-status-chart')
            // console.log(res.data);
            return res.data?.taskData;
        }
    })

    const totalTasks = taskChart.reduce(
        (sum, item) => sum + item.value,
        0
    );

    const completed = taskChart.find(
        (item) => item.name === 'Done'
    )?.value || 0;

    const completedPercentage = totalTasks
        ? Math.round((completed / totalTasks) * 100)
        : 0;
    return (
        <div className='w-full rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm'>
            <h2 className='text-lg font-bold text-base-content'>Task Progress</h2>
            <div className="relative mx-auto mt-2 h-[240px] w-full max-w-[300px]">

                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>

                        <Pie
                            data={taskChart}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius="60%"
                            outerRadius="80%"
                            paddingAngle={2}
                            stroke="none"
                        >
                            {taskChart.map((item, index) => (
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

                {taskChart.map((item) => (
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