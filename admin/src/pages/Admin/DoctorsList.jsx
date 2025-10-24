import React, { useContext,useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

import { FaEllipsisV, FaTrash } from 'react-icons/fa'; // Using react-icons for the "i" button and delete icon

const DoctorsList = () => {
     const location = useLocation();
    const navigate = useNavigate();
    const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext);

     useEffect(() => {
        // Check if we were redirected with the reload flag
        if (location.state?.shouldReload) {
            // 1. Important: Clear the state from history.
            // This prevents a reload loop if the user manually refreshes the page later.
            // We use { replace: true } so this action doesn't create a new entry in the browser history.
            navigate(location.pathname, { replace: true, state: {} });

            // 2. Perform the one-time reload.
            window.location.reload();
        }
    }, [location, navigate]);

    const handleDelete = async (doctorId, event) => {
        // Prevent the Link from navigating
        event.preventDefault(); 
        event.stopPropagation();

        // Simple confirmation dialog
        if (window.confirm('Are you sure you want to delete this doctor?')) {
            try {
                // --- Replace with your actual backend endpoint ---
                const response = await fetch(`http://localhost:4000/api/admin/doctors/${doctorId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${aToken}`, // Assuming you use Bearer token for auth
                        'Content-Type': 'application/json'
                    }
                });


                const data = await response.json();
                console.log(data);

                if (response.ok) {
                    console.log('Doctor deleted successfully');
                    // Refresh the list of doctors to reflect the deletion
                    getAllDoctors(); 
                } else {
                    // Handle errors from the backend
                    console.error('Failed to delete doctor:', data.message);
                    alert(`Error: ${data.message}`);
                }
            } catch (error) {
                console.error('An error occurred while deleting the doctor:', error);
                alert('An error occurred. Please try again.');
            }
        }
    };

    if (!doctors || doctors.length === 0) {
        return <div className="p-10 text-center text-gray-500">No doctors found.</div>;
    }

    return (
        <div className='m-5'>
            <h1 className='text-2xl font-bold text-gray-800 mb-6'>Manage Doctors</h1>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {doctors.map((doctor) => (
                    <div key={doctor._id} className="relative">
                        <Link to={`/admin/doctor/${doctor._id}`} className='block'>
                            <div className='bg-white border rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 h-full'>
                                <img
                                    className='w-full h-48 object-cover bg-gray-200'
                                    src={doctor?.image || assets.default_doctor}
                                    alt={`Dr. ${doctor?.name || 'Unknown Doctor'}`}
                                />
                                <div className='p-4'>
                                    <p className='text-lg font-semibold text-gray-800'>{doctor.name}</p>
                                    <p className='text-sm text-teal-600 font-medium'>{doctor.speciality}</p>
                                    <div className='mt-4 flex items-center justify-between'>
                                        <span className='text-sm text-gray-500'>Availability</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={doctor.available}
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    changeAvailability(doctor._id);
                                                }}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        {/* Dropdown for options */}
                        <div className="absolute top-2 right-2 group">
                            <button className="p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-100">
                                <FaEllipsisV className="text-gray-600" />
                            </button>
                            {/* Dropdown Menu */}
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                                <button
                                    onClick={(e) => handleDelete(doctor._id, e)}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white flex items-center"
                                >
                                     <FaTrash className="mr-2" /> Delete
                                </button>
                                {/* You can add more options here in the future */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorsList;
