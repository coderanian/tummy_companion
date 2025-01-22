import React, {useState} from 'react';
import {QuestionMarkCircleIcon} from "@heroicons/react/16/solid";


const TextToggler = ({description}) => {
    const [showExplanation, setShowExplanation] = useState(false);

    return (
        <div>
            <div
                className="flex w-[250px] p-2 rounded-lg border border-black bg-primary items-center space-x-2 hover:cursor-custom-pointer hover:text-black hover:bg-secondary"
                onClick={() => setShowExplanation(!showExplanation)}
            >
                <span>More about this symptom(s)</span>
                <QuestionMarkCircleIcon className="w-5 h-5"/>
            </div>

            {showExplanation && (
                <div className="pt-5">
                    {description}
                </div>
            )}
        </div>
    );
};

export default TextToggler;