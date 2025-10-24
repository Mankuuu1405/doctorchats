import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets'; // For the default user image
import { FaTrash } from 'react-icons/fa';

const PatientList = () => {
    const { users, aToken, getAllUsers, toggleUserBlockStatus,removeUser } = useContext(AdminContext);

    // useEffect(() => {
    //     if (aToken) {
    //         getAllUsers();
    //     }
    // }, [aToken, getAllUsers]);

    const handleToggleBlock = async (userId, currentBlockStatus) => {
        if (toggleUserBlockStatus) {
            await toggleUserBlockStatus(userId, !currentBlockStatus);
        }
    };
     const handleDeleteUser = (userId, userName) => {
        // Show a confirmation dialog before deleting
        if (window.confirm(`Are you sure you want to delete the user "${userName}"? This action cannot be undone.`)) {
            removeUser(userId);
        }
    };

    // A loading state is good practice
    if (users === null) {
        return <div className="p-10 text-center text-gray-500">Loading patients...</div>;
    }

    // An empty state for when the API returns no users
    if (users.length === 0) {
        return <div className="p-10 text-center text-gray-500">No patients found.</div>;
    }

    

    return (
        <div className='m-5'>
            <h1 className='text-2xl font-bold text-gray-800 mb-6'>Manage Patients</h1>

            {/* --- NEW TABLE STRUCTURE --- */}
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img 
                                                className="h-10 w-10 rounded-full object-cover" 
                                                src={user?.image || assets.default_user} 
                                                alt={`Avatar of ${user?.name || 'Unknown User'}`} 
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{user.email}</div>
                                </td>
                                
                                
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => handleDeleteUser(user._id, user.name)}
                                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                        title="Delete User"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PatientList;
