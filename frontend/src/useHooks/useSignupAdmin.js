import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const useSignupAdmin = () => {
    const [admin_name, setAdmin_name] = useState("");
    const [admin_username, setAdmin_username] = useState("");
    const [admin_password, setAdmin_password] = useState("");
    const [contact, setContact] = useState("");
    const [license_certificate, setLicense_certificate] = useState("");
    const [signupError, setSignupError] = useState({});
    const apiUrl = process.env.REACT_APP_API_URL;
    
    const signupAdmin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`${apiUrl}/api/signupAdmin`, { admin_name, admin_username, admin_password, contact, license_certificate });
            // console.log(response.data);
            
            if (response.status === 200) {
                setAdmin_username("");
                setAdmin_password("");
                setSignupError({});
                Swal.fire({
                    title: 'Waiting for approval',
                    text: 'Request sucessfully sent for approval.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                    timerProgressBar: true,
                    position: 'center',
                });
            }

        } catch (error) {
            if (error.response) {
                if (error.response.data && error.response.data.errors) {
                    setSignupError(error.response.data.errors);
                } else {
                    console.error("Server responded with an unexpected format:", error.response.data);
                }
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error setting up request:", error.message);
            }
        }
    }

    return { setAdmin_name, setAdmin_username, setAdmin_password, setContact, setLicense_certificate, signupAdmin, signupError };
}

export default useSignupAdmin;