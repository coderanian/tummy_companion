import React from "react";
import {Pie} from 'react-chartjs-2';
import {setPieData} from "../../utils/utils";

const ChartPie = ({entries, title, type}) => {
    return (
        <div className="w-1/3 flex flex-col justify-center items-center p-11 space-y-5 text-center h-[250px] border-2 border-black rounded-xl">
            <h3 className="text-xl font-garet-heavy">{title}</h3>
            <Pie data={setPieData(entries, type)}/>
        </div>
    );
};

export default ChartPie;