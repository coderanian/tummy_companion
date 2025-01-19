import React from "react";

function Input({text, onChange, value, type = "text"}) {

    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <input
            name={text.toLowerCase()}
            placeholder={text}
            type={type}
            value={value}
            required={true}
            onChange={handleChange}
            className="w-full text-black rounded-full p-4 bg-primary placeholder-black cursor-custom-text focus:border-secondary focus:border-4"
        />
    );
}

export default Input;