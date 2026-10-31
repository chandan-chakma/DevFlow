import React, { useRef, useState } from 'react';
import { LuCheck, LuCrown, LuPlus, LuSearch, LuShield, LuUserRound, LuUsers, LuX } from 'react-icons/lu';
import UseAxiosSecures from '../../../Hooks/UseAxiosSecures.jsx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';


const ProjectDetailsMember = ({ project, permissions }) => {
    // const { permissions } = useProjectRole();
    const { _id: projectId } = project; 
    const axiosSecure = UseAxiosSecures();
    const addMemberOpenModal = useRef();
    const handleAddMemberModal = () => {
        addMemberOpenModal.current.showModal();
    }

    // get all user data tanstack query 
    const {data:users=[] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            // console.log(res);
            return res.data;
        }
    })
   
    // add member in the project who will work in the specific project 
    const queryClient = useQueryClient();
    const addMemberMutation = useMutation({
        mutationFn: async (userId) => {
            const res = await axiosSecure.post('/project-members', {
                projectId: projectId,
                userId: userId
            });

            return res.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['projectMembers', projectId]
            })               
        },

        onError: (error) => {
            console.error(
                'Failed to add member:',
                error.response?.data || error.message
            );
        }
    });
    const handleAddMember = (user) => {
        console.log(user);
        addMemberMutation.mutate(user._id);
    }

    // get members speific project 
    const { data: members=[] } = useQuery({
        queryKey:['projectMembers', projectId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/project-members/${projectId}`)
            // console.log(res);
            return res.data;
        },
        enabled: !!projectId

    })


    // update the project member role 
    const updateRoleMutation = useMutation({
        mutationFn: async (userId) => {
            const res = await axiosSecure.patch(
                `/project-members/${projectId}/${userId}/role`,
                { role: 'manager' }
            );

            return res.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['projectMembers', projectId]
            });

            Swal.fire({
                title: 'Success!',
                text: 'Member promoted to manager.',
                icon: 'success'
            });
        },

        onError: (error) => {
            Swal.fire({
                title: 'Error',
                text: error.response?.data?.message || 'Failed to update member role.',
                icon: 'error'
            });
        }
    });

    const handleMakeManager = (member) => {
        Swal.fire({
            title: 'Make this member a manager?',
            text: `${member.name} will become the project manager.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, promote',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                updateRoleMutation.mutate(member._id);
            }
        });
    };

    // check mangaer role only one manager in a project 
    const currentManager = members.find(
        member => member.role === 'manager'
    );

    const hasManager = !!currentManager;
    
    return (
        <div>
             <section className="space-y-6 rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">

            {/* Heading and actions */}
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                    <h2 className="text-xl font-bold text-base-content">
                        Project Members
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-base-content/60">
                        Manage your project team and their roles. You can add
                        new members or update existing ones.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <label className="input input-bordered flex w-full items-center gap-2 sm:w-64">
                        <LuSearch className="shrink-0 text-base-content/50" size={18} />
                        <input
                            type="search"
                            className="grow"
                            placeholder="Search members..."
                            // value={searchText}
                            // onChange={(event) => setSearchText(event.target.value)}
                        />
                        </label>
                        
                        {
                            permissions.canAddMember && (
                                <button
                                    type="button"
                                    className="btn border-0 bg-primary text-primary-content hover:bg-primary/90"
                                    onClick={handleAddMemberModal}

                                >
                                    <LuPlus size={18} />
                                    Add Member
                                </button>
                                
                            )
                        }

                   
                </div>
                </div>
                

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-5">

                <div className="stat rounded-xl border border-base-300 p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <LuUsers size={23} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-base-content">
                                {members.length}
                            </div>
                            <div className="text-sm text-base-content/60">
                                Total Members
                            </div>
                        </div>
                    </div>
                </div>

                <div className="stat rounded-xl border border-base-300 p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-500">
                            <LuCrown size={23} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-base-content">
                                {/* {roleCounts.Owner} */}
                            </div>
                            <div className="text-sm text-base-content/60">
                                Owner
                            </div>
                        </div>
                    </div>
                </div>

                <div className="stat rounded-xl border border-base-300 p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <LuShield size={23} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-base-content">
                                {/* {roleCounts.Admin} */}
                            </div>
                            <div className="text-sm text-base-content/60">
                                Admins
                            </div>
                        </div>
                    </div>
                </div>

                <div className="stat rounded-xl border border-base-300 p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <LuUserRound size={23} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-base-content">
                                {/* {roleCounts.Member} */}
                            </div>
                            <div className="text-sm text-base-content/60">
                                Members
                            </div>
                        </div>
                    </div>
                </div>

                {/* Role legend */}
                <div className="flex flex-col justify-center gap-3 rounded-xl border border-base-300 px-5 py-4">
                    {/* {Object.entries(roleStyles).map(([role, style]) => (
                        <div key={role} className="flex items-center gap-3 text-sm text-base-content/70">
                            <span className={`size-2.5 rounded-full ${style.icon}`} />
                            {role}
                        </div>
                    ))} */}
                </div>
            </div>

            {/* Members table */}
            <div className="overflow-visible rounded-xl border border-base-300">
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
                                    <th>Position</th>
                                    <th>Role</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    members.map(member => 
                                        <tr key={member._id}>
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
                                                                src={member.photoURL}
                                                                alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{member.name}</div>
                                                        <div className="text-sm opacity-50">United States</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {member.email}
                                            </td>
                                            <td>Purple</td>
                                            <td>{member.role}</td>
                                            <th>
                                                <button
                                                    disabled={
                                                        hasManager ||
                                                        member.role === 'manager' ||
                                                        updateRoleMutation.isPending
                                                    }
                                                    onClick={() => handleMakeManager(member)} className="btn btn-secondary btn-xs"> {member.role === 'manager'
                                                        ? 'Manager'
                                                        : hasManager
                                                            ? 'Manager Assigned'
                                                            : updateRoleMutation.isPending
                                                                ? 'Updating...'
                                                                : 'Make Manager'}
                                                </button>
                                            </th>
                                        </tr>
                                    )
                                }
                              
                                
                            </tbody>
                        </table>
                    </div>

                {/* <div className="border-t border-base-300 px-4 py-3 text-sm text-base-content/60">
                    Showing {filteredMembers.length} of {members.length} members
                </div> */}
            </div>

            {/* Add Member Modal */}
           
                <dialog ref={addMemberOpenModal} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box max-w-md lg:max-w-4xl">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-xl font-bold">
                                    Add project member
                                </h3>
                                <p className="mt-1 text-sm text-base-content/60">
                                    Add a teammate to this project.
                                </p>
                            </div>
                            <div className="">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button
                                        className="btn rounded-lg p-2 text-slate-400 transition hover:bg-base-200 hover:text-base-content"
                                    >
                                        <LuX size={18} />
                                    </button>
                                </form>
                            </div>
                                                                            
                            
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Postion</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {users.map(user =>
                                        <tr key={user._id}>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src={user?.photoURL}
                                                                alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{user?.displayName}</div>
                                                        <div className="text-sm opacity-50">United States</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {user.email}
                                            </td>
                                            <td>Purple</td>
                                            <th>
                                                <button
                                                    disabled={
                                                        members.some(member => member._id === user._id) ||
                                                        addMemberMutation.isPending
                                                    }
                                                    onClick={() => handleAddMember(user)} className="btn btn-ghost btn-">
                                                    {members.some(member => member._id === user._id)
                                                        ? 'Added'
                                                        : addMemberMutation.isPending
                                                            ? 'Adding...'
                                                            : 'Add'}
                                                </button>
                                            </th>
                                        </tr>

                                    )}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </dialog>
         
        </section>
        </div>
    );
};

export default ProjectDetailsMember;