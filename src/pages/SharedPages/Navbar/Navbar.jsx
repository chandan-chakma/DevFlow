import React from 'react';
import { Link, NavLink } from 'react-router';
import { ArrowRight, MoveRight } from 'lucide-react';

import Logo from '../../../Components/Logo/Logo.jsx'


const Navbar = () => {
    const menu = <>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        {/* <NavLink to='/features'>Features</NavLink>
        <NavLink to='/pricing'>Pricing</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/contact'>About</NavLink> */}
    </>
       
    
    return (
        <div className='sticky top-0 z-50'>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                           {menu}
                        </ul>
                    </div>
                    <Logo></Logo>
                 
                 
                    <div className="ml-10 hidden lg:flex">
                        <ul className="menu-horizontal px-1 gap-6">
                            {menu}
                        </ul>
                    </div>
                </div>
                
                <div className="navbar-end gap-3">
                    <button className='rounded-xl px-5 py-4 btn btn-accent'>Login</button>
                    <button className='hidden sm:block btn btn-primary rounded-lg px-5 py-3'>Get Started
                     <MoveRight size={18}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;