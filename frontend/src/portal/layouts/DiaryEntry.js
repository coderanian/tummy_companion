import React, {useEffect, useState} from "react";
import {SYMPTOMS, INTAKE} from "../utils/constants";
import {Checkbox, DatePicker, Slider} from "../components";
import StomachBloating from "../../assets/images/elements/stomach_bloating.svg";
import StomachPain from "../../assets/images/elements/stomach_pain.svg";
import Flatulence from "../../assets/images/elements/stomach_flatulence.svg";
import {ErrorBox} from "../../homepage/components";
import {requestFactory} from "../../common/utils";
import {CONSTANTS} from "../../common/constants";
import {useNavigate} from "react-router-dom";

const DiaryEntry = () => {
    //Input states
    const [timestamp, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [mood_scale, setWellbeing] = useState(3);
    const [sleep_quality_scale, setSleepQuality] = useState(3);
    const [sleep_duration_length, setSleepDuration] = useState(6);
    const [stool_consistency_scale, setStoolConsistency] = useState(2);
    const [stool_quantity_scale, setStoolQuantity] = useState(2);
    const [stool_blood, setStoolBlood] = useState(false);
    const [stool_mucus, setStoolMucus] = useState(false);
    const [stool_urgency, setStooUrgency] = useState(false);
    const [stomach_pain, setStomachPain] = useState(false);
    const [stomach_bloating, setStomachBloating] = useState(false);
    const [stomach_flatulence, setFlatulence] = useState(false);
    const [food, setSelectedFoods] = useState([]);
    const [drink, setSelectedDrinks] = useState([]);
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
    const [formFeedback, setFormFeedback] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            timestamp, mood_scale, sleep_quality_scale, sleep_duration_length, stool_consistency_scale,
            stool_quantity_scale, stool_mucus, stool_blood, stool_urgency, stomach_pain,
            stomach_bloating, stomach_flatulence, food, drink,
        };
        const response = await requestFactory(CONSTANTS.API.NEW_DIARY_ENTRY, data);
        if (response.success) {
            setFormFeedback(null);
            alert("New diary entry created for: " + timestamp);
            navigate("/diary");
        } else {
            setFormFeedback(response.msg);
        }
    };

    return (
        <div className="2xl:h-1/4 h-1/5 flex py-4">
            <div
                className="flex-1 pr-8 overflow-y-scroll scrollbar scrollbar-thumb-black scrollbar-thumb-rounded-full active:scrollbar-thumb-secondary hover:scrollbar-thumb-secondary scrollbar-hide">
                <div className="max-w-6xl mx-auto">

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="space-y-5 border-2 border-black rounded-lg p-5">
                            <DatePicker text={"Select Date"} value={timestamp} setValue={setDate}/>
                        </div>

                        <div className="space-y-5 border-2 border-black rounded-lg p-5">
                            <h2 className="text-xl font-garet-heavy underline">1. Emotions and sleep</h2>
                            <Slider title={"Emotional wellbeing"}
                                    text={"How did you feel?"}
                                    value={mood_scale}
                                    setValue={setWellbeing}
                                    stepSize={1}
                                    min={1}
                                    max={5}
                                    selection={SYMPTOMS.wellbeing.formValues}
                                    description={SYMPTOMS.wellbeing.description}
                            />
                            <Slider title={"Sleep quality"}
                                    text={"How rested are you after the sleep?"}
                                    value={sleep_quality_scale}
                                    setValue={setSleepQuality}
                                    stepSize={1}
                                    min={1}
                                    max={5}
                                    selection={SYMPTOMS.sleepQuality.formValues}
                                    description={SYMPTOMS.sleepQuality.description}
                            />
                            <Slider title={"Sleep duration"}
                                    text={"How many hours did you sleep?"}
                                    value={sleep_duration_length}
                                    setValue={setSleepDuration}
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
                                    value={stool_consistency_scale}
                                    setValue={setStoolConsistency}
                                    stepSize={1}
                                    min={1}
                                    max={3}
                                    selection={SYMPTOMS.stoolConsistency.formValues}
                                    description={SYMPTOMS.stoolConsistency.description}
                            />
                            <Slider title={"Stool quantity"}
                                    text={"How many times did you go to the bathroom today?"}
                                    value={stool_quantity_scale}
                                    setValue={setStoolQuantity}
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
                                <div className={`flex flex-col space-y-3 items-center border-2 rounded-lg border-black p-5 hover:text-secondary hover:border-secondary hover:border-3 ${stomach_pain && "bg-secondary text-primary"}`}>
                                    <img src={StomachPain}
                                         alt="Person with stomach pain"
                                         className="max-w-[200px] hover:cursor-custom-pointer"
                                         onClick={() => setStomachPain(!stomach_pain)}
                                    />
                                    <p className="text-start font-garet-heavy text-lg">Pain</p>
                                </div>
                                <div className={`flex flex-col space-y-3 items-center border-2 rounded-lg border-black p-5 hover:text-secondary hover:border-secondary hover:border-3 ${stomach_bloating && "bg-secondary text-primary"}`}>
                                    <img src={StomachBloating}
                                         alt="Bloated stomach"
                                         className="max-w-[200px] hover:cursor-custom-pointer"
                                         onClick={() => setStomachBloating(!stomach_bloating)}
                                    />
                                    <p className="text-start font-garet-heavy text-lg">Bloating</p>
                                </div>
                                <div className={`flex flex-col space-y-3 items-center border-2 rounded-lg border-black p-5 hover:text-secondary hover:border-secondary hover:border-3 ${stomach_flatulence && "bg-secondary text-primary"}`}>
                                    <img src={Flatulence}
                                         alt="Person with flatulence"
                                         className="max-w-[200px] hover:cursor-custom-pointer"
                                         onClick={() => setFlatulence(!stomach_flatulence)}
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
                                    {INTAKE.food.map((foodCategory) => (
                                        <button
                                            key={foodCategory.value}
                                            type="button"
                                            onClick={() => toggleItem(food, setSelectedFoods, foodCategory.value)}
                                            className={`p-2 border rounded text-left cursor-custom-pointer ${
                                                food.includes(foodCategory.value)
                                                    ? 'bg-secondary text-primary'
                                                    : 'bg-white hover:bg-secondary hover:text-primary'
                                            }`}
                                        >
                                            {foodCategory.label}
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
                                    {INTAKE.drink.map((drinkCategory) => (
                                        <button
                                            key={drinkCategory.value}
                                            type="button"
                                            onClick={() => toggleItem(drink, setSelectedDrinks, drinkCategory.value)}
                                            className={`p-2 border rounded text-left cursor-custom-pointer ${
                                                drink.includes(drinkCategory.value)
                                                    ? 'bg-secondary text-primary'
                                                    : 'bg-white hover:bg-secondary hover:text-primary'
                                            }`}
                                        >
                                            {drinkCategory.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary p-3 text-lg font-garet-heavy rounded-lg hover:bg-secondary hover:text-primary cursor-custom-pointer"
                        >
                            Save Entry for {timestamp}
                        </button>
                        {formFeedback && <ErrorBox text={formFeedback}/>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DiaryEntry;