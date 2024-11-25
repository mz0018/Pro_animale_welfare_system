import React, { useEffect, useState } from 'react'
import axios from 'axios';

function useIncomingRequest() {

    const [listOfRequest, setListOfRequest] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;
    
    useEffect(() => {
        const getAllRequest = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/request`);
                setListOfRequest(response.data.incomingRequest);
            } catch (error) {
                console.error("Error: ", error);
                throw(error);
            }
        }
        getAllRequest();
    }, []);

    return listOfRequest;
}

export default useIncomingRequest
