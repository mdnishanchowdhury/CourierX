import UserNavbar from "../pages/UserNavbar";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/userRedux";

const MyParcels = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getParcels = async () => {
      try {
        const res = await publicRequest.post("/parcels/me", {
          email: user.currentUser.email,
        });
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getParcels();
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };
  
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <UserNavbar />
      
      {/* User Profile Dropdown */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-end relative">
          <button
            onClick={handleOpen}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FaUser />
            <span>{user.currentUser?.name || "Alok Mondal"}</span>
          </button>
          
          {/* Dropdown Menu */}
          {open && (
            <div className="absolute top-12 right-0 w-56 bg-white rounded-md shadow-lg z-50 overflow-hidden">
              <ul className="py-1">
                <Link to="/allparcels">
                  <li className="px-4 py-2 text-gray-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer">
                    All parcels
                  </li>
                </Link>
                <li className="px-4 py-2 text-gray-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer">
                  Statements
                </li>
                <li 
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
        
        {/* Parcels List */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Parcels</h2>
          
          <div className="space-y-4">
            {data.map((parcel) => (
              <Link key={parcel._id} to={`/parcel/${parcel._id}`}>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="space-y-2">
                      <p className="text-gray-700"><span className="font-medium">From:</span> {parcel.from}</p>
                      <p className="text-gray-700"><span className="font-medium">Weight:</span> {parcel.weight} kg</p>
                      <p className="text-gray-700"><span className="font-medium">Date:</span> {parcel.date}</p>
                      <p className="text-gray-700"><span className="font-medium">Sender:</span> {parcel.sendername}</p>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex flex-col items-end">
                      <p className="text-gray-700 mb-4"><span className="font-medium">To:</span> {parcel.to}</p>
                      <span 
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          parcel.status === 1 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {parcel.status === 1 ? "Pending" : "Delivered"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyParcels;