import React, { useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import { GoFileDirectoryFill } from 'react-icons/go';

const TaskOverview = () => {
    const openaddTaskModalRef = useRef();
    const handleAddTaskModal = () => {
        openaddTaskModalRef.current.showModal();
        }
    return (
        <div>
                    {/* Title section  */}
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-3'>
                            <div className='bg-[#E8ECFE] rounded-xl w-14 h-14 flex justify-center items-center'>
                                <GoFileDirectoryFill size={30} className='text-primary' />
                            </div>
                            <div>
                                <h1 className='text-3xl'>Tasks</h1>
                                <p className='text-muted text-sm'>Manage and track all your tasks across projects.</p>
                            </div>
                        </div>
        
                        <div>
                    <button onClick={handleAddTaskModal} className='btn btn-primary'><FaPlus />Add Tasks
                            </button>
                        </div>
                        
                    </div>
        
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    {/* <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}
                    
                    
                </div>
    );
};

export default TaskOverview;