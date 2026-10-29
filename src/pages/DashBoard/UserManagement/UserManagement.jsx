import React, { useState } from 'react';
import UseAxiosSecures from '../../../Hooks/UseAxiosSecures.jsx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { MdDeleteForever } from 'react-icons/md';

const UserManagement = () => {
    const axiosSecure = UseAxiosSecures();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');

    // get all user data tanstack query 
    const { data: users = []} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            console.log(res);
            return res.data;
        }
    })


    // make admin user 
   

    const roleMutation = useMutation({
        mutationFn: async ({ userId, role }) => {
            const res = await axiosSecure.patch(
                `/users/${userId}/role`,
                { role }
            );
            return res.data;
        },

        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['users'] });

            Swal.fire({
                title: 'Success!',
                text: `User role changed to ${variables.role}.`,
                icon: 'success'
            });
        },

        onError: (error) => {
            Swal.fire({
                title: 'Error',
                text: error.response?.data?.message || 'Failed to update user role.',
                icon: 'error'
            });
        }
    });
    const handleChangeRole = async (user, role) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Change ${user.displayName}'s role to ${role}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change role',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            roleMutation.mutate({
                userId: user._id,
                role
            });
        }
    };

    // const handleMakeUser = (user) => {
    //     console.log(user)
    //     const roleInfo = { role: 'user' }
    //     axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
    //         .then(res => {
    //             if (res.data.modifiedCount) {
    //                 console.log(res.data)
    //                 Swal.fire({
    //                     title: "Are you sure?",
    //                     text: "You won't be able to revert this!",
    //                     icon: "warning",
    //                     showCancelButton: true,
    //                     confirmButtonColor: "#3085d6",
    //                     cancelButtonColor: "#d33",
    //                     confirmButtonText: "Yes, Change to "
    //                 }).then((result) => {
    //                     if (result.isConfirmed)
    //                         refetch()
    //                     Swal.fire({
    //                         title: "Deleted!",
    //                         text: "Your are user now.",
    //                         icon: "success"
    //                     });
    //                 });

    //             }
    //         })
    // }
    // const handleMakeAdmin = (user) => {
    //     console.log(user)
    //     const roleInfo = { role: 'admin' }
    //     axiosSecure.patch(`users/${user._id}/role`, roleInfo)
    //         .then(res => {
    //             console.log(res.data)
    //             if (res.data.modifiedCount) {
    //                 refetch()
    //                 if (res.data.modifiedCount) {
    //                     console.log(res.data)
    //                     Swal.fire({
    //                         title: "Are you sure?",
    //                         text: "You won't be able to revert this!",
    //                         icon: "warning",
    //                         showCancelButton: true,
    //                         confirmButtonColor: "#3085d6",
    //                         cancelButtonColor: "#d33",
    //                         confirmButtonText: "Yes, Change to "
    //                     }).then((result) => {
    //                         if (result.isConfirmed)
    //                             refetch()
    //                         Swal.fire({
    //                             title: "Deleted!",
    //                             text: "Your are user now.",
    //                             icon: "success"
    //                         });
    //                     });

    //                 }
    //             }
    //         })

    // }

    // delete user 
 

    const deleteUserMutation = useMutation({
        mutationFn: async (userId) => {
            const res = await axiosSecure.delete(`/users/${userId}`);
            return res.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });

            Swal.fire({
                title: 'Deleted!',
                text: 'User deleted successfully.',
                icon: 'success'
            });
        },

        onError: (error) => {
            Swal.fire({
                title: 'Error',
                text: error.response?.data?.message || 'Failed to delete user.',
                icon: 'error'
            });
        }
    });

    const handleDeleteUser = async (user) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Delete ${user.displayName}'s account?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete user'
        });

        if (result.isConfirmed) {
            deleteUserMutation.mutate(user._id);
        }
    };

       
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
                            {/* <th></th> */}
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
                                    <th className='flex items-center gap-2'>
                                        {user.role === 'admin' ?
                                            <button onClick={() => handleChangeRole(user,'user')} className="btn btn-secondary btn-xs mr-2">Make user</button>
                                            :
                                            <button onClick={() => handleChangeRole(user, 'admin')} className="btn btn-primary btn-xs">Make Admin</button>

                                        }
                                        <button onClick={()=>handleDeleteUser(user)}><MdDeleteForever size={30} className='text-error ' /></button>
                                        
                                    </th>
                                    {/* <th></th> */}
                                   
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