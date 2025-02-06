import React, {useState} from "react";
import {QuestionMarkCircleIcon} from "@heroicons/react/16/solid";

const FormSlider = ({title, text, value, setValue, stepSize, min, max, selection, description}) => {
    const [showExplanation, setShowExplanation] = useState(false);

    const normalizeValue = (value) => {
        return Math.floor(((value + 1 - min) / (max - min)) * 95);
    }
    return (
        <div>
            <div
                className="flex items-center space-x-2 hover:cursor-custom-pointer hover:text-secondary"
                onClick={() => setShowExplanation(!showExplanation)}
            >
                <label className="block mb-2 font-garet-heavy text-lg hover:cursor-custom-pointer">{title}</label>
                <QuestionMarkCircleIcon className="mb-1 w-5 h-5"/>
            </div>
            <p>{text}</p>
            <div className="pb-12">
                <div className="relative pt-2 pb-6">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={stepSize}
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                        className="w-full h-2 bg-black rounded-full appearance-none cursor-custom-pointer hover:bg-secondary
                        [&::-webkit-slider-thumb]:opacity-0 [&::-webkit-slider-thumb]:opacity-0
                        [&::-moz-range-thumb]:opacity-0 [&::-moz-range-thumb]:opacity-0"
                    />
                    <div
                        className="absolute left-0 pointer-events-none flex flex-col items-center"
                        style={{left: `${normalizeValue(value - 1)}%`, top: '40%'}}
                    >
                        <span className="text-2xl select-none transform -translate-y-1/2">{selection[value - 1].icon}</span>
                        <span className="text-sm text-gray-600">{selection[value - 1].label}</span>
                    </div>
                </div>
            </div>
            {showExplanation && (
                <div className="pt-5">
                    {description}
                </div>
            )}
        </div>
    );
};

export default FormSlider;