import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { FaCircle, FaCheckCircle, FaTruck } from "react-icons/fa";

const Parcels = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const [userEmail, setUserEmail] = useState("");

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
              In Transit
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
  ];

  const fetchUserParcels = async () => {
    try {
      setLoading(true);
      // Get logged-in user's email
      const userRes = await publicRequest.get("/auth/me");
      const email = userRes.data.email;
      setUserEmail(email);
      
      // Fetch parcels and filter by user's email
      const parcelsRes = await publicRequest.get("/parcels");
      const userParcels = parcelsRes.data.filter(parcel => 
        parcel.senderEmail === email // Only show parcels where senderEmail matches user's email
      );
      
      const processedParcels = userParcels.map(parcel => ({
        ...parcel,
        id: parcel._id,
        sendername: parcel.sendername || "-",
        recipientname: parcel.recipientname || "-",
        note: parcel.note || "-",
        to: parcel.to || "-",
        from: parcel.from || "-",
        status: Number(parcel.status) || 0
      }));
      
      setParcels(processedParcels);
    } catch (error) {
      console.error("Error fetching data:", error);
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
    fetchUserParcels();
    const intervalId = setInterval(fetchUserParcels, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">My Parcel Orders</h1>
            {userEmail && (
              <p className="text-sm text-gray-600">Logged in as: {userEmail}</p>
            )}
          </div>
          <Link 
            to="/newparcel"
            className="inline-flex items-center px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-md transition-colors mt-4 sm:mt-0"
          >
            + New Parcel
          </Link>
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
                  <p>No pending orders found</p>
                  <Link 
                    to="/newparcel"
                    className="text-blue-600 hover:underline mt-2"
                  >
                    Create your first parcel order
                  </Link>
                </>
              ) : (
                <>
                  <FaCheckCircle className="text-4xl text-gray-300 mb-3" />
                  <p>No delivered orders yet</p>
                </>
              )}
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <DataGrid
                rows={filteredParcels}
                columns={columns}
                getRowId={(row) => row.id}
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