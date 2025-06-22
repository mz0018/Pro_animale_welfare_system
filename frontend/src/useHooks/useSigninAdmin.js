import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const useSigninAdmin = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [admin_username, checkAdmin_username] = useState("");
    const [admin_password, checkAdmin_password] = useState("");
    const [signinError, setSigninError] = useState({});
    const [loading, setLoading] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    // console.log(`This is your API you dumbass rebuild: ${apiUrl}`);
    // console.log(typeof(apiUrl));

    const signinAdmin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/api/signinAdmin`, { 
                admin_username, 
                admin_password 
            });

            const data = response.data;

            if (response.status === 200) {
                login(data.token);
                navigate('/dashboard');
                checkAdmin_username("");
                checkAdmin_password("");
                setSigninError({});
            }

        } catch (error) {
            if (error.response) {
                if (error.response && error.response.data && error.response.data.errors) {
                    setSigninError(error.response.data.errors);
                } else {
                    console.error("Server responded with an unexpected format:", error.response.data);
                }
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error setting up request:", error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return { checkAdmin_username, checkAdmin_password, signinAdmin, signinError, loading };
}

export default useSigninAdmin;
