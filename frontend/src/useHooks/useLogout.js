import React, { useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const useLogout = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const logoutUser = async () => {
        try {
            await axios.post(`${apiUrl}/api/logout`);

            logout();
            navigate('/');
        } catch (error) {
            console.error("An error occured on logout", error);
            throw(error);
        }
    }

    return { logoutUser };
}

export default useLogout
