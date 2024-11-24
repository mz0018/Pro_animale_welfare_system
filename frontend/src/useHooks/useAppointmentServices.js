import React, { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';

function useAppointmentServices() {
    const [selectedVetId, setSelectedVetId] = useState('');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [reason, setReason] = useState('');
    const [status, setStatus] = useState('pending');
    const [errorService, setErrorService] = useState({});

    const sendAppointment = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/api/sendAppointment", { selectedVetId, name, contact, date, time, reason, status });
          
            if (response.status === 200) {
                setSelectedVetId("");
                setName("");
                setContact("");
                setDate(null);
                setTime(null);
                setReason("");
                setStatus("");
                setErrorService({});
                Swal.fire({
                    title: 'Request Sent',
                    text: 'The appointment has been sent successfully.',
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
                    setErrorService(error.response.data.errors);
                } else {
                    console.error("Server responded with an unexpected format: ", error.response.data);
                }
            } else if (error.request) {
                console.error("No response received: ", error.request);
            } else {
                console.error("Error setting up request: ", error.message);
            }
        }
    }
    return { setSelectedVetId, setName, setContact, setDate, setTime, setReason, errorService, sendAppointment  };
}

export default useAppointmentServices
