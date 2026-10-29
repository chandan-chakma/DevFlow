import React, { useState } from 'react';
import UseAxiosSecures from '../../../Hooks/UseAxiosSecures.jsx';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const UserManagement = () => {
    const axiosSecure = UseAxiosSecures();
    const [search, setSearch] = useState('');

    // get all user data tanstack query 
    const { data: users = [],refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            console.log(res);
            return res.data;
        }
    })

    const handleMakeUser = (user) => {
        console.log(user)
        const roleInfo = { role: 'user' }
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    console.log(res.data)
                    Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, Change to "
                    }).then((result) => {
                        if (result.isConfirmed)
                            refetch()
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your are user now.",
                            icon: "success"
                        });
                    });

                }
            })
    }
    const handleMakeAdmin = (user) => {
        console.log(user)
        const roleInfo = { role: 'admin' }
        axiosSecure.patch(`users/${user._id}/role`, roleInfo)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    refetch()
                    if (res.data.modifiedCount) {
                        console.log(res.data)
                        Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, Change to "
                        }).then((result) => {
                            if (result.isConfirmed)
                                refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your are user now.",
                                icon: "success"
                            });
                        });

                    }
                }
            })

    }

       
    return (
        <div>
            <div className='mb-2'>
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
                    <input type="search" required placeholder="Search user..." />
                </label>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map(user =>
                                <tr key={user._id}>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.displayName}</div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>{user.role}</td>
                                    <th>
                                        {user.role === 'admin' ?
                                            <button onClick={() => handleMakeUser(user)} className="btn btn-secondary btn-xs mr-2">Make user</button>
                                            :
                                            <button onClick={() => handleMakeAdmin(user)} className="btn btn-primary btn-xs">Make Admin</button>

                                        }
                                        
                                        
                                    </th>
                                </tr>
                            )
                        }
                       
                       
                    </tbody>
                   
                </table>
            </div>
            
            
        </div>
    );
};

export default UserManagement;