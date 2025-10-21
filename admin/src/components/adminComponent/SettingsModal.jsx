import React, { useState, useEffect } from 'react';

const SettingsModal = ({ isOpen, onClose, currentPercentage, onSave }) => {
    // Internal state to manage the input field's value
    const [percentage, setPercentage] = useState(currentPercentage);
    const [isSaving, setIsSaving] = useState(false);

    // This effect ensures that if the modal is re-opened,
    // it always shows the most current percentage from the dashboard.
    useEffect(() => {
        setPercentage(currentPercentage);
    }, [currentPercentage]);

    if (!isOpen) {
        return null;
    }

    const handleSave = async () => {
        setIsSaving(true);
        // The onSave function (passed from Dashboard.jsx) does the actual API call.
        // We pass the new percentage value back to it.
        await onSave(percentage);
        setIsSaving(false);
        onClose(); // Close the modal after saving
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Update Interest Percentage</h3>
                
                <div>
                    <label htmlFor="interest-percentage" className="block text-sm font-medium text-gray-700 mb-1">
                        Interest to be deducted (%)
                    </label>
                    <input
                        type="number"
                        id="interest-percentage"
                        value={percentage}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            // Ensure the value is a number between 0 and 100
                            setPercentage(isNaN(value) ? 0 : Math.max(0, Math.min(100, value)));
                        }}
                        min="0"
                        max="100"
                        step="0.1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>

                {/* --- Action Buttons --- */}
                <div className="flex justify-end gap-4 pt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-teal-300"
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;