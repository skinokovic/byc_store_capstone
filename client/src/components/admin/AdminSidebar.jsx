import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  LayoutGrid,
  Headphones,
  Settings,
  LogOut,
  ChevronDown,
  Users,
  ShoppingBag,
  X,
  SlidersHorizontal,
  CirclePile,
  Rss,
  MessageCircle,
  MessagesSquare,
  Truck,
  MailCheck,
  //   CircleUserRound,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/authSlice";

// Each entry with `children` renders as an expandable dropdown;
// entries without `children` render as a plain link.
const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/admin" },

  {
    label: "Home Management",

    icon: SlidersHorizontal,
    children: [
      { label: "Hero Sliders", to: "/admin/sliders" },
      { label: "Create New Slider", to: "/admin/sliders/create" },
      { label: "Home Arrivals", to: "/admin/arrivals" },
      { label: "Create New Arrival", to: "/admin/arrivals/create" },
      { label: "Home Collections", to: "/admin/collections" },
      { label: "New Collection", to: "/admin/collections/create" },
    ],
  },
  {
    label: "Products",
    icon: Package,
    children: [
      { label: "Create Product", to: "/admin/products/create" },
      { label: "All Products", to: "/admin/products" },
    ],
  },
  {
    label: "Categories",
    icon: LayoutGrid,
    children: [
      { label: "All Categories", to: "/admin/categories" },
      { label: "Create Category", to: "/admin/categories/create" },
    ],
  },

  {
    label: "Orders",
    icon: ShoppingBag,
    children: [
      { label: "All Orders", to: "/admin/orders" },
      { label: "Pending Orders", to: "/admin/orders?status=pending" },
    ],
  },

  {
    label: "Users",
    icon: Users,
    children: [
      { label: "Create User", to: "/admin/users/create" },
      { label: "All Users", to: "/admin/users" },
    ],
  },

  {
    label: "Contact Messages",
    icon: MessagesSquare,
    children: [{ label: "All Messages", to: "/admin/messages" }],
  },

  {
    label: "Email Subscriber",

    icon: MailCheck,
    children: [{ label: "Subscribers", to: "/admin/subscribers" }],
  },

  {
    label: "Delivery Zones",
    icon: Truck,
    children: [
      { label: "Create Zones", to: "/admin/delivery-zone/create" },
      { label: "All Zones", to: "/admin/zones" },
    ],
  },

  {
    label: "Blog Management",
    icon: Rss,
    children: [
      { label: "All Blogs", to: "/admin/blogs" },
      { label: "Create New Blog", to: "/admin/blogs/create" },
      { label: "All Categories", to: "/admin/blogs/categories" },
      { label: "New Category", to: "/admin/blogs/create" },
      { label: "User Comments", to: "/admin/blogs/comments" },
    ],
  },

  //   { label: "Profile", icon: CircleUserRound, to: "/admin/profile" },
  { label: "Support", icon: Headphones, to: "/admin/support" },
  { label: "Settings", icon: Settings, to: "/admin/settings" },
];

function NavGroup({ item, onNavigate }) {
  const location = useLocation();
  const hasChildren = Boolean(item.children);

  const isChildActive = hasChildren
    ? item.children.some(
        (child) => location.pathname === child.to.split("?")[0],
      )
    : false;

  const [open, setOpen] = useState(isChildActive);

  if (!hasChildren) {
    const isActive = location.pathname === item.to;
    return (
      <Link
        to={item.to}
        onClick={onNavigate}
        className={`admin-nav-link ${isActive ? "active" : ""}`}
      >
        <item.icon size={18} />
        <span>{item.label}</span>
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`admin-nav-link w-100 border-0 bg-transparent text-start ${
          isChildActive ? "active" : ""
        }`}
      >
        <item.icon size={18} />
        <span className="flex-grow-1">{item.label}</span>
        <Link>
          <ChevronDown
            size={14}
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          />
        </Link>
      </button>

      {open && (
        <div className="admin-nav-sublist">
          {item.children.map((child) => {
            const childPath = child.to.split("?")[0];
            const isActive = location.pathname === childPath;
            return (
              <Link
                key={child.to}
                to={child.to}
                onClick={onNavigate}
                className={`admin-nav-sublink ${isActive ? "active" : ""}`}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AdminSidebar({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <aside
      className={`admin-sidebar d-flex flex-column ${isOpen ? "is-open" : ""}`}
    >
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div
          className="rounded-circle"
          style={{
            width: 48,
            height: 48,
            background: "conic-gradient(#dc3545, #212121, #dc3545)",
          }}
        />
        {/* Close button - mobile drawer only */}
        <button
          type="button"
          onClick={onClose}
          className="admin-icon-btn-sm d-md-none"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex-grow-1 d-flex flex-column gap-1">
        {NAV_ITEMS.map((item) => (
          <NavGroup item={item} key={item.label} onNavigate={onClose} />
        ))}
      </nav>

      <div className="mt-auto pt-4">
        <button
          type="button"
          onClick={handleLogout}
          className="admin-nav-link w-100 border-0 bg-transparent text-start"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>

        <div className="d-flex gap-3 mt-3 px-2">
          <a href="#" className="admin-footer-link">
            Privacy Policy
          </a>
          <a href="#" className="admin-footer-link">
            Terms &amp; Conditions
          </a>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
