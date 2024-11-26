import React, { useEffect, useState } from 'react';
import { FaClinicMedical, FaUserMd, FaPhoneAlt, FaClock, FaInfoCircle } from 'react-icons/fa';
import { MdOutlinePassword } from 'react-icons/md';
import axios from 'axios';

function MoreInfo({ id }) {
  const [info, setInfo] = useState({
    admin_name: '',
    admin_user: '',

    contact_number: '',
    admin_info: {
      clinic_address: '',
      about_me: '',
    },
    clinic_schedule: {
      opening_time: '',
      closing_time: '',
    },
  });
  const apiUrl = process.env.REACT_APP_API_URL;

  const [getError, setGetError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('admin_info')) {
      const [parent, child] = name.split('.');
      setInfo((prevInfo) => ({
        ...prevInfo,
        [parent]: {
          ...prevInfo[parent],
          [child]: value,
        },
      }));
    } else if (name.includes('clinic_schedule')) {
      const [parent, child] = name.split('.');
      setInfo((prevInfo) => ({
        ...prevInfo,
        [parent]: {
          ...prevInfo[parent],
          [child]: value,
        },
      }));
    } else {
      setInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/info/${id}`);
        if (response.status === 200) {
          setInfo(response.data.admin);
        }
      } catch (error) {
        console.error('Error occurred: ', error);
        setGetError(error.message);
      }
    };

    if (id) {
      getInfo();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`${apiUrl}/api/info/${id}`, info);

      if (response.status === 200) {
        console.log('Data updated successfully');
      }
    } catch (error) {
      console.error('Error occurred while updating: ', error);
      setGetError(error.message);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-md">
      {getError && <p className="text-red-500">{getError}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 border rounded-md shadow-sm bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FaUserMd className="mr-2 text-green-500" /> Admin Details
          </h3>

          <div className="space-y-4">
            <div className="flex items-center">
              <label className="w-1/4 text-gray-600">Admin Name:</label>
              <input
                type="text"
                name="admin_name"
                value={info.admin_name || ''}
                onChange={handleChange}
                className="w-3/4 p-2 border rounded-md"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/4 text-gray-600">Admin User:</label>
              <input
                type="text"
                name="admin_user"
                value={info.admin_user || ''}
                onChange={handleChange}
                className="w-3/4 p-2 border rounded-md"
              />
            </div>


            <div className="flex items-center">
              <label className="w-1/4 text-gray-600">Contact Number:</label>
              <input
                type="text"
                name="contact_number"
                value={info.contact_number || ''}
                onChange={handleChange}
                className="w-3/4 p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-md shadow-sm bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FaInfoCircle className="mr-2 text-blue-500" /> Clinic Information
          </h3>

          <div className="space-y-4">
            <div className="flex items-center">
              <label className="w-1/4 text-gray-600">Clinic Address:</label>
              <input
                type="text"
                name="admin_info.clinic_address"
                value={info.admin_info?.clinic_address || ''}
                onChange={handleChange}
                className="w-3/4 p-2 border rounded-md"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/4 text-gray-600">About Me:</label>
              <textarea
                name="admin_info.about_me"
                value={info.admin_info?.about_me || ''}
                onChange={handleChange}
                className="w-3/4 p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-md shadow-sm bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FaClock className="mr-2 text-purple-500" /> Clinic Schedule
          </h3>

          <div className="space-y-4">
            <div className="flex items-center">
              <label className="w-1/4 text-gray-600">Opening Time:</label>
              <input
                type="time"
                name="clinic_schedule.opening_time"
                value={info.clinic_schedule?.opening_time || ''}
                onChange={handleChange}
                className="w-3/4 p-2 border rounded-md"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/4 text-gray-600">Closing Time:</label>
              <input
                type="time"
                name="clinic_schedule.closing_time"
                value={info.clinic_schedule?.closing_time || ''}
                onChange={handleChange}
                className="w-3/4 p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white p-3 rounded-md mt-4 shadow-lg"
        >
          Update Information
        </button>
      </form>
    </div>
  );
}

export default MoreInfo;
