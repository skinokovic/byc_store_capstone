import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// Unlike AdminRoute, this doesn't check role - any logged-in user (admin
// included) can reach /dashboard/*. Only blocks fully logged-out visitors.
function UserDashboardRoute() {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default UserDashboardRoute;
