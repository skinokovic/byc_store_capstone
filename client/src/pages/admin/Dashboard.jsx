import DashboardStats from "../../components/admin/StatsCards";
import OverviewChart from "../../components/admin/OverviewChart";
import OrderStatus from "../../components/admin/OrderStatus";
import TopProducts from "../../components/admin/TopProducts";
import RecentOrders from "../../components/admin/RecentOrders";
import NewUsers from "../../components/admin/NewUsers";
import QuickAnalytics from "../../components/admin/QuickAnalytics";
import DashboardHeader from "../../components/admin/DashboardHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllOrders } from "../../redux/slice/orderSlice";
import { fetchUsers } from "../../redux/slice/userSlice";
import { fetchDashboard } from "../../redux/slice/dashboardSlice";
import { fetchProducts } from "../../redux/slice/productSlice";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchDashboard());
      dispatch(fetchAllOrders());
      dispatch(fetchProducts());
      dispatch(fetchUsers());
    }, 3000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="container-fluid py-4">
      {/* ===========================
          PAGE HEADER
          
      ============================ */}
      <DashboardHeader user={user} />
      <div className="mb-4">
        {/* <h3 className="fw-bold mb-1">Dashboard</h3>

        <p className="text-secondary mb-0">
          Welcome back. Here's what's happening in your store today.
        </p> */}
      </div>

      {/* ===========================
          STATS CARDS
      ============================ */}
      <DashboardStats />

      {/* ===========================
          CHART + ORDER STATUS
      ============================ */}
      <div className="row g-4 mt-1">
        <div className="col-12 col-xl-8">
          <OverviewChart />
        </div>

        <div className="col-12 col-xl-4">
          <OrderStatus />
        </div>
      </div>

      {/* ===========================
          TOP PRODUCTS + RECENT ORDERS
      ============================ */}
      <div className="row g-4 mt-1">
        <div className="col-12 col-xl-7">
          <TopProducts />
        </div>

        <div className="col-12 col-xl-5">
          <RecentOrders />
        </div>
      </div>

      {/* ===========================
          NEW USERS + QUICK ANALYTICS
      ============================ */}
      <div className="row g-4 mt-1">
        <div className="col-12 col-xl-6">
          <NewUsers />
        </div>

        <div className="col-12 col-xl-6">
          <QuickAnalytics />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
