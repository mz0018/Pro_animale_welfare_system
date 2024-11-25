import React, { useState, useEffect } from 'react';
import axios from 'axios';

function useGetImageItem(id, success) {
    const [imgSrc, setImgSrc] = useState([]);
    const [getImgError, setGetImgErr] = useState({});
    const apiUrl = process.env.REACT_APP_API_URL;

    const getImage = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/image/${id}`);
            setImgSrc(response.data);
        } catch (error) {
            if (error.response) {
                if (error.response.data && error.response.data.errors) {
                    setGetImgErr(error.response.data.errors);
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
        if (id) {
            getImage();
        }
    }, [id]);

    useEffect(() => {
        let intervalId;

        if (success) {
            intervalId = setInterval(() => {
                getImage();
            }, 2000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [success]);

    return { imgSrc, getImgError };
}

export default useGetImageItem;
