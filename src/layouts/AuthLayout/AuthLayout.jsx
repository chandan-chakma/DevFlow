import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto px-6 py-4'>
            <div>
            
                <Outlet></Outlet>
              
            </div>
            
        </div>
    );
};

export default AuthLayout;