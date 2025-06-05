import React, { useState } from "react";
import useSignupAdmin from "../useHooks/useSignupAdmin";
import useSigninAdmin from "../useHooks/useSigninAdmin";
import { FaSignInAlt } from 'react-icons/fa';

const AdminPage = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const { setAdmin_name, setAdmin_username, setAdmin_password, setContact, setLicense_certificate, signupAdmin, signupError } = useSignupAdmin();
    const { checkAdmin_username, checkAdmin_password, signinAdmin, signinError, loading } = useSigninAdmin();

    const handleSignUpClick = () => {
        setIsSignUp(true);
    };

    const handleSignInClick = () => {
        setIsSignUp(false);
    };

    return (
        <div className="w-full mx-auto p-2">
        {isSignUp ? (
                <div>
                    <h1 className="text-5xl font-bold border-b text-green-600 p-5 flex items-center gap-3">
                    <FaSignInAlt />
                    SignUp Admin
                    </h1>
                    <form onSubmit={signupAdmin} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className={`block w-full p-3 border ${signupError.admin_name ? 'border-red-600' : 'border-green-300'} rounded-lg focus:ring focus:ring-green-100`}
                            onChange={(e) => setAdmin_name(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Username (e.g., admin123)"
                            className={`block w-full p-3 border ${signupError.admin_username || signupError.username_length || signupError.username_taken ? 'border-red-600' : 'border-green-300'} rounded-lg focus:ring focus:ring-green-100`}
                            onChange={(e) => setAdmin_username(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password (min 8 characters)"
                            className={`block w-full p-3 border ${signupError.admin_password || signupError.password_length ? 'border-red-600' : 'border-green-300'} rounded-lg focus:ring focus:ring-green-100`}
                            onChange={(e) => setAdmin_password(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Contact Number"
                            className={`block w-full p-3 border ${signupError.contact || signupError.number_not_valid ? 'border-red-600' : 'border-green-300'} rounded-lg focus:ring focus:ring-green-100`}
                            onChange={(e) => setContact(e.target.value)}
                        />
                        <textarea
                            placeholder="Confirm your veterinary licensure and certifications"
                            className={`block w-full p-3 border ${signupError.license_certificate ? 'border-red-600' : 'border-green-300'} rounded-lg focus:ring focus:ring-green-100`}
                            onChange={(e) => setLicense_certificate(e.target.value)}
                        ></textarea>
                        <span className="text-sm text-red-600">{signupError.admin_name || signupError.admin_username || signupError.admin_password || signupError.license_certificate || signupError.password_length || signupError.username_length || signupError.username_taken || signupError.number_not_valid}</span>
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
                        >
                            Signup
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <button
                                onClick={handleSignInClick}
                                className="text-blue-500 hover:underline"
                            >
                                Sign In
                            </button>
                        </p>
                    </div>
                </div>
            ) : (
                
                <div>
                    <h1 className="text-5xl font-bold border-b text-green-600 p-5 flex items-center gap-3">
                    <FaSignInAlt />
                    SignIn Admin
                    </h1>
                    <form onSubmit={signinAdmin} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Username"
                            className={`block w-full p-3 border ${signinError.invalid || signinError.empty_fields ? 'border-red-600' : 'border-green-300'} rounded-lg focus:ring focus:ring-green-100`}
                            onChange={(e) => checkAdmin_username(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className={`block w-full p-3 border ${signinError.invalid || signinError.empty_fields ? 'border-red-600' : 'border-green-300'} rounded-lg focus:ring focus:ring-green-100`}
                            onChange={(e) => checkAdmin_password(e.target.value)}
                        />
                        <span className="text-sm text-red-600">{signinError.invalid || signinError.empty_fields}</span>
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-3 rounded-lg flex items-center justify-center hover:bg-green-600"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="animate-spin border-4 border-t-transparent border-white rounded-full h-6 w-6"></div>
                                    <span>Loading...</span>
                                </div>
                            ) : (
                                "Signin"
                            )}
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button
                                onClick={handleSignUpClick}
                                className="text-blue-500 hover:underline"
                            >
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
