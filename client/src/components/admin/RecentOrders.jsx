import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight } from "lucide-react";
import "./RecentOrders.css";

const currency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
});

const STATUS_STYLES = {
  pending: "text-bg-warning",
  processing: "text-bg-primary",
  "in transit": "text-bg-info",
  delivered: "text-bg-success",
  cancelled: "text-bg-danger",
};

function RecentOrders() {
  const navigate = useNavigate();

  const { allOrders: orders = [] } = useSelector((state) => state.orders);

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);
  }, [orders]);

  return (
    <div className="admin-card h-100">
      {/* =========================
          HEADER
      ========================== */}
      <div className="d-flex justify-content-between align-items-start gap-2 mb-4">
        <div>
          <h5 className="fw-bold mb-1">Recent Orders</h5>

          <small className="text-secondary">Latest customer orders</small>
        </div>

        <button
          type="button"
          className="btn btn-sm btn-outline-danger flex-shrink-0"
          onClick={() => navigate("/admin/orders")}
        >
          View All
        </button>
      </div>

      {/* =========================
          ORDERS
      ========================== */}
      {recentOrders.length === 0 ? (
        <div className="text-center py-5 text-secondary">No recent orders</div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {recentOrders.map((order) => (
            <div key={order._id} className="recent-order-card">
              {/* =========================
                  CUSTOMER SECTION
              ========================== */}
              <div className="recent-order-customer">
                <div className="recent-order-avatar">
                  {order.user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="recent-order-customer-info">
                  <div className="fw-semibold text-truncate">
                    {order.user?.name || "Unknown User"}
                  </div>

                  <small className="text-secondary">
                    #{order._id.slice(-8).toUpperCase()}
                  </small>

                  <div className="small text-secondary">
                    {order.itemCount} item(s)
                  </div>
                </div>
              </div>

              {/* =========================
                  ORDER DETAILS
              ========================== */}
              <div className="recent-order-details">
                <div className="recent-order-total">
                  {currency.format(order.total)}
                </div>

                <span
                  className={`badge ${
                    STATUS_STYLES[order.status] || "text-bg-secondary"
                  }`}
                >
                  {order.status}
                </span>

                <div className="small text-secondary mt-1">
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================
          VIEW ALL
      ========================== */}
      {recentOrders.length > 0 && (
        <div className="text-center mt-4">
          <button
            type="button"
            className="btn btn-danger recent-orders-view-btn"
            onClick={() => navigate("/admin/orders")}
          >
            View All Orders
            <ArrowRight size={18} className="ms-2" />
          </button>
        </div>
      )}
    </div>
  );
}

export default RecentOrders;
