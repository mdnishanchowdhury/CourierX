import { useMemo } from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { publicRequest } from "../requestMethods";
import { FiPackage, FiRefreshCw, FiAlertCircle } from "react-icons/fi";

const Parcels = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rowSelection, setRowSelection] = useState([]);

  const columns = useMemo(() => [
    { 
      field: "from", 
      headerName: "From", 
      width: 150,
      headerClassName: "font-semibold text-gray-700 bg-gray-50",
      cellClassName: "text-gray-600",
    },
    { 
      field: "to", 
      headerName: "To", 
      width: 150,
      headerClassName: "font-semibold text-gray-700 bg-gray-50",
      cellClassName: "text-gray-600",
    },
    { 
      field: "sendername", 
      headerName: "Sender", 
      width: 150,
      headerClassName: "font-semibold text-gray-700 bg-gray-50",
      cellClassName: "text-gray-600",
    },
    { 
      field: "recipientname", 
      headerName: "Recipient", 
      width: 150,
      headerClassName: "font-semibold text-gray-700 bg-gray-50",
      cellClassName: "text-gray-600",
    },
    { 
      field: "note", 
      headerName: "Note", 
      width: 200,
      headerClassName: "font-semibold text-gray-700 bg-gray-50",
      cellClassName: "text-gray-600",
      renderCell: (params) => (
        <div className="truncate text-gray-500" title={params.value}>
          {params.value}
        </div>
      ),
    },
  ], []);

  const fetchParcels = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await publicRequest.get("/parcels");
      setParcels(res.data);
    } catch (err) {
      console.error("Failed to fetch parcels:", err);
      setError("Failed to load parcels. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6  p-4 bg-white rounded-lg">
  <div className="flex items-center gap-3">
    <div className="p-2 rounded-lg bg-indigo-100">
      <FiPackage className="text-xl text-indigo-600" />
    </div>
    <div>
      <h1 className="text-2xl font-bold text-gray-800">All Parcel Orders</h1>
      <p className="text-sm text-gray-500">Manage and track all parcel deliveries</p>
    </div>
    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
      {parcels.length} items
    </span>
  </div>
  
  <button
    onClick={fetchParcels}
    disabled={loading}
    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
      loading 
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-100 hover:shadow-sm"
    }`}
  >
    {loading ? (
      <FiRefreshCw className="animate-spin" />
    ) : (
      <FiRefreshCw />
    )}
    Refresh
  </button>
</div>


        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
            <div className="flex items-center gap-3 text-red-600">
              <FiAlertCircle className="text-lg flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md">
          <DataGrid
            rows={parcels}
            columns={columns}
            getRowId={(row) => row._id}
            loading={loading}
            disableSelectionOnClick
            pageSize={10}
            rowsPerPageOptions={[5, 10, 25]}
            checkboxSelection
            onRowSelectionModelChange={(newSelection) => setRowSelection(newSelection)}
            rowSelectionModel={rowSelection}
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
                fontFamily: 'inherit',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
                borderRadius: 0,
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 600,
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #f1f5f9',
              },
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
              '& .MuiDataGrid-row': {
                '&:nth-of-type(even)': {
                  backgroundColor: '#f8fafc',
                },
                '&:hover': {
                  backgroundColor: '#f1f5f9',
                },
              },
              '& .MuiDataGrid-row.Mui-selected': {
                backgroundColor: '#e0e7ff',
                '&:hover': {
                  backgroundColor: '#dbeafe',
                },
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
              },
              '& .MuiTablePagination-root': {
                color: '#64748b',
              },
              '& .MuiCheckbox-root': {
                color: '#818cf8 !important',
              },
              '& .MuiDataGrid-virtualScroller': {
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {
                  width: '6px',
                  height: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f5f9',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#cbd5e1',
                  borderRadius: '4px',
                },
              },
            }}
          />
        </div>

        {rowSelection.length > 0 && (
          <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100 flex items-center justify-between">
            <p className="text-sm font-medium text-indigo-700">
              {rowSelection.length} parcel{rowSelection.length !== 1 ? 's' : ''} selected
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors">
                Bulk Action
              </button>
              <button 
                onClick={() => setRowSelection([])}
                className="px-3 py-1.5 text-xs font-medium rounded-md bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Parcels;