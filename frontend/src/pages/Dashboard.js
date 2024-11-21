import React, { useState, useEffect, useContext } from 'react';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';
import { HiCheckCircle } from 'react-icons/hi';
import useLogout from '../useHooks/useLogout';
import { AuthContext } from '../context/AuthContext';
import AppointmentList from '../sections/AppointmentList';
import useUploadImageItem from '../useHooks/useUploadImageItem';
import useGetImageItem from '../useHooks/useGetImageItem';
import ProfilePicture from '../sections/ProfilePicture';
import MoreInfo from '../sections/MoreInfo';
import Drawer from '../sections/Drawer';
import Footer from '../sections/Footer';
import AppointmentLogs from '../sections/AppointmentLogs';
import PatientProfiling from '../sections/PatientProfiling';
import ListOfPatients from '../sections/ListOfPatients';

const AdminDashboard = () => {
    const { logoutUser } = useLogout();
    const { user } = useContext(AuthContext);
    const { handleImageChange, uploadImage, setImage, setProd_name, setProd_price, setProd_category, setProd_quantity, preview, imageError, prod_name, prod_price, prod_category, prod_quantity, success } = useUploadImageItem(user?.id);
    const { imgSrc, getImgError } = useGetImageItem(user?.id, success);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('appointments');
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const openDrawer = () => {
        setIsDropdownOpen(false);
        setIsDrawerOpen(true);
    };
    const closeDrawer = () => setIsDrawerOpen(false);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!user) {
        return <div>Loading...</div>;
    }

    const filteredProducts = imgSrc.filter(product => 
        (activeCategory === 'all' || product.prod_category === activeCategory) &&
        product.prod_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gray-100 min-h-screen">
            <nav className="bg-green-100 shadow-lg p-4">
                <div className="container mx-auto flex justify-between items-center flex-wrap">
                    <div className="flex items-center">
                        <ProfilePicture id={user?.id} className="w-10 h-10 mr-3 rounded-full border border-green-600" />
                        <div className="flex flex-col items-center sm:items-start p-4">
                            <h1 className="text-xl font-bold text-green-800 uppercase">{user.username}</h1>
                            <small className="text-green-600 flex items-center">Veterinarian <HiCheckCircle className="ml-1 text-blue-500" /></small>
                        </div>
                    </div>
                    <div className="flex items-center relative">
                        <button onClick={toggleDropdown} className="text-green-600 text-2xl hover:text-green-800 transition duration-300 ease-in-out mr-4">
                            <FaCog />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute top-8 right-0 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                                <button onClick={openDrawer} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-green-200 transition duration-300 ease-in-out">
                                    Settings and Privacy
                                </button>
                            </div>
                        )}
                        {isDrawerOpen && (
                            <Drawer onClose={closeDrawer} content={<MoreInfo id={user?.id} />} />
                        )}
                        <button className="text-gray-600 text-2xl relative hover:text-gray-800 transition duration-300 ease-in-out" onClick={logoutUser}>
                            <FaSignOutAlt className="text-gray-600 hover:text-green-500 transition duration-300 ease-in-out" />
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto mt-6">
                <nav className="flex justify-center border-b border-gray-300 mb-6">
                    <button onClick={() => setActiveTab('appointments')} className={`py-2 px-4 ${activeTab === 'appointments' ? 'border-b-4 border-green-600 text-green-600' : 'text-gray-500'} font-semibold transition`}>
                        Appointments
                    </button>
                    <button onClick={() => setActiveTab('products')} className={`py-2 px-4 ${activeTab === 'products' ? 'border-b-4 border-green-600 text-green-600' : 'text-gray-500'} font-semibold transition`}>
                        Products
                    </button>
                    <button 
                    onClick={() => setActiveTab('patientProfiling')} 
                    className={`py-2 px-4 ${activeTab === 'patientProfiling' ? 'border-b-4 border-green-600 text-green-600' : 'text-gray-500'} font-semibold transition`}
                    >
                        Patient Profiling
                    </button>
                </nav>

                <div>
                    {activeTab === 'appointments' && (
                        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
                            <div className="w-full pr-4">
                                <AppointmentList id={user?.id} />
                            </div>
                            <div className="w-full pr-4">
                                <AppointmentLogs id={user?.id} />
                            </div>
                        </section>
                    )}

                    {activeTab === 'products' && (
                        <section className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row">
                            <div className="md:w-1/3 pr-4 bg-gray-50 p-6 rounded-lg shadow-md">
                                <h2 className="text-2xl font-bold text-green-600 mb-4">Add Product</h2>
                                <form onSubmit={uploadImage} className="flex flex-col space-y-4">
                                    {preview && (
                                        <div className="w-64 h-auto rounded-md overflow-hidden mb-4">
                                            <img src={preview} alt="Image Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <input type="file" onChange={(e) => {
                                        const file = e.target.files[0];
                                        setImage(file);
                                        handleImageChange(file);
                                    }} className={`border ${imageError.no_image ? 'border-red-600' : 'border-gray-300'} rounded-md p-2 cursor-pointer hover:border-gray-500 transition`} />
                                    <input type="text" value={prod_name} placeholder="Product name" className={`border p-3 ${imageError.prod_name ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-600`} onChange={(e) => setProd_name(e.target.value)} />
                                    <input type="number" value={prod_price} placeholder="Product price" className={`border p-3 ${imageError.prod_price || imageError.prod_price_value ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-600`} onChange={(e) => setProd_price(e.target.value)} />
                                    <select value={prod_category} className={`border p-3 ${imageError.prod_category ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-600`} onChange={(e) => setProd_category(e.target.value)}>
                                        <option value="">Select Category</option>
                                        <option value="foods">Foods</option>
                                        <option value="accessories">Accessories</option>
                                        <option value="others">Others</option>
                                    </select>
                                    <input type="number" value={prod_quantity} placeholder="Quantity" className={`border p-3 ${imageError.prod_quantity || imageError.prod_quantity_value ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-600`} onChange={(e) => setProd_quantity(e.target.value)} />
                                    <span className="text-red-600">
                                        {imageError.no_image || imageError.prod_name || imageError.prod_price || imageError.prod_price_value || imageError.prod_category || imageError.prod_quantity || imageError.prod_quantity_value}
                                    </span>
                                    <button type="submit" className="mb-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-200">
                                        Upload Product
                                    </button>
                                </form>
                            </div>

                            <div className="md:w-2/3 pl-4 overflow-y-auto h-[calc(100vh-200px)] bg-gray-50 p-6 rounded-lg shadow-md">
                                <h2 className="text-2xl font-bold text-green-600 mb-4">Products</h2>
                                <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" />
                                <div className="mb-4 flex gap-2">
                                    <button className={`px-4 py-2 rounded ${activeCategory === 'all' ? 'bg-green-500 text-white' : 'bg-gray-200'}`} onClick={() => setActiveCategory('all')}>
                                        All
                                    </button>
                                    <button className={`px-4 py-2 rounded ${activeCategory === 'foods' ? 'bg-green-500 text-white' : 'bg-gray-200'}`} onClick={() => setActiveCategory('foods')}>
                                        Foods
                                    </button>
                                    <button className={`px-4 py-2 rounded ${activeCategory === 'accessories' ? 'bg-green-500 text-white' : 'bg-gray-200'}`} onClick={() => setActiveCategory('accessories')}>
                                        Accessories
                                    </button>
                                    <button className={`px-4 py-2 rounded ${activeCategory === 'others' ? 'bg-green-500 text-white' : 'bg-gray-200'}`} onClick={() => setActiveCategory('others')}>
                                        Others
                                    </button>
                                </div>
                                <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                                    {filteredProducts.map((product, index) => (
                                        <li key={index} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                                            <img src={product.image} alt={product.prod_name} className="w-40 h-40 object-cover rounded-md mb-4" />
                                            <h3 className="text-lg font-semibold text-green-600">{product.prod_name}</h3>
                                            <p className="text-sm text-gray-600">{product.prod_category}</p>
                                            <p className="text-lg text-gray-800 mt-2">Price: ${product.prod_price}</p>
                                            <p className="text-sm text-gray-500 mt-1">Quantity: {product.prod_quantity}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    )}
                    {activeTab === 'patientProfiling' && (
                        <section className="bg-white shadow-md rounded-lg p-6 max-w-full mx-auto">
                            <div className="w-full pr-4">
                                <ListOfPatients id={user?.id} isSuccess={isSuccess} />
                            </div>

                            <div className="w-full pr-4">
                                <button 
                                    onClick={openModal} 
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-200">
                                    Open Patient Profiling Form
                                </button>
                        
                                {isModalOpen && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                        <div className="bg-white p-6 rounded-lg max-w-lg w-full relative overflow-hidden max-h-[90vh]"> 
                                            <button 
                                                onClick={closeModal} 
                                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                                                <span className="text-2xl font-bold">X</span>
                                            </button>
                                            
                                            <h2 className="text-xl font-bold text-green-600 text-center mb-6">Pet Profiling Form</h2>
                                            <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
                                                <PatientProfiling id={user?.id} setIsSuccess={setIsSuccess} closeModal={closeModal} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>                                  
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AdminDashboard;
