import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// Wraps routes that should only be reachable while LOGGED OUT (login,
// register). If a user is already authenticated and tries to visit one of
// these, they're redirected away instead of seeing the form again -
// mirrors AdminRoute's pattern, just inverted.
function GuestRoute() {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    // Send them somewhere sensible based on role, rather than a generic
    // "not allowed" page - same destination logic used for the avatar link.
    return <Navigate to={user.role === "admin" ? "/admin" : "/"} replace />;
  }

  return <Outlet />;
}

export default GuestRoute;
