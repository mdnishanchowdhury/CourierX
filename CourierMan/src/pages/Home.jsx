import { useEffect, useState } from "react";
import { FiCheckCircle, FiXCircle, FiClock, FiTruck } from "react-icons/fi";
import { PieChart, BarChart } from "@mui/x-charts";
import { publicRequest } from "../requestMethods";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const Home = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalParcels: 0,
    delivered: 0,
    pending: 0,
    rejected: 0,
    inTransit: 0,
    parcelGrowth: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parcelRes = await publicRequest.get("/parcels");
        setParcels(parcelRes.data);

        const delivered = parcelRes.data.filter((p) => p.status === 2).length;
        const pending = parcelRes.data.filter((p) => p.status === 0).length;
        const rejected = parcelRes.data.filter((p) => p.status === 3).length;
        const inTransit = parcelRes.data.filter((p) => p.status === 1).length;

        setStats({
          totalParcels: parcelRes.data.length,
          delivered,
          pending,
          rejected,
          inTransit,
          parcelGrowth: calculateGrowth(parcelRes.data),
        });
      } catch (error) {
        console.error("Data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateGrowth = (data) => {
    // Mock growth calculation - replace with your actual logic
    const currentMonth = data.length;
    const previousMonth = Math.max(1, Math.floor(currentMonth * 0.92));
    return ((currentMonth - previousMonth) / previousMonth) * 100;
  };

  const recentParcels = [...parcels]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="rounded" width="100%" height={180} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Skeleton variant="rounded" width="100%" height={400} />
          <Skeleton variant="rounded" width="100%" height={400} />
        </div>
        <Skeleton variant="rounded" width="100%" height={400} />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card
          title="Total Parcels"
          value={stats.totalParcels}
          growth={stats.parcelGrowth}
        />

        <Card
          title="Delivered"
          value={stats.delivered}
          percentage={(stats.delivered / stats.totalParcels) * 100}
          icon={<FiCheckCircle className="text-2xl" />}
          iconColor="bg-green-100 text-green-600"
        />
        <Card
          title="Padding"
          value={stats.pending}
          percentage={(stats.pending / stats.totalParcels) * 100}
          icon={<FiClock className="text-2xl" />}
          iconColor="bg-yellow-100 text-yellow-600"
        />

        <Card
          title="Reject Orders"
          value={stats.inTransit}
          percentage={(stats.inTransit / stats.totalParcels) * 100}
          icon={<FiTruck className="text-2xl" />}
          iconColor="bg-blue-100 text-blue-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Status Distribution
          </h2>
          <div className="flex justify-center h-80">
            <PieChart
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: stats.delivered,
                      label: "Delivered",
                      color: "#22c55e",
                    },
                    {
                      id: 1,
                      value: stats.inTransit,
                      label: "Padding",
                      color: "#3b82f6",
                    },
                    {
                      id: 2,
                      value: stats.pending,
                      label: "Pending",
                      color: "#eab308",
                    },
                    {
                      id: 3,
                      value: stats.rejected,
                      label: "Delivered",
                      color: "#ef4444",
                    },
                  ],
                  innerRadius: 40,
                  outerRadius: 100,
                  paddingAngle: 2,
                  cornerRadius: 5,
                },
              ]}
              slotProps={{
                legend: { hidden: true },
              }}
            />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Weekly Delivery Trends
          </h2>
          <div className="flex justify-center h-80">
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                },
              ]}
              series={[
                {
                  data: [4, 3, 5, 7, 6, 2, 4],
                  color: "#3b82f6",
                  label: "Delivered",
                },
                {
                  data: [2, 1, 3, 2, 4, 1, 2],
                  color: "#eab308",
                  label: "Pending",
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Recent Parcels Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Recent Parcels
        </h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow className="bg-gray-50">
                <TableCell className="font-semibold">Tracking ID</TableCell>
                <TableCell className="font-semibold">Sender</TableCell>
                <TableCell className="font-semibold">Recipient</TableCell>
                <TableCell className="font-semibold">Route</TableCell>
                <TableCell className="font-semibold">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentParcels.map((parcel) => (
                <TableRow key={parcel._id} hover>
                  <TableCell className="font-medium">
                    #{parcel._id.slice(-6)}
                  </TableCell>
                  <TableCell>{parcel.sendername}</TableCell>
                  <TableCell>{parcel.recipientname}</TableCell>
                  <TableCell>
                    {parcel.from} → {parcel.to}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={parcel.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value, percentage, icon, iconColor, growth }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
        <div className="flex items-center gap-2 mt-2">
          {percentage !== undefined && (
            <span className="text-sm text-gray-500">
              {Math.round(percentage)}% of total
            </span>
          )}
          {growth !== undefined && (
            <span
              className={`text-sm ${
                growth >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {growth >= 0 ? "↑" : "↓"} {Math.abs(growth).toFixed(1)}%
            </span>
          )}
        </div>
      </div>
      {icon && <div className={`p-3 rounded-lg ${iconColor}`}>{icon}</div>}
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const statusMap = {
    0: { text: "Pending", color: "bg-yellow-100 text-yellow-800" },
    1: { text: "Padding", color: "bg-blue-100 text-blue-800" },
    2: { text: "Delivered", color: "bg-green-100 text-green-800" },
    3: { text: "Delivered", color: "bg-green-100 text-red-800" },
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        statusMap[status]?.color || "bg-gray-100"
      }`}
    >
      {statusMap[status]?.text || "Unknown"}
    </span>
  );
};

export default Home;
