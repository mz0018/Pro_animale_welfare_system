import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function useApproveAppointment() {

    const [appointment_id, setAppointment_id] = useState();
    const [approve, setApprove] = useState('');
    const [reject, setReject] = useState('');

    const approvedAppointment = async () => {
        setApprove('');
        try {
            const response = await axios.patch(`http://localhost:3001/api/approveStatus/${appointment_id}`);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Approved',
                    text: 'Appointment has been approved successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                    timerProgressBar: true,
                    position: 'center',
                  }).then(() => {
                    window.location.reload();
                  });
            }
        } catch (error) {
            console.error("Error occured: ", error);
            throw(error);
        }
    }

    const rejectAppointment = async () => {
        setReject('');
        try {
            const response = await axios.patch(`http://localhost:3001/api/rejectStatus/${appointment_id}`);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Rejected',
                    text: 'Appointment has been rejected successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                    timerProgressBar: true,
                    position: 'center',
                  }).then(() => {
                    window.location.reload();
                  })
            }
        } catch (error) {
            console.error("Error occured: ", error);
            throw(error);
        }
    }

    useEffect(() => {
        const whatButtonIsClicked = () => {
            try {
                if (approve === '1') {
                    approvedAppointment();
                }
                if (reject === '0') {
                    rejectAppointment();
                }
            } catch (error) {
                console.error("Error occured: ", error);
                throw error;
            }
        }
        whatButtonIsClicked();
    }, [approve, reject]);

  return { setApprove, setReject, setAppointment_id };
}

export default useApproveAppointment
