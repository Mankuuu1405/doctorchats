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

        if (user.image) {
            // --- ADD THIS LOG RIGHT BEFORE THE 'destroy' CALL ---
            console.log("Cloudinary object inside removeUser:", cloudinary);

            const publicId = user.image.split('/').pop().split('.')[0];
            
            if (publicId) {
                // We will also add a try/catch here for robustness
                try {
                    console.log(`Attempting to destroy: user_profiles/${publicId}`);
                    const deleteResult = await cloudinary.uploader.destroy(`user_profiles/${publicId}`);
                    console.log("Cloudinary delete result:", deleteResult);
                } catch (cloudinaryError) {
                    console.log("An error occurred during Cloudinary deletion:", cloudinaryError);
                    // We don't stop the function, as the user is already deleted from DB
                }
            }
        }

        res.json({ success: true, message: "User removed successfully." });

    } catch (error) {
        console.log("Error removing user:", error); // This is where your TypeError is caught
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
     try {
       
        const nestedData = req.body.payoutInterestPercentage;

        // --- STEP 3: VALIDATE THE NESTED OBJECT ---
        // This is a crucial check to ensure the request is not malformed.
        if (!nestedData || typeof nestedData !== 'object') {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid request structure. Expected a nested settings object." 
            });
        }

        // --- STEP 4: EXTRACT THE FINAL VALUES FROM THE NESTED OBJECT ---
        const { payoutInterestPercentage, payoutDate } = nestedData;

        // --- STEP 5: BUILD THE CORRECT, FLAT PAYLOAD FOR MONGOOSE ---
        const updatePayload = {
            payoutInterestPercentage,
            payoutDate
        };

        // --- STEP 6: PERFORM THE DATABASE UPDATE ---
        const updatedSettings = await Settings.findOneAndUpdate(
            {},             // Find the one and only settings document
            updatePayload,  // Apply the correctly structured update
            { new: true, upsert: true, runValidators: true } // Options
        );

        res.json({ success: true, message: "Settings updated successfully.", settings: updatedSettings });

    } catch (error) {
        console.log("Error updating settings:", error);
        res.status(500).json({ success: false, message: "Failed to update settings." });
    }
};


const getMonthlyPayments = async (req, res) => {
  try {
    // Get current month's start and end dates
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
 
    // Get platform fee percentage from settings
    const settings = await Settings.findOne();
    const platformFeePercentage = settings?.payoutInterestPercentage || 30;
 
    // Aggregate consultations by doctor for current month
    const consultations = await Chat.aggregate([
      {
        $match: {
          paymentStatus: true,
          createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth
          }
        }
      },
      {
        $group: {
          _id: '$doctorId',
          totalConsultations: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);
 
    // Prepare payment data for each doctor
    const paymentPromises = consultations.map(async (consultation) => {
      const doctor = await doctorModel.findById(consultation._id).select(
        'name email speciality payment'
      );
 
      if (!doctor) return null;
 
      const grossAmount = consultation.totalAmount;
      const platformFee = (grossAmount * platformFeePercentage) / 100;
      const netPayout = grossAmount - platformFee;
 
      return {
        doctorId: consultation._id,
        name: doctor.name,
        email: doctor.email,
        speciality: doctor.speciality,
        totalConsultations: consultation.totalConsultations,
        grossAmount,
        platformFeePercentage,
        platformFee,
        netPayout,
        payment: {
          bankAccount: {
            accountHolderName: doctor.payment?.bankAccount?.accountHolderName || '',
            accountNumber: doctor.payment?.bankAccount?.accountNumber || '',
            ifscCode: doctor.payment?.bankAccount?.ifscCode || '',
            bankName: doctor.payment?.bankAccount?.bankName || ''
          },
          razorpay: {
            accountId: doctor.payment?.razorpay?.accountId || '',
            keyId: doctor.payment?.razorpay?.keyId || ''
          }
        }
      };
    });
 
    const payments = (await Promise.all(paymentPromises)).filter(p => p !== null);
 
    res.json({
      success: true,
      payments,
      month: now.toLocaleString('default', { month: 'long', year: 'numeric' }),
      totalDoctors: payments.length,
      totalGrossAmount: payments.reduce((sum, p) => sum + p.grossAmount, 0),
      totalNetPayout: payments.reduce((sum, p) => sum + p.netPayout, 0)
    });
 
  } catch (error) {
    console.error('Error fetching monthly payments:', error);
    res.json({
      success: false,
      message: error.message
    });
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
    updateSettings,
    getMonthlyPayments
}