import React from 'react'
import axios from 'axios'

function useApprovedRequest() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const approved = async (id) => {
    
        try {
            const response = await axios.patch(`${apiUrl}/api/approve-request/${id}`, { request_status: 'approved'});
            console.log(response.data);
        } catch (error) {
            console.error("Error approving request: ", error);
            throw(error);
        }

    }

  return approved;
}

export default useApprovedRequest
