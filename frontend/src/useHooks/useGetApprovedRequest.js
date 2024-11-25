import React, { useState, useEffect } from 'react'
import axios from 'axios'

function useGetApprovedRequest() {
    const [list, setList] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;
    
    useEffect(() => {
        const getApprovedRequest = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/approved-request`);
                setList(response.data.approvedRequest);
            } catch (error) {
                console.error("Error: ", error);
                throw(error);
            }
        }
        getApprovedRequest();
    }, []);

  return list;
}

export default useGetApprovedRequest

