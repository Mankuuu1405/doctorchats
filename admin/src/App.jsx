    import React, { useContext,useState } from 'react';
    import { Routes, Route, Navigate } from 'react-router-dom';
    import { ToastContainer } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';

    import { DoctorContext } from './context/DoctorContext';
    import { AdminContext } from './context/AdminContext';

    import Navbar from './components/Navbar';
    import Sidebar from './components/Sidebar';
    import Login from './pages/Login';

    // Import the CORRECT, refactored Admin pages
    import AdminDashboard from './pages/Admin/Dashboard';
    import AddDoctor from './pages/Admin/AddDoctor';
    import DoctorsList from './pages/Admin/DoctorsList';
    import AllConsultations from './pages/Admin/AllConsultations';
    import PatientList from './pages/Admin/PatientList';

    // Import the CORRECT, refactored Doctor pages
    import DoctorDashboard from './pages/Doctor/DoctorDashboard';
    import DoctorProfile from './pages/Doctor/DoctorProfile';
    // You will need to create this page for doctors to reply to chats
    import DoctorChatPage from './pages/Doctor/DoctorChatPage'; 
    import DoctorSignup from './pages/Doctor/DoctorSignup'; 

    const App = () => {
        const { dToken } = useContext(DoctorContext);
        const { aToken } = useContext(AdminContext);
        const [isSidebarOpen, setIsSidebarOpen] = useState(false);

         const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
        // This component protects routes that require an admin to be logged in.
        const AdminProtectedRoute = ({ children }) => {
            return aToken ? children : <Navigate to="/admin/login" />;
        };

        // This component protects routes that require a doctor to be logged in.
        const DoctorProtectedRoute = ({ children }) => {
            return dToken ? children : <Navigate to="/doctor/login" />;
        };

        return (
            <div className='bg-gray-50 min-h-screen'>
                <ToastContainer position="top-right" autoClose={3000} />
                
                <Routes>
                    {/* Login Pages */}
                    <Route path="/" element={!aToken && !dToken ? <Login /> : (aToken ? <Navigate to="/dashboard" /> : <Navigate to="/doctor/dashboard" />)} />
                    <Route path="/login" element={!aToken ? <Login /> : <Navigate to="/dashboard" />} />
                    <Route path="/doctor/login" element={!dToken ? <Login /> : <Navigate to="/doctor/dashboard" />} />
                    <Route path="/doctor/signup" element={<DoctorSignup />} />

                    {/* --- Admin Portal Routes --- */}
                    <Route path="/*" element={
                        <AdminProtectedRoute>
                            <div className="flex min-h-screen">
                                <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                                <main className="flex-1">
                                    <Navbar toggleSidebar={toggleSidebar} />
                                    <Routes>
                                        <Route path="dashboard" element={<AdminDashboard />} />
                                        <Route path="consultations" element={<AllConsultations />} />
                                        <Route path="add-doctor" element={<AddDoctor />} />
                                        <Route path="admin/doctors" element={<DoctorsList />} />
                                        <Route path="admin/doctor/:id" element={<DoctorProfile />} />
                                        <Route path='admin/patients' element={<PatientList/>}/>
                                    </Routes>
                                </main>
                            </div>
                        </AdminProtectedRoute>
                    } />

                    {/* --- Doctor Portal Routes --- */}
                    <Route path="/doctor/*" element={
                        <DoctorProtectedRoute>
                            <div className="flex min-h-screen">
                                 <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                                <main className="flex-1">
                                    <Navbar toggleSidebar={toggleSidebar} />
                                    <Routes>
                                        <Route path="dashboard" element={<DoctorDashboard />} />
                                        <Route path="profile" element={<DoctorProfile />} />
                                        <Route path="chat/:chatId" element={<DoctorChatPage />} />
                                    </Routes>
                                </main>
                            </div>
                        </DoctorProtectedRoute>
                    } />
                </Routes>
            </div>
        );
    };

    export default App;