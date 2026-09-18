import React from 'react';

const Pricing = () => {
    return (
        <div>
            <section id='pricing' className='text-center bg-base-100 py-6'>
                <h2 className='text-xl text-primary'>PRICING</h2>
                <h1 className='text-5xl text-neutral font-bold mb-5'>Simple, transparent pricing</h1>
                <p className='text-muted text-xs'>Choose the plan that fits your teams needs. upgrade or downgrade anytime.</p>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5 px-6'>
                    <div className="card w-86 bg-base-100 shadow-sm">
                        <div className="card-body">
                            <span className="badge badge-xs badge-warning">Free Use</span>
                            <div className="flex justify-between">
                                <h2 className="text-3xl font-bold">Free</h2>
                                <span className="text-xl">$0/mo</span>
                            </div>
                            <p className='text-left text-muted'> Perfect for small teams and personal projects.</p>
                            <ul className="flex flex-col text-left gap-2 text-xs">
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>Up to 3 team members</span>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>2 projects</span>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>Basic features</span>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>Community support</span>
                                </li>
                            </ul>
                            <div className="mt-6">
                                <button className="btn btn-primary btn-block">Get Started</button>
                            </div>
                        </div>
                    </div>

                    <div className="card w-86 bg-base-100 shadow-sm">
                        <div className="card-body">
                            <span className="badge badge-xs badge-primary">Most Popular</span>
                            <div className="flex justify-between">
                                <h2 className="text-3xl font-bold">Pro</h2>
                                <span className="text-xl">$9/mo</span>
                            </div>
                            <p className='text-left text-muted mb-2'> For growing teams and serious development.</p>
                            <ul className="flex flex-col text-left gap-2 text-xs">
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>Up to 20 team members</span>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>Unlimited projects</span>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>Advance features</span>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>Priority support</span>
                                </li>
                            </ul>
                            <div className="mt-6">
                                <button className="btn btn-primary btn-block">Start Pro Trial</button>
                            </div>
                        </div>
                    </div>
                    <div className="card w-86 bg-base-100 shadow-sm">
                        <div className="card-body">
                            <span className="badge badge-xs badge-warning">Customize</span>
                            <div className="flex justify-between">
                                <h2 className="text-3xl font-bold">Enterprise</h2>
                                <span className="text-xl">$30/mo</span>
                            </div>
                            <p className='text-left text-muted mb-2'> For large organizations with custom needs</p>
                            <ul className="flex flex-col text-left gap-2 text-xs">
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>Unlimited team members</span>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>Unlimited projects</span>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>Custom integration</span>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>Dedicated support</span>
                                </li>
                            </ul>
                            <div className="mt-6">
                                <button className="btn btn-primary btn-block">Get Started</button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default Pricing;