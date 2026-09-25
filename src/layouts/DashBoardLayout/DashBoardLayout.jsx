import React from 'react';
import { Link, Outlet } from 'react-router';
import { GoFileDirectory } from 'react-icons/go';
import Logo from '../../Components/Logo/Logo.jsx';
import Logoimg from '../../assets/images/logo.png'
import { RiTaskLine, RiTeamLine } from 'react-icons/ri';
import { FiHome } from 'react-icons/fi';
import { FaAngleDown, FaRegCalendarCheck } from 'react-icons/fa';
import { GrAnalytics } from 'react-icons/gr';
import { AiOutlineSetting } from 'react-icons/ai';
;
const DashBoardLayout = () => {
    return (
        <div className='max-w-7xl mx-auto px-6 py-4'>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle inline" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-100">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost drawer-button">
                            {/* Sidebar toggle icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                        </label>
                        <div className="navbar px-4">
                            <div className="flex-1">
                                <label className="input">
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
                                    <input type="search" required placeholder="Search" />
                                </label>
                            </div>
                            <div className="flex gap-6">
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                        <div className="indicator">
                                            <svg aria-label="Notifications" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
                                            <span className="badge badge-xs badge-primary indicator-item"></span>
                                        </div>
                                    </div>
                                    <div
                                        tabIndex={0}
                                        className="card card-sm dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                                        <div className="card-body">
                                            <span className="text-lg font-bold">8 Items</span>
                                            <span className="text-info">Subtotal: $999</span>
                                            <div className="card-actions">
                                                <button className="btn btn-primary btn-block">View cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="dropdown dropdown-end">
                                    <div className='flex justify-center items-center gap-2 ' tabIndex={0}>
                                        <div className="btn btn-ghost btn-circle avatar">
                                            <div className="w-10 rounded-full " role="button">
                                                <img
                                                    alt="Tailwind CSS Navbar component"
                                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />

                                            </div>
                                        </div>

                                        <div>
                                            <h1 className='text-neutral text-lg'>Chandan Chakma</h1>
                                            <p className='text-muted text-sm'>Frontend Developer</p>
                                            
                                        </div>
                                        <FaAngleDown  size={18} className='ml-1' role='button'/>
                                    </div>
                                   
                                    
                                    
                                    <ul
                                        tabIndex={-1}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                        <li>
                                            <a className="justify-between">
                                                Profile
                                                <span className="badge">New</span>
                                            </a>
                                        </li>
                                        <li><a>Settings</a></li>
                                        <li><a>Logout</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                    
                    {/* Page content here */}
                    <div className="p-4 bg-base-200 min-h-screen ">
                        <Outlet></Outlet>
                    </div>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-16 is-drawer-open:w-46 border-r-2 border-base-300">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow space-y-3">
                            {/* List item */}
                            <li className="w-full">
                                <Link to='/' className="flex h-12 items-center px-2">

                                    {/* Desktop / expanded */}
                                    <div className="is-drawer-close:hidden">
                                        <Logo />
                                    </div>

                                    {/* Collapsed */}
                                    <div className="hidden is-drawer-close:block">
                                        <img
                                            src={Logoimg}
                                            alt="DevFlow"
                                            className="h-8 w-8"
                                        />
                                    </div>

                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Dashboard">
                                    {/* Home icon */}
                                    <FiHome size={18} strokeWidth={2}/>
                                    <span className="is-drawer-close:hidden">Dashboard</span>
                                </Link>
                            </li>

                            <li>
                                <Link to='/dashboard/projects' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Projects">
                                    <GoFileDirectory size={18} strokeWidth={1} />
                                    <span className="is-drawer-close:hidden">Projects</span>
                                </Link>
                            </li>

                            {/* List item */}
                            <li>
                                <Link to='/dashboard/tasks' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Tasks">
                                    {/* Settings icon */}
                                    <RiTaskLine size={18}
                                    strokeWidth={0.7}/>
                                    <span className="is-drawer-close:hidden">Tasks</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard/team' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Team">
                                    <RiTeamLine size={18}
                                    strokeWidth={1}/>
                                    <span className="is-drawer-close:hidden">Team</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard/calendar' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Calendar">
                                    <FaRegCalendarCheck
                                        size={18}
                                    strokeWidth={1}/>
                                    <span className="is-drawer-close:hidden">Calendar</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard/analytics' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Analytics">
                                    <GrAnalytics size={18}
                                    strokeWidth={1}/>
                                    <span className="is-drawer-close:hidden">Analytics</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard/settings' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                    <AiOutlineSetting size={19}
                                    strokeWidth={1}/>
                                    <span className="is-drawer-close:hidden">Settings</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default DashBoardLayout;