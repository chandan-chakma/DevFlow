import React, { useState } from 'react';
import SocialLogin from '../SocialLogin/SocialLogin.jsx';
import { MoveRight } from 'lucide-react';
import { IoEyeOutline, IoLockClosedOutline } from 'react-icons/io5';
import { FaBook, FaChartLine, FaCheckCircle, FaRegEyeSlash, FaRegUser, FaUserFriends } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import registered from '../../../assets/images/register.png'
import { Link } from 'react-router';
import { MdOutlineEmail } from 'react-icons/md';
import { LuShieldCheck } from 'react-icons/lu';
const Register = () => {
    const [showPassword, setShowPassword] = useState
        (false); 
        // react hook form 
        const { register, formState: { errors }, handleSubmit } = useForm();
        const handleRegisterSubmit = (data) => {
            console.log(data);
        }
        // eye button for password showcassing 
        const handleShowPassword = (e) => {
            setShowPassword(!showPassword)
        }
    return (
        <div>
            <div className="hero bg-[#EEEEFF] min-h-screen">

                <div className="hero-content flex-col lg:flex-row-reverse gap-10">
                    <div>
                        <Link to='/'>
                            <h1 className='text-5xl mb-5 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold'>DevFlow</h1>
                        </Link>

                        <div className="text-center lg:text-left">

                            <h1 className="text-5xl font-bold">Build Something <br /> Great Together</h1>
                            <p className="py-6 text-lg text-muted">
                                Start your journey with DevFlow and <br></br>turn your ideas into real projects.
                            </p>

                            <img className='w-96 ' src={registered} alt="" />
                            <ul className="mt-6 flex flex-col gap-2 text-xs">
                                <li className='flex items-center gap-2'>
                                    <FaUserFriends size={20} className='text-primary' />
                                    <span className='text-xl text-[#6a6d74]'>Collaborate with your team</span>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <FaBook size={20} className='text-primary' />
                                    <span className='text-xl text-[#6a6d74]'>Stay organized</span>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <FaChartLine size={20} className='text-primary' />
                                    <span className='text-xl text-[#6a6d74]'>Get more done</span>
                                </li>
                            </ul>

                        </div>

                    </div>


                    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl px-3">
                        <p className='text-left text-muted text-lg my-4 pl-5'>Already have and account? <Link to='/login' className='text-primary ml-2'>Login</Link></p>
                        <div className="card-body">
                            <h1 className='font-bold text-neutral text-4xl'>Create Your Account</h1>
                            <p className='text-muted text-lg my-3'>Join DevFlow and start managing your projects more efficiently</p>
                            <form onSubmit={handleSubmit(handleRegisterSubmit)}>
                                <fieldset className="fieldset">
                                    <label className="label text-lg">Full Name</label>
                                    <div className='relative'>
                                        <FaRegUser className='absolute z-10 btn btn-xs top-2' />
                                        <input type="text" {...register('name')} className="input w-full mb-3 pl-10" placeholder="Aziz Dev" />
                                    </div>
                                    

                                    <label className="label text-lg">Email Address</label>

                                    <div className='relative'>
                                        <MdOutlineEmail className='absolute z-10 btn btn-xs top-2' />

                                        <input type="email" {...register('email', { required: 'email is required'})} className="input w-full mb-3 pl-10" placeholder="you@gmail.com" />
                                        {errors.email && (<p className='text-error'>
                                           {errors.email.message}
                                        </p>)}

                                    </div>


                                    <label className="label text-lg">Password</label>
                                    <div className='relative'>
                                        <IoLockClosedOutline className='absolute z-10 btn btn-xs top-2'/>
                                        <input type={showPassword ? 'text' : "password"} {...register('password', {
                                            required:'Password is required',
                                            minLength: {
                                                value: 8,
                                                message:"Password must be at least 8 characters"
                                            },
                                            pattern: {
                                                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,
                                                message:'Password must contain an uppercase letter,number and special character.'
                                            }
                                        }
                                            
                                        )} className="input w-full mb-3 pl-10" placeholder="Enter your password" />

                                        {errors.password && (<p className='text-error'>
                                            {errors.password.message}
                                        </p>)}

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
                         <div className='flex justify-center items-center gap-2 my-10'>
                                                    <LuShieldCheck
                                                        className='text-primary' size={30} />
                            <p className='text-muted text-md'>By creating an account,your agree to our <br /><span className='text-primary'>Terms of Service </span>
                                and <span className='text-primary'>
                                 Privacy Policy
                                </span>
                            </p>
                        </div>
                                                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;