import React, { useState, useEffect } from 'react';
import useAppointmentServices from '../useHooks/useAppointmentServices';
import useGetVetAsOptions from '../useHooks/useGetVetAsOptions';
import axios from 'axios';
import { FaTimes, FaInfoCircle, FaMapMarkerAlt, FaUser, FaClock, FaBriefcase } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';

function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVet, setSelectedVet] = useState(null);
  const [vetDetails, setVetDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('foods');
  const apiUrl = process.env.REACT_APP_API_URL;
  const [prodErr, setProdErr] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);

  const filteredProducts = products.filter(
    (product) => product.prod_category === activeCategory
  );
  
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

  const handleSelectChange = (vetId) => {
    const vet = options.find((option) => option._id === vetId);
    setSelectedVet(vet);
    setSelectedVetId(vetId);
  };

  const openModal = async () => {
    if (selectedVet) {
      try {
        const response = await axios.get(`${apiUrl}/api/info/${selectedVet._id}`);
        setVetDetails(response.data.admin);
        setIsModalOpen(true);
      } catch (error) {
        console.error('Error fetching veterinarian details:', error);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVetDetails(null);
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const formattedTime = new Date(0, 0, 0, hours, minutes);
    return formattedTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };
  
  useEffect(() => {
    const viewProfile = async () => {
      if (!selectedVet) return;
      try {
        const response = await axios.get(`${apiUrl}/api/fetchPicture/${selectedVet._id}`);
        if (response.status === 200) {
          if (response.data && response.data.profile_pic_url) {
            setImage(response.data.profile_pic_url);
          }
        }
      } catch (error) {
        console.error('Error fetching profile picture', error);
      }
    };
    viewProfile();
  }, [selectedVet]);
  
  useEffect(() => {
    const getProducts = async () => {
        if (!selectedVet) return;
        try {
            const response = await axios.get(`${apiUrl}/api/image/${selectedVet._id}`);
            if (response.status === 200) {
              const sortedProducts = response.data.sort((a, b) => 
                new Date(b.date_created) - new Date(a.date_created)
              );
              setProducts(sortedProducts);
            }
          } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
              setProdErr(error.response.data.errors);
            }
          }
    };

    getProducts();
  }, [selectedVet]);

    useEffect(() => {
      const getClinicSchedule = async () => {
          if (!selectedVet) return;
          try {
              const response = await axios.get(`${apiUrl}/api/clinicSched/${selectedVet._id}`);
              if (response.status === 200) {
                  setTimeSlots(response.data);
              }
          } catch (error) {
              console.error("Error fetching schedule:", error);
          }
      };

      getClinicSchedule();
  }, [selectedVet]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6 rounded-md">
      <div className="w-full max-w-2xl">
        <h1 className="text-5xl font-bold border-b text-green-600 p-5 flex items-center gap-3">
          <FaBriefcase />
          Services
        </h1>
        <p className="text-lg text-gray-600 text-left my-2">
          Book an appointment with our professional veterinarians. We care about your pets as much as you do!
        </p>
      </div>
      <form
        onSubmit={sendAppointment}
        className="bg-[#FAF9F6] w-full max-w-2xl p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col space-y-6"
      >
        <h2 className="text-2xl font-semibold text-green-600 mb-4 text-center">
          Book an Appointment
        </h2>
        <div>
          <h3 className="text-lg font-semibold mb-2">Select Veterinarian:</h3>
          <div className="flex space-x-4 items-center">
            <select
              className={`border p-3 flex-1 ${errorService.selectedVetId ? 'border-red-600' : 'border-green-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
              onChange={(e) => handleSelectChange(e.target.value)}
            >
              <option value="">Select Veterinarian</option>
              {options.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.admin_name}
                </option>
              ))}
            </select>
            <button
              type="button"
              className={`font-semibold p-3 rounded-md ${selectedVet ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              onClick={openModal}
              disabled={!selectedVet}
            >
              View Profile
            </button>
          </div>
          <span className="text-sm text-red-600">
            {errorService.selectedVetId && 'Please select a veterinarian.'}
          </span>
        </div>

        <input
          type="text"
          placeholder="Full Name"
          className={`border p-3 ${errorService.name ? 'border-red-600' : 'border-green-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact Number"
          className={`border p-3 ${errorService.contact ? 'border-red-600' : 'border-green-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
          onChange={(e) => setContact(e.target.value)}
        />
        <div className="flex space-x-4">
          <input
            type="date"
            className={`w-1/2 border p-3 ${errorService.date || errorService.conflict ? 'border-red-600' : 'border-green-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
            onChange={(e) => setDate(e.target.value)}
          />
 
          <select
              onChange={(e) => setTime(e.target.value)}
              className={`border p-3 flex-1 ${errorService.time || errorService.conflict ? 'border-red-600' : 'border-green-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
              <option hidden>Please select a time</option>
              {timeSlots.length > 0 ? (
                  timeSlots.map((slot, index) => (
                      <option
                          key={index}
                          value={slot.timeSlot}
                          disabled={slot.isTaken}
                          className={slot.isTaken ? 'text-red-600 font-bold' : ''}
                      >
                          {slot.isTaken ? `${slot.timeSlot} (!)` : slot.timeSlot}
                      </option>
                  ))
              ) : (
                  <option disabled>No available slots</option>
              )}
          </select>

        </div>
        <select
          className={`border p-3 ${errorService.reason ? 'border-red-600' : 'border-green-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
          onChange={(e) => setReason(e.target.value)}
        >
          <option value="">Select a reason</option>
          <option value="Vaccination">Vaccination</option>
          <option value="Checkup">Checkup</option>
          <option value="Spaying/Neutering">Spaying/Neutering</option>
          <option value="Deworming">Deworming</option>
          <option value="Surgery">Surgery</option>
          <option value="Grooming">Grooming</option>
          <option value="Emergency">Emergency</option>
          <option value="Other">Other</option>
        </select>

        <span className="text-sm text-red-600">
          {errorService.name ||
            errorService.contact ||
            errorService.date ||
            errorService.time ||
            errorService.reason||
            errorService.conflict}
        </span>
        <button
          type="submit"
          className="bg-green-500 text-white font-semibold p-3 rounded-md hover:bg-green-600 transition duration-300"
        >
          Send Appointment Request
        </button>
      </form>

      {isModalOpen && vetDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-100 rounded-lg p-8 sm:p-12 lg:p-16 w-[90%] sm:w-[80%] max-w-none shadow-2xl transition-transform transform scale-100">

            <div className="flex flex-col lg:flex-row lg:space-x-10 mt-6">
              <div className="flex flex-col items-center lg:items-start lg:w-1/3 space-y-6">
                <div className="relative">
                  <img
                    src={image || `${process.env.PUBLIC_URL}/vendor/assets/img/default_img.jpg`}
                    alt="Vet Profile"
                    className="w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-green-500 border-solid transition-transform hover:scale-105 duration-300 ease-in-out"
                  />
                  <span className="absolute inset-0 rounded-full border-4 border-green-500 shadow-md"></span>
                </div>

                <div className="text-center lg:text-left text-gray-700 space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-bold text-green-600 transition-colors hover:text-green-700 flex items-center justify-center lg:justify-start space-x-3">
                    <FaUser className="text-green-600 text-lg sm:text-xl" />
                    <span className="truncate">{vetDetails.admin_name}</span>
                  </h2>

                  <p className="flex items-center justify-center lg:justify-start space-x-3">
                    <FaMapMarkerAlt className="text-green-600 text-lg sm:text-xl" />
                    <strong className="text-green-600 truncate">Clinic Address:</strong>
                    <span className="truncate">{vetDetails.admin_info?.clinic_address || 'N/A'}</span>
                  </p>

                  <p className="flex items-center justify-center lg:justify-start space-x-3">
                    <FaInfoCircle className="text-green-600 text-lg sm:text-xl" />
                    <strong className="text-green-600 truncate">About me:</strong>
                    <span className="truncate">{vetDetails.admin_info?.about_me || 'No description available.'}</span>
                  </p>

                  <p className="flex items-center justify-center lg:justify-start space-x-3">
                    <FaClock className="text-green-600 text-lg sm:text-xl" />
                    <strong className="text-green-600 truncate">Schedule:</strong>
                    <span className="truncate">
                      {vetDetails.clinic_schedule?.opening_time
                        ? formatTime(vetDetails.clinic_schedule.opening_time)
                        : 'N/A'}{' '}
                      -{' '}
                      {vetDetails.clinic_schedule?.closing_time
                        ? formatTime(vetDetails.clinic_schedule.closing_time)
                        : 'N/A'}
                    </span>
                  </p>
                  <button
                className="w-full bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 hover:shadow-lg transition-all duration-200 flex items-center space-x-2 justify-center"
                onClick={closeModal}
              >
                <FaTimes className="text-white" />
                <span>Close</span>
              </button>
                </div>
              </div>

              <div className="lg:w-2/3">
                <h3 className="text-2xl sm:text-3xl font-bold text-green-600 mb-6">
                  Products <MdCategory className="inline-block ml-2 text-green-700" />
                </h3>

                <div className="border-b border-gray-200 mb-6">
                  <ul className="flex justify-center lg:justify-start space-x-4">
                    {['foods', 'accessories', 'others'].map((category) => (
                      <li key={category}>
                        <button
                          className={`py-2 px-4 text-sm sm:text-base font-semibold rounded-t-md ${
                            activeCategory === category
                              ? 'bg-green-100 text-green-600 border-b-2 border-green-600'
                              : 'text-gray-500 hover:bg-gray-100'
                          }`}
                          onClick={() => setActiveCategory(category)}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4 text-gray-700 h-72 overflow-y-auto px-2 sm:px-4">
                  {filteredProducts && filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-green-50 rounded-lg shadow-md border border-green-200 hover:shadow-lg transition-shadow duration-300 ease-in-out"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={product.image}
                            alt={product.prod_name}
                            className="w-14 h-14 sm:w-20 sm:h-20 object-cover rounded-md border border-gray-300"
                          />
                          <div>
                            <h4 className="font-semibold text-green-600">{product.prod_name}</h4>
                            <p className="text-sm text-gray-500">{product.prod_category}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-bold text-lg text-green-600">
                            ${product.prod_price}
                          </span>
                          <p className="text-sm text-gray-500">Qty: {product.prod_quantity}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">
                      No products available in this category.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicesPage;
