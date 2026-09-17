import React from 'react';
import Navbar from '../../pages/SharedPages/Navbar/Navbar.jsx';
import { Outlet } from 'react-router';
import Footer from '../../pages/SharedPages/Footer/Footer.jsx';



const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto px-6 py-4'>
            {/* <h1>RootLayout</h1> */}
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;