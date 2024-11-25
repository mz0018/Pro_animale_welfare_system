import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MoreInfo({ id }) {
  const [info, setInfo] = useState({
    admin_name: '',
    admin_user: '',
    admin_pwd: '',
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
    <div className="container mx-auto p-4">
      
      {getError && <p className="text-red-500">{getError}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <label className="text-sm sm:w-1/4">Admin Name:</label>
          <input
            type="text"
            name="admin_name"
            value={info.admin_name || ''}
            onChange={handleChange}
            className="mt-2 sm:mt-0 p-2 border rounded-md"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <label className="text-sm sm:w-1/4">Admin User:</label>
          <input
            type="text"
            name="admin_user"
            value={info.admin_user || ''}
            onChange={handleChange}
            className="mt-2 sm:mt-0 p-2 border rounded-md"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <label className="text-sm sm:w-1/4">Password:</label>
          <input
            type="password"
            name="admin_pwd"
            value={info.admin_pwd || ''}
            onChange={handleChange}
            className="mt-2 sm:mt-0 p-2 border rounded-md"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <label className="text-sm sm:w-1/4">Contact Number:</label>
          <input
            type="text"
            name="contact_number"
            value={info.contact_number || ''}
            onChange={handleChange}
            className="mt-2 sm:mt-0 p-2 border rounded-md"
          />
        </div>

        {/* Admin Info Section */}
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <label className="text-sm sm:w-1/4">Clinic Address:</label>
          <input
            type="text"
            name="admin_info.clinic_address"
            value={info.admin_info?.clinic_address || ''}
            onChange={handleChange}
            className="mt-2 sm:mt-0 p-2 border rounded-md"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <label className="text-sm sm:w-1/4">About Me:</label>
          <textarea
            name="admin_info.about_me"
            value={info.admin_info?.about_me || ''}
            onChange={handleChange}
            className="mt-2 sm:mt-0 p-2 border rounded-md"
          />
        </div>

        {/* Clinic Schedule - Opening and Closing Time Fields */}
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <label className="text-sm sm:w-1/4">Opening Time:</label>
          <input
            type="time"
            name="clinic_schedule.opening_time"
            value={info.clinic_schedule?.opening_time || ''}
            onChange={handleChange}
            className="mt-2 sm:mt-0 p-2 border rounded-md"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <label className="text-sm sm:w-1/4">Closing Time:</label>
          <input
            type="time"
            name="clinic_schedule.closing_time"
            value={info.clinic_schedule?.closing_time || ''}
            onChange={handleChange}
            className="mt-2 sm:mt-0 p-2 border rounded-md"
          />
        </div>

        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-full sm:w-auto">
          Update
        </button>
      </form>
    </div>
  );
}

export default MoreInfo;
