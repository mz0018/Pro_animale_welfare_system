import React, { useState, useEffect } from 'react';
import useAppointmentServices from '../useHooks/useAppointmentServices';
import useGetVetAsOptions from '../useHooks/useGetVetAsOptions';
import axios from 'axios';

function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVet, setSelectedVet] = useState(null);
  const [vetDetails, setVetDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('foods');

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

  useEffect(() => {
    const viewProfile = async () => {
      if (!selectedVet) return;
      try {
        const response = await axios.get(`http://localhost:3001/api/fetchPicture/${selectedVet._id}`);
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
            const response = await axios.get(`http://localhost:3001/api/image/${selectedVet._id}`);
            if (response.status === 200) {
              const sortedProducts = response.data.sort((a, b) => 
                new Date(b.date_created) - new Date(a.date_created)
              );
              setProducts(sortedProducts);
            }
          } catch (error) {
            if (error.response) {
                console.error("Backend returned an error:", error.response.data);
            } else {
                console.error("Error in Axios request:", error.message);
            }    
        }
    };

    getProducts();
}, [selectedVet]);


  const openModal = async () => {
    if (selectedVet) {
      try {
        const response = await axios.get(`http://localhost:3001/api/info/${selectedVet._id}`);
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
        <div>
          <h3 className="text-lg font-semibold mb-2">Select Veterinarian:</h3>
          <div className="flex space-x-4 items-center">
            <select
              className={`border p-3 flex-1 ${errorService.selectedVetId ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
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
          {errorService.name ||
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

      {isModalOpen && vetDetails && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-8 sm:p-12 lg:p-16 w-[90%] sm:w-[80%] max-w-none shadow-2xl transition-transform transform scale-100">
          <div className="flex flex-col lg:flex-row lg:space-x-10">
            <div className="flex flex-col items-center lg:items-start lg:w-1/3 space-y-6">
              <div className="relative">
                <img
                  src={image}
                  alt="Vet Profile"
                  className="w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-green-500 transition-transform hover:scale-105 duration-300 ease-in-out"
                />
                <span className="absolute inset-0 rounded-full border-4 border-white shadow-md"></span>
              </div>

              <div className="text-center lg:text-left text-gray-700 space-y-4">
                <h2 className="text-3xl uppercase sm:text-4xl font-bold text-green-600 transition-colors hover:text-green-700">
                  {vetDetails.admin_name}
                </h2>
                <p>
                  <strong className="text-green-600">Clinic Address:</strong>{' '}
                  {vetDetails.admin_info?.clinic_address || 'N/A'}
                </p>
                <p>
                  <strong className="text-green-600">About me:</strong>{' '}
                  {vetDetails.admin_info?.about_me || 'No description available.'}
                </p>
                <p>
                  <strong className="text-green-600">Schedule:</strong>{' '}
                  {vetDetails.clinic_schedule?.opening_time
                    ? formatTime(vetDetails.clinic_schedule.opening_time)
                    : 'N/A'}{' '}
                  -{' '}
                  {vetDetails.clinic_schedule?.closing_time
                    ? formatTime(vetDetails.clinic_schedule.closing_time)
                    : 'N/A'}
                </p>
              </div>
            </div>

            <div className="lg:w-2/3">
              <h3 className="text-2xl sm:text-3xl font-bold text-green-600 mb-6">
                Products
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

          <div className="flex justify-end mt-8">
            <button
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 hover:shadow-lg transition-all duration-200"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default ServicesPage;
