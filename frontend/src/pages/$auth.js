import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function $Auth() {
    const [logEmail, setLogEmail] = useState("");
    const [logPassword, setLogPassword] = useState("");
    const [tryEmail, setTryEmail] = useState("");
    const [tryPassword, setTryPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    const { login } = useContext(AuthContext);

    const HandleInsert = async (e) => {
        e.preventDefault();

        try {
          const response = await axios.post(`${apiUrl}/api/insert`, { logEmail, logPassword });
        // debugger;
        } catch (error) {
          console.error("Error: ", error);
          throw(error);
        } 
    };

    const HandleTry = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const res = await axios.post(`${apiUrl}/api/try`, { tryEmail, tryPassword });
          const data = res.data;
          
          login(data.token);

          navigate('/$/auth/db');
        } catch (error) {
          console.error("Error: ", error);
          throw(error);
        } finally {
          setLoading(false);
        }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
  
    <form onSubmit={HandleInsert} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mb-6" style={{ display: "none" }}>
    <h1 className="text-2xl font-bold text-gray-700 mb-4">Insert</h1>
        <input 
        type="password" 
        placeholder="Enter Email" 
        onChange={(e) => setLogEmail(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input 
        type="password" 
        placeholder="Enter Password" 
        onChange={(e) => setLogPassword(e.target.value)}
        className="w-full p-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button 
        type="submit" 
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-300"
        >
        Insert
        </button>
    </form>

    <form onSubmit={HandleTry} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">        
        <input 
        type="password" 
        placeholder="Enter Email" 
        onChange={(e) => setTryEmail(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        
        <input 
        type="password" 
        placeholder="Enter Password" 
        onChange={(e) => setTryPassword(e.target.value)}
        className="w-full p-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        
        <button 
        type="submit" 
        className="w-full bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 transition duration-300 flex justify-center items-center"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin border-4 border-t-transparent border-white rounded-full h-6 w-6"></div>
            <span>Loading...</span>
          </div>
        ) : (
          "Proceed"
        )}
      </button>

    </form>

    </div>

  )
}

export default $Auth
