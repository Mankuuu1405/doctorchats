import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
    payoutInterestPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        default: 30
    },
    // You can add more global settings here in the future
    // e.g., siteTitle: { type: String, default: 'My App' }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;