import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import "./admin.css";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-shell">
      <div className="admin-frame">
        {/* Mobile-only top bar - hamburger opens the drawer sidebar.
            Hidden on md+ since the sidebar is a fixed column there instead. */}
        <div className="admin-mobile-topbar d-flex d-md-none align-items-center justify-content-between">
          <button
            type="button"
            className="admin-icon-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
          <div
            className="rounded-circle"
            style={{
              width: 32,
              height: 32,
              background: "conic-gradient(#dc3545, #212121, #dc3545)",
            }}
          />
        </div>

        <div className="d-flex">
          <AdminSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Backdrop - clicking it closes the drawer, same as tapping outside a modal */}
          {sidebarOpen && (
            <div
              className="admin-sidebar-backdrop d-md-none"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
          )}

          <main className="admin-main flex-grow-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
