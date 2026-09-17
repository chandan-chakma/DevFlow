import React from 'react';
import banner from '../../assets/images/banner.png'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CirclePlay, MoveRight, UsersRound } from 'lucide-react';
import caro from '../../assets/images/caro.png'
const Home = () => {
    return (
        <div className='bg-base-200'>
            <section className='px-6 py-6'>
               
                <div className="hero-content flex-col lg:flex-row-reverse gap-10 items-stretch">
                    <div className=''>
                        <Carousel showThumbs={false} showArrows={false} showStatus={false}
                            className=''
                           >
                            <div>
                                <img src={caro}/>
                            </div>
                            <div>
                                <img src={banner}/>
                            </div>
                            <div>
                                <img src={banner} />
                            </div>
                        </Carousel>
                    </div>
                    <div>
                        <div className='bg-[#F1F0FF] flex items-center gap-3 py-2 px-3 w-76 rounded-2xl mb-2'>
                            <UsersRound className='text-primary' />
                            <p className='text-muted text-xs'>Build for mordern Development Teams</p>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold ">Build Better<br></br> Products   
                        <span className='text-primary ml-2'>Together</span>
                        </h1>
                        <p className="py-6 text-muted">
                            plan, track,and deliver projects with a modern,intuitive <br></br> platform designed for development teams.
                        </p>
                        <div className='flex flex-col md:flex-row gap-5 mb-5'>
                            <button className="btn btn-primary">Get Started
                                <MoveRight size={18} />
                            </button>
                            <button className="btn btn-white border-primary" >
                                <CirclePlay size={18} color='#5B3DF5' />
                                Watch Demo</button>
                        </div>
                       
                        
                        {/* avatar  */}
                        <div className='flex items-center gap-1'>
                            <div className="avatar-group -space-x-6">
                                <div className="avatar">
                                    <div className="w-8">
                                        <img alt="Tailwind-CSS-Avatar-component" src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-8">
                                        <img alt="Tailwind-CSS-Avatar-component" src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-8">
                                        <img alt="Tailwind-CSS-Avatar-component" src="https://img.daisyui.com/images/profile/demo/averagebulk@192.webp" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-8">
                                        <img alt="Tailwind-CSS-Avatar-component" src="https://img.daisyui.com/images/profile/demo/wonderperson@192.webp" />
                                    </div>
                                </div>
                            </div>
                            <p className='text-muted text-sm'>Join 1000+ developers building with DevFlow</p>
                        </div>

                        {/* counter  */}
                        <div className='flex justify-center md:justify-start'>
                            <div className="stats stats-vertical lg:stats-horizontal shadow  my-5 ">
                                <div className="stat">
                                    <div className="stat-value text-lg">1K+</div>
                                    <div className="stat-desc">Active Teams</div>
                                </div>

                                <div className="stat">
                                    <div className="stat-value text-lg">10K+</div>
                                    <div className="stat-desc">Project Created</div>
                                </div>

                                <div className="stat">
                                    <div className="stat-value text-lg">98%</div>
                                    <div className="stat-desc">User Satisfaction</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </section>


        </div>
    );
};

export default Home;