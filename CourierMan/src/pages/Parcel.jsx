import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useEffect, useState } from "react";

const Parcel = () => {
  const location = useLocation();
  const parcelId = location.pathname.split("/")[2];
  const [parcel, setParcel] = useState({});
  const [inputs, setInputs] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  // Status mapping
  const statusMap = {
    0: { text: "Processing", color: "text-yellow-500" },
    1: { text: "Shipped", color: "text-blue-500" },
    2: { text: "In Transit", color: "text-purple-500" },
    3: { text: "Out for Delivery", color: "text-orange-500" },
    4: { text: "Delivered", color: "text-green-500" }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Fetch parcel data
  useEffect(() => {
    const getParcel = async () => {
      try {
        const res = await publicRequest.get("/parcels/find/" + parcelId);
        setParcel(res.data);
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
      await publicRequest.put(`/parcels/${parcel._id}`, inputs);
      // Refresh the parcel data after update
      const res = await publicRequest.get("/parcels/find/" + parcelId);
      setParcel(res.data);
      alert("Parcel updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update parcel");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="m-[30px] bg-[#fff] p-[20px]">
      <h2 className="font-semibold text-2xl mb-6">Parcel Management #{parcelId}</h2>

      <div className="flex">
        <div className="w-1/2 pr-4">
          <h3 className="text-xl font-semibold mb-4">Parcel Details</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Sender</label>
              <input
                type="text"
                name="sendername"
                value={inputs.sendername || ""}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            
            <div>
              <label className="block mb-1">Recipient</label>
              <input
                type="text"
                name="recipientname"
                value={inputs.recipientname || ""}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>

            <div>
              <label className="block mb-1">From</label>
              <input
                type="text"
                name="from"
                value={inputs.from || ""}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>

            <div>
              <label className="block mb-1">To</label>
              <input
                type="text"
                name="to"
                value={inputs.to || ""}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>

            <div>
              <label className="block mb-1">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={inputs.weight || ""}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>

            <div>
              <label className="block mb-1">Cost</label>
              <input
                type="number"
                name="cost"
                value={inputs.cost || ""}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block mb-1">Notes</label>
            <textarea
              name="note"
              value={inputs.note || ""}
              onChange={handleChange}
              className="border p-2 w-full"
              rows="3"
            />
          </div>
        </div>

        <div className="w-1/2 pl-4">
          <h3 className="text-xl font-semibold mb-4">Delivery Status</h3>
          
          {parcel.status !== undefined && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${
                statusMap[parcel.status].color.replace('text', 'bg') + '-100'
              }`}>
                <div className="font-bold">Current Status:</div>
                <div className="text-xl">
                  {statusMap[parcel.status].text}
                </div>
              </div>

              <div className="mt-4">
                <label className="block mb-1">Update Status</label>
                <select
                  name="status"
                  value={inputs.status || 0}
                  onChange={handleChange}
                  className="border p-2 w-full"
                >
                  {Object.entries(statusMap).map(([value, { text }]) => (
                    <option key={value} value={value}>{text}</option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label className="block mb-1">Delivery Date</label>
                <input
                  type="date"
                  name="date"
                  value={inputs.date ? inputs.date.split('T')[0] : ""}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>

              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className={`mt-6 w-full p-3 rounded ${
                  isUpdating
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isUpdating ? 'Updating...' : 'Update Parcel'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Parcel;