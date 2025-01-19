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
const Login = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [formFeedback, setFormFeedback] = useState(null);
    const navigate = useNavigate();

    const handleEmailInputChange = (value) => {
        setEmail(value);
    }
    const handlePasswordInputChange = (value) => {
        setPassword(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email && password) {
            setFormFeedback(null);
            const data = {email: email, password: password}
            const response = await requestFactory(CONSTANTS.API.LOGIN, data);
            if (response.success) {
                navigate("/dashboard");
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
                <p className="text-2xl  mt-5">Login to access your account</p>
                <form className="w-1/2 space-y-5">
                    <Input text={"Email"}
                           onChange={handleEmailInputChange}
                           value={email}
                    />
                    <Input text={"Password"}
                           onChange={handlePasswordInputChange}
                           value={password}
                           type="password"
                    />
                    <Button onClickFunction={handleSubmit}
                            text="Login"
                            color="secondary"
                    />
                    {formFeedback && <ErrorBox text={formFeedback}/>}
                </form>
                <p>Don't have an account?{" "}
                    <Link to="/signup" className="text-secondary">
                        Register
                    </Link></p>
            </div>
        </div>
    );
};

export default Login;