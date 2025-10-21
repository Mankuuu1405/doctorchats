import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AdminContext } from '../../context/AdminContext'; // Import AdminContext
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom'; // Import useParams

const DoctorProfile = () => {
    const { dToken, backendUrl } = useContext(DoctorContext);
    const { aToken } = useContext(AdminContext); // Get aToken from AdminContext
    const { currency } = useContext(AppContext);
    const { id } = useParams(); // Get ID from URL parameters

    //navigate
    const navi=useNavigate();

    const [profileData, setProfileData] = useState(null);
    const [originalData, setOriginalData] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    const getProfileData = async () => {
        try {
            setIsLoading(true);
            let url = '';
            let token = '';

            if (id) { // Admin is viewing a specific doctor's profile
                url = `${backendUrl}/api/admin/doctor/${id}`;
                token = aToken;
            } else { // Doctor is viewing their own profile
                url = `${backendUrl}/api/doctor/profile`;
                token = dToken;
            }

            if (!token) {
                toast.error("Authentication token missing.");
                setIsLoading(false);
                return;
            }

            const { data } = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
            if (data.success) {
                setProfileData(data.profileData);
                setOriginalData(data.profileData);
                setImagePreviewUrl(data.profileData.image);
            } else {
                toast.error(data.message || "Failed to load profile.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load profile.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
       
        const shouldFetchAsAdmin = id && aToken;
        const shouldFetchAsDoctor = !id && dToken;

        if (shouldFetchAsAdmin || shouldFetchAsDoctor) {
            getProfileData();
        } else if (!id && aToken) {
            // Admin is logged in but no doctor ID provided.
            // This is the scenario where the 401 might be avoided by not fetching.
            // Display a message or redirect if this is an invalid state for the admin.
            toast.info("Please select a doctor to view their profile.");
            setIsLoading(false); // Stop loading state
        } else if (!aToken && !dToken) {
            // Neither admin nor doctor token is present. User is not logged in.
            toast.error("You are not authorized to view this page. Please log in.");
            setIsLoading(false); // Stop loading state
        }
    }, [dToken, aToken, id]);

    const handleSaveChanges = async () => {
        try {
            const formData = new FormData();
            for (const key in profileData) {
                if (key !== 'image' && profileData[key] !== null) {
                    formData.append(key, profileData[key]);
                }
            }
            if (imageFile) {
                formData.append('image', imageFile);
            }

            let url = '';
            let token = '';

            if (id) { // Admin is updating a specific doctor's profile
                url = `${backendUrl}/api/admin/doctor/${id}`;
                token = aToken;
            } else { // Doctor is updating their own profile
                url = `${backendUrl}/api/doctor/profile`;
                token = dToken;
            }

            if (!token) {
                toast.error("Authentication token missing for update.");
                return;
            }

            const { data } = await axios.patch(url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (data.success) {
                toast.success(data.message);
                setIsEdit(false);
                getProfileData();
                navi("/admin/doctors", { state: { shouldReload: true } });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed.");
        }
    };

    // Cleanup for image preview URL
    useEffect(() => {
        return () => {
            if (imagePreviewUrl && imagePreviewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreviewUrl);
            }
        };
    }, [imagePreviewUrl]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreviewUrl(URL.createObjectURL(file));
        } else {
            setImageFile(null);
            setImagePreviewUrl(profileData.image); // Revert to original if no file selected
        }
    };

    if (isLoading || !profileData) {
        return <div className="text-center p-10">Loading profile...</div>;
    }

    return (
        <div className="container mx-auto p-5 max-w-4xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
                <div>
                    {isEdit ? (
                        <div className="flex gap-4">
                            <button onClick={() => { setIsEdit(false); setProfileData(originalData); }} className="px-6 py-2 rounded-full text-sm font-semibold bg-gray-200 hover:bg-gray-300">Cancel</button>
                            <button onClick={handleSaveChanges} className="px-6 py-2 rounded-full text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700">Save Changes</button>
                        </div>
                    ) : (
                        <button onClick={() => setIsEdit(true)} className="px-6 py-2 rounded-full text-sm font-semibold text-white bg-gray-800 hover:bg-black">Edit Profile</button>
                    )}
                </div>
            </div>

            {/* Warning for new doctors */}
            {profileData.profileStatus === 'incomplete' && !isEdit && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
                    <p className="font-bold">Please Complete Your Profile</p>
                    <p>Fill in all required details to activate your account and start receiving consultations.</p>
                </div>
            )}

            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b">
                    <div className="relative w-32 h-32">
                        <img className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm' src={imagePreviewUrl || profileData.image} alt="Profile" />
                        {isEdit && (
                            <label htmlFor="image-upload" className="absolute bottom-0 right-0 bg-teal-600 text-white rounded-full p-2 cursor-pointer hover:bg-teal-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-4 4 4 4-4V5h-2a1 1 0 100 2h2v8z" clipRule="evenodd" />
                                </svg>
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                    disabled={!isEdit}
                                />
                            </label>
                        )}
                    </div>
                    <div className="text-center sm:text-left">
                        <h2 className="text-3xl font-bold text-gray-800">{profileData.name}</h2>
                        <p className="text-gray-500 mt-1">{profileData.email}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Professional Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InfoField label="Speciality" value={profileData.speciality} isEdit={isEdit} onChange={(e) => setProfileData(p => ({ ...p, speciality: e.target.value }))} />
                            <InfoField label="Degree" value={profileData.degree} isEdit={isEdit} onChange={(e) => setProfileData(p => ({ ...p, degree: e.target.value }))} />
                            <InfoField label="Years of Experience" type="number" value={profileData.experience} isEdit={isEdit} onChange={(e) => setProfileData(p => ({ ...p, experience: e.target.value }))} />
                            <InfoField label="Consultation Fee" type="number" value={profileData.fees} isEdit={isEdit} onChange={(e) => setProfileData(p => ({ ...p, fees: e.target.value }))} prefix={currency} />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">About</h3>
                        {isEdit ? <textarea className='w-full bg-gray-100 border rounded-lg p-3' rows={5} value={profileData.about} onChange={(e) => setProfileData(p => ({ ...p, about: e.target.value }))} /> : <p className="text-gray-600">{profileData.about}</p>}
                    </div>
                    <div className="flex items-center gap-3">
                         <h3 className="text-lg font-semibold text-gray-700">Available for Consultations</h3>
                         <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={profileData.available} onChange={() => isEdit && setProfileData(p => ({ ...p, available: !p.available }))} className="sr-only peer" disabled={!isEdit}/>
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper component for cleaner code
const specialities = [
    "General Physician",
    "Dermatologist",
    "Cardiologist",
    "Neurologist",
    "Pediatrician",
    "Gynecologist",
    "Orthopedic Surgeon",
    "Psychiatrist",
    "ENT Specialist",
    "Ophthalmologist",
    "Gastroenterologist",
    "Urologist",
    "Endocrinologist",
    "Pulmonologist",
    "Nephrologist",
    "Oncologist",
    "Rheumatologist",
    "Allergist/Immunologist",
    "Anesthesiologist",
    "Radiologist"
];
const InfoField = ({ label, value, isEdit, onChange, type = 'text', prefix }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        {isEdit ? (
            <div className="relative">
                {prefix && <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">{prefix}</span>}
                {label === 'Speciality' ? (
                    <select value={value || ''} onChange={onChange} className={`w-full bg-gray-100 border rounded-lg py-2 transition px-3`}>
                        <option value="" disabled>Select a speciality</option>
                        {specialities.map(speciality => (
                            <option key={speciality} value={speciality}>{speciality}</option>
                        ))}
                    </select>
                ) : (
                    <input type={type} value={value || ''} onChange={onChange} className={`w-full bg-gray-100 border rounded-lg py-2 transition ${prefix ? 'pl-7 pr-3' : 'px-3'}`} />
                )}
            </div>
        ) : (
            <p className="text-gray-800">{prefix}{value || 'Not specified'}</p>
        )}
    </div>
);

export default DoctorProfile;