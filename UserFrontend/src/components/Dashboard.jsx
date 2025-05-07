import React, { useState } from "react";
import { 
  HiOutlineTruck,
  HiOutlineArrowPath,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineQuestionMarkCircle,
  HiOutlineMap,
  HiOutlineBookOpen,
  HiOutlineShoppingBag,
  HiOutlinePhone
} from "react-icons/hi2";

const CourierDashboard = () => {
  const [dateRange, setDateRange] = useState({
    start: "14-Apr-2025",
    end: "28-Apr-2025"
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Key Stats</h1>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <span>{dateRange.start}</span>
          <span className="mx-2">to</span>
          <span>{dateRange.end}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Delivery & Payment Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <HiOutlineTruck className="mr-2 text-blue-600" />
              Delivery Information
            </h2>
            
            <div className="grid grid-cols-3 gap-4">
              <StatCard 
                value="0" 
                label="In Progress" 
                icon={<HiOutlineTruck className="text-orange-500" />}
              />
              <StatCard 
                value="0" 
                label="Return in Progress" 
                icon={<HiOutlineArrowPath className="text-yellow-500" />}
              />
              <StatCard 
                value="0" 
                label="Returned" 
                icon={<HiOutlineCheckCircle className="text-green-500" />}
              />
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <HiOutlineCurrencyDollar className="mr-2 text-blue-600" />
                Payment Information
              </h2>
              <span className="text-sm text-gray-500">Showing payment information considering invoice</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <StatCard 
                value="৳0.00" 
                label="Disbursement due" 
                icon={<HiOutlineCurrencyDollar className="text-red-500" />}
              />
              <StatCard 
                value="0" 
                label="In progress" 
                icon={<HiOutlineCurrencyDollar className="text-blue-500" />}
              />
              <StatCard 
                value="0" 
                label="Return in Progress" 
                icon={<HiOutlineArrowPath className="text-purple-500" />}
              />
              <StatCard 
                value="৳0.00" 
                label="Payment disbursed already" 
                icon={<HiOutlineCheckCircle className="text-green-500" />}
              />
              <StatCard 
                value="৳0.00" 
                label="Payment in process" 
                icon={<HiOutlineCurrencyDollar className="text-yellow-500" />}
              />
            </div>

            <button className="mt-4 text-blue-600 font-medium flex items-center">
              Details <span className="ml-1">›</span>
            </button>
          </div>
        </div>

        {/* Right Column - Profile & Quick Links */}
        <div className="space-y-6">
          {/* Profile Completion */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-3">Complete your profile</h2>
            <p className="text-sm text-gray-600 mb-4">
              Add your bank or bKash details to receive payments from RedX
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
              Setup Payment
            </button>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Quick links</h2>
            
            <div className="space-y-3">
              <QuickLink 
                icon={<HiOutlineMap className="text-blue-500" />}
                label="Coverage area"
                description="See the largest countrywide coverage points"
              />
              <QuickLink 
                icon={<HiOutlineBookOpen className="text-green-500" />}
                label="Tutorials"
                description="Learn about REDX panel and services"
              />
              <QuickLink 
                icon={<HiOutlineQuestionMarkCircle className="text-purple-500" />}
                label="Frequently asked question"
                description="Find answers of your basic questions"
              />
              <QuickLink 
                icon={<HiOutlineShoppingBag className="text-orange-500" />}
                label="Packaging service"
                description="Check our packaging service facilities"
              />
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 flex items-center text-sm">
              <HiOutlinePhone className="text-gray-500 mr-2" />
              <span className="text-gray-600">Call our hotline to get 24/7 support</span>
              <span className="ml-2 font-medium">09410007339</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const StatCard = ({ value, label, icon }) => (
  <div className="bg-gray-50 p-4 rounded-lg text-center">
    <div className="flex justify-center text-2xl font-bold mb-1">
      {value}
    </div>
    <div className="flex items-center justify-center text-sm text-gray-600">
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </div>
  </div>
);

const QuickLink = ({ icon, label, description }) => (
  <div className="flex items-start p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
    <div className="mt-1 mr-3 text-xl">
      {icon}
    </div>
    <div>
      <h3 className="font-medium text-gray-800">{label}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
);

export default CourierDashboard;