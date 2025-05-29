import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/Footer";
import HomeNav  from "../components/HomeNav";

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
      const response = await fetch("http://localhost:8000/api/v1/auth/login", {
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
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  return (
  <>
   <div className="min-h-screen flex flex-col bg-white ">
   <div className="flex-grow flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-12">
     {/* Left Side - Branding */}
     <div className="text-center">
       <h2 className="text-[#000000] font-semibold text-[35px] mb-4">
       CourierX
       </h2>
       <img src="https://i.ibb.co.com/MJZmvSF/goods-courier-service-500x500-1-large.jpg" alt="Delivery Illustration" className="max-w-md mx-auto" />
     </div>
     
     {/* Right Side - Login Form */}
     <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
       <div className="bg-white p-6">
         <h2 className="text-2xl font-bold text-center">Courier Man</h2>
       </div>
       
       <div className="p-8">
         <form onSubmit={handleLogin} className="space-y-6">
           <div>
             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
               Email Address
             </label>
             <input
               type="email"
               id="email"
               name="email"
               value={formData.email}
               onChange={handleChange}
               className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
               placeholder="courierman@gmail.com"
               disabled={isLoading}
             />
             {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
           </div>
           
           <div>
             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
               Password
             </label>
             <div className="relative">
               <input
                 type={showPassword ? "text" : "password"}
                 id="password"
                 name="password"
                 value={formData.password}
                 onChange={handleChange}
                 className={`w-full px-4 py-3 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                 placeholder="••••••••"
                 disabled={isLoading}
               />
               <button
                 type="button"
                 className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                 onClick={() => setShowPassword(!showPassword)}
                 disabled={isLoading}
               >
                 {showPassword ? (
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                   </svg>
                 ) : (
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                   </svg>
                 )}
               </button>
             </div>
             {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
           </div>

           {errors.server && (
             <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
               {errors.server}
             </div>
           )}

           <div className="flex items-center justify-between">
             <div className="flex items-center">
               <input
                 id="remember-me"
                 name="remember-me"
                 type="checkbox"
                 className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
               />
               <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                 Remember me
               </label>
             </div>

             <div className="text-sm">
               <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                 Forgot password?
               </a>
             </div>
           </div>

           <button
             type="submit"
             disabled={isLoading}
             className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-black hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
           >
             {isLoading ? (
               <>
                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 Signing in...
               </>
             ) : 'Sign in'}
           </button>
         </form>
       </div>
     </div>
   </div>
   <ToastContainer 
     position="top-right"
     autoClose={5000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
     theme="colored"
   />
 </div>
  </>
  );
};

export default Login;