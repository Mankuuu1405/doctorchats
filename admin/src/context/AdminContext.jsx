import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
    const [doctors, setDoctors] = useState([]);
    const [consultations, setConsultations] = useState([]);
    const [dashData, setDashData] = useState(null);
    const [users,setUsers]=useState(null);
    const handleAdminLogin = (newToken) => {
        localStorage.setItem('aToken', newToken);
        setAToken(newToken);
    };

    const handleAdminLogout = () => {
        localStorage.removeItem('aToken');
        setAToken('');
    };

    const getAllDoctors = async () => {
        if (!aToken) return;
        try {
            // --- THIS IS THE FIX ---
            const { data } = await axios.get(`${backendUrl}/api/admin/all-doctors`, { 
                headers: { Authorization: `Bearer ${aToken}` } 
            });
            if (data.success) setDoctors(data.doctors);
        } catch (error) { toast.error("Failed to load doctors."); }
    };


    // --- NEW: getAllUsers function ---
    const getAllUsers = async () => {
        console.log("here");
        if (!aToken) return;
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/all-Users`, { // Assumes this endpoint
                headers: { Authorization: `Bearer ${aToken}` }
            });
            if (data.success) {
            
                setUsers(data.Users); // Assuming your API returns { success: true, users: [...] }
            } else {
                toast.error("Failed to load users.");
            }
            
            
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to load users.");
        }
    };


    const changeAvailability = async (docId) => {
        if (!aToken) return;
        try {
            // --- THIS IS THE FIX ---
            const { data } = await axios.post(`${backendUrl}/api/admin/change-availability`, { docId }, { 
                headers: { Authorization: `Bearer ${aToken}` }
            });
            if (data.success) {
                toast.success(data.message);
                await getAllDoctors();
            } else { toast.error(data.message); }
        } catch (error) { toast.error("Failed to change availability."); }
    };

    const getConsultations = async () => {
        if (!aToken) return;
        try {
            // --- THIS IS THE FIX ---
            const { data } = await axios.get(`${backendUrl}/api/admin/consultations`, { 
                headers: { Authorization: `Bearer ${aToken}` }
            });
            if (data.success) setConsultations(data.chats);
        } catch (error) { toast.error("Failed to load consultations."); }
    };

    const getDashData = async () => {
        if (!aToken) return;
        try {
            // --- THIS IS THE FIX ---
            const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, { 
                headers: { Authorization: `Bearer ${aToken}` }
            });

            if (data.success) setDashData(data.dashData);
        } catch (error) { toast.error("Failed to load dashboard data."); }
    };
     const removeUser = async (userId) => {
        if (!aToken) return;
        try {
            // Call the new backend endpoint
            const { data } = await axios.delete(`${backendUrl}/api/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${aToken}` }
            });

            if (data.success) {
                toast.success(data.message);
                // Refresh the user list in the UI
                await getAllUsers();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error removing user:", error);
            toast.error("Failed to remove user.");
        }
    };
    const settings=async (newPercentage)=>{
         try {
                    const response = await fetch(`${backendUrl}/api/admin/settings`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${aToken}` // Make sure aToken is available
                        },
                        body: JSON.stringify({ payoutInterestPercentage: newPercentage })
                    });
        
                    const data = await response.json();
        
                    if (data.success) {
                        toast.success("Interest rate updated successfully!");
                        getDashData(); // --- CRITICAL: Refresh the dashboard data to show the new value ---
                    } else {
                        toast.error(data.message || "Failed to update settings.");
                    }
                } catch (error) {
                    toast.error("An error occurred while saving.");
                }
    }

    useEffect(() => {
        if (aToken) {
            getAllDoctors();
            getConsultations();
            getDashData();
            getAllUsers();
        }
    }, [aToken]);

    const contextValue = { aToken, backendUrl, doctors, consultations, dashData,users, handleAdminLogin, handleAdminLogout, getAllDoctors, changeAvailability, getConsultations, getDashData ,getAllUsers,removeUser,settings};

    return <AdminContext.Provider value={contextValue}>{props.children}</AdminContext.Provider>;
};

export default AdminContextProvider;