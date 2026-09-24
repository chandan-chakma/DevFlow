import React from 'react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
const Analytics = () => {
  
        const data = [
            { day: "Tue", completed: 6, created: 3 },
            { day: "Wed", completed: 8, created: 5 },
            { day: "Thu", completed: 12, created: 9 },
            { day: "Fri", completed: 9, created: 7 },
            { day: "Sat", completed: 14, created: 10 },
            { day: "Sun", completed: 18, created: 13 },
            { day: "Mon", completed: 13, created: 9 },
        ];

        return (
            <div className="w-full rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">

                {/* Header */}
                <div className="flex items-center justify-between">

                    {/* Title */}
                    <h2 className="text-lg font-bold text-base-content">
                        Project Overview
                    </h2>

                    {/* Date filter */}
                    <button className="flex items-center gap-2 rounded-lg border border-base-300 px-3 py-2 text-sm font-medium text-base-content hover:bg-base-200">
                        Last 7 days

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </button>

                </div>

                {/* Legend */}
                <div className="mt-4 flex items-center gap-5">

                    <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                        <span className="text-sm text-muted">
                            Completed
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
                        <span className="text-sm text-muted">
                            Created
                        </span>
                    </div>

                </div>

                {/* Chart */}
                <div className="mt-6 h-[300px] w-full">

                    <LineChart
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        responsive
                        data={data}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 0,
                            bottom: 5,
                        }}
                    >

                        <CartesianGrid
                            stroke="#E5E7EB"
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="day"
                            tick={{ fill: "#6B7280", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            width={30}
                            tick={{ fill: "#6B7280", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="completed"
                            stroke="#5B3DF5"
                            strokeWidth={2.5}
                            dot={{
                                r: 4,
                                fill: "#5B3DF5",
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="created"
                            stroke="#3B82F6"
                            strokeWidth={2.5}
                            dot={{
                                r: 4,
                                fill: "#3B82F6",
                            }}
                        />

                    </LineChart>

                </div>

            </div>
        );
    };


export default Analytics;