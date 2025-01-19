import {Navigation} from "./components";
import React from "react";
import {Outlet} from "react-router-dom";

const Homepage = () => {
    return (
        <div className="m-10">
            <Navigation/>
            <Outlet/>
        </div>
    )
}

export default Homepage;