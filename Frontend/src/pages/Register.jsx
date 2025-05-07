import Navbar from "../components/Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    age: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    country: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
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
   
    if (formData.phone && !/^[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
   
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      const response = await fetch("http://localhost:8000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          age: formData.age || undefined, // Send undefined if age is empty
          phone: formData.phone || undefined,
          country: formData.country || undefined,
          address: formData.address || undefined
          // Don't send confirmPassword to the backend
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
   <>
    <Navbar />
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col md:flex-row items-center justify-evenly p-6 md:p-12 text-gray-300">
        <div className="text-center mb-8 md:mb-0 md:mr-12">
          <h2 className="text-[#D9D9D9] font-semibold text-3xl md:text-4xl mb-4">
            SendIT Admin
          </h2>
          <img
            src="/hero.png"
            alt="Delivery Illustration"
            className="max-w-xs md:max-w-md mx-auto"
          />
        </div>
       
        <div className="w-full max-w-md bg-[#E9EB77] rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-center text-black mb-6">Create Admin Account</h2>
         
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className={`w-full p-3 rounded outline-none ${errors.fullname ? "border-2 border-red-500" : "border border-gray-300"}`}
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
                className={`w-full p-3 rounded outline-none ${errors.email ? "border-2 border-red-500" : "border border-gray-300"}`}
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
                  className={`w-full p-3 rounded outline-none ${errors.age ? "border-2 border-red-500" : "border border-gray-300"}`}
                  placeholder="Age (optional)"
                  min="18"
                  max="120"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-3 rounded outline-none ${errors.phone ? "border-2 border-red-500" : "border border-gray-300"}`}
                  placeholder="Phone (optional)"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
           
            {/* Country and Address */}
            <div>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-3 rounded border border-gray-300 outline-none"
                placeholder="Country (optional)"
              />
            </div>
           
            <div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 rounded border border-gray-300 outline-none"
                placeholder="Address (optional)"
              />
            </div>
           
            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-3 rounded outline-none ${errors.password ? "border-2 border-red-500" : "border border-gray-300"}`}
                placeholder="Password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full p-3 rounded outline-none ${errors.confirmPassword ? "border-2 border-red-500" : "border border-gray-300"}`}
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
           
            {errors.server && (
              <div className="p-2 bg-red-100 text-red-700 rounded">
                {errors.server}
              </div>
            )}
           
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 rounded text-white font-semibold ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-[#1E1E1E] hover:bg-[#333]"}`}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
         
          <p className="text-center text-black mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
     
      <Footer />
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
   </>
  );
};

export default Register;