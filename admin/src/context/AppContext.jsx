import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    // Global variables that are used across the Admin/Doctor portals.
    const currency = import.meta.env.VITE_CURRENCY || '₹'; // Provide a fallback
    // Same-origin API in production; env override in development.
    const backendUrl = import.meta.env.DEV
        ? (import.meta.env.VITE_BACKEND_URL || '')
        : (typeof window !== 'undefined' ? window.location.origin : '');

    // A reusable function to calculate age from a date of birth string.
    const calculateAge = (dob) => {
        if (!dob) return 'N/A';
        try {
            const today = new Date();
            const birthDate = new Date(dob);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        } catch {
            return 'N/A';
        }
    };
    
    // The old 'slotDateFormat' function is no longer needed and has been removed.

    const contextValue = {
        backendUrl,
        currency,
        calculateAge,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;