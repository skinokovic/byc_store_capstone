// const orderStatusData = [
//   { label: "Total Orders", value: 1670, max: 1670, showBar: true },
//   { label: "In Transit", value: 102, max: 1670, showBar: true },
//   { label: "Delivered", value: 825, max: 1670, showBar: true },
//   { label: "Cancelled", value: 67, max: 1670, showBar: true },
// ];

// function OrderStatus() {
//   return (
//     <div className="admin-card h-100">
//       <h6 className="fw-bold mb-0">Order Status</h6>
//       <p className="text-secondary small mb-3">Showing state of all the orders</p>

//       <div className="d-flex flex-column gap-3">
//         {orderStatusData.map((row) => {
//           const widthPercent = Math.max((row.value / row.max) * 100, 8);
//           return (
//             <div
//               key={row.label}
//               className="admin-order-bar d-flex align-items-center justify-content-between px-3"
//               style={{ width: `${widthPercent}%` }}
//             >
//               <span className="small">{row.label}</span>
//               <span className="fw-bold small">{row.value.toLocaleString()}</span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default OrderStatus;

import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Clock3,
  PackageCheck,
  Truck,
  CheckCircle2,
  XCircle,
} from "lucide-react";

function OrderStatus() {
  const { allOrders: orders = [] } = useSelector((state) => state.orders);

  const stats = useMemo(() => {
    const total = orders.length;

    const pending = orders.filter((order) => order.status === "pending").length;

    const processing = orders.filter(
      (order) => order.status === "processing",
    ).length;

    const transit = orders.filter((order) => order.status === "shipped").length;

    const delivered = orders.filter(
      (order) => order.status === "delivered",
    ).length;

    const cancelled = orders.filter(
      (order) => order.status === "cancelled",
    ).length;

    return {
      total,
      pending,
      processing,
      transit,
      delivered,
      cancelled,
    };
  }, [orders]);

  const rows = [
    {
      label: "Pending",
      value: stats.pending,
      color: "#ffc107",
      icon: Clock3,
    },
    {
      label: "Processing",
      value: stats.processing,
      color: "#0d6efd",
      icon: PackageCheck,
    },
    {
      label: "In Transit",
      value: stats.transit,
      color: "#20c997",
      icon: Truck,
    },
    {
      label: "Delivered",
      value: stats.delivered,
      color: "#198754",
      icon: CheckCircle2,
    },
    {
      label: "Cancelled",
      value: stats.cancelled,
      color: "#dc3545",
      icon: XCircle,
    },
  ];

  return (
    <div className="admin-card h-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold mb-1">Order Status</h5>
          <small className="text-secondary">
            Distribution of customer orders
          </small>
        </div>

        <div className="text-end">
          <h3 className="fw-bold text-danger mb-0">{stats.total}</h3>
          <small>Total Orders</small>
        </div>
      </div>

      <div className="d-flex flex-column gap-4">
        {rows.map((row) => {
          const Icon = row.icon;

          const percent =
            stats.total === 0 ? 0 : (row.value / stats.total) * 100;

          return (
            <div key={row.label}>
              <div className="d-flex justify-content-between mb-2">
                <div className="d-flex align-items-center gap-2">
                  <Icon size={18} color={row.color} />

                  <span className="fw-semibold">{row.label}</span>
                </div>

                <div className="text-end">
                  <strong>{row.value}</strong>

                  <small className="ms-2 text-secondary">
                    ({percent.toFixed(0)}%)
                  </small>
                </div>
              </div>

              <div
                className="progress"
                style={{
                  height: 8,
                  borderRadius: 50,
                  background: "#ececec",
                }}
              >
                <div
                  className="progress-bar"
                  style={{
                    width: `${percent}%`,
                    background: row.color,
                    transition: "0.5s",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderStatus;
