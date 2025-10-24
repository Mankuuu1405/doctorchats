import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import ConsultationDetailsModal from "../../components/adminComponent/ConsultationDetailsModal.jsx";
import SettingsModal from "../../components/adminComponent/SettingsModal.jsx";
import * as XLSX from 'xlsx';
 
const Dashboard = () => {
  const { dashData, getDashData, settings, aToken, backendUrl } = useContext(AdminContext);
  const navigate = useNavigate();
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
 
  if (!dashData) {
    return (
<<<<<<< HEAD
      <div className="p-10 text-center text-gray-600">
        Loading dashboard data...
      </div>
=======
        <div className='m-5 space-y-8'>
            {/* --- STATISTICS CARDS --- */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
                <StatCard icon={assets.doctor_icon} title="Total Doctors" value={dashData.doctors} />
                <StatCard icon={assets.appointments_icon} title="Total Consultations" value={dashData.consultations} />
                <StatCard icon={assets.patients_icon} title="Total Patients" value={dashData.patients} />
                <div onClick={() => setIsSettingsModalOpen(true)} className="cursor-pointer">
    <StatCard 
        icon={assets.earning_icon}  
        title="Interest Percentage" 
        value={`${dashData.settings.payoutInterestPercentage}%`} 
    />
</div>
            </div>

            {/* --- LATEST CONSULTATIONS LIST --- */}
            <div className='bg-white rounded-lg shadow-md border'>
                <div className='flex items-center justify-between px-6 py-4 border-b'>
                    <h2 className='font-semibold text-lg text-gray-800'>Latest Consultations</h2>
                   
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
                                        src={chat.userId?.image || assets.default_user} 
                                        alt="Patient" 
                                    />
                                    <div>
                                        <p className='text-gray-800 font-semibold'>{chat.userId?.name || 'Unknown Patient'}</p>
                                    </div>
                                </div>
                                {/* Doctor Information */}
                                <div className='flex items-center gap-3'>
                                    <img 
                                        className='rounded-full w-10 h-10 object-cover' 
                                        src={chat.doctorId?.image || assets.default_doctor} 
                                        alt="Doctor" 
                                    />
                                    <div>
                                        <p className='text-gray-800 font-semibold'>{chat.doctorId?.name || 'Unknown Doctor'}</p>
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
             <SettingsModal
                isOpen={isSettingsModalOpen}
                onClose={() => setIsSettingsModalOpen(false)}
                currentPercentage={dashData.settings.payoutInterestPercentage}
                onSave={handleUpdateSettings}
            />
        </div>
>>>>>>> origin/main
    );
  }

  const formatDate = (dateString) => {
        if (!dateString) return "Not Set";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
 
  const openModal = (consultation) => {
    setSelectedConsultation(consultation);
    setIsModalOpen(true);
  };
 
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedConsultation(null);
  };
 
  const handleUpdateSettings = async (newPercentage) => {
    settings(newPercentage);
  };
 
  const downloadMonthlyPayment = async () => {
    try {
      setIsDownloading(true);
     
      // Fetch payment data from backend
      const response = await fetch(`${backendUrl}/api/admin/monthly-payments`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${aToken}`,
          'Content-Type': 'application/json'
        }
      });
 
      if (!response.ok) {
        throw new Error('Failed to fetch payment data');
      }
 
      const paymentData = await response.json();
 
      if (!paymentData.success || !paymentData.payments || paymentData.payments.length === 0) {
        alert('No payment data available for this month');
        setIsDownloading(false);
        return;
      }
 
      // Prepare data for Excel
      const excelData = paymentData.payments.map((doctor, index) => ({
        'S.No': index + 1,
        'Doctor Name': doctor.name,
        'Email': doctor.email,
        'Speciality': doctor.speciality || 'N/A',
        'Total Consultations': doctor.totalConsultations,
        'Gross Amount (₹)': doctor.grossAmount.toFixed(2),
        'Platform Fee (%)': doctor.platformFeePercentage,
        'Platform Fee (₹)': doctor.platformFee.toFixed(2),
        'Net Payout (₹)': doctor.netPayout.toFixed(2),
        'Account Holder Name': doctor.payment.bankAccount.accountHolderName || 'Not Provided',
        'Account Number': doctor.payment.bankAccount.accountNumber || 'Not Provided',
        'IFSC Code': doctor.payment.bankAccount.ifscCode || 'Not Provided',
        'Bank Name': doctor.payment.bankAccount.bankName || 'Not Provided',
        'Razorpay Account ID': doctor.payment.razorpay.accountId || 'Not Provided',
        'Razorpay Key ID': doctor.payment.razorpay.keyId || 'Not Provided'
      }));
 
      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(excelData);
 
      // Set column widths for better readability
      const colWidths = [
        { wch: 6 },  // S.No
        { wch: 20 }, // Doctor Name
        { wch: 25 }, // Email
        { wch: 15 }, // Speciality
        { wch: 18 }, // Total Consultations
        { wch: 18 }, // Gross Amount
        { wch: 16 }, // Platform Fee %
        { wch: 16 }, // Platform Fee
        { wch: 16 }, // Net Payout
        { wch: 25 }, // Account Holder Name
        { wch: 20 }, // Account Number
        { wch: 15 }, // IFSC Code
        { wch: 20 }, // Bank Name
        { wch: 25 }, // Razorpay Account ID
        { wch: 25 }  // Razorpay Key ID
      ];
      ws['!cols'] = colWidths;
 
      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Monthly Payments');
 
      // Generate filename with current month and year
      const currentDate = new Date();
      const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
      const filename = `Doctor_Payments_${monthYear}.xlsx`;
 
      // Download the file
      XLSX.writeFile(wb, filename);
 
      setIsDownloading(false);
    } catch (error) {
      console.error('Error downloading payment sheet:', error);
      alert('Failed to download payment sheet. Please try again.');
      setIsDownloading(false);
    }
  };
 
  return (
    <div className="m-5 space-y-8">
      {/* --- STATISTICS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          icon={assets.doctor_icon}
          title="Total Doctors"
          value={dashData.doctors}
        />
        <StatCard
          icon={assets.appointments_icon}
          title="Total Consultations"
          value={dashData.consultations}
        />
        <StatCard
          icon={assets.patients_icon}
          title="Total Patients"
          value={dashData.patients}
        />
        
          <div onClick={() => setIsSettingsModalOpen(true)} className="cursor-pointer space-y-2 p-5 bg-white rounded-lg border shadow-sm">
                    <div className='flex items-center gap-4'>
                        <img className='w-12' src={assets.earning_icon} alt="Interest Percentage" />
                        <div>
                            <p className='text-2xl font-bold text-gray-700'>{`${dashData.settings.payoutInterestPercentage}%`}</p>
                            <p className='text-gray-500'>Interest Percentage</p>
                        </div>
                    </div>
                     <div className='flex items-center gap-4 pt-2 border-t mt-2'>
                        <img className='w-12' src={assets.appointments_icon} alt="Next Payout Date" />
                        <div>
                            <p className='text-lg font-bold text-gray-700'>{formatDate(dashData.settings.payoutDate)}</p>
                            <p className='text-gray-500'>Next Payout Date</p>
                        </div>
                    </div>
                </div>
          
        
      </div>
 
      {/* --- DOWNLOAD PAYMENT BUTTON --- */}
      <div className="flex justify-center">
        <button
          onClick={downloadMonthlyPayment}
          disabled={isDownloading}
          className="flex items-center gap-3 bg-teal-500 text-white px-8 py-4 rounded-lg shadow-md hover:bg-teal-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <div className="text-left">
            <p className="font-semibold text-lg">
              {isDownloading ? 'Generating...' : 'Download This Month\'s Payment'}
            </p>
            <p className="text-sm text-teal-100">
              Export doctor payment details to Excel
            </p>
          </div>
        </button>
      </div>
 
      {/* --- LATEST CONSULTATIONS LIST --- */}
      <div className="bg-white rounded-lg shadow-md border">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="font-semibold text-lg text-gray-800">
            Latest Consultations
          </h2>
        </div>
 
        <div className="divide-y divide-gray-200">
          {dashData.latestConsultations &&
          dashData.latestConsultations.length > 0 ? (
            dashData.latestConsultations.map((chat) => (
              <div
                className="grid grid-cols-4 gap-4 items-center px-6 py-4"
                key={chat._id}
              >
                <div className="flex items-center gap-3">
                  <img
                    className="rounded-full w-10 h-10 object-cover"
                    src={chat.userId?.image || assets.default_user}
                    alt="Patient"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">
                      {chat.userId?.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="rounded-full w-10 h-10 object-cover"
                    src={chat.doctorId.image || assets.default_doctor}
                    alt="Doctor"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">
                      {chat.doctorId?.name}
                    </p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">
                  {new Date(chat.createdAt).toLocaleString()}
                </p>
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
            <p className="p-6 text-center text-gray-500">
              No recent consultations found.
            </p>
          )}
        </div>
      </div>
 
      <ConsultationDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        consultation={selectedConsultation}
      />
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        currentPercentage={dashData.settings.payoutInterestPercentage}
        onSave={handleUpdateSettings}
      />
    </div>
  );
};
 
const StatCard = ({ icon, title, value }) => (
  <div className="flex items-center gap-4 bg-white p-5 rounded-lg border shadow-sm">
    <img className="w-12" src={icon} alt={title} />
    <div>
      <p className="text-2xl font-bold text-gray-700">{value}</p>
      <p className="text-gray-500">{title}</p>
    </div>
  </div>
);
<<<<<<< HEAD
 
export default Dashboard;
=======

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
>>>>>>> origin/main
