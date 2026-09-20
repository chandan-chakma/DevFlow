import React, { useState } from 'react';
import logo from '../../../assets/images/logo.png'
import { Link } from 'react-router';
import login from '../../..//assets/images/login.png'
import { FaChartLine, FaCheckCircle, FaRegEyeSlash, FaUserFriends } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import { MoveRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import SocialLogin from '../SocialLogin/SocialLogin.jsx';


const Login = () => {
    const [showPassword, setShowPassword] = useState(''); 
    // react hook form 
    const { register, formState: { errors }, handleSubmit } = useForm();
    const handleLoginSubmit = (data) => {
        console.log(data);
    }
    // eye button for password showcassing 
    const handleShowPassword = (e) => {
        setShowPassword(!showPassword)
    }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                
                <div className="hero-content flex-col lg:flex-row">
                    <div>
                        <Link to='/'>
                            <h1 className='text-5xl mb-5 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold'>DevFlow</h1> 
                        </Link>
                        
                        <div className="text-center lg:text-left">

                            <h1 className="text-5xl font-bold">Welcome Back!</h1>
                            <p className="py-6 text-lg text-muted">
                                Sign in to your account and continue <br></br>building amazing projects with your team.
                            </p>

                            <img className='w-96 ' src={login} alt="" />
                            <ul className="mt-6 flex flex-col gap-2 text-xs">
                                <li className='flex items-center gap-2'>
                                    <FaCheckCircle size={20} className='text-primary'/>
                                    <span className='text-xl text-[#6a6d74]'>Manage your projects</span>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <FaUserFriends      size={20} className='text-primary'/>
                                    <span className='text-xl text-[#6a6d74]'>Track team progress</span>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <FaChartLine     size={20} className='text-primary'/>
                                    <span className='text-xl text-[#6a6d74]'>Track team progress</span>
                                </li>
                            </ul>

                        </div>

                    </div>
                    
                    
                    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl px-3">
                        <p className='text-right text-muted text-lg my-4'>Don't have and account? <span className='text-primary'>Register</span></p>
                        <div className="card-body">
                            <h1 className='font-bold text-neutral text-4xl'>Login to DevFlow</h1>
                            <p className='text-muted text-lg my-3'>Enter your email and password to access your account</p>
                            <form onSubmit={handleSubmit(handleLoginSubmit)}>
                                <fieldset className="fieldset">
                                    <label className="label text-lg">Email Address</label>
                                    <input type="email" {...register('email')} className="input w-full mb-3" placeholder="you@gmail.com" />

                                    <label className="label text-lg">Password</label>
                                    <div className='relative'>
                                        <input type={showPassword ? 'text' : "password"} {...register('password')} className="input w-full mb-3" placeholder="Enter your password" />

                                        <button onClick={handleShowPassword} className='btn btn-md absolute right-0.5'>
                                            {showPassword ? <FaRegEyeSlash size={18} /> : <IoEyeOutline size={18} />}
                                        </button>
                                        {/* <div>eye</div> */}

                                    </div>

                                    <div className='flex justify-between '>
                                        <label className="label">
                                            <input type="checkbox" name='remember' className="checkbox" />
                                            Remember me
                                        </label>
                                        <a className="link link-hover">Forgot password?</a></div>
                                    <button className="btn btn-primary text-primary-content text-lg text-center mt-4">Sign In <MoveRight size={18} /></button>
                                </fieldset>
                            </form>
                            {/* social login  */}
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;