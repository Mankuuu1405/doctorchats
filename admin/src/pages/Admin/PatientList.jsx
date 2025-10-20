import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets'; // Assuming you might have a default user image here
import { Link } from 'react-router-dom'; // If you want to link to individual user profiles later

const PatientList = () => {
    // Destructure the necessary state and functions from AdminContext
    const { users, aToken, getAllUsers, toggleUserBlockStatus } = useContext(AdminContext);

    // Fetch users when the component mounts or aToken changes
    useEffect(() => {
        if (aToken) {
            getAllUsers();
        }
        // Depend on aToken and getAllUsers to ensure re-fetching when necessary
    }, [aToken, getAllUsers]);

    const handleToggleBlock = async (userId, currentBlockStatus) => {
        // Prevent event bubbling if the toggle is inside a Link
        // event.stopPropagation();
        // event.preventDefault(); // Might need this if the Link is problematic

        // Call the context function to toggle the block status
        await toggleUserBlockStatus(userId, !currentBlockStatus);
        // After toggling, you might want to re-fetch all users to update the UI
        // Or, if your toggleUserBlockStatus updates the local 'users' state, this isn't strictly necessary.
        // For simplicity, let's assume toggleUserBlockStatus updates the local state.
    };

    if (!users || users.length === 0) {
        return <div className="p-10 text-center text-gray-500">No patients found.</div>;
    }

    return (
        <div className='m-5'>
            <h1 className='text-2xl font-bold text-gray-800 mb-6'>Manage Patients</h1>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {users.map((user) => (
                    // You can wrap the entire card in a Link to a user profile if needed
                    // For now, let's make the card clickable, but the toggle needs special handling
                    <div 
                        key={user._id}
                        className='bg-white border rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1'
                        // If you want to navigate, uncomment Link and adjust handleToggleBlock
                        // <Link to={`/admin/patient/${user._id}`} key={user._id}>
                    >
                        <img
                            className='w-full h-48 object-cover bg-gray-200'
                            src={user.image || assets.default_user} // Use a default image if one is missing
                            alt={`User: ${user.name}`}
                        />
                        <div className='p-4'>
                            <p className='text-lg font-semibold text-gray-800'>{user.name}</p>
                            <p className='text-sm text-gray-600'>{user.email}</p>
                            <div className='mt-4 flex items-center justify-between'>
                                <span className='text-sm text-gray-500'>{user.isBlocked ? 'Blocked' : 'Active'}</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={!user.isBlocked} // Checkbox is checked if user is NOT blocked (i.e., active)
                                        onChange={() => handleToggleBlock(user._id, user.isBlocked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    // </Link>
                ))}
            </div>
        </div>
    );
};

export default PatientList;