import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export const UserLogout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then ((response)=>{
        if (response.status === 200) {
            localStorage.removeItem("token");
            navigate("/userlogin");
        }
    })
    return (
        <div>Log out</div>
    )
};

export default UserLogout;