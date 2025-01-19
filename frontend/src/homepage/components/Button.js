import React from 'react';

const Button = ({onClickFunction, text}) => {
    return (
        <button className="text-xl font-garet-heavy uppercase w-full rounded-full text-white p-4 bg-secondary hover:bg-tertiary cursor-custom-pointer"
                onClick={onClickFunction}
        >
            {text}
        </button>
    );
}

export default Button;