import React from "react";
import {SYMPTOMS, INTAKE} from "../utils/constants";
import {Checkbox, DatePicker, Slider} from "../components";
import StomachBloating from "../../assets/images/elements/stomach_bloating.svg";
import StomachPain from "../../assets/images/elements/stomach_pain.svg";
import Flatulence from "../../assets/images/elements/stomach_flatulence.svg";
import {Navigate, useLocation} from "react-router-dom";

const DiaryEntryDetails = () => {
    const location = useLocation();
    const entry = location.state?.entry;

    if (!entry) {
        return <Navigate to="/diary" />;  // Redirect if no entry data
    }
    const click = () => {}
    return (
        <div className="h-1/4 flex py-4">
            <div className="flex-1 pr-8 overflow-y-scroll scrollbar scrollbar-thumb-black scrollbar-thumb-rounded-full active:scrollbar-thumb-secondary hover:scrollbar-thumb-secondary scrollbar-hide">
                <div className="max-w-6xl mx-auto">
                    <div className="space-y-6">
                        <div className="space-y-5 border-2 border-black rounded-lg p-5">
                            <DatePicker text={"Date"} value={new Date(entry.timestamp).toISOString().split('T')[0]} setValue={click}/>
                        </div>
                        <div className="space-y-5 border-2 border-black rounded-lg p-5">
                            <h2 className="text-xl font-garet-heavy underline">1. Emotions and sleep</h2>
                            <Slider title={"Emotional wellbeing"}
                                    text={"How did you feel?"}
                                    value={entry.mood_scale}
                                    setValue={click}
                                    stepSize={1}
                                    min={entry.mood_scale}
                                    max={entry.mood_scale}
                                    selection={SYMPTOMS.wellbeing.formValues}
                                    description={SYMPTOMS.wellbeing.description}
                            />
                            <Slider title={"Sleep quality"}
                                    text={"How rested are you after the sleep?"}
                                    value={entry.sleep_quality_scale}
                                    setValue={entry.sleep_quality_scale}
                                    stepSize={1}
                                    min={entry.sleep_quality_scale}
                                    max={entry.sleep_quality_scale}
                                    selection={SYMPTOMS.sleepQuality.formValues}
                                    description={SYMPTOMS.sleepQuality.description}
                            />
                            <Slider title={"Sleep duration"}
                                    text={"How many hours did you sleep?"}
                                    value={entry.sleep_duration_length}
                                    setValue={entry.sleep_duration_length}
                                    stepSize={1}
                                    min={entry.sleep_duration_length}
                                    max={entry.sleep_duration_length}
                                    selection={SYMPTOMS.sleepDuration.formValues}
                                    description={SYMPTOMS.sleepDuration.description}
                            />
                        </div>

                        <div className="space-y-5 border-2 border-black rounded-lg p-5">
                            <h2 className="text-xl font-garet-heavy underline">2. Stool</h2>
                            <Slider title={"Stool consistency"}
                                    text={"How long did it take during your bathroom visits?"}
                                    value={entry.stool_consistency_scale}
                                    setValue={click}
                                    stepSize={1}
                                    min={entry.stool_consistency_scale}
                                    max={entry.stool_consistency_scale}
                                    selection={SYMPTOMS.stoolConsistency.formValues}
                                    description={SYMPTOMS.stoolConsistency.description}
                            />
                            <Slider title={"Stool quantity"}
                                    text={"How many times did you go to the bathroom today?"}
                                    value={entry.stool_quantity_scale}
                                    setValue={click}
                                    stepSize={1}
                                    min={entry.stool_quantity_scale}
                                    max={entry.stool_quantity_scale}
                                    selection={SYMPTOMS.stoolQuantity.formValues}
                                    description={SYMPTOMS.stoolQuantity.description}
                            />
                            <div>
                                <label className="font-garet-heavy text-lg">Stool issues</label>
                                <p className="pb-3">Did you notice any of the following symptoms during your bathroom
                                    visits?</p>
                                <Checkbox text={"Blood"} onChange={click}/>
                                <Checkbox text={"Mucus"} onChange={click}/>
                                <Checkbox text={"Urgency"} onChange={click}/>
                            </div>
                        </div>

                        <div className="space-y-5 border-2 border-black rounded-lg p-5">
                            <h2 className="text-xl font-garet-heavy underline">3. Stomach issues</h2>
                            <p className="pb-3">Did you notice any of the following problems with your stomach?</p>
                            <div className="flex justify-between">
                                <div className={`flex flex-col space-y-3 items-center border-2 rounded-lg border-black p-5 hover:text-secondary hover:border-secondary hover:border-3 ${entry.stomach_pain && "bg-secondary text-primary"}`}>
                                    <img src={StomachPain}
                                         alt="Person with stomach pain"
                                         className="max-w-[200px] hover:cursor-custom-pointer"
                                         onClick={click}
                                    />
                                    <p className="text-start font-garet-heavy text-lg">Pain</p>
                                </div>
                                <div className={`flex flex-col space-y-3 items-center border-2 rounded-lg border-black p-5 hover:text-secondary hover:border-secondary hover:border-3 ${entry.stomach_bloating && "bg-secondary text-primary"}`}>
                                    <img src={StomachBloating}
                                         alt="Bloated stomach"
                                         className="max-w-[200px] hover:cursor-custom-pointer"
                                         onClick={click}
                                    />
                                    <p className="text-start font-garet-heavy text-lg">Bloating</p>
                                </div>
                                <div className={`flex flex-col space-y-3 items-center border-2 rounded-lg border-black p-5 hover:text-secondary hover:border-secondary hover:border-3 ${entry.stomach_flatulence && "bg-secondary text-primary"}`}>
                                    <img src={Flatulence}
                                         alt="Person with flatulence"
                                         className="max-w-[200px] hover:cursor-custom-pointer"
                                         onClick={click}
                                    />
                                    <p className="text-start font-garet-heavy text-lg">Gases</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5 border-2 border-black rounded-lg p-5">
                            <h2 className="text-xl font-garet-heavy underline">4. Food and drink intake</h2>
                            <h3 className="text-lg font-garet-heavy">Food Intake</h3>
                            <p>Which product categories did you eat?</p>
                            <div className="grid grid-cols-2 gap-2">
                                {INTAKE.food.map((foodCategory) => (
                                    <button
                                        key={foodCategory.value}
                                        type="button"
                                        onClick={click}
                                        className={`p-2 border rounded text-left cursor-custom-pointer ${
                                            entry.food.includes(foodCategory.value)
                                                ? 'bg-secondary text-primary'
                                                : 'bg-white hover:bg-secondary hover:text-primary'
                                        }`}
                                    >
                                        {foodCategory.label}
                                    </button>
                                ))}
                            </div>
                            <h3 className="text-lg font-garet-heavy">Drink Intake</h3>
                            <p>Which product categories did you drink?</p>
                            <div className="grid grid-cols-2 gap-2">
                                {INTAKE.drink.map((drinkCategory) => (
                                    <button
                                        key={drinkCategory.value}
                                        type="button"
                                        onClick={click}
                                        className={`p-2 border rounded text-left cursor-custom-pointer ${
                                            entry.drink.includes(drinkCategory.value)
                                                ? 'bg-secondary text-primary'
                                                : 'bg-white hover:bg-secondary hover:text-primary'
                                        }`}
                                    >
                                        {drinkCategory.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiaryEntryDetails;