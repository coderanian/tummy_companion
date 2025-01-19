import React from "react";

const ErrorBox = ({text}) => {
    return (
        <p className="text-md text-white text-center bg-red-900 rounded-full p-3">
            {text}
        </p>
    );
}

export default ErrorBox