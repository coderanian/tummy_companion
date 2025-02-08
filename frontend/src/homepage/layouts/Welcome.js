import React from "react";
import {Button} from "../components";
import {useNavigate} from "react-router-dom";
import Person from '../../assets/images/elements/person_stomach_pain.svg';
import Circle from '../../assets/images/elements/abstract_figure.svg';

const Welcome = () => {
    const TEXTS = [
        "a food and symptom diary designed specifically for people with irritable bowel syndrome (IBS) " +
        "and other digestive health problems.",
        "log your symptoms and identify what is triggering them with help of charts."
    ];
    const navigate = useNavigate();

    return (
        <div className="flex justify-end h-screen">
            <img
                src={Person}
                alt="Person with stomach ache."
                className="absolute bottom-[-100px] left-[-50px] h-4/5"
            />
            <div className="mx-8 mt-32 w-1/2 z-10">
                <h2 className="text-5xl">Decode your symptoms</h2>
                <h1 className="text-8xl font-garet-heavy">Manage IBS</h1>
                <ul className="ml-4 text-md uppercase mt-12 w-4/5 list-disc list-outside leading-relaxed space-y-5">
                    {TEXTS.map((text) => (
                        <li key={text}>{text}</li>
                    ))}
                </ul>
                <div className="w-1/2 mt-12">
                    <Button onClickFunction={() => navigate("/signup")}
                            text="Sign Up"
                            color="secondary"
                    />
                </div>
            </div>
            <img
                src={Circle}
                alt="Abstract circle."
                className="absolute bottom-[-300px] right-[-400px] h-3/4"
            />
        </div>

    );
};

export default Welcome;
