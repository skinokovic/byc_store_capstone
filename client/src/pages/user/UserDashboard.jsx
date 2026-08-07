import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ShoppingBag,
  Heart,
  Clock,
  Package,
  CheckCircle,
  XCircle,
  CreditCard,
  Wallet,
  ArrowUpRight,
} from "lucide-react";

import { fetchWishlist } from "../../redux/slice/wishlistSlice";
import { fetchMyOrders } from "../../redux/slice/orderSlice";

function UserDashboard() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { myOrders: orders = [], loading: ordersLoading } = useSelector(
    (state) => state.orders,
  );

  console.log("Dashboard Orders:", orders);
  useEffect(() => {
    dispatch(fetchWishlist());
    dispatch(fetchMyOrders());
  }, [dispatch]);

  // ============================
  // Dashboard Statistics
  // ============================

  const wishlistCount = wishlist?.products?.length || 0;

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "pending",
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "processing",
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered",
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "cancelled",
  ).length;

  const paidOrders = orders.filter(
    (order) => order.paymentStatus === "paid",
  ).length;

  const unpaidOrders = orders.filter(
    (order) => order.paymentStatus === "pending",
  ).length;

  // const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const totalSpent = orders
    .filter((order) => order.paymentStatus === "paid")
    .reduce((sum, order) => sum + order.total, 0);

  // ============================
  // Cards
  // ============================

  const stats = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "#0d6efd",
      to: "/dashboard/orders",
    },
    {
      label: "Wishlist",
      value: wishlistCount,
      icon: Heart,
      color: "#dc3545",
      to: "/dashboard/wishlist",
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      icon: Clock,
      color: "#ffc107",
      to: "/dashboard/orders",
    },
    {
      label: "Processing",
      value: processingOrders,
      icon: Package,
      color: "#0dcaf0",
      to: "/dashboard/orders",
    },
    {
      label: "Delivered",
      value: deliveredOrders,
      icon: CheckCircle,
      color: "#198754",
      to: "/dashboard/orders",
    },
    {
      label: "Cancelled",
      value: cancelledOrders,
      icon: XCircle,
      color: "#dc3545",
      to: "/dashboard/orders",
    },
    {
      label: "Paid Orders",
      value: paidOrders,
      icon: CreditCard,
      color: "#20c997",
      to: "/dashboard/orders",
    },
    {
      label: "Unpaid Orders",
      value: unpaidOrders,
      icon: Wallet,
      color: "#fd7e14",
      to: "/dashboard/orders",
    },
    {
      label: "Total Spent",
      value: `₦${totalSpent.toLocaleString()}`,
      icon: ShoppingBag,
      color: "#6f42c1",
      to: "/dashboard/orders",
    },
  ];

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #1a1418 0%, #272626 45%, #2e2b2b 100%)",
        borderRadius: 16,
        padding: "2rem",
        minHeight: "calc(100vh - 120px)",
      }}
    >
      {/* Welcome */}
      <div className="mb-5">
        <h4 className="fw-bold text-white mb-1">
          Welcome back, {user?.name?.split(" ")[0] || "there"}
        </h4>

        <p className="text-white-50 mb-0">
          Here's a quick overview of your account.
        </p>
      </div>

      {/* Statistics */}
      <div className="row g-4">
        {stats.map((stat) => (
          <div className="col-12 col-sm-6 col-lg-4" key={stat.label}>
            <Link to={stat.to} className="text-decoration-none d-block h-100">
              <div
                className="d-flex justify-content-between align-items-center h-100"
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: "1.5rem",
                  boxShadow: "0 8px 24px rgba(0,0,0,.12)",
                  transition: ".25s",
                }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: 55,
                      height: 55,
                      borderRadius: 14,
                      background: stat.color,
                      color: "#fff",
                    }}
                  >
                    <stat.icon size={24} />
                  </div>

                  <div>
                    <h3
                      className="fw-bold mb-1"
                      style={{
                        fontSize: "1.7rem",
                      }}
                    >
                      {ordersLoading && stat.label !== "Wishlist"
                        ? "..."
                        : stat.value}
                    </h3>

                    <p className="text-muted mb-0">{stat.label}</p>
                  </div>
                </div>

                <ArrowUpRight size={20} className="text-secondary" />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
