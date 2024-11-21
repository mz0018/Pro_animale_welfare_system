import React, { useState, useEffect } from 'react'
import axios from 'axios'

function useGetVetAsOptions() {

    const [options, setOptions] = useState([]);

    useEffect(() => {
        const getVetAsOptions = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/approved-request");
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
