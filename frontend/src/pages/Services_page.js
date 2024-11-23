import React from 'react';
import useAppointmentServices from '../useHooks/useAppointmentServices';
import useGetVetAsOptions from '../useHooks/useGetVetAsOptions';

function ServicesPage() {
  const {
    setSelectedVetId,
    setName,
    setContact,
    setDate,
    setTime,
    setReason,
    errorService,
    sendAppointment,
  } = useAppointmentServices();

  const options = useGetVetAsOptions();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6">
      <div className="w-full max-w-2xl">
        <h1 className="text-5xl font-bold text-green-600 text-left mb-2">Our Services</h1>
        <p className="text-lg text-gray-600 text-left mb-6">
          Book an appointment with our professional veterinarians. We care about your pets as much as you do!
        </p>
      </div>
      <form
        onSubmit={sendAppointment}
        className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col space-y-6"
      >
        <h2 className="text-2xl font-semibold text-green-600 mb-4 text-center">
          Book an Appointment
        </h2>
        <select
          className={`border p-3 ${errorService.selectedVetId ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
          onChange={(e) => setSelectedVetId(e.target.value)}
        >
          <option value="">Select Veterinarian</option>
          {options.map((option, index) => (
            <option key={index} value={option._id}>
              {option.admin_name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Full Name"
          className={`border p-3 ${errorService.name ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact Number"
          className={`border p-3 ${errorService.contact ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
          onChange={(e) => setContact(e.target.value)}
        />
        <div className="flex space-x-4">
          <input
            type="date"
            className={`w-1/2 border p-3 ${errorService.date ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            className={`w-1/2 border p-3 ${errorService.time ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <textarea
          placeholder="Reason for Appointment"
          className={`border p-3 ${errorService.reason ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
          onChange={(e) => setReason(e.target.value)}
        ></textarea>
        <span className="text-sm text-red-600">
          {errorService.selectedVetId ||
            errorService.name ||
            errorService.contact ||
            errorService.date ||
            errorService.time ||
            errorService.reason}
        </span>
        <button
          type="submit"
          className="bg-green-500 text-white font-semibold p-3 rounded-md hover:bg-green-600 transition duration-300"
        >
          Send Appointment Request
        </button>
      </form>
    </div>
  );
}

export default ServicesPage;
