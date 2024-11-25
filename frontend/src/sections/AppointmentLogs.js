import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentLogs = ({ id }) => {
    const [appointments, setAppointments] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getAppointments = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/history/${id}`);
                if (response.status === 200) {
                    const combinedAppointments = [
                        ...response.data.approvedAppointments.map(app => ({ ...app, status: 'Approved' })),
                        ...response.data.rejectedAppointments.map(app => ({ ...app, status: 'Rejected' }))
                    ].sort((a, b) => new Date(b.status_update_time) - new Date(a.status_update_time));

                    setAppointments(combinedAppointments);
                }
            } catch (error) {
                console.error("Error occurred: ", error);
            }
        };

        if (id) {
            getAppointments();
        }
    }, [id]);

    return (
        <div className="max-w-4xl mx-auto p-4 bg-green-50 rounded-lg shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-700 flex items-center gap-2">Appointment History</h2>

            <div className="overflow-y-auto max-h-96">
                <table className="table-auto w-full border-collapse bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-green-200 text-green-800 text-left">
                            <th className="border border-green-300 px-4 md:px-6 py-3 text-sm md:text-lg">Details</th>
                            <th className="border border-green-300 px-4 md:px-6 py-3 text-sm md:text-lg">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? (
                            appointments.map((appointment, index) => (
                                <tr key={index} className={`hover:bg-${appointment.status === 'Approved' ? 'green' : 'red'}-100 transition`}>
                                    <td className="border border-green-300 px-4 md:px-6 py-4">
                                        <p className="font-semibold text-sm md:text-base">{appointment.name}</p>
                                        {appointment.reason && <p className="text-xs md:text-sm">{appointment.reason}</p>}
                                        <small className="block text-xs md:text-sm">
                                            {new Date(appointment.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })} at {new Date(`1970-01-01T${appointment.time}`).toLocaleTimeString('en-US', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true
                                            })}
                                        </small>
                                    </td>
                                    <td className={`border border-green-300 px-4 md:px-6 py-4 font-semibold ${appointment.status === 'Approved' ? 'text-green-600' : 'text-red-600'}`}>
                                        <p className="text-sm md:text-base">{appointment.status}</p>
                                        <small className="block text-xs md:text-sm">on {new Date(appointment.status_update_time).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}</small>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="text-center px-4 py-4 text-gray-500 text-sm md:text-base">No appointments found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AppointmentLogs;
