import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets.js';

const ConsultationDetailsModal = ({ isOpen, onClose, consultation }) => {
    if (!isOpen || !consultation) return null;

    const {
        userId,
        doctorId,
        amount,
        createdAt,
        expiresAt,
        paymentStatus,
        paymentDetails,
        messages,
        _id,
        settings
    } = consultation;
    console.log(consultation);

    // Initialize toggle states with nullish coalescing for safety
    const [isUserBlocked, setIsUserBlocked] = useState(userId?.isBlocked ?? false);
    const [isDoctorBlocked, setIsDoctorBlocked] = useState(doctorId?.isBlocked ?? false);

    // New state for interest and calculated amount
    const interestDeduction= settings.payoutInterestPercentage// Admin input
    const [amountAfterDeduction, setAmountAfterDeduction] = useState(amount); // Calculated

    // Update amountAfterDeduction whenever interestDeduction or original amount changes
    useEffect(() => {
        const deductedAmount = amount - (amount * (interestDeduction / 100));
        setAmountAfterDeduction(Math.max(0, deductedAmount).toFixed(2)); // Ensure not negative, two decimal places
    }, [amount, interestDeduction]);

    // ✅ Toggle User Block/Unblock
    
    // ✅ Handle Pay Now (Doctor Payout)
    const handlePayNow = async () => {
        if (!doctorId?._id) {
            alert("Error: Doctor ID not found for payout.");
            return;
        }

        const confirmPayout = window.confirm(
            `Confirm payout of ₹${amountAfterDeduction} to Dr. ${doctorId.name} (ID: ${doctorId._id})?`
        );

        if (!confirmPayout) {
            return;
        }

        // try {
           
        //     const response = await fetch(`http://localhost:4000/api/admin/payouts/process`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             // Include authorization token if required for admin actions
        //             // 'Authorization': `Bearer ${adminAuthToken}`
        //         },
        //         body: JSON.stringify({
        //             consultationId: _id,
        //             doctorId: doctorId._id,
        //             originalAmount: amount,
        //             interestDeductedPercentage: interestDeduction,
        //             payoutAmount: amountAfterDeduction,
        //             // Add any other relevant payout details like adminId, transactionId etc.
        //         }),
        //     });

        //     if (!response.ok) {
        //         const errorData = await response.json();
        //         alert(`❌ Payout failed: ${errorData.message || 'Server error'}`);
        //         console.error("❌ Payout failed:", errorData);
        //     } else {
        //         const successData = await response.json();
        //         alert(`✅ Payout of ₹${amountAfterDeduction} successful! Transaction ID: ${successData.transactionId || 'N/A'}`);
        //         console.log("✅ Payout successful:", successData);
        //         // Optionally, you might want to refresh the consultation details
        //         // or close the modal if the payout marks it as complete.
        //         // onClose(); // Example: Close modal on success
        //     }
        // } catch (error) {
        //     alert("⚠️ Network error during payout. Please try again.");
        //     console.error("⚠️ Network error during payout:", error);
        // }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="text-xl font-semibold text-gray-800">Consultation Details</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6 text-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* User Info */}
                        <div className="bg-gray-50 p-4 rounded-md">
                            <h4 className="font-medium text-lg mb-2 text-teal-700">Patient Information</h4>
                            <div className="flex items-center gap-3 mb-3">
                                <img
                                    className="rounded-full w-12 h-12 object-cover border border-gray-300"
                                    src={userId?.image || assets.default_user}
                                    alt="Patient"
                                />
                                <p className="font-semibold text-gray-800">{userId?.name}</p>
                            </div>
                            <p><strong>ID:</strong> {userId?._id}</p>

                            {/* Toggle */}
                            {/* <div className="mt-4 flex items-center justify-between">
                                <span className="font-medium">Status: </span>
                                <label htmlFor={`user-toggle-${userId?._id}`} className="flex items-center cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            id={`user-toggle-${userId?._id}`}
                                            className="sr-only"
                                            checked={!isUserBlocked}
                                            onChange={handleToggleUserStatus}
                                        />
                                        <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                                        <div
                                            className={`dot absolute left-1 top-1 w-6 h-6 rounded-full transition-transform duration-300
                                            ${!isUserBlocked ? 'translate-x-6 bg-green-500' : 'translate-x-0 bg-red-500'}`}
                                        ></div>
                                    </div>
                                    <span className="ml-3 font-medium">{isUserBlocked ? 'Blocked' : 'Active'}</span>
                                </label>
                            </div> */}
                        </div>

                        {/* Doctor Info */}
                        <div className="bg-gray-50 p-4 rounded-md">
                            <h4 className="font-medium text-lg mb-2 text-teal-700">Doctor Information</h4>
                            <div className="flex items-center gap-3 mb-3">
                                <img
                                    className="rounded-full w-12 h-12 object-cover border border-gray-300"
                                    src={doctorId?.image || assets.default_doctor}
                                    alt="Doctor"
                                />
                                <p className="font-semibold text-gray-800">{doctorId?.name}</p>
                            </div>
                            <p><strong>ID:</strong> {doctorId?._id}</p>

                            {/* Toggle */}
                            {/* <div className="mt-4 flex items-center justify-between">
                                <span className="font-medium">Status: </span>
                                <label htmlFor={`doctor-toggle-${doctorId?._id}`} className="flex items-center cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            id={`doctor-toggle-${doctorId?._id}`}
                                            className="sr-only"
                                            checked={!isDoctorBlocked}
                                            onChange={handleToggleDoctorStatus}
                                        />
                                        <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                                        <div
                                            className={`dot absolute left-1 top-1 w-6 h-6 rounded-full transition-transform duration-300
                                            ${!isDoctorBlocked ? 'translate-x-6 bg-green-500' : 'translate-x-0 bg-red-500'}`}
                                        ></div>
                                    </div>
                                    <span className="ml-3 font-medium">{isDoctorBlocked ? 'Blocked' : 'Active'}</span>
                                </label>
                            </div> */}
                        </div>
                    </div>

                    {/* Consultation Overview */}
                    <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium text-lg mb-2 text-teal-700">Consultation Overview</h4>
                        <p><strong>Consultation ID:</strong> {_id}</p>
                        <p><strong>Original Amount:</strong> ₹{amount}</p> {/* Label changed to reflect original */}
                        <p><strong>Payment Status:</strong> {paymentStatus ? 'Paid' : 'Pending'}</p>
                        <p><strong>Started At:</strong> {new Date(createdAt).toLocaleString()}</p>
                        <p><strong>Expires At:</strong> {new Date(expiresAt).toLocaleString()}</p>
                    </div>

                    

                    {/* Payment Details */}
                    {paymentStatus && paymentDetails && (
                        <div className="bg-gray-50 p-4 rounded-md">
                            <h4 className="font-medium text-lg mb-2 text-teal-700">Payment Transaction</h4>
                            <p className="break-all"><strong>Order ID:</strong> {paymentDetails.orderId}</p>
                            <p className="break-all"><strong>Payment ID:</strong> {paymentDetails.paymentId}</p>
                            <p className="break-all"><strong>Signature:</strong> {paymentDetails.signature}</p>
                        </div>
                    )}

                    {/* Messages */}
                    <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium text-lg mb-2 text-teal-700">Messages</h4>
                        <p><strong>Total Messages:</strong> {messages ? messages.length : 0}</p>
                        {messages && messages.length > 0 ? (
                            <div className="mt-2 text-sm text-gray-600 max-h-40 overflow-y-auto border p-3 rounded">
                                {messages.map((msg, i) => (
                                    <p key={i}>
                                        <span className="font-medium">
                                            {msg.sender === userId?._id ? userId?.name : doctorId?.name}:
                                        </span> {msg.message}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-600">No messages yet.</p>
                        )}
                    </div>
                </div>

                {/* New: Payout Calculation Fields */}
                    <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mx-10">
                        <h4 className="font-medium text-lg mb-3 text-blue-800">Payout Calculation</h4>
                        <div className="mb-3 flex gap-8">
                            <label htmlFor="interestDeduction" className="block text-sm font-medium text-gray-700 mb-1">
                                Interest to be deducted (%)
                            </label>
                            <input
                                type="number"
                                id="interestDeduction"
                                value={interestDeduction}
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    setInterestDeduction(isNaN(value) ? 0 : Math.max(0, Math.min(100, value))); // Ensure 0-100%
                                }}
                                min="0"
                                max="100"
                                step="0.5"
                                className="mt-1 block w-70 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                disabled={paymentStatus === false} // Disable if original payment isn't paid
                            />
                        </div>
                        <div className="mb-3">
                            <p className="block text-sm font-medium text-gray-700 mb-1">
                                Amount after deduction:
                            </p>
                            <p className="text-xl font-bold text-blue-700">
                                ₹{amountAfterDeduction}
                            </p>
                        </div>
                        <div className="text-right mt-4">
                           
                        </div>
                    </div>

                {/* Footer */}
                <div className="p-5 border-t text-right">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-teal-600 mr-8 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                        Close
                    </button>
                     <button
                                onClick={handlePayNow}
                                className={`px-6 py-2 rounded-md font-semibold transition-colors duration-200
                                    ${paymentStatus === true
                                        ? 'bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                                        : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                    }`}
                                disabled={paymentStatus === false} // Disable if original payment isn't paid
                            >
                                Pay Now
                            </button>
                </div>
            </div>
        </div>
    );
};

export default ConsultationDetailsModal;
