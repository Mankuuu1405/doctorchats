import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    speciality: { type: String },
    degree: { type: String },
    experience: { type: String },
    about: { type: String },
    available: { type: Boolean, default: true },
    fees: { type: Number },
    slots_booked: { type: Object, default: {} },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpires: { type: Date },
    profileStatus: { type: String, default: 'incomplete' },

    // --- New & Updated Fields ---
    accountHolderName: { type: String, default: '' },
    mobileNumber: { type: String, default: '' },
    address: { type: String, default: '' }, // Changed from Object to String
    bankName: { type: String, default: '' },
    branchName: { type: String, default: '' },
    accountNo: { type: String, default: '' },
    ifscNo: { type: String, default: '' },

}, { minimize: false });

const doctorModel = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);
export default doctorModel;