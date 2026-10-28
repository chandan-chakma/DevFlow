import React from 'react';
import UseAxiosSecures from '../../../Hooks/UseAxiosSecures.jsx';
import { useQuery } from '@tanstack/react-query';

const RecentAcitvity = () => {
    const axiosSecure = UseAxiosSecures();

    const { data:recentActivities=[] } = useQuery({
        queryKey: ['activity'],
        queryFn: async () => {
            const res = await axiosSecure.get('/dashboard/recent-activities')
            // console.log(res);
            return res.data.activities;
        }
    })

    const formatRelativeTime = (date) => {
        const now = new Date();
        const past = new Date(date);

        const seconds = Math.floor((now - past) / 1000);

        if (seconds < 60) return "just now";

        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} min ago`;

        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;

        const days = Math.floor(hours / 24);
        if (days < 7) return `${days} ${days === 1 ? "day" : "days"} ago`;

        const weeks = Math.floor(days / 7);
        if (days < 30) return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;

        const months = Math.floor(days / 30);
        if (days < 365) return `${months} ${months === 1 ? "month" : "months"} ago`;

        const years = Math.floor(days / 365);
        return `${years} ${years === 1 ? "year" : "years"} ago`;
    };
    return (
        <div className='bg-white px-3'>
            <div className='flex justify-between'>
                <h1 className='text-lg'>Recent Activity</h1>
                <button className='text-primary'>View All</button>
            </div>

            {
                recentActivities.map(activity =>
                    <div key={activity._id}
                        className='flex justify-between items-center gap-5 mt-6  py-3 px-1 border-b-2 border-accent'>
                        <div className='flex gap-3'>
                            <div className="avatar">
                                <div className="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                                    <img alt="Tailwind-CSS-Avatar-component" src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                                </div>
                            </div>
                            <div>
                                <h2 className='text-neutral text-sm'>
                                    {activity.performedBy.name}
                                </h2>
                                <p className='text-muted text-sm'>{activity.description}</p>
                            </div>
                        </div>
                        <p className='text-muted text-sm'>{formatRelativeTime(activity.createdAt)}</p>

                    </div>
                    
                )
            }

            {/* <div className='flex justify-between items-center gap-5 mt-6  py-3 px-1 border-b-2 border-accent'>
                <div className='flex gap-3'>
                    <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                            <img alt="Tailwind-CSS-Avatar-component" src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                        </div>
                    </div>
                    <div>
                        <h2 className='text-neutral text-sm'>
                            Sharah Khan
                        </h2>
                        <p className='text-muted text-sm'>Comment on Project</p>
                    </div>
                </div>
                <p className='text-muted text-sm'>2h ago</p>

            </div> */}
            
        </div>
    );
};

export default RecentAcitvity;