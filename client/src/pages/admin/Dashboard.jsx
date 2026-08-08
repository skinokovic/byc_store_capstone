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
    <div
      className="container-fluid py-3 py-lg-4"
      style={{
        overflowX: "hidden",
        maxWidth: "100%",
      }}
    >
      <DashboardHeader user={user} />

      <DashboardStats />

      <div className="row gx-4 gy-4 mt-4">
        <div className="col-12 col-lg-8">
          <OverviewChart />
        </div>

        <div className="col-12 col-lg-4">
          <OrderStatus />
        </div>
      </div>

      <div className="row gx-4 gy-4 mt-4">
        <div className="col-12 col-lg-7">
          <TopProducts />
        </div>

        <div className="col-12 col-lg-5">
          <RecentOrders />
        </div>
      </div>

      <div className="row gx-4 gy-4 mt-4">
        <div className="col-12 col-lg-6">
          <NewUsers />
        </div>

        <div className="col-12 col-lg-6">
          <QuickAnalytics />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
