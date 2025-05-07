import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:8000/api/v1/auths/logins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        toast.success("Login successful!");
        navigate("/app/home");
      } else {
        const errorMsg = data.message || "Login failed";
        toast.error(errorMsg);
        setErrors({ server: errorMsg });
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("An error occurred during login");
      setErrors({ server: "Connection error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

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
        
        {/* Login Form Section */}
        <div className="w-full max-w-md bg-white rounded-lg p-6 sm:p-8 shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">User Login</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 rounded border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your email"
                disabled={isLoading}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-3 rounded border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your password"
                disabled={isLoading}
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
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline text-sm sm:text-base"
            >
              Forgot password?
            </Link>
          </div>
          
          <p className="text-center text-gray-700 mt-4 text-sm sm:text-base">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </main>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Login;