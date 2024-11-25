import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function useUploadImageItem(id) {
    const [image, setImage] = useState(null);
    const [prod_name, setProd_name] = useState("");
    const [prod_price, setProd_price] = useState("");
    const [prod_category, setProd_category] = useState("");
    const [prod_quantity, setProd_quantity] = useState("");
    const [imageError, setImageError] = useState({});
    const [preview, setPreview] = useState(null);
    const [success, setSuccess] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleImageChange = (file) => {   
        try {
            const reader = new FileReader();

            reader.onloadend = () => {
                setPreview(reader.result);
            }

            if (file) {
                reader.readAsDataURL(file);
            }
        } catch (error) {
            console.error("Failed to file ", error);
        }
    }

    const uploadImage = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        formData.append("prod_name", prod_name);
        formData.append("prod_price", prod_price);
        formData.append("prod_category", prod_category);
        formData.append("prod_quantity", prod_quantity);

        try {
            const response = await axios.post(`${apiUrl}/api/uploads/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                console.log(response.data);
                setSuccess(true);
                Swal.fire({
                    title: 'Upload Complete',
                    text: 'File has been uploaded successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                    timerProgressBar: true,
                    position: 'center',
                });
            }

        } catch (error) {
            if (error.response) {
                if (error.response.data && error.response.data.errors) {
                    setImageError(error.response.data.errors);
                } else {
                    console.error("Server responded with an unexpected format:", error.response.data);
                }
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error setting up request:", error.message);
            }
        }
    };

    useEffect(() => {
        if (success) {
            setImage(null);
            setPreview(null);
            setProd_name("");
            setProd_price("");
            setProd_category("");
            setProd_quantity("");
        }
    },[success]);

    return { handleImageChange, uploadImage, setImage, setProd_name, setProd_price, setProd_category, setProd_quantity, preview, imageError, prod_name, prod_price, prod_category, prod_quantity, success };
}

export default useUploadImageItem;
