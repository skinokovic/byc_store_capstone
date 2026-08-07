import { Link } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import { useSelector } from "react-redux";
import Avatar from "../admin/Avatar";

function AdminHeader({
  title = "Dashboard",
  subtitle = "Your store details & analytics",
}) {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
      <div>
        <h5 className="text-secondary">
          Welcome, {user?.name?.split(" ")[0] || "Admin"} ({user?.role})
        </h5>
        <h5 className="fw-bold mb-0 d-inline-block me-2">{title}</h5>
        <p className="text-secondary small mb-0">{subtitle}</p>
      </div>

      <div className="d-flex align-items-center gap-3">
        <div className="admin-search d-flex align-items-center gap-2">
          <input
            type="search"
            placeholder="Search a feature or stats"
            className="admin-search-input"
          />
          <Search size={16} className="text-secondary flex-shrink-0" />
        </div>

        <button className="admin-icon-btn" aria-label="Notifications">
          <Bell size={18} />
        </button>

        <Link to="/admin/settings" aria-label="My profile">
          <Avatar src={user?.avatar} name={user?.name} size={40} />
        </Link>
      </div>
    </div>
  );
}

export default AdminHeader;
