import React, { useState, useEffect } from 'react';
import { FaEye, FaCamera, FaLink } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

function ProfilePicture({ id }) {
  const [preview, setPreview] = useState(null);
  const [profile_pic, setProfile_pic] = useState(null);
  const [error, setError] = useState({});
  const [imageSelected, setImageSelected] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/fetchPicture/${id}`);
        if (response.data && response.data.profile_pic_url) {
          setPreview(response.data.profile_pic_url);
        }
      } catch (error) {
        console.error("Failed to fetch profile picture:", error);
      }
    };

    fetchProfilePicture();
  }, [id]);

  const handleImageChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setImageSelected(true);
      setDropdownOpen(false);
    };

    if (file) {
      reader.readAsDataURL(file);
      setProfile_pic(file);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const addDisplayPicture = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("picture", profile_pic);

    try {
      const response = await axios.post(`http://localhost:3001/api/profilePicture/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
        setImageUploaded(true);
        setShowForm(false);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="text-center">
      <div className="relative inline-block">
      <img
          src={preview || `${process.env.PUBLIC_URL}/vendor/assets/img/default_img.jpg`}
          className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full cursor-pointer border-4 border-green-600 hover:scale-105 transition-all duration-200 ease-in-out transform shadow-md"
          alt="Profile Preview"
          onClick={toggleDropdown}
        />

        {dropdownOpen && !imageUploaded && (
          <div className="absolute bg-white shadow-lg rounded-lg py-2 mt-2 right-0 w-48 z-10">
            <button
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-green-200"
              onClick={handleFileSelect}
            >
              Update Profile Picture
            </button>
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef} 
        style={{ display: 'none' }}
        onChange={(e) => handleImageChange(e.target.files[0])}
      />

      {imageSelected && !imageUploaded && (
        <div className="mt-4">
          <button
            type="button"
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-200 ease-in-out"
            onClick={addDisplayPicture}
          >
            Upload Photo
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePicture;
