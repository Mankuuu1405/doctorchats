import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import Settings from '../models/settingsModel.js';
// --- THIS IS THE MOST LIKELY FIX: Correctly import from the file, not the folder ---
import Chat from "../models/Chat.js"; 
import cloudinary from '../config/cloudinary.js';

// === API for admin login ===
const loginAdmin = async (req, res) => {
    console.log("Reached here")
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const payload = { isAdmin: true };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.json({ success: true, token });
        } else {
            res.status(401).json({ success: false, message: "Invalid admin credentials" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// === API for adding a pre-approved Doctor ===
const addDoctor = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Name, email, and password are required." });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newDoctor = new doctorModel({ name, email, password: hashedPassword });
        await newDoctor.save();
        res.json({ success: true, message: "Doctor added successfully. The doctor can now log in and complete their profile." });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: "A doctor with this email already exists." });
        }
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to create account." });
    }
};

// === API to get all doctors list ===
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch doctors." });
    }
};


//get all paitents
const allUsers = async (req, res) => {
    console.log("reached here");    
    try {
        const Users = await userModel.find({}).select('-password');
        res.json({ success: true, Users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch users." });
    }
};


// === API to get all chat sessions ===
const getChatSessions = async (req, res) => {
    try {
        const chats = await Chat.find({})
            .populate('userId', 'name email image')
            .populate('doctorId', 'name speciality image')
            .sort({ createdAt: -1 });
        res.json({ success: true, chats });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch consultations." });
    }
};

// === API for Admin Dashboard ===
const adminDashboard = async (req, res) => {
    try {
        const doctorsCount = await doctorModel.countDocuments({});
        const patientsCount = await userModel.countDocuments({});
        const consultationsCount = await Chat.countDocuments({});
        
        
        let settings = await Settings.findOne({});
        if (!settings) {
            
            settings = await new Settings().save(); 
        }
         const latestConsultationsDocs = await Chat.find({})
            .populate('userId', 'name image')
            .populate('doctorId', 'name')
            .sort({ createdAt: -1 })
            .limit(5)
            .lean(); // Use .lean() for performance and easier manipulation
         const latestConsultations = latestConsultationsDocs.map(consultation => {
            return {
                ...consultation, // Copy all existing properties from the consultation
                settings: settings  // Add the settings object as a new property
            };
        });

        const dashData = {
            doctors: doctorsCount,
            patients: patientsCount,
            consultations: consultationsCount, 
            latestConsultations: latestConsultations,
            settings: settings
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.log("Dashboard Error:", error); 
        res.status(500).json({ success: false, message: "Failed to load dashboard data." });
    }
};

const getDoctorProfileForAdmin = async (req, res) => {
    try {
        const doctor = await doctorModel.findById(req.params.id).select('-password');
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found." });
        }
        res.json({ success: true, profileData: doctor });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch doctor profile." });
    }
};

const updateDoctorProfileByAdmin = async (req, res) => {
        try {
        const { id } = req.params; // Doctor ID from URL
        const { name, speciality, degree, experience, fees, about, available } = req.body;

        let imageUrl = req.body.image; // Default to existing image if not updated

        // Handle image upload if a new file is provided
        if (req.file) {
            // Upload new image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "doctor_profiles", // Specify a folder in Cloudinary
            });
            imageUrl = result.secure_url; // Get the secure URL of the uploaded image
        }

        const updatedDoctor = await doctorModel.findByIdAndUpdate(id, {
            name,
            speciality,
            degree,
            experience,
            fees,
            about,
            available,
            image: imageUrl // Update image URL
        }, { new: true, runValidators: true }); // `new: true` returns the updated document, `runValidators: true` runs schema validators

        if (!updatedDoctor) {
            return res.status(404).json({ success: false, message: "Doctor not found." });
        }

        res.json({ success: true, message: "Doctor profile updated successfully.", profileData: updatedDoctor });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to update doctor profile." });
    }
};

//remove doctor 
const removeDoctor = async (req, res) => {
    try {
        
        // Find the doctor by the ID provided in the URL and delete them
        const doctor = await doctorModel.findByIdAndDelete(req.params.id);

        if (!doctor) {
            // If no doctor was found with that ID, send a 404 Not Found error
            return res.status(404).json({ success: false, message: "Doctor not found." });
        }
        
       
        if (doctor.image) {
            // Extract the public_id from the image URL
            const publicId = doctor.image.split('/').pop().split('.')[0];
            if (publicId) {
                // The folder name must match what you used during upload
                await cloudinary.uploader.destroy(`doctor_profiles/${publicId}`);
            }
        }

        res.json({ success: true, message: "Doctor removed successfully." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error removing doctor." });
    }
};
//delete users
const removeUser = async (req, res) => {
    console.log("here");
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Now, 'cloudinary' will be a defined object and this code will work.
        if (user.image) {
            const publicId = user.image.split('/').pop().split('.')[0];
            if (publicId) {
                // Ensure the folder name 'user_profiles' is correct.
                await cloudinary.uploader.destroy(`user_profiles/${publicId}`);
            }
        }

        res.json({ success: true, message: "User removed successfully." });

    } catch (error) {
        console.log("Error removing user:", error);
        res.status(500).json({ success: false, message: "Error removing user." });
    }
};

// const getSettings = async (req, res) => {
//     try {
//         // Find the single settings document. If it doesn't exist, create one.
//         let settings = await Settings.findOne({});
//         if (!settings) {
//             settings = await new Settings().save();
//         }
//         res.json({ success: true, settings });
//     } catch (error) {
//         console.log("Error fetching settings:", error);
//         res.status(500).json({ success: false, message: "Failed to fetch settings." });
//     }
// };

// === API to UPDATE application settings ===
const updateSettings = async (req, res) => {
    console.log("hereloo")
    try {
        const { payoutInterestPercentage } = req.body;

        // Find the single settings document and update it.
        // The 'upsert: true' option will create the document if it doesn't exist.
        const updatedSettings = await Settings.findOneAndUpdate(
            {}, // Find the one and only document
            { payoutInterestPercentage }, // Apply the update
            { new: true, upsert: true, runValidators: true } // Options
        );

        res.json({ success: true, message: "Settings updated successfully.", settings: updatedSettings });
    } catch (error) {
        console.log("Error updating settings:", error);
        res.status(500).json({ success: false, message: "Failed to update settings." });
    }
};


export {
    loginAdmin,
    getChatSessions,
    addDoctor,
    allDoctors,
    adminDashboard,
    getDoctorProfileForAdmin,
    updateDoctorProfileByAdmin,
    removeDoctor,
    allUsers,
    removeUser,
    // getSettings,    
    updateSettings
}