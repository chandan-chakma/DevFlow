import React from 'react';
import Logo from '../../../Components/Logo/Logo.jsx';
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare, FaYoutubeSquare } from 'react-icons/fa';
import { FaSquareGithub } from 'react-icons/fa6';

const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-base-100 items-center justify-between py-4 px-8">
                <aside className="grid-flow-col items-center gap-10">
                    <Logo></Logo>
                    <nav class="grid grid-flow-col gap-4 text-muted">
                        <a href="#features">Features</a>
                        <a href="#pricing">Pricing</a>
                        <a href="#about">About</a>
                        <a href="#contact">Contact</a>
                    </nav>
                </aside>
                
                <div className='flex flex-col'>
                    <nav className="flex gap-3">
                        <a>
                            <FaSquareGithub className='w-6 h-6' />
                        </a>
                        <a>
                            <FaLinkedin className='w-6 h-6' />
                        </a>
                        <a>
                            <FaTwitterSquare className='w-6 h-6' />
                        </a>
                        <a>
                            <FaFacebookSquare className='w-6 h-6' />
                        </a>
                        <a>
                            <FaYoutubeSquare className='w-6 h-6' />
                        </a>
                      

                    </nav>

                    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>

               </div>
           
            </footer>
        </div>
    );
};

export default Footer;