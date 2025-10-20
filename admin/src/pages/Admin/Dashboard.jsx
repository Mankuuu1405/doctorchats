import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import ConsultationDetailsModal from '../../components/adminComponent/ConsultationDetailsModal.jsx'; // Make sure this path is correct

const Dashboard = () => {
    const { dashData, getDashData } = useContext(AdminContext);
    const navigate = useNavigate();

    // State for managing the modal's visibility and data
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedConsultation, setSelectedConsultation] = useState(null);

    // Fetch dashboard data when the component mounts
    // useEffect(() => {
    //     getDashData();
    // }, []); // Empty dependency array means this runs once on mount

    // // Log dashData for debugging (optional, can be removed in production)
     console.log(dashData);

    // Show a loading state if dashData is not yet available
    if (!dashData) {
        return <div className="p-10 text-center text-gray-600">Loading dashboard data...</div>;
    }

    // Function to open the modal with specific consultation data
    const openModal = (consultation) => {
        setSelectedConsultation(consultation);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedConsultation(null); // Clear selected data when modal closes
    };

    return (
        <div className='m-5 space-y-8'>
            {/* --- STATISTICS CARDS --- */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <StatCard icon={assets.doctor_icon} title="Total Doctors" value={dashData.doctors} />
                <StatCard icon={assets.appointments_icon} title="Total Consultations" value={dashData.consultations} />
                <StatCard icon={assets.patients_icon} title="Total Patients" value={dashData.patients} />
            </div>

            {/* --- LATEST CONSULTATIONS LIST --- */}
            <div className='bg-white rounded-lg shadow-md border'>
                <div className='flex items-center justify-between px-6 py-4 border-b'>
                    <h2 className='font-semibold text-lg text-gray-800'>Latest Consultations</h2>
                    {/* Optional: Button to view all consultations, currently commented out */}
                    {/* <button
                        onClick={() => navigate('/admin/consultations')}
                        className="text-sm text-teal-600 font-semibold hover:underline"
                    >
                        View All
                    </button> */}
                </div>

                <div className='divide-y divide-gray-200'>
                    {/* Check if there are consultations to display */}
                    {dashData.latestConsultations && dashData.latestConsultations.length > 0 ? (
                        dashData.latestConsultations.map((chat) => (
                            <div className='grid grid-cols-4 gap-4 items-center px-6 py-4' key={chat._id}>
                                {/* Patient Information */}
                                <div className='flex items-center gap-3'>
                                    <img 
                                        className='rounded-full w-10 h-10 object-cover' 
                                        src={chat.userId.image || assets.default_user} 
                                        alt="Patient" 
                                    />
                                    <div>
                                        <p className='text-gray-800 font-semibold'>{chat.userId.name}</p>
                                    </div>
                                </div>
                                {/* Doctor Information */}
                                <div className='flex items-center gap-3'>
                                    <img 
                                        className='rounded-full w-10 h-10 object-cover' 
                                        src={chat.doctorId.image || assets.default_doctor} 
                                        alt="Doctor" 
                                    />
                                    <div>
                                        <p className='text-gray-800 font-semibold'>{chat.doctorId.name}</p>
                                    </div>
                                </div>
                                {/* Consultation Date */}
                                <p className="text-gray-500 text-sm">
                                    {new Date(chat.createdAt).toLocaleString()}
                                </p>
                                {/* View Details Button */}
                                <div className="text-right">
                                    <button 
                                        onClick={() => openModal(chat)}
                                        className="px-4 py-2 bg-teal-500 text-white text-sm rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        // Message when no consultations are found
                        <p className="p-6 text-center text-gray-500">No recent consultations found.</p>
                    )}
                </div>
            </div>

            {/* Consultation Details Modal Component */}
            <ConsultationDetailsModal
                isOpen={isModalOpen}
                onClose={closeModal}
                consultation={selectedConsultation}
            />
        </div>
    );
};

// Helper component for the statistic cards (remains unchanged)
const StatCard = ({ icon, title, value }) => (
    <div className='flex items-center gap-4 bg-white p-5 rounded-lg border shadow-sm'>
        <img className='w-12' src={icon} alt={title} />
        <div>
            <p className='text-2xl font-bold text-gray-700'>{value}</p>
            <p className='text-gray-500'>{title}</p>
        </div>
    </div>
);

export default Dashboard;


// import React, { useContext, useEffect } from 'react';
// import { AdminContext } from '../../context/AdminContext';
// import { assets } from '../../assets/assets';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//     const { dashData, getDashData } = useContext(AdminContext);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // The getDashData function is now called automatically from the context
//         // when the admin token is available, but we can call it here for an explicit refresh if needed.
//         getDashData();
//     }, []);
//     console.log(dashData)

//     if (!dashData) {
//         return <div className="p-10 text-center">Loading dashboard data...</div>;
//     }

//     return (
//         <div className='m-5 space-y-8'>
//             {/* --- STATISTICS CARDS (Updated for the new system) --- */}
//             <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
//                 <StatCard icon={assets.doctor_icon} title="Total Doctors" value={dashData.doctors} />
//                 <StatCard icon={assets.appointments_icon} title="Total Consultations" value={dashData.consultations} />
//                 <StatCard icon={assets.patients_icon} title="Total Patients" value={dashData.patients} />
//             </div>

//             {/* --- LATEST CONSULTATIONS LIST --- */}
//             <div className='bg-white rounded-lg shadow-md border'>
//                 <div className='flex items-center justify-between px-6 py-4 border-b'>
//                     <h2 className='font-semibold text-lg text-gray-800'>Latest Consultations</h2>
//                     {/* <button 
//                         onClick={() => navigate('/admin/consultations')}
//                         className="text-sm text-teal-600 font-semibold hover:underline"
//                     >
//                         View All
//                     </button> */}
//                 </div>

//                 <div className='divide-y divide-gray-200'>
//                     {dashData.latestConsultations && dashData.latestConsultations.length > 0 ? (
//                         dashData.latestConsultations.map((chat) => (
//                             <div className='grid grid-cols-3 gap-4 items-center px-6 py-4' key={chat._id}>
//                                 {/* Patient Info */}
//                                 <div className='flex items-center gap-3'>
//                                     <img className='rounded-full w-10 h-10 object-cover' src={chat.userId.image || assets.default_user} alt="Patient" />
//                                     <div>
//                                         <p className='text-gray-800 font-semibold'>{chat.userId.name}</p>
//                                     </div>
//                                 </div>
//                                 {/* Doctor Info */}
//                                 <div className='flex items-center gap-3'>
//                                     <img className='rounded-full w-10 h-10 object-cover' src={chat.doctorId.image || assets.default_doctor} alt="Doctor" />
//                                     <div>
//                                         <p className='text-gray-800 font-semibold'>{chat.doctorId.name}</p>
//                                     </div>
//                                 </div>
//                                 {/* Date */}
//                                 <p className="text-gray-500 text-sm text-right">
//                                     {new Date(chat.createdAt).toLocaleString()}
//                                 </p>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="p-6 text-center text-gray-500">No recent consultations found.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Helper component for the statistic cards
// const StatCard = ({ icon, title, value }) => (
//     <div className='flex items-center gap-4 bg-white p-5 rounded-lg border shadow-sm'>
//         <img className='w-12' src={icon} alt={title} />
//         <div>
//             <p className='text-2xl font-bold text-gray-700'>{value}</p>
//             <p className='text-gray-500'>{title}</p>
//         </div>
//     </div>
// );

// export default Dashboard;