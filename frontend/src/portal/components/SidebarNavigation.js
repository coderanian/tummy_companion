import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {CONSTANTS} from '../../common/constants';
import {
    ChartBarIcon,
    PencilSquareIcon,
    QuestionMarkCircleIcon,
    ArrowLeftStartOnRectangleIcon,
    XCircleIcon,
    Bars3Icon
} from "@heroicons/react/16/solid";
import Logo from "../../assets/images/icons/logo_alt.svg";
import {requestFactory} from "../../common/utils";

const SidebarNavigation = () => {
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();
    const handleLogout = () => {
        requestFactory(CONSTANTS.API.LOGOUT).then(() => navigate("/login"))
    }

    return (
        <div className={`relative ${isVisible ? "w-64" : "w-0"} transition-all duration-300`}>
            {/* Toggle Button when Sidebar is Hidden */}
            {!isVisible && (
                <div
                    onClick={() => setIsVisible(true)}
                    className="absolute left-2 top-10 h-12 w-12 bg-black rounded-lg flex items-center justify-center hover:bg-secondary"
                >
                    <Bars3Icon className="h-10 w-10 cursor-custom-pointer text-primary" />
                </div>
            )}

            {/* Sidebar */}
            {isVisible && (
                <nav className="bg-primary h-screen p-10 w-72">
                    <aside className="text-xl font-garet-heavy">
                        {/* Close Button */}
                        <div className="relative">
                            <div
                                onClick={() => setIsVisible(false)}
                                className="absolute top-2 right-[-60px] h-10 w-10 bg-primary rounded-full flex items-center justify-center"
                            >
                                <XCircleIcon className="h-10 w-10 cursor-custom-pointer hover:text-secondary" />
                            </div>
                        </div>
                        {/* Logo and Title */}
                        <div className="flex items-center space-x-1">
                            <img src={Logo} className="mr-3 h-12" alt="Tummy Companion Logo" />
                            <p className="uppercase max-w-[10ch] break-words">{CONSTANTS.APP_NAME}</p>
                        </div>
                        {/* Navigation Links */}
                        <div className="flex pt-8 flex-col items-start space-y-5">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 ${isActive ? "text-secondary" : ""}`
                                }
                            >
                                <ChartBarIcon className="h-5 w-5" />
                                <span>Health Report</span>
                            </NavLink>
                            <NavLink
                                to="/diary"
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 ${isActive ? "text-secondary" : ""}`
                                }
                            >
                                <PencilSquareIcon className="h-5 w-5" />
                                <span>Diary</span>
                            </NavLink>
                            <NavLink
                                to="/about-ibs"
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 ${isActive ? "text-secondary" : ""}`
                                }
                            >
                                <QuestionMarkCircleIcon className="h-5 w-5" />
                                <span>About IBS</span>
                            </NavLink>
                            <div className="flex items-center space-x-2 hover:cursor-custom-pointer" onClick={handleLogout}>
                                <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
                                <span>Logout</span>
                            </div>
                        </div>
                    </aside>
                </nav>
            )}
        </div>
    );
};

export default SidebarNavigation;
