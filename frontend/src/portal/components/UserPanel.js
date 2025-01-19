import React from "react";
import Avatar from "../../assets/images/elements/happy_face.gif";

const UserPanel = ({user}) => {
    return (
        <div className="flex w-1/3 rounded-xl p-3 bg-black items-center space-x-1">
            <img src={Avatar} className="mr-3 h-12" alt="Happy smiling face" />
            <span className="text-primary font-garet-heavy text-2xl">{user ?? "User"}</span>
        </div>
    )
}

export default UserPanel;