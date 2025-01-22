import Calendar from "react-calendar";
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/16/solid";


const DiaryCalendar = ({selectedDate, onDateChange}) => {
    return (
        <Calendar
            value={selectedDate}
            locale="en-GB"
            onChange={onDateChange}
            selectRange={true}
            nextLabel={<ChevronRightIcon className="h-5 w-5 " />}
            prevLabel={<ChevronLeftIcon className="h-5 w-5 " />}
            next2Label={<ChevronDoubleRightIcon className="h-5 w-5 " />}
            prev2Label={<ChevronDoubleLeftIcon className="h-5 w-5" />}
            tileClassName={({date, view}) =>
                view === "month" && selectedDate && date >= selectedDate[0] && date <= selectedDate[1]
                    ? "bg-secondary text-primary rounded-md"
                    : ""
            }
        />
    )
}

export default DiaryCalendar;
