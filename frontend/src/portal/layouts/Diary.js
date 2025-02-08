import React, { useState } from "react";
import {requestFactory} from "../../common/utils";
import {CONSTANTS} from "../../common/constants";
import {PlusIcon, ArrowDownTrayIcon, EyeIcon, Cog6ToothIcon} from "@heroicons/react/16/solid";
import Person from "../../assets/images/elements/person_diary.svg";
import {Button, ButtonDiaryToPDF, DiaryCalendar} from "../components";
import {useNavigate} from "react-router-dom";
import {symptomsBuilder} from "../utils/utils";


const Diary = () => {
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState([new Date(), new Date()]);
    const navigate = useNavigate();
    const [entries, setEntries] = useState([]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleNewEntryButtonClick = () => {
        navigate("/diary/new-entry")
    }

    const handleEntryDetailsButtonClick = (entry) => {
        navigate("/diary/entry/", { state: { entry } })
    }

    const handleEntryEditButtonClick = (entry) => {
        navigate("/diary/entry/edit", { state: { entry } })
    }

    const fetchUserData = async () => {
        setLoading(true);
        const response = await requestFactory(CONSTANTS.API.DIARY, null, selectedDate[0].toDateString(), selectedDate[1].toISOString());
        setLoading(false);
        if (!response.success) return;
        setEntries(response.response);
    }

    return (
        <div className="mx-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Entries Section */}
                <div className="border-2 border-black rounded-lg">
                    {/* Entries Header */}
                    <div className="flex p-4 rounded-t-lg bg-primary border-b-2 border-black justify-between">
                        <div>
                            <h2 className="text-lg font-garet-heavy">Daily Entries</h2>
                            <p>{selectedDate[0].toDateString()} - {selectedDate[1].toDateString()}</p>
                        </div>
                        <div className="flex space-x-4">
                            <ButtonDiaryToPDF data={entries}/>
                            <Button onClickFunction={handleNewEntryButtonClick}
                                    icon={PlusIcon}
                            />
                        </div>
                    </div>
                    {/* Entries */}
                    <div className="p-4 rounded-b-lg h-full">
                        {loading
                            ? (<div className="text-center">Loading...</div>)
                            : (<div className="space-y-4">
                                {entries.length > 0 ? (
                                    entries.map((entry, index) => (
                                        <div key={index} className="border-2 border-black bg-primary rounded-lg p-4">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="font-garet-heavy">{new Date(entry.timestamp).toDateString()}</h3>
                                                    <p>Logged symptoms: {symptomsBuilder(entry)}</p>
                                                </div>
                                                <div className="flex flex-col space-y-4">
                                                    <button onClick={() => handleEntryDetailsButtonClick(entry)}
                                                            className="px-3 py-1 bg-black text-primary rounded hover:bg-secondary hover:cursor-custom-pointer"
                                                    >
                                                        <EyeIcon className="w-5 h-5"/>
                                                    </button>
                                                    <button onClick={() => handleEntryEditButtonClick(entry)}
                                                            className="px-3 py-1 bg-black text-primary rounded hover:bg-secondary hover:cursor-custom-pointer"
                                                    >
                                                        <Cog6ToothIcon className="w-5 h-5"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center p-8">
                                        No entries for this timeframe. Please repeat your search.
                                    </div>
                                )}
                            </div>)
                        }
                    </div>
                </div>
                {/* Calendar Section */}
                <div className="border-black border-2 rounded-lg h-[320px]">
                    <div className="flex p-4 rounded-t-lg bg-primary border-b-2 border-black justify-between">
                        <div>
                            <span className="text-lg font-garet-heavy">Calendar</span>
                            <p>Select a date to view diary entries</p>
                        </div>
                        <Button onClickFunction={fetchUserData}
                                icon={ArrowDownTrayIcon}
                                text="Get entries"
                        />
                    </div>
                    <DiaryCalendar selectedDate={selectedDate} onDateChange={handleDateChange}/>
                </div>
                <img src={Person}
                     className="md:absolute bottom-0 right-[80px] sm:h-[200px]"
                     alt="Person writing in a diary."
                />
            </div>
        </div>
    );
};

export default Diary;
