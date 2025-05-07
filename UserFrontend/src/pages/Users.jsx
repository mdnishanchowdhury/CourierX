import { DataGrid } from "@mui/x-data-grid";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useEffect, useState, useCallback } from "react";
import { toast } from 'react-toastify';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectionModel, setSelectionModel] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await publicRequest.get("/users");
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error("Fetch users error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await publicRequest.delete(`/users/${id}`);
      setUsers(prev => prev.filter(user => user._id !== id));
      setSelectionModel(prev => prev.filter(itemId => itemId !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
      console.error("Delete user error:", error);
    }
  };

  const handleBulkDelete = async () => {
    if (!selectionModel.length) return;
    if (!window.confirm(`Are you sure you want to delete ${selectionModel.length} selected users?`)) return;
    
    try {
      await Promise.all(
        selectionModel.map(id => publicRequest.delete(`/users/${id}`))
      );
      setUsers(prev => prev.filter(user => !selectionModel.includes(user._id)));
      setSelectionModel([]);
      toast.success(`${selectionModel.length} users deleted successfully`);
    } catch (error) {
      toast.error("Failed to delete selected users");
      console.error("Bulk delete error:", error);
    }
  };

  const columns = [
    { 
      field: "fullname", 
      headerName: "Name", 
      flex: 1,
      minWidth: 180,
      headerClassName: "font-semibold text-gray-700",
      cellClassName: "font-medium text-gray-800"
    },
    { 
      field: "email", 
      headerName: "Email", 
      flex: 1,
      minWidth: 220,
      headerClassName: "font-semibold text-gray-700",
      renderCell: (params) => (
        <a 
          href={`mailto:${params.value}`} 
          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
        >
          {params.value}
        </a>
      ),
    },
    { 
      field: "age", 
      headerName: "Age", 
      width: 100,
      headerClassName: "font-semibold text-gray-700",
      align: "center",
      headerAlign: "center",
      cellClassName: "text-center text-gray-600"
    },
    { 
      field: "country", 
      headerName: "Country", 
      flex: 1,
      minWidth: 150,
      headerClassName: "font-semibold text-gray-700",
      cellClassName: "text-gray-600"
    },
    { 
      field: "role", 
      headerName: "Role", 
      width: 150,
      headerClassName: "font-semibold text-gray-700",
      renderCell: (params) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          params.value === 'admin' 
            ? 'bg-purple-100 text-purple-800' 
            : params.value === 'moderator'
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
        }`}>
          {params.value}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      headerClassName: "font-semibold text-gray-700",
      renderCell: (params) => (
        <div className="flex space-x-4">
          <Link to={`/edit-user/${params.row._id}`}>
            <button 
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              aria-label="Edit user"
            >
              <FaEdit size={16} />
            </button>
          </Link>
          <button
            onClick={() => handleDelete(params.row._id)}
            className="text-red-600 hover:text-red-800 transition-colors duration-200"
            aria-label="Delete user"
          >
            <FaTrash size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          {/* Header Section */}
          <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">User Management</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Manage all system users</p>
              </div>
              
              <div className="flex flex-wrap gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                {selectionModel.length > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                  >
                    <FaTrash size={14} />
                    <span>Delete ({selectionModel.length})</span>
                  </button>
                )}
                <Link to="/newuser" className="w-full sm:w-auto">
                  <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg transition-colors duration-200 w-full justify-center sm:w-auto text-sm sm:text-base">
                    <FaPlus size={14} />
                    <span>New User</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* DataGrid Section */}
          <div className="p-3 sm:p-6">
            <div className="h-[calc(100vh-220px)] min-h-[400px]">
              <DataGrid
                rows={users}
                columns={columns}
                getRowId={(row) => row._id}
                loading={loading}
                disableSelectionOnClick
                pageSize={10}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
                selectionModel={selectionModel}
                onSelectionModelChange={(newSelection) => {
                  setSelectionModel(newSelection);
                }}
                sx={{
                  border: 'none',
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f9fafb',
                    borderBottom: '1px solid #e5e7eb',
                  },
                  '& .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: '600',
                    color: '#374151',
                  },
                  '& .MuiDataGrid-cell': {
                    borderBottom: '1px solid #e5e7eb',
                    outline: 'none !important',
                  },
                  '& .MuiDataGrid-cell:hover': {
                    color: '#2563eb',
                  },
                  '& .MuiDataGrid-row:hover': {
                    backgroundColor: '#f8fafc',
                  },
                  '& .MuiDataGrid-row.Mui-selected': {
                    backgroundColor: '#eff6ff',
                  },
                  '& .MuiDataGrid-row.Mui-selected:hover': {
                    backgroundColor: '#dbeafe',
                  },
                  '& .Mui-checked': {
                    color: '#2563eb !important',
                  },
                  '& .MuiDataGrid-footerContainer': {
                    borderTop: '1px solid #e5e7eb',
                    backgroundColor: '#f9fafb',
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;