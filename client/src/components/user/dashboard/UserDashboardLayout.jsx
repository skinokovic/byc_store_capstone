import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import UserSidebar from "./UserSidebar";
import "./user-dashboard.css";

function UserDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="ud-shell">
      <div className="ud-frame">
        {/* Mobile-only top bar */}
        <div className="ud-mobile-topbar d-flex d-lg-none align-items-center justify-content-between">
          <button
            type="button"
            className="ud-icon-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
          <span className="fw-bold text-danger">My Account</span>
        </div>

        <div className="d-flex">
          <UserSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {sidebarOpen && (
            <div
              className="ud-sidebar-backdrop d-lg-none"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
          )}

          <main className="ud-main flex-grow-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default UserDashboardLayout;
