import React, {useEffect, useState} from "react";
import {SYMPTOMS, INTAKE} from "../utils/constants";
import {Checkbox, DatePicker, Slider} from "../components";
import StomachBloating from "../../assets/images/elements/stomach_bloating.svg";
import StomachPain from "../../assets/images/elements/stomach_pain.svg";
import Flatulence from "../../assets/images/elements/stomach_flatulence.svg";
import {ErrorBox} from "../../homepage/components";


const DiaryEntry = () => {
    //Input states
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [wellbeing, setWellbeing] = useState(3);
    const [sleepQuality, setSleepQuality] = useState(3);
    const [sleepDuration, setSleepDuration] = useState(6);
    const [stoolConsistency, setStoolConsistency] = useState(2);
    const [stoolQuantity, setStoolQuantity] = useState(2);
    const [stoolBlood, setStoolBlood] = useState(false);
    const [stoolMucus, setStoolMucus] = useState(false);
    const [stoolUrgency, setStooUrgency] = useState(false);
    const [stomachPain, setStomachPain] = useState(false);
    const [stomachBloating, setStomachBloating] = useState(false);
    const [flatulence, setFlatulence] = useState(false);
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [selectedDrinks, setSelectedDrinks] = useState([]);
    // Form validation
    const [formFeedback, setFormFeedback] = useState(null);
    // Intake section togglers
    const [showFoods, setShowFoods] = useState(false);
    const [showDrinks, setShowDrinks] = useState(false);
    const toggleItem = (array, setArray, value) => {
        setArray(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            date,
            wellbeing,
            sleepQuality,
            sleepDuration,
            stoolConsistency,
            stoolQuantity,
            stoolBlood,
            stoolMucus,
            stoolUrgency,
            stomachPain,
            stomachBloating,
            flatulence,
            selectedFoods,
            selectedDrinks,
        };
    };

    return (
        <div className="h-1/4 flex py-4">
            <div
                className="flex-1 pr-8 overflow-y-scroll scrollbar scrollbar-thumb-black scrollbar-thumb-rounded-full active:scrollbar-thumb-secondary hover:scrollbar-thumb-secondary scrollbar-hide">
                <div className="max-w-6xl mx-auto">

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="space-y-5 border-2 border-black rounded-lg p-5">
                            <DatePicker text={"Select Date"} value={date} setValue={setDate}/>
                        </div>

                        <div className="space-y-5 border-2 border-black rounded-lg p-5">
                            <h2 className="text-xl font-garet-heavy underline">1. Emotions and sleep</h2>
                            <Slider title={"Emotional wellbeing"}
                                    text={"How did you feel?"}
                                    value={wellbeing}
                                    setValue={setWellbeing}
                                    defaultValue={3}
                                    stepSize={1}
                                    min={1}
                                    max={5}
                                    selection={SYMPTOMS.wellbeing.formValues}
                                    description={SYMPTOMS.wellbeing.description}
                            />
                            <Slider title={"Sleep quality"}
                                    text={"How rested are you after the sleep?"}
                                    value={sleepQuality}
                                    setValue={setSleepQuality}
                                    defaultValue={3}
                                    stepSize={1}
                                    min={1}
                                    max={5}
                                    selection={SYMPTOMS.sleepQuality.formValues}
                                    description={SYMPTOMS.sleepQuality.description}
                            />
                            <Slider title={"Sleep duration"}
                                    text={"How many hours did you sleep?"}
                                    value={sleepDuration}
                                    setValue={setSleepDuration}
                                    defaultValue={6}
                                    stepSize={1}
                                    min={1}
                                    max={8}
                                    selection={SYMPTOMS.sleepDuration.formValues}
                                    description={SYMPTOMS.sleepDuration.description}
                            />
                        </div>

                        <div className="space-y-5 border-2 border-black rounded-lg p-5">
                            <h2 className="text-xl font-garet-heavy underline">2. Stool</h2>
                            <Slider title={"Stool consistency"}
                                    text={"How long did it take during your bathroom visits?"}
                                    value={stoolConsistency}
                                    setValue={setStoolConsistency}
                                    defaultValue={2}
                                    stepSize={1}
                                    min={1}
                                    max={3}
                                    selection={SYMPTOMS.stoolConsistency.formValues}
                                    description={SYMPTOMS.stoolConsistency.description}
                            />
                            <Slider title={"Stool quantity"}
                                    text={"How many times did you go to the bathroom today?"}
                                    value={stoolQuantity}
                                    setValue={setStoolQuantity}
                                    defaultValue={2}
                                    stepSize={1}
                                    min={1}
                                    max={3}
                                    selection={SYMPTOMS.stoolQuantity.formValues}
                                    description={SYMPTOMS.stoolQuantity.description}
                            />
                            <div>
                                <label className="font-garet-heavy text-lg">Stool issues</label>
                                <p className="pb-3">Did you notice any of the following symptoms during your bathroom
                                    visits?</p>
                                <Checkbox text={"Blood"} onChange={setStoolBlood}/>
                                <Checkbox text={"Mucus"} onChange={setStoolMucus}/>
                                <Checkbox text={"Urgency"} onChange={setStooUrgency}/>
                            </div>
                        </div>

                        <div className="space-y-5 border-2 border-black rounded-lg p-5">
                            <h2 className="text-xl font-garet-heavy underline">3. Stomach issues</h2>
                            <p className="pb-3">Did you notice any of the following problems with your stomach?</p>
                            <div className="flex justify-between">
                                <div
                                    className="flex flex-col space-y-3 items-center border-2 rounded-lg border-black p-5 hover:text-secondary hover:border-secondary hover:border-3">
                                    <img src={StomachPain}
                                         alt="Person with stomach pain"
                                         className="max-w-[200px] hover:cursor-custom-pointer"
                                         onClick={() => setStomachPain(!stomachPain)}
                                    />
                                    <p className="text-start font-garet-heavy text-lg">Pain</p>
                                </div>
                                <div
                                    className="flex flex-col space-y-3 items-center border-2 rounded-lg border-black p-5 hover:text-secondary hover:border-secondary hover:border-3">
                                    <img src={StomachBloating}
                                         alt="Bloated stomach"
                                         className="max-w-[200px] hover:cursor-custom-pointer"
                                         onClick={() => setStomachBloating(!stomachBloating)}
                                    />
                                    <p className="text-start font-garet-heavy text-lg">Bloating</p>
                                </div>
                                <div
                                    className="flex flex-col space-y-3 items-center border-2 rounded-lg border-black p-5 hover:text-secondary hover:border-secondary hover:border-3">
                                    <img src={Flatulence}
                                         alt="Person with flatulence"
                                         className="max-w-[200px] hover:cursor-custom-pointer"
                                         onClick={() => setFlatulence(!flatulence)}
                                    />
                                    <p className="text-start font-garet-heavy text-lg">Gases</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5 border-2 border-black rounded-lg p-5">
                            <h2 className="text-xl font-garet-heavy underline">4. Food and drink intake</h2>
                            <h3 className="text-lg font-garet-heavy">Food Intake</h3>
                            <p>Which product categories did you eat?</p>
                            <button
                                type="button"
                                onClick={() => setShowFoods(!showFoods)}
                                className="mb-4 px-4 py-2 border-2 border-black cursor-custom-pointer rounded bg-primary hover:bg-secondary hover:text-primary"
                            >
                                {showFoods ? "Hide food selection" : "Show food selection"}
                            </button>
                            {showFoods && (
                                <div className="grid grid-cols-2 gap-2">
                                    {INTAKE.food.map((food) => (
                                        <button
                                            key={food.value}
                                            type="button"
                                            onClick={() => toggleItem(selectedFoods, setSelectedFoods, food.value)}
                                            className={`p-2 border rounded text-left cursor-custom-pointer ${
                                                selectedFoods.includes(food.value)
                                                    ? 'bg-secondary text-primary'
                                                    : 'bg-white hover:bg-secondary hover:text-primary'
                                            }`}
                                        >
                                            {food.label}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <h3 className="text-lg font-garet-heavy">Drink Intake</h3>
                            <p>Which product categories did you drink?</p>
                            <button
                                type="button"
                                onClick={() => setShowDrinks(!showDrinks)}
                                className="mb-4 px-4 py-2 border-2 border-black rounded cursor-custom-pointer bg-primary hover:bg-secondary hover:text-primary"
                            >
                                {showDrinks ? "Hide drink selection" : "Show drink selection"}
                            </button>
                            {showDrinks && (
                                <div className="grid grid-cols-2 gap-2">
                                    {INTAKE.drink.map((drink) => (
                                        <button
                                            key={drink.value}
                                            type="button"
                                            onClick={() => toggleItem(selectedDrinks, setSelectedDrinks, drink.value)}
                                            className={`p-2 border rounded text-left cursor-custom-pointer ${
                                                selectedDrinks.includes(drink.value)
                                                    ? 'bg-secondary text-primary'
                                                    : 'bg-white hover:bg-secondary hover:text-primary'
                                            }`}
                                        >
                                            {drink.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary p-3 text-lg font-garet-heavy rounded-lg hover:bg-secondary hover:text-primary cursor-custom-pointer"
                        >
                            Save Entry for {date}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DiaryEntry;