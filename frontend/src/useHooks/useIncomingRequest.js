import React, { useEffect, useState } from 'react'
import axios from 'axios';

function useIncomingRequest() {

    const [listOfRequest, setListOfRequest] = useState([]);

    useEffect(() => {
        const getAllRequest = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/request");
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
