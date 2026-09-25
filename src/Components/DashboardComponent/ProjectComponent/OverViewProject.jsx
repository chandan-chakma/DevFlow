import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { GoFileDirectoryFill } from 'react-icons/go';


const OverViewProject = () => {
    return (
        <div>
            {/* Title section  */}
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <div className='bg-[#E8ECFE] rounded-xl w-14 h-14 flex justify-center items-center'>
                        <GoFileDirectoryFill size={30} className='text-primary' />
                    </div>
                    <div>
                        <h1 className='text-3xl'>Projects</h1>
                        <p className='text-muted text-sm'>Manage and collaborate on your projects.</p>
                    </div>
                </div>

                <div>
                    <button className='btn btn-primary'><FaPlus />New Project
                    </button>
                </div>
                
            </div>
            
        </div>
    );
};

export default OverViewProject;