import React from "react";
import {getMoodValueForTimeframe} from "../../utils/utils";

const MoodPanel = ({entries}) => {
    const {icon, label} = getMoodValueForTimeframe(entries);
    return (
        <div className="w-1/3 flex flex-col justify-between py-11 space-y-5 text-center h-[250px] border-2 border-black rounded-xl">
            <h3 className="text-xl font-garet-heavy">Emotional Wellbeing</h3>
            <p className="text-8xl">{icon}</p>
            <p>{label}</p>
        </div>
    )
}

export default MoodPanel;