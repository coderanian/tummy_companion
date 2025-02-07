import React from 'react';

const Button = ({ onClickFunction, icon: Icon, text = '' }) => {
    if (text.length === 0) {
        return (
            <button
                onClick={onClickFunction}
                className="flex justify-between px-4 py-2 bg-black text-primary rounded-lg items-center hover:bg-secondary"
            >
                {Icon && <Icon className="h-5 w-5" />}
            </button>
        );
    }
    return (
        <button
            onClick={onClickFunction}
            className="flex justify-between px-4 py-2 bg-black text-primary rounded-lg items-center gap-2 hover:bg-secondary"
        >
            {Icon && <Icon className="h-5 w-5" />}
            <span>{text}</span>
        </button>
    );
};

export default Button;