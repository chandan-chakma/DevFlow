import React, { useState } from 'react';
import { DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css";
const Calendar = () => {
    const [selected, setSelected] = useState();
    return (
        <div className='mt-8 bg-white py-5'>
            <div className='flex justify-between px-2'>
                <h1 className='text-lg'>Calendar</h1>
                <button className='text-primary'>View All</button>
            </div>
            <div className="">
                <DayPicker className="w-full overflow-hidden rounded-xl p-4"
                    // animate
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                // footer={
                //     selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
                // }
                />

            </div>
           
        </div>
    );
};

export default Calendar;