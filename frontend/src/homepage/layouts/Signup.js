import React, {useState} from "react";
import zxcvbn from "zxcvbn";
import emailValidator from "email-validator";
import Person from "../../assets/images/elements/person_work_green.svg";
import {Button, ErrorBox, Input} from "../components";
import {requestFactory} from "../../common/utils";
import {CONSTANTS} from "../../common/constants";
import {useNavigate} from "react-router-dom";

/**
 * Sign up page component
 * @author Konstantin Kuklin konstantin.kuklin@student.htw-berlin.de
 */
const Signup = () => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [emailFeedback, setEmailFeedback] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordFeedback, setPasswordFeedback] = useState(null);
    const [formFeedback, setFormFeedback] = useState(null);
    const navigate = useNavigate();

    const handleUsernameInputChange = (value) => {
        setName(value);
    }
    const handleEmailInputChange = (value) => {
        setEmail(value);
        setEmailFeedback(emailValidator.validate(value) ? null : 'Please enter valid e-mail address!');
    }
    const handlePasswordInputChange = (value) => {
        setPassword(value);
        const result = zxcvbn(value);
        setPasswordStrength(result.score);
        setPasswordFeedback(result.feedback.suggestions.length > 0 ? result.feedback.suggestions.join(" ") : null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValidForm = validateForm();
        if (isValidForm) {
            setFormFeedback(null);
            const data = {name: name, email: email, password: password}
            const response = await requestFactory(CONSTANTS.API.REGISTER, data);
            console.log(response);
            if (response.success) {
                alert(response.msg);
                navigate("/login");
            } else {
                setFormFeedback(response.msg);
            }
        } else {
            setFormFeedback("Please review your form and try again!");
        }
    }

    const validateForm = () => {
        return name && email && password &&
            emailFeedback === null && passwordFeedback === null &&
            passwordStrength === 4;
    }

    return (
        <div className="flex justify-end h-screen">
            <img
                src={Person}
                alt="Person with stomach ache."
                className="absolute bottom-[-285px] left-[-50px] h-full"
            />
            <div className="flex flex-col items-center mx-8 mt-32 w-1/2 z-10 space-y-8">
                <h1 className="text-5xl font-garet-heavy">Sign up</h1>
                <form className="w-1/2 space-y-5">
                    <Input text={"Username"}
                           onChange={handleUsernameInputChange}
                           value={name}
                    />

                    <Input text={"Email"}
                           onChange={handleEmailInputChange}
                           value={email}
                    />
                    {(email && emailFeedback) && <p className="text-xs">{emailFeedback}</p>}

                    <Input text={"Password"}
                           onChange={handlePasswordInputChange}
                           value={password}
                           type="password"
                    />
                    <div className="text-xs ml-5">
                        {(password && passwordStrength !== 4) && <p>Please choose a strong password!</p>}
                        {(password && passwordFeedback) && <p>{passwordFeedback}</p>}
                    </div>

                    <Button onClickFunction={handleSubmit}
                            text="Create Account"
                            color="secondary"
                    />
                    {formFeedback && <ErrorBox text={formFeedback}/>}
                </form>
            </div>
        </div>
    );
};

export default Signup;