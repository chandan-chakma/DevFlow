import React from 'react';
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router';
const Logo = () => {
    return (
        <Link to='/'>
            <div className='flex items-center justify-center'>
                <img src={logo} alt=""
                    className='w-15 h-15' />
                <span className='text-2xl font-bold'>DevFlow</span>
            </div>
           
        </Link>
            
        
    );
};

export default Logo;