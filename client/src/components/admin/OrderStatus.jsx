import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Clock3,
  PackageCheck,
  Truck,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import "./OrderStatus.css";

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
    <div className="admin-card order-status-card h-100">
      {/* =========================
          HEADER
      ========================== */}
      <div className="order-status-header">
        <div>
          <h5 className="fw-bold mb-1">Order Status</h5>

          <small className="text-muted">Distribution of customer orders</small>
        </div>

        <div className="order-total-box">
          <span className="order-total-number">{stats.total}</span>

          <span className="order-total-label">Total Orders</span>
        </div>
      </div>

      {/* =========================
          STATUS LIST
      ========================== */}
      <div className="order-status-list">
        {rows.map((row) => {
          const Icon = row.icon;

          const percent =
            stats.total === 0 ? 0 : (row.value / stats.total) * 100;

          return (
            <div key={row.label} className="order-status-item">
              {/* Status information */}
              <div className="order-status-info">
                <div className="order-status-name">
                  <div
                    className="order-status-icon"
                    style={{
                      color: row.color,
                      background: `${row.color}15`,
                    }}
                  >
                    <Icon size={17} />
                  </div>

                  <span>{row.label}</span>
                </div>

                <div className="order-status-value">
                  <strong>{row.value}</strong>

                  <span>{percent.toFixed(0)}%</span>
                </div>
              </div>

              {/* Progress */}
              <div
                className="progress order-status-progress"
                style={{
                  background: "#eeeeee",
                }}
              >
                <div
                  className="progress-bar"
                  style={{
                    width: `${percent}%`,
                    background: row.color,
                    transition: "width 0.5s ease",
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
