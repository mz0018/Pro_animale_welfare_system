import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListOfPatients = ({ id, isSuccess }) => {
    const [groupedPatients, setGroupedPatients] = useState({});
    const [err, setErr] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPatients, setFilteredPatients] = useState({});
    const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getList = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/patients/${id}`);
                if (response.status === 200) {
                    const patients = response.data.patients;
                    patients.sort((a, b) => new Date(b.date_registered) - new Date(a.date_registered));
                    const grouped = patients.reduce((acc, patient) => {
                        const { petOwner } = patient;
                        if (!acc[petOwner]) {
                            acc[petOwner] = [];
                        }
                        acc[petOwner].push(patient);
                        return acc;
                    }, {});
                    setGroupedPatients(grouped);
                    setFilteredPatients(grouped);
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.errors) {
                    setErr(error.response.data.errors);
                } else {
                    console.error(error);
                }
            }
        };
        if (isSuccess || id) {
            getList();
        }
    }, [id, isSuccess]);

    useEffect(() => {
        const filtered = Object.entries(groupedPatients).reduce((acc, [owner, patients]) => {
            if (owner.toLowerCase().includes(searchTerm.toLowerCase())) {
                acc[owner] = patients;
            }
            return acc;
        }, {});
        setFilteredPatients(filtered);
    }, [searchTerm, groupedPatients]);

    return (
        <div className="max-w-4xl mx-auto mt-6">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by pet owner name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="h-[600px] overflow-y-auto">
                {Object.keys(filteredPatients).length > 0 ? (
                    Object.entries(filteredPatients).map(([owner, patients], index) => (
                        <div key={index} className="mb-4 border border-gray-300 rounded-lg shadow-md">
                            <div className="bg-gray-200 px-4 py-2 cursor-pointer">
                                <button
                                    type="button"
                                    className="flex items-center justify-between w-full text-left"
                                    onClick={() => {
                                        setOpenAccordionIndex(openAccordionIndex === index ? null : index);
                                    }}
                                >
                                    <span className="font-semibold">{owner || "Unknown Owner"}</span>
                                    <span className="text-gray-500">▼</span>
                                </button>
                            </div>

                            {openAccordionIndex === index && (
                                <div className="px-4 py-2">
                                </div>
                            )}

                            <div
                                id={`accordion-${index}`}
                                className={`px-4 py-2 ${openAccordionIndex === index ? '' : 'hidden'} ${patients.length >= 5 ? 'max-h-[300px] overflow-y-auto' : ''}`}
                            >
                                {patients.map((patient, patientIndex) => (
                                    <div key={patientIndex} className="mb-6 p-6 border-l-4 border-green-500 rounded-lg shadow-lg bg-white">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xl font-semibold text-green-700">{patient.petName}</h3>
                                            <span className="text-sm text-gray-500">
                                                Registered: {new Date(patient.date_registered).toLocaleDateString() || "N/A"}
                                            </span>
                                        </div>

                                        <div className="space-y-3 mb-4">
                                            <h4 className="text-lg font-semibold text-gray-700">Patient Details</h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-gray-600"><strong>Species:</strong> {patient.species}</p>
                                                    <p className="text-gray-600"><strong>Breed:</strong> {patient.breed}</p>
                                                    <p className="text-gray-600"><strong>Age:</strong> {patient.age}</p>
                                                    <p className="text-gray-600"><strong>Sex:</strong> {patient.sex}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600"><strong>Condition:</strong> {patient.condition || "N/A"}</p>
                                                    <p className="text-gray-600"><strong>Temperament:</strong> {patient.temperament || "N/A"}</p>
                                                    <p className="text-gray-600"><strong>Vital Signs:</strong> {patient.vitalSigns || "N/A"}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3 mb-4">
                                            <h4 className="text-lg font-semibold text-gray-700">Medication</h4>
                                            <p className="text-gray-600"><strong>Medications:</strong> {patient.medications || "N/A"}</p>
                                        </div>

                                        <div className="space-y-3 mb-4">
                                            <h4 className="text-lg font-semibold text-gray-700">Health Tracking</h4>
                                            <p className="text-gray-600"><strong>Health Tracking:</strong> {patient.healthTracking || "N/A"}</p>
                                        </div>

                                        {/* <button
                                            onClick={() => console.log(`Button clicked for pet: ${patient.petName}`)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        >
                                            Action for {patient.petName}
                                        </button> */}
                                    </div>
                                ))}

                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No patients found.</p>
                )}
            </div>
        </div>
    );
};

export default ListOfPatients;
