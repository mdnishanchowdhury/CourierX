import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { FaCircle, FaCheckCircle, FaTruck, FaCheck, FaTimes } from "react-icons/fa";

const Parcels = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  // console.log("padding", parcels.length)

  const columns = [
    { 
      field: "from", 
      headerName: "From", 
      width: 150,
      headerClassName: "font-semibold bg-gray-100",
      cellClassName: "py-3"
    },
    { 
      field: "to", 
      headerName: "To", 
      width: 150,
      headerClassName: "font-semibold bg-gray-100",
      cellClassName: "py-3"
    },
    { 
      field: "sendername", 
      headerName: "Sender", 
      width: 150,
      headerClassName: "font-semibold bg-gray-100",
      cellClassName: "py-3"
    },
    { 
      field: "recipientname", 
      headerName: "Recipient", 
      width: 150,
      headerClassName: "font-semibold bg-gray-100",
      cellClassName: "py-3"
    },
    { 
      field: "note", 
      headerName: "Note", 
      width: 200,
      headerClassName: "font-semibold bg-gray-100",
      cellClassName: "py-3"
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerClassName: "font-semibold bg-gray-100",
      renderCell: (params) => (
        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
          params.value === 2 ? 'bg-green-100 text-green-800' : 
          params.value === 1 ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {params.value === 2 ? (
            <>
              <FaCheckCircle className="text-green-500" />
              Delivered
            </>
          ) : params.value === 1 ? (
            <>
              <FaTruck className="text-blue-500" />
              Padding
            </>
          ) : (
            <>
              <FaCircle className="text-yellow-500" />
              Pending
            </>
          )}
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      headerClassName: "font-semibold bg-gray-100",
      renderCell: (params) => (
        params.row.status !== 2 && (
          <button 
            onClick={() => {
              setSelectedParcel(params.row);
              setShowDeliveryModal(true);
            }}
            className="flex items-center gap-1 px-3 py-1 text-sm rounded-md bg-green-600 hover:bg-green-700 text-white transition-colors"
          >
            <FaCheck className="text-xs" />
            Deliver
          </button>
        )
      ),
    },
  ];

  const fetchParcels = async () => {
    try {
      setLoading(true);
      const res = await publicRequest.get("/parcels");
      
      const processedParcels = res.data.map(parcel => ({
        ...parcel,
        id: parcel._id,
        sendername: parcel.sendername || "-",
        recipientname: parcel.recipientname || "-",
        note: parcel.note || "-",
        to: parcel.to || "-",
        status: Number(parcel.status) || 0
      }));
      
      setParcels(processedParcels);
    } catch (error) {
      console.error("Error fetching parcels:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelivery = async () => {
    try {
      setLoading(true);
      // Update the parcel status to "Delivered" (2)
      await publicRequest.put(`/parcels/${selectedParcel._id}`, { status: 2 });
      
      // Optimistically update the UI by filtering out the delivered parcel
      setParcels(prev => prev.filter(parcel => parcel._id !== selectedParcel._id));
      
      // Close the modal
      setShowDeliveryModal(false);
      setSelectedParcel(null);
      
      // Optional: Show success message
      alert("Parcel marked as delivered successfully!");
    } catch (error) {
      console.error("Error marking as delivered:", error);
      alert("Failed to mark as delivered. Please try again.");
      // Refresh data if there was an error
      fetchParcels();
    } finally {
      setLoading(false);
    }
  };

  const filteredParcels = parcels.filter(parcel => {
    if (activeTab === "pending") {
      return parcel.status === 0 || parcel.status === 1;
    } else {
      return parcel.status === 2;
    }
  });

  useEffect(() => {
    fetchParcels();
    const intervalId = setInterval(fetchParcels, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Delivery Confirmation Modal */}
      {showDeliveryModal && selectedParcel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Confirm Delivery</h3>
              <button 
                onClick={() => setShowDeliveryModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Sender Information</h4>
                <p><span className="font-medium">Name:</span> {selectedParcel.sendername}</p>
                <p><span className="font-medium">From:</span> {selectedParcel.from}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Recipient Information</h4>
                <p><span className="font-medium">Name:</span> {selectedParcel.recipientname}</p>
                <p><span className="font-medium">To:</span> {selectedParcel.to}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Parcel Details</h4>
                <p><span className="font-medium">Weight:</span> {selectedParcel.weight} kg</p>
                <p><span className="font-medium">Cost:</span> ${selectedParcel.cost}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Additional Info</h4>
                <p><span className="font-medium">Note:</span> {selectedParcel.note || "None"}</p>
                <p><span className="font-medium">Date:</span> {new Date(selectedParcel.date).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeliveryModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelivery}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400"
              >
                {loading ? "Processing..." : "Confirm Delivery"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Parcel Deliveries</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab("pending")}
                className={`px-4 py-2 rounded-md ${activeTab === "pending" ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Pending
              </button>
              {/* <button
                onClick={() => setActiveTab("delivered")}
                className={`px-4 py-2 rounded-md ${activeTab === "delivered" ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Delivered
              </button> */}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : filteredParcels.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-64 text-gray-500">
              {activeTab === "pending" ? (
                <>
                  <FaCircle className="text-4xl text-gray-300 mb-3" />
                  <p>No pending deliveries found</p>
                  <p className="text-sm mt-1">All parcels are delivered</p>
                </>
              ) : (
                <>
                  <FaCheckCircle className="text-4xl text-gray-300 mb-3" />
                  <p>No delivered parcels yet</p>
                </>
              )}
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <DataGrid
                rows={filteredParcels}
                columns={columns}
                getRowId={(row) => row._id}
                disableSelectionOnClick
                pageSize={10}
                rowsPerPageOptions={[10, 25, 50]}
                autoHeight
                sx={{
                  '& .MuiDataGrid-cell:focus': { outline: 'none' },
                  '& .MuiDataGrid-cell:focus-within': { outline: 'none' },
                  '& .MuiDataGrid-columnHeader:focus': { outline: 'none' },
                  '& .MuiDataGrid-row:hover': { backgroundColor: 'rgba(0, 0, 0, 0.02)' },
                }}
                className="border-0"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Parcels;