import React, {useEffect, useState} from "react";
import {requestFactory} from "../../common/utils";
import {CONSTANTS} from "../../common/constants";
import Calendar from "react-calendar";
import {PlusIcon, ArrowDownTrayIcon} from "@heroicons/react/16/solid";
import Person from "../../assets/images/elements/person_diary.svg";
import {Button, DiaryCalendar} from "../components";
import {useNavigate} from "react-router-dom";


const Diary = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showNewEntryModal, setShowNewEntryModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState([new Date(), new Date()]);
    const navigate = useNavigate();
    const [entries, setEntries] = useState([
        {
            date: '2025-01-19',
            time: '08:30',
            symptoms: ['Bloating', 'Cramping'],
            severity: 'Moderate',
            notes: 'Symptoms appeared after breakfast'
        },
        {
            date: '2025-01-19',
            time: '14:15',
            symptoms: ['Nausea'],
            severity: 'Mild',
            notes: 'Feeling better after rest'
        }
    ]);

    const currentDayEntries = entries.filter(entry =>
        entry.date === selectedDate[0].toISOString().split('T')[0]
    );

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleNewEntryButtonClick = () => {
        navigate("/diary/new-entry")
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
                            <p className="text-sm">
                                {selectedDate[0].toDateString()} - {selectedDate[1].toDateString()}
                            </p>
                        </div>
                        <Button onClickFunction={handleNewEntryButtonClick}
                                icon={PlusIcon}
                                text="New entry"
                        />
                    </div>
                    {/* Entries */}
                    <div className="p-4 rounded-b-lg h-full">
                        <div className="space-y-4">
                            {currentDayEntries.length > 0 ? (
                                currentDayEntries.map((entry, index) => (
                                    <div key={index} className="border rounded-lg bg-gray-50 p-4">
                                        <div className="border-b pb-2 mb-2">
                                            <h3 className="font-semibold">{entry.time}</h3>
                                            <p className="text-sm text-gray-600">Severity: {entry.severity}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <div>
                                                <strong>Symptoms:</strong>{' '}
                                                {entry.symptoms.join(', ')}
                                            </div>
                                            <div>
                                                <strong>Notes:</strong> {entry.notes}
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <button className="px-3 py-1 border rounded hover:bg-gray-100">
                                                Edit Entry
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center p-8 text-gray-500">
                                    No entries for this date
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Calendar Section */}
                <div className="border-black border-2 rounded-lg h-[320px]">
                    <div className="flex p-4 rounded-t-lg bg-primary border-b-2 border-black justify-between">
                        <div>
                            <span className="text-lg font-garet-heavy">Calendar</span>
                            <p className="text-sm">Select a date to view diary entries</p>
                        </div>
                        <Button onClickFunction={() => setShowNewEntryModal(true)}
                                icon={ArrowDownTrayIcon}
                                text="Get entries"
                        />
                    </div>
                    <DiaryCalendar selectedDate={selectedDate} onDateChange={handleDateChange}/>
                </div>
                <img src={Person}
                     className="md:absolute bottom-0 right-[80px] h-[400px]"
                     alt="Person writing in a diary."
                />
            </div>

            {/* Simple Modal for New Entry */}
            {showNewEntryModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Add New Entry</h2>
                        <p className="text-gray-600 mb-4">Record your symptoms and other details</p>
                        {/* Form would go here */}
                        <button
                            onClick={() => setShowNewEntryModal(false)}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Diary;
