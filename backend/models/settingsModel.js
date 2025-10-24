import mongoose from 'mongoose';

// Function to calculate the default payout date (one month from now)
const getDefaultPayoutDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date;
};

const settingsSchema = new mongoose.Schema({
    payoutInterestPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        default: 30
    },
    // Add the new field for the payout date
    payoutDate: {
        type: Date,
        required: true,
        default: getDefaultPayoutDate // Use the function to set the default value
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

// The rest of the file remains the same
const Settings = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);

export default Settings;