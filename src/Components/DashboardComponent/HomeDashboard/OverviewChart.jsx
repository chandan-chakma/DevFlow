import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
const OverviewChart = () => {
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
        <div className='w-full rounded-xl border border-base-300 bg-white p-5 shadow-sm'>
            <div className='flex justify-between items-center'>
                <h2>Project Overview</h2>
                {/* Date filter */}
                <select defaultValue="Pick a color" className="select w-30">
                    <option disabled={true}>Pick a color</option>
                    <option>Crimson</option>
                    <option>Amber</option>
                    <option>Velvet</option>
                </select>
            </div>

            <div className='flex items-center gap-3 mt-4'>
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

            {/* Linechar  */}

            <div className='mt-6 h-[300px] w-full'>
                <LineChart
                    style={{ width: '100%', maxWidth: '700px', height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
                    responsive
                    data={data}
                    margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid
                        stroke="#E5E7EB"
                        strokeDasharray="3 3" />
                    <XAxis dataKey='day'
                        tick={{ fill: "#6B7280", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}/>
                    <YAxis
                        width={30}
                        tick={{ fill: "#6B7280", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}/>
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="completed"
                        stroke="#5B3DF5"
                        strokeWidth={2.5}
                        dot={{
                            r: 4,
                            fill: "#5B3DF5",
                        }}/>
                    <Line
                        type="monotone"
                        dataKey="created"
                        stroke="#3B82F6"
                        strokeWidth={2.5}
                        dot={{
                            r: 4,
                            fill: "#3B82F6",
                        }}/>
                    {/* <RechartsDevtools /> */}
                </LineChart>

            </div>


            
        </div>
    );
};

export default OverviewChart;