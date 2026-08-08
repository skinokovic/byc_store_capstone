import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { TrendingUp } from "lucide-react";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function OverviewChart() {
  const [mode, setMode] = useState("revenue");

  const { allOrders: orders = [] } = useSelector((state) => state.orders);

  const chartData = useMemo(() => {
    const data = months.map((month) => ({
      month,
      revenue: 0,
      orders: 0,
    }));

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const monthIndex = date.getMonth();

      data[monthIndex].orders += 1;

      if (order.paymentStatus === "paid") {
        data[monthIndex].revenue += order.total;
      }
    });

    return data;
  }, [orders]);

  const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);

  const totalOrders = chartData.reduce((sum, item) => sum + item.orders, 0);

  return (
    <div className="admin-card h-100">
      {/* =========================
          HEADER
      ========================== */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold mb-1">Overview</h5>

          <small className="text-white">Monthly performance</small>
        </div>

        <TrendingUp size={22} className="text-danger" />
      </div>

      {/* =========================
          MODE BUTTONS
      ========================== */}
      <div className="d-flex gap-2 mb-4">
        <button
          type="button"
          className={`btn btn-sm ${
            mode === "revenue" ? "btn-danger" : "btn-outline-danger"
          }`}
          onClick={() => setMode("revenue")}
        >
          Revenue
        </button>

        <button
          type="button"
          className={`btn btn-sm ${
            mode === "orders" ? "btn-danger" : "btn-outline-danger"
          }`}
          onClick={() => setMode("orders")}
        >
          Orders
        </button>
      </div>

      {/* =========================
          TOTAL
      ========================== */}
      <div className="mb-3">
        <h3 className="fw-bold mb-0">
          {mode === "revenue"
            ? `₦${totalRevenue.toLocaleString()}`
            : totalOrders.toLocaleString()}
        </h3>

        <small className="text-white">
          {mode === "revenue" ? "Total Revenue" : "Total Orders"}
        </small>
      </div>

      {/* =========================
          CHART
      ========================== */}
      <div
        style={{
          width: "100%",
          height: 300,
          minWidth: 0,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 15,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
              interval="preserveStartEnd"
              minTickGap={10}
              tick={{
                fontSize: 10,
              }}
              tickMargin={6}
            />

            <YAxis
              width={50}
              tick={{
                fontSize: 10,
              }}
              tickMargin={6}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey={mode}
              stroke="#dc3545"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default OverviewChart;
