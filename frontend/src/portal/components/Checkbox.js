import React from "react";

function Checkbox({text, onChange}) {

    const handleChange = (e) => {
        onChange(e.target.checked);
    };

    return (
        <div className="flex items-center">
            <input type="checkbox"
                   id="option"
                   className="w-5 h-5 accent-primary bg-primary cursor-custom-pointer border-black"
                   onClick={handleChange}
            />
            <label htmlFor="option" className="ml-2">
                {text}
            </label>
        </div>
    )
}

export default Checkbox;