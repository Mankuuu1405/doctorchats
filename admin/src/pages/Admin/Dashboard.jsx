import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import ConsultationDetailsModal from "../../components/adminComponent/ConsultationDetailsModal.jsx";
import SettingsModal from "../../components/adminComponent/SettingsModal.jsx";
import * as XLSX from 'xlsx';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import {
  UsersIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { dashData, settings, aToken, backendUrl } = useContext(AdminContext);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // State for chart data - assuming you will fetch this data
  const [monthlyConsultations, setMonthlyConsultations] = useState([]);
  const [weeklyNewPatients, setWeeklyNewPatients] = useState([]);


  useEffect(() => {
    // In a real application, you would fetch this data from your backend.
    // For demonstration, we'll use mock data based on latestConsultations.
    if (dashData && dashData.latestConsultations) {
      // Process data for monthly consultations chart
      const monthlyCounts = new Array(12).fill(0);
      dashData.latestConsultations.forEach(consultation => {
        const month = new Date(consultation.createdAt).getMonth();
        monthlyCounts[month]++;
      });
      setMonthlyConsultations(monthlyCounts);

      // Process data for weekly new patients chart (mocked for this example)
      // You would need a separate API endpoint for this for real data.
      const weeklyCounts = [5, 9, 3, 5, 2, 3, 7]; // Mock data
      setWeeklyNewPatients(weeklyCounts);
    }
  }, [dashData]);

  console.log(dashData);

  if (!dashData) {
    return <div className="flex items-center justify-center h-64"><div>Loading...</div></div>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Not Set";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const openModal = (consultation) => {
    setSelectedConsultation(consultation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedConsultation(null);
  };

  const handleUpdateSettings = async (newPercentage) => {
    settings(newPercentage);
  };

  const downloadMonthlyPayment = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch(`${backendUrl}/api/admin/monthly-payments`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${aToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch payment data');

      const paymentData = await response.json();

      if (!paymentData.success || !paymentData.payments || paymentData.payments.length === 0) {
        alert('No payment data available for this month');
        setIsDownloading(false);
        return;
      }

      const excelData = paymentData.payments.map((doctor, index) => ({
        'S.No': index + 1,
        'Doctor Name': doctor.name,
        'Email': doctor.email,
        'Speciality': doctor.speciality || 'N/A',
        'Net Payout (₹)': doctor.netPayout.toFixed(2),
        'Account Holder Name': doctor.accountHolderName || 'Not Provided',
        'Account Number': doctor.accountNo || 'Not Provided',
        'IFSC Code': doctor.ifscNo || 'Not Provided',
        'Branch Name': doctor.branchName || 'Not Provided',
        'Bank Name': doctor.bankName || 'Not Provided',
        'Mobile Number': doctor.mobileNumber || 'Not Provided',
        'Address': doctor.address || 'Not Provided',
      }));

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(excelData);
      ws['!cols'] = [
        { wch: 6 }, { wch: 20 }, { wch: 25 }, { wch: 15 }, { wch: 18 },
        { wch: 25 }, { wch: 20 }, { wch: 15 }, { wch: 20 }, { wch: 20 },
        { wch: 15 }, { wch: 30 }
      ];
      XLSX.utils.book_append_sheet(wb, ws, 'Monthly Payments');
      const currentDate = new Date();
      const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
      const filename = `Doctor_Payments_${monthYear}.xlsx`;
      XLSX.writeFile(wb, filename);
      setIsDownloading(false);
    } catch (error) {
      console.error('Error downloading payment sheet:', error);
      alert('Failed to download payment sheet. Please try again.');
      setIsDownloading(false);
    }
  };


  // Chart Data and Options
  const monthlyConsultationsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Consultations',
      data: monthlyConsultations,
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
      borderColor: 'rgb(16, 185, 129)',
      borderWidth: 1,
    }],
  };

  // const weeklyNewPatientsData = {
  //     labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  //     datasets: [{
  //         label: 'New Patients',
  //         data: weeklyNewPatients,
  //         borderColor: 'rgb(59, 130, 246)',
  //         backgroundColor: 'rgba(59, 130, 246, 0.1)',
  //         tension: 0.4,
  //         fill: true,
  //     }],
  // };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="m-5 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor your platform's performance and key metrics.</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Doctors" value={dashData.doctors} icon={UsersIcon} color="blue" />
        <StatCard title="Total Consultations" value={dashData.consultations} icon={ClipboardDocumentListIcon} color="green" />
        <StatCard title="Total Patients" value={dashData.patients} icon={UserGroupIcon} color="purple" />
        <div onClick={() => setIsSettingsModalOpen(true)} className="cursor-pointer bg-yellow-50 p-4 rounded-lg text-left hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600">Interest Percentage</p>
              <p className="text-xl font-bold text-yellow-900">{`${dashData.settings.payoutInterestPercentage}%`}</p>
              <p className="text-sm text-yellow-600 mt-2">Next Payout: {formatDate(dashData.settings.payoutDate)}</p>
            </div>
            <ArrowTrendingUpIcon className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:2-full gap-6">
        {/* <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly New Patients</h3>
                    <div className="h-64">
                        <Line data={weeklyNewPatientsData} options={chartOptions} />
                    </div>
                </div> */}
        <div className="w-full flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-lg border shadow-sm">

          {/* Column 1: Monthly Consultations Chart */}
          <div className="flex-grow lg:w-2/3">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Consultations</h3>
            <div className="h-64 relative"> {/* Added relative for better chart responsiveness */}
              <Bar data={monthlyConsultationsData} options={chartOptions} />
            </div>
          </div>

          {/* Divider (Optional but recommended) */}
          <div className="border-l border-gray-200 hidden lg:block"></div>

          {/* Column 2: Quick Actions */}
          <div className="lg:w-1/3">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div>
              <button
                onClick={downloadMonthlyPayment}
                disabled={isDownloading}
                className="flex w-full items-center gap-3 bg-teal-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-600 disabled:bg-gray-400 transition-colors duration-200"
              >
                {/* SVG Icon */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                <div className="text-left">
                  <p className="font-semibold">{isDownloading ? 'Generating...' : 'Download Payments'}</p>
                  <p className="text-sm text-teal-100">Export doctor payments to Excel</p>
                </div>
              </button>
              {/* Add other quick actions here */}
            </div>
          </div>

        </div>

      </div>

      {/* Quick Actions & Download */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">

      </div>


      {/* Latest Consultations List */}
      <div className="bg-white rounded-lg shadow-md border">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="font-semibold text-lg text-gray-800">Latest Consultations</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {dashData.latestConsultations && dashData.latestConsultations.length > 0 ? (
            dashData.latestConsultations.map((chat) => (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center px-6 py-4" key={chat._id}>
                <div className="flex items-center gap-3 col-span-1">
                  <img className="rounded-full w-10 h-10 object-cover" src={chat.userId?.image || assets.default_user} alt="Patient" />
                  <div><p className="text-gray-800 font-semibold">{chat.userId?.name}</p></div>
                </div>
                <div className="flex items-center gap-3 col-span-1">
                  <img className="rounded-full w-10 h-10 object-cover" src={chat.doctorId.image || assets.default_doctor} alt="Doctor" />
                  <div><p className="text-gray-800 font-semibold">{chat.doctorId?.name}</p></div>
                </div>
                <p className="text-gray-500 text-sm hidden md:block">{new Date(chat.createdAt).toLocaleString()}</p>
                <div className="text-right">
                  <button onClick={() => openModal(chat)} className="px-4 py-2 bg-teal-500 text-white text-sm rounded-md hover:bg-teal-600">View</button>
                </div>
              </div>
            ))
          ) : (
            <p className="p-6 text-center text-gray-500">No recent consultations found.</p>
          )}
        </div>
      </div>

      <ConsultationDetailsModal isOpen={isModalOpen} onClose={closeModal} consultation={selectedConsultation} />
      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} currentPercentage={dashData.settings.payoutInterestPercentage} onSave={handleUpdateSettings} />
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    yellow: 'bg-yellow-100 text-yellow-600',
  };
  return (
    <div className="flex items-center gap-4 bg-white p-5 rounded-lg border shadow-sm">
      <div className={`p-3 rounded-full ${colorClasses[color]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-700">{value}</p>
        <p className="text-gray-500">{title}</p>
      </div>
    </div>
  );
};

export default Dashboard;