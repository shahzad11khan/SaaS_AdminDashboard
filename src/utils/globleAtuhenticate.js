// utils/checkAuth.js
// import { toast } from "react-toastify";
// import store from '../AdminPanel/Store/Store.js'

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const Auth = (redirectTo = "/") => {
    const navigate = useNavigate();
    const { token } = useSelector(state => state.authenticate);

    useEffect(() => {
        if (!token) {
            toast.error("Login first");
            navigate(redirectTo)
        }
    }, [token, navigate]);

    return token; 
};

