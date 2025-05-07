import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";

const Parcel = () => {
  const location = useLocation();
  const parcelId = location.pathname.split("/")[2];
  const [parcel, setParcel] = useState({});

  useEffect(() => {
    const getParcel = async () => {
      try {
        const res = await publicRequest.get("/parcels/find/" + parcelId);
        setParcel(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getParcel();
  }, [parcelId]);

  const handleStatusUpdate = async () => {
    if (parcel.status !== 1) return;
    
    try {
      await publicRequest.put(`/parcels/${parcelId}`, { status: 2 });
      setParcel(prev => ({ ...prev, status: 2 }));
    } catch (error) {
      console.error("Update failed:", error);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center mt-[3%] mr-[5%] ml-[5%]">
      <div className="bg-[#D9D9D9] h-[80vh] w-[60vw] rounded-md">
        <Link to="/myparcels">
          <FaArrowLeft className="text-[18px] m-2 cursor-pointer" />
        </Link>
        <div className="flex justify-between">
          <div className="flex-1">
            <ul className="m-3">
              {/* ... existing list items ... */}
            </ul>
            <button
              onClick={handleStatusUpdate}
              className={
                parcel.status === 1
                  ? "bg-[#555] text-white w-[100px] cursor-pointer p-[10px] m-[20px] hover:bg-[#444]"
                  : "bg-[#45de52] text-white w-[100px] cursor-pointer p-[10px] m-[20px] cursor-not-allowed"
              }
              disabled={parcel.status !== 1}
            >
              {parcel.status === 1 ? "Mark as Delivered" : "Delivered"}
            </button>
          </div>
          {/* ... rest of the component ... */}
        </div>
      </div>
    </div>
  );
};

export default Parcel;