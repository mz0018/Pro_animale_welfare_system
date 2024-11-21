import React from 'react'
import axios from 'axios'

function useRejectRequst() {

    const rejected = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:3001/api/reject-request/${id}`, { request_status: 'reject'});
            console.log(response.data);
        } catch (error) {
            console.error("Error rejecting request: ", error);
            throw(error);
        }
    }

  return rejected;
  
}

export default useRejectRequst
