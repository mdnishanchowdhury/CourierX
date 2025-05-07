import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethods";
import { toast } from "react-toastify";
import { FaSave, FaEdit, FaLock, FaPhone, FaMapMarkerAlt, FaGlobe, FaUser } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    age: "",
    phoneNumber: "",
    address: "",
    country: "",
    status: 1,
    role: "user"
  });
  const [editMode, setEditMode] = useState(false);
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await publicRequest.get("/users/profile");
        // Ensure all fields are present even if empty
        setUserData({
          fullname: res.data.fullname || "",
          email: res.data.email || "",
          age: res.data.age || "",
          phoneNumber: res.data.phoneNumber || "",
          address: res.data.address || "",
          country: res.data.country || "",
          status: res.data.status || 1,
          role: res.data.role || "user"
        });
      } catch (error) {
        toast.error("Failed to fetch user profile");
        console.error("Fetch profile error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword(prev => ({ ...prev, [name]: value }));
  };

  const validateProfile = () => {
    if (!userData.fullname.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!userData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (userData.age && (isNaN(userData.age) || userData.age < 18 || userData.age > 120)) {
      toast.error("Please enter a valid age (18-120)");
      return false;
    }
    if (userData.phoneNumber && !/^[0-9]{10,15}$/.test(userData.phoneNumber)) {
      toast.error("Please enter a valid phone number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateProfile()) return;

    try {
      const updatedData = {
        ...userData,
        age: userData.age || null,
        phoneNumber: userData.phoneNumber || null,
        country: userData.country || null,
        address: userData.address || null
      };
      
      await publicRequest.put("/user/profile", updatedData);
      toast.success("Profile updated successfully");
      setEditMode(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
      console.error("Update profile error:", error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (password.newPassword !== password.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    if (password.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      await publicRequest.put("/user/change-password", {
        currentPassword: password.currentPassword,
        newPassword: password.newPassword
      });
      toast.success("Password changed successfully");
      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
      console.error("Change password error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-700">Loading profile...</div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch(status) {
      case 1: return "bg-green-100 text-green-800";
      case 0: return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 1: return "Active";
      case 0: return "Inactive";
      default: return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          {/* Profile Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(userData.status)}`}>
                    {getStatusText(userData.status)}
                  </span>
                  <span className="text-sm text-gray-600 capitalize">
                    {userData.role} Account
                  </span>
                </div>
              </div>
              <button
                onClick={() => setEditMode(!editMode)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  editMode 
                    ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                <FaEdit size={14} />
                <span>{editMode ? "Cancel" : "Edit Profile"}</span>
              </button>
            </div>
          </div>

          {/* Profile Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaUser className="mr-2" /> Full Name
                    </label>
                    {editMode ? (
                      <input
                        type="text"
                        name="fullname"
                        value={userData.fullname}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-800">{userData.fullname}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    {editMode ? (
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-800">{userData.email}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    {editMode ? (
                      <input
                        type="number"
                        name="age"
                        value={userData.age}
                        onChange={handleInputChange}
                        min="18"
                        max="120"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-800">
                        {userData.age || "Not specified"}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaGlobe className="mr-2" /> Country
                    </label>
                    {editMode ? (
                      <input
                        type="text"
                        name="country"
                        value={userData.country}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-800">
                        {userData.country || "Not specified"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaMapMarkerAlt className="mr-2" /> Address
                    </label>
                    {editMode ? (
                      <input
                        type="text"
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-800">
                        {userData.address || "Not specified"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaPhone className="mr-2" /> Phone Number
                    </label>
                    {editMode ? (
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-800">
                        {userData.phoneNumber || "Not specified"}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {editMode && (
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    <FaSave size={14} />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </form>

            {/* Change Password Section */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <FaLock size={16} />
                <span>Change Password</span>
              </h2>
              
              <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={password.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                    minLength="6"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={password.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                    minLength="6"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={password.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                    minLength="6"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    <FaLock size={14} />
                    <span>Change Password</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;