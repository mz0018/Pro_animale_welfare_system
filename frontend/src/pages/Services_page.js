import React from 'react'
import useAppointmentServices from '../useHooks/useAppointmentServices'
import useGetVetAsOptions from '../useHooks/useGetVetAsOptions';

function Services_page() {

  const { setSelectedVetId, setName, setContact, setDate, setTime, setReason, errorService, sendAppointment } = useAppointmentServices();

  const options = useGetVetAsOptions();

  return (
    <div className="h-screen bg-blue-500 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-white mb-4">Services</h1>
      <h3 className="text-2xl font-semibold text-white mb-8">Book an Appointment</h3>
      <form
        onSubmit={sendAppointment}
        className="bg-white p-6 rounded-lg shadow-md max-w-md w-full flex flex-col space-y-4"
      >
        <select
            className={`border p-3 ${errorService.selectedVetId ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onChange={(e) => setSelectedVetId(e.target.value)}
        >
            <option value="">Select Veterinarian</option>
            {options.map((option, index) => (
                <option key={index} value={option._id}>{option.admin_name}</option>
            ))}
        </select>
        <input
          type="text"
          placeholder="Fullname"
          className={`border p-3 ${errorService.name ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="text"
          placeholder="Contact Number"
          className={`border p-3 ${errorService.contact ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          onChange={(e) => setContact(e.target.value)}
        />
        <input
          type="date"
          placeholder=""
          className={`border p-3 ${errorService.date ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          placeholder=""
          className={`border p-3 ${errorService.time ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          onChange={(e) => setTime(e.target.value)}
        />
        <textarea
          placeholder="Reason"
          className={`border p-3 ${errorService.reason ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          onChange={(e) => setReason(e.target.value)}
        ></textarea>
        <span className='p-3 text-red-600'>{errorService.selectedVetId || errorService.name || errorService.contact || errorService.date || errorService.time || errorService.reason}</span>
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default Services_page
