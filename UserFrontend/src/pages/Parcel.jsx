import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useEffect, useState } from "react";

const Parcel = () => {
  const location = useLocation();
  const parcelId = location.pathname.split("/")[2];
  const [parcel, setParcel] = useState({});
  const [inputs, setInputs] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    const getParcel = async () => {
      try {
        const res = await publicRequest.get("/parcels/find/" + parcelId);
        setParcel(res.data);
        // Initialize inputs with current parcel data
        setInputs({
          from: res.data.from,
          to: res.data.to,
          sendername: res.data.sendername,
          recipientname: res.data.recipientname,
          senderemail: res.data.senderemail,
          recipientemail: res.data.recipientemail,
          weight: res.data.weight,
          cost: res.data.cost,
          date: res.data.date,
          note: res.data.note,
          status: res.data.status
        });
      } catch (error) {
        console.error("Error fetching parcel:", error);
      }
    };
    getParcel();
  }, [parcelId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      // Always update status to 2 (Delivered) when clicking Update
      const updateData = {
        ...inputs,
        status: 2 // Force status to 2 (Delivered)
      };

      await publicRequest.put(`/parcels/${parcel._id}`, updateData);
      
      // Optional: Show success message or redirect
      window.location.reload(); // Refresh to show updated status
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      // Optional: Show error message to user
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="m-[30px] bg-[#fff] p-[20px]">
      <h2 className="font-semibold">Edit Parcel</h2>

      <div className="flex">
        <div className="m-[20px]">
          {/* Left column inputs (same as before) */}
          {/* ... */}
        </div>

        <div className="m-[20px]">
          {/* Right column inputs */}
          <div className="flex flex-col my-[20px]">
            <label>Weight</label>
            <input
              type="number"
              placeholder={parcel.weight}
              name="weight"
              value={inputs.weight || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          
          {/* Other input fields... */}

          <div className="flex flex-col my-[20px]">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={inputs.date ? inputs.date.split('T')[0] : ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>

          {parcel.status === 1 && (
            <button
              className={`bg-[#1E1E1E] text-white p-[10px] w-[300px] ${
                isUpdating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={handleUpdate}
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Mark as Delivered"}
            </button>
          )}
        </div>

        <div className="flex flex-col">
          <h2 className="font-semibold">Feedback</h2>
          <span>Goods received in good condition.</span>
          <span className="text-red-500 text-[18px]">
            {parcel.status === 1 ? "Pending" : "Delivered"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Parcel;