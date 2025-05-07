import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/Footer";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    age: "",
    phoneNumber: "",
    address: "",
    password: "",
    country: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
   
    if (!formData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }
   
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
   
    if (formData.age && (isNaN(formData.age) || formData.age < 18 || formData.age > 120)) {
      newErrors.age = "Please enter a valid age (18-120)";
    }
   
    if (formData.phoneNumber && !/^[0-9]{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }
   
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
   
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    setIsLoading(true);
   
    try {
      const response = await fetch("http://localhost:8000/api/v1/auths/registers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          age: formData.age || undefined,
          phoneNumber: formData.phoneNumber || undefined,
          country: formData.country || undefined,
          address: formData.address || undefined,
          status: 1,
          role: "user"
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const errorMsg = data.message || "Registration failed";
        toast.error(errorMsg);
        setErrors({ server: errorMsg });
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("An error occurred during registration");
      setErrors({ server: "Connection error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow flex flex-col lg:flex-row items-center justify-center px-4 py-8 sm:px-6 lg:px-8 gap-8 lg:gap-16">
        {/* Illustration Section */}
        <div className="w-full max-w-md text-center">
          <h2 className="text-gray-800 font-semibold text-3xl sm:text-4xl mb-4">
            CourierX
          </h2>
          <img 
            src="https://i.ibb.co.com/MqFL2k2/esd.png" 
            alt="Delivery Illustration" 
            className="w-full max-w-xs sm:max-w-md mx-auto" 
          />
        </div>
        
        {/* Registration Form Section */}
        <div className="w-full max-w-md bg-white rounded-lg p-6 sm:p-8 shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className={`w-full p-3 rounded border ${
                  errors.fullname ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Full Name"
              />
              {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>}
            </div>
            
            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 rounded border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            {/* Age and Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={`w-full p-3 rounded border ${
                    errors.age ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Age (optional)"
                  min="18"
                  max="120"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>
              <div>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full p-3 rounded border ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Phone (optional)"
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>
            </div>
            
            {/* Country */}
            <div>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Country (optional)"
              />
            </div>
            
            {/* Address */}
            <div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Address (optional)"
              />
            </div>
            
            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-3 rounded border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {errors.server && (
              <div className="p-3 bg-red-100 text-red-700 rounded text-sm">
                {errors.server}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 rounded text-white font-semibold transition-colors ${
                isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
          
          <p className="text-center text-gray-700 mt-4 text-sm sm:text-base">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </main>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Register;