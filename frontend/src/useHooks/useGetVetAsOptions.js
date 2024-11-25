import React, { useState, useEffect } from 'react'
import axios from 'axios'

function useGetVetAsOptions() {

    const [options, setOptions] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getVetAsOptions = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/approved-request`);
                setOptions(response.data.approvedRequest);
            } catch (error) {
                console.error("Error: ", error);
                throw(error)
            }
        }
        getVetAsOptions();
    }, []);

    return options;
}

export default useGetVetAsOptions
