import { useEffect, useState } from "react";
import axios from 'axios';
import { FaExclamationCircle } from 'react-icons/fa';
import useApproveAppointment from "../useHooks/useApproveAppointment";

const AppointmentList = ({ id }) => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const { setApprove, setReject, setAppointment_id } = useApproveAppointment();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/appointments?id=${id}`);
               
                const sortedAppointments = response.data.appointments.sort((a, b) => 
                    new Date(b.date_created) - new Date(a.date_created)
                );
                setAppointments(sortedAppointments);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError(error.response.data.errors.message);
                } else {
                    setError("Error fetching appointments. Please try again.");
                    console.error("Error fetching appointments", error);
                }
            }
        };

        if (id) {
            fetchAppointments();
        }

    }, [id]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-green-50 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-green-700">Appointments</h2>
            <table className="table-auto w-full border-collapse bg-white rounded-lg shadow-lg">
                <thead>
                    <tr className="bg-green-200 text-green-800 text-left">
                        <th className="border border-green-300 px-6 py-3 text-lg">Pet Owner</th>
                        <th className="border border-green-300 px-6 py-3 text-lg">Reason</th>
                        <th className="border border-green-300 px-6 py-3 text-lg">Date</th>
                        <th className="border border-green-300 px-6 py-3 text-lg">Time</th>
                        <th className="border border-green-300 px-6 py-3 text-lg">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length > 0 ? (
                        appointments.map((appointment, index) => (
                            <tr key={index} className={`text-gray-700 ${index % 2 === 0 ? 'bg-green-50' : 'bg-white'} hover:bg-green-100`}>
                                <td className="truncate border border-green-200 px-6 py-3 text-base">
                                    {appointment.name}
                                </td>
                                <td className="truncate border border-green-200 px-6 py-3 text-base">{appointment.reason}</td>
                                <td className="truncate border border-green-200 px-6 py-3 text-base">
                                    {new Date(appointment.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </td>
                                <td className="truncate border border-green-200 px-6 py-3 text-base">
                                    {appointment.time}
                                </td>
                                <td className="truncate border border-green-200 px-6 py-3 text-base flex flex-col sm:flex-row gap-2 justify-center items-center">
                                    <button
                                        onClick={() => {
                                            setApprove('1');
                                            setAppointment_id(appointment._id);
                                        }}
                                        className="mt-2 sm:mt-0 bg-green-600 text-white py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-1 w-full sm:w-auto text-xs sm:text-sm"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => {
                                            setReject('0');
                                            setAppointment_id(appointment._id);
                                        }}
                                        className="mt-2 sm:mt-0 bg-red-500 text-white py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-1 w-full sm:w-auto text-xs sm:text-sm"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center px-6 py-4 text-gray-500">No appointments found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {error && (
                <div className="mt-4 text-red-600 flex items-center gap-2">
                    <FaExclamationCircle />
                    {error}
                </div>
            )}
        </div>
    );
}

export default AppointmentList;
