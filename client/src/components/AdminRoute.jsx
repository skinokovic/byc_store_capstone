import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// Wrap admin-only <Route> elements with this.
// - No user logged in at all -> send to /login
// - Logged in but not an admin -> send to / (silently, no error page,
//   since a regular customer hitting an admin URL isn't a broken link,
//   it's just not their page)
function AdminRoute() {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
