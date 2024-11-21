import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const PatientProfiling = ({ id, setIsSuccess, closeModal }) => {
    const [petOwner, setPetOwner] = useState('');
    const [petName, setPetName] = useState('');
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [condition, setCondition] = useState('');
    const [medications, setMedications] = useState('');
    const [temperament, setTemperament] = useState('');
    const [vitalSigns, setVitalSigns] = useState('');
    const [healthTracking, setHealthTracking] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`http://localhost:3001/api/savepatient/${id}`, {
                petOwner,
                petName,
                species,
                breed,
                age,
                sex,
                condition,
                medications,
                temperament,
                vitalSigns,
                healthTracking
            });

            if (response.status === 200) {
                Swal.fire({
                    title: 'Upload Complete',
                    text: 'Profile picture has been uploaded successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                    timerProgressBar: true,
                    position: 'center',
                });
                setIsSuccess((prev) => !prev);
                closeModal();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
              } else {
                console.error('Error occurred:', error);
              }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <section>
                    <h2 className="text-xl font-bold text-gray-800">Patient Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700">Pet Owner:</label>
                            <input
                                type="text"
                                value={petOwner}
                                onChange={(e) => setPetOwner(e.target.value)}
                                className={`border p-3 ${errors.petOwner ? 'border-red-600' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Pet Name:</label>
                            <input
                                type="text"
                                value={petName}
                                onChange={(e) => setPetName(e.target.value)}
                                className={`border p-3 ${errors.petName ? 'border-red-600' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700">Species:</label>
                            <select
                                value={species}
                                onChange={(e) => setSpecies(e.target.value)}
                                className={`border p-3 ${errors.species ? 'border-red-600' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500`}
                            >
                                <option value="">Select Species</option>
                                <option value="Dog">Dog</option>
                                <option value="Cat">Cat</option>
                                <option value="Bird">Bird</option>
                                
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">Breed:</label>
                            <select
                                value={breed}
                                onChange={(e) => setBreed(e.target.value)}
                                className={`border p-3 ${errors.breed ? 'border-red-600' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500`}
                            >
                                <option value="">Select Breed</option>
                                <option value="Labrador">Labrador</option>
                                <option value="Persian">Persian</option>
                                <option value="Parrot">Parrot</option>
                                
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700">Age:</label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className={`border p-3 ${errors.age ? 'border-red-600' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Sex:</label>
                            <select
                                value={sex}
                                onChange={(e) => setSex(e.target.value)}
                                className={`border p-3 ${errors.sex ? 'border-red-600' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500`}
                            >
                                <option value="">Select Sex</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-800">Medical History (optional)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700">Condition:</label>
                            <select
                                value={condition}
                                onChange={(e) => setCondition(e.target.value)}
                                className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">Select Condition</option>
                                <option value="Healthy">Healthy</option>
                                <option value="Chronic Illness">Chronic Illness</option>
                                <option value="Injury">Injury</option>
                                
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">Medications:</label>
                            <input
                                type="text"
                                value={medications}
                                onChange={(e) => setMedications(e.target.value)}
                                className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700">Vital Signs:</label>
                            <select
                                value={vitalSigns}
                                onChange={(e) => setVitalSigns(e.target.value)}
                                className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">Select Vital Signs</option>
                                <option value="Normal">Normal</option>
                                <option value="Elevated">Elevated</option>
                                <option value="Critical">Critical</option>
                                
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">Health Tracking:</label>
                            <select
                                value={healthTracking}
                                onChange={(e) => setHealthTracking(e.target.value)}
                                className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">Select Health Tracking</option>
                                <option value="Routine">Routine</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Emergency">Emergency</option>
                            </select>
                        </div>
                        <div>
                            <span className="text-red-600">{errors.petOwner || errors.petName || errors.species || errors.age || errors.sex}</span>
                        </div>
                    </div>
                </section>

                <div className="flex justify-center mt-6">
                    <button 
                        type="submit" 
                        className="w-full px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-200">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatientProfiling;
