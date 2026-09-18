import { Star } from 'lucide-react';
import React from 'react';

const Testimonial = () => {
    return (
        <div>
            <section id='' className='text-center bg-base-200 py-6'>
                <h2 className='text-xl text-primary'>TESTIMONIALS</h2>
                <h1 className='text-5xl text-neutral font-bold mb-5'>Loved by development Teams</h1>
                <p className='text-muted text-xs'>See what our customers have to say about DevFlow</p>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5 px-5'>
                    <div className="card w-full max-w-md border border-base-300 bg-base-100 shadow-sm">
                        <div className="card-body p-5">

                            <div className="flex items-start gap-4">

                                {/* Avatar */}
                                <div className="avatar shrink-0">
                                    <div className="w-11 rounded-full">
                                        <img
                                            src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                                            alt="Sarah Wilson"
                                        />
                                    </div>
                                </div>

                                {/* Review content */}
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm leading-5 text-base-content">
                                        "DevFlow has completely streamlined how our team works.
                                        The clean UI and powerful features make it a joy to use."
                                    </p>

                                    <div className="mt-2 flex justify-between items-center">
                                        <div>
                                            <h4 className="text-sm font-semibold">
                                                Sarah Wilson
                                            </h4>

                                            <p className="text-xs text-muted">
                                                Project Manager
                                            </p>
                                        </div>
                                        {/* Rating */}
                                        <div className="flex shrink-0 gap-0.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    size={13}
                                                    className="fill-warning text-warning"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="card w-full max-w-md border border-base-300 bg-base-100 shadow-sm">
                        <div className="card-body p-5">

                            <div className="flex items-start gap-4">

                                {/* Avatar */}
                                <div className="avatar shrink-0">
                                    <div className="w-11 rounded-full">
                                        <img
                                            src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                                            alt="Sarah Wilson"
                                        />
                                    </div>
                                </div>

                                {/* Review content */}
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm leading-5 text-base-content">
                                        "DevFlow has completely streamlined how our team works.
                                        The clean UI and powerful features make it a joy to use."
                                    </p>

                                    <div className="mt-2 flex justify-between items-center">
                                        <div>
                                            <h4 className="text-sm font-semibold">
                                                Sarah Wilson
                                            </h4>

                                            <p className="text-xs text-muted">
                                                Project Manager
                                            </p>
                                        </div>
                                        {/* Rating */}
                                        <div className="flex shrink-0 gap-0.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    size={13}
                                                    className="fill-warning text-warning"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="card w-full max-w-md border border-base-300 bg-base-100 shadow-sm">
                        <div className="card-body p-5">

                            <div className="flex items-start gap-4">

                                {/* Avatar */}
                                <div className="avatar shrink-0">
                                    <div className="w-11 rounded-full">
                                        <img
                                            src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                                            alt="Sarah Wilson"
                                        />
                                    </div>
                                </div>

                                {/* Review content */}
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm leading-5 text-base-content">
                                        "DevFlow has completely streamlined how our team works.
                                        The clean UI and powerful features make it a joy to use."
                                    </p>

                                    <div className="mt-2 flex justify-between items-center">
                                        <div>
                                            <h4 className="text-sm font-semibold">
                                                Sarah Wilson
                                            </h4>

                                            <p className="text-xs text-muted">
                                                Project Manager
                                            </p>
                                        </div>
                                        {/* Rating */}
                                        <div className="flex shrink-0 gap-0.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    size={13}
                                                    className="fill-warning text-warning"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
           
        </div>
    );
};

export default Testimonial;