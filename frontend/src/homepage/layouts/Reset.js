import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Person from "../../assets/images/elements/person_work_brown.svg";
import {Button, ErrorBox, Input, Navigation} from "../components";
import {Link} from "react-router-dom";
import {requestFactory} from "../../common/utils";
import {CONSTANTS} from "../../common/constants";

/**
 * Login component allows users to log into their account.
 * It handles input changes and form submission for authentication.
 * @author Konstantin Kuklin konstantin.kuklin@student.htw-berlin.de
 */
const Reset = () => {
    const [email, setEmail] = useState(null);
    const [lastThreeChars, setLastThreeChars] = useState(null);
    const [password, setPassword] = useState(null);
    const [formFeedback, setFormFeedback] = useState(null);
    const navigate = useNavigate();

    const handleEmailInputChange = (value) => {
        setEmail(value);
    }
    const handleThreeChartsInputChange = (value) => {
        setLastThreeChars(value);
    }
    const handlePasswordInputChange = (value) => {
        setPassword(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email && password && lastThreeChars.length === 3) {
            setFormFeedback(null);
            const data = {email: email, newPassword: password, lastThreeChars: lastThreeChars}
            const response = await requestFactory(CONSTANTS.API.RESET, data);
            if (response.success) {
                alert("Password reset successful!");
                navigate("/login");
            } else {
                setFormFeedback(response.msg);
            }
        } else {
            setFormFeedback("Please review credentials and try again!");
        }
    }

    return (
        <div className="flex justify-end h-screen">
            <img
                src={Person}
                alt="Person with stomach ache."
                className="absolute bottom-[-330px] left-[-50px] h-full"
            />
            <div className="flex flex-col items-center mx-8 mt-32 w-1/2 z-10 space-y-8">
                <h1 className="text-5xl font-garet-heavy">Login</h1>
                <p className="text-2xl  mt-5">Reset your password</p>
                <form className="w-1/2 space-y-5">
                    <Input text={"Email"}
                           onChange={handleEmailInputChange}
                           value={email}
                    />
                    <Input text={"Last three characters of old password"}
                           onChange={handleThreeChartsInputChange}
                           type="password"
                    />

                    <Input text={"New password"}
                           onChange={handlePasswordInputChange}
                           value={password}
                           type="password"
                    />
                    <Button onClickFunction={handleSubmit}
                            text="Reset password"
                            color="secondary"
                    />
                    {formFeedback && <ErrorBox text={formFeedback}/>}
                </form>
                <p className="w-1/2 text-center">If you don't remember last three characters of your old password, please contact us.</p>
            </div>
        </div>
    );
};

export default Reset;