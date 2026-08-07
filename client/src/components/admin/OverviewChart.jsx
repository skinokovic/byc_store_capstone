// import { LineChart, Line, ResponsiveContainer, YAxis, XAxis } from "recharts";
// import { Info } from "lucide-react";

// const dummyData = [
//   { month: "Jan", value: 3200 },
//   { month: "", value: 4100 },
//   { month: "", value: 2800 },
//   { month: "", value: 5000 },
//   { month: "", value: 3600 },
//   { month: "Mar", value: 6242 },
// ];

// function OverviewChart() {
//   const latestValue = dummyData[dummyData.length - 1].value;

//   return (
//     <div className="admin-card">
//       <div className="d-flex justify-content-between align-items-start mb-1">
//         <div>
//           <h6 className="fw-bold mb-0">Overview</h6>
//           <p className="text-secondary small mb-0">Trends over a period</p>
//         </div>
//         <Info size={16} className="text-secondary" />
//       </div>

//       <p className="fw-bold mb-2" style={{ fontSize: "1.1rem" }}>
//         ${latestValue.toLocaleString()}.0
//       </p>

//       <div style={{ width: "100%", height: 160 }}>
//         <ResponsiveContainer>
//           <LineChart data={dummyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
//             <XAxis
//               dataKey="month"
//               tick={{ fill: "#888", fontSize: 12 }}
//               axisLine={{ stroke: "#333" }}
//               tickLine={false}
//             />
//             <YAxis hide domain={["dataMin - 500", "dataMax + 500"]} />
//             <Line
//               type="monotone"
//               dataKey="value"
//               stroke="#dc3545"
//               strokeWidth={2}
//               dot={false}
//               activeDot={{ r: 5, fill: "#dc3545" }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

// export default OverviewChart;

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold mb-1">Overview</h5>

          <small className="text-white">Monthly performance</small>
        </div>

        <TrendingUp size={22} className="text-danger" />
      </div>

      <div className="d-flex gap-2 mb-4">
        <button
          className={`btn btn-sm ${
            mode === "revenue" ? "btn-danger" : "btn-outline-danger"
          }`}
          onClick={() => setMode("revenue")}
        >
          Revenue
        </button>

        <button
          className={`btn btn-sm ${
            mode === "orders" ? "btn-danger" : "btn-outline-danger"
          }`}
          onClick={() => setMode("orders")}
        >
          Orders
        </button>
      </div>

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

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

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
