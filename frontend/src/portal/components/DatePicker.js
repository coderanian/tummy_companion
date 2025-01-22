import React from 'react';

const DatePicker = ({text, value, setValue}) => {
    // Prevent diary entries for future dates
    const maxDate = new Date().toISOString().split("T")[0];

    return (
        <div>
            <label className="block mb-2 font-garet-heavy text-lg">{text}</label>
            <input
                type="date"
                value={value}
                max={maxDate}
                onChange={(e) => setValue(e.target.value)}
                className="w-full p-2 border border-black rounded focus:border-2 focus:border-secondary cursor-custom-pointer"
            />
        </div>
    )
}

export default DatePicker;