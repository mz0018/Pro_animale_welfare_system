import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ConnectionContext = createContext(null);

export const ConnectionProvider = ({ children }) => {
    const [isOnline, setIsOnline] = useState(false);

    const checkInternetConnection = async () => {
        try {
            //for checking internet connectivity, this is a public endpoint
            const response = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
            if (response.status === 200) {
                setIsOnline(true);
            } else {
                setIsOnline(false);
            }
        } catch (err) {
            setIsOnline(false);
        }
    };

    useEffect(() => {
        checkInternetConnection();
        const handleOnline = () => checkInternetConnection();
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <ConnectionContext.Provider value={isOnline}>
            {children}
        </ConnectionContext.Provider>
    );
};

export default ConnectionContext;
