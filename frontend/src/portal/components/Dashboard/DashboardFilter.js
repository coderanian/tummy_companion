import React, {useState} from "react";
import {ArrowDownIcon} from "@heroicons/react/16/solid";

const DashboardFilter = ({value, setValue, text, min= null, type = "date"}) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleDateChange = (e) => {
        setIsVisible(!isVisible);
        setValue(e.target.value);
    }

    return (
        <div className="w-[150px] flex flex-col space-y-2 p-2 border-2 border-black bg-primary rounded-xl hover:cursor-custom-pointer hover:bg-secondary">
            <button className='hover:cursor-custom-pointer' onClick={() => setIsVisible(!isVisible)}>
                <div className="flex space-x-2 justify-self-center hover:text-primary ">
                    <span className="font-garet-heavy">{text}</span>
                    <ArrowDownIcon className="h-5 w-5"/>
                </div>
            </button>
            {isVisible && (
                type === "date"
                    ? <input autoFocus
                             className="bg-primary rounded-xl p-2"
                             onChange={handleDateChange}
                             value={value || ""}
                             type="date"
                             min={min}
                    />
                    : <input/>
            )}
        </div>
    )
}

export default DashboardFilter;