import React, { useState, useEffect } from 'react';

const SettingsModal = ({ isOpen, onClose, currentPercentage, currentPayoutDate, onSave }) => {
    const [percentage, setPercentage] = useState(currentPercentage);
    const [payoutDate, setPayoutDate] = useState('');

    // Function to get next month's date in YYYY-MM-DD format
    const getDefaultDate = () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        return date.toISOString().split('T')[0];
    };

    // Update internal state when the modal opens or props change
    useEffect(() => {
        if (isOpen) {
            setPercentage(currentPercentage || 0);
            setPayoutDate(currentPayoutDate || getDefaultDate());
        }
    }, [isOpen, currentPercentage, currentPayoutDate]);

    if (!isOpen) {
        return null;
    }

    const handleSave = () => {
        // Pass an object with both values back to the parent
        onSave({
            payoutInterestPercentage: percentage,
            payoutDate: payoutDate,
        });
        onClose(); // Close the modal after saving
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Admin Settings</h2>
                
                {/* Percentage Input */}
                <div className="mb-4">
                    <label htmlFor="percentage" className="block text-sm font-medium text-gray-700 mb-1">
                        Payout Interest Percentage (%)
                    </label>
                    <input
                        type="number"
                        id="percentage"
                        value={percentage}
                        onChange={(e) => setPercentage(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>

                {/* Date Input */}
                <div className="mb-6">
                    <label htmlFor="payoutDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Next Payout Date
                    </label>
                    <input
                        type="date"
                        id="payoutDate"
                        value={payoutDate}
                        onChange={(e) => setPayoutDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
                    >
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;