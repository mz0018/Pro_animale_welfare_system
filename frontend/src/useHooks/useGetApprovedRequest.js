import React, { useState, useEffect } from 'react'
import axios from 'axios'

function useGetApprovedRequest() {
    const [list, setList] = useState([]);
    
    useEffect(() => {
        const getApprovedRequest = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/approved-request");
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

