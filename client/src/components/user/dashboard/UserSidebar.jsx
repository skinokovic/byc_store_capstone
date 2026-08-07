// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import {
//   LayoutDashboard,
//   User,
//   ShoppingBag,
//   Heart,
//   Settings,
//   LogOut,
//   X,
//   Plus,
// } from "lucide-react";
// import { logout } from "../../../redux/slice/authSlice";

// const NAV_ITEMS = [
//   { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
//   { label: "Profile", icon: User, to: "/dashboard/profile" },

//   { label: "Add Address", icon: Plus, to: "/dashboard/address/create" },

//   { label: "Orders", icon: ShoppingBag, to: "/dashboard/orders" },
//   { label: "Wishlist", icon: Heart, to: "/dashboard/wishlist" },
//   { label: "Settings", icon: Settings, to: "/dashboard/settings" },
// ];

// function UserSidebar({ isOpen, onClose }) {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   function handleLogout() {
//     dispatch(logout());
//     navigate("/login");
//   }

//   return (
//     <aside
//       className={`ud-sidebar d-flex flex-column ${isOpen ? "is-open" : ""}`}
//     >
//       <div className="d-flex align-items-center justify-content-between mb-4">
//         <span className="fw-bold fs-5 text-danger">My Account</span>
//         <button
//           type="button"
//           onClick={onClose}
//           className="ud-icon-btn-sm d-lg-none"
//           aria-label="Close menu"
//         >
//           <X size={18} />
//         </button>
//       </div>

//       <nav className="flex-grow-1 d-flex flex-column gap-1">
//         {NAV_ITEMS.map((item) => {
//           const isActive = location.pathname === item.to;
//           return (
//             <Link
//               key={item.label}
//               to={item.to}
//               onClick={onClose}
//               className={`ud-nav-link ${isActive ? "active" : ""}`}
//             >
//               <item.icon size={18} />
//               <span>{item.label}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       <div className="mt-auto pt-4">
//         <button
//           type="button"
//           onClick={handleLogout}
//           className="ud-nav-link w-100 border-0 bg-transparent text-start"
//         >
//           <LogOut size={18} />
//           <span>Logout</span>
//         </button>
//       </div>
//     </aside>
//   );
// }

// export default UserSidebar;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  LayoutDashboard,
  User,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  X,
  Plus,
  ArrowLeft,
} from "lucide-react";
import { logout } from "../../../redux/slice/authSlice";
import logo from "../../../assets/logo.png";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Profile", icon: User, to: "/dashboard/profile" },
  { label: "Add Address", icon: Plus, to: "/dashboard/address/create" },
  { label: "Orders", icon: ShoppingBag, to: "/dashboard/orders" },
  { label: "Wishlist", icon: Heart, to: "/dashboard/wishlist" },
  { label: "Settings", icon: Settings, to: "/dashboard/settings" },
];

function UserSidebar({ isOpen, onClose }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <aside
      className={`ud-sidebar d-flex flex-column ${isOpen ? "is-open" : ""}`}
    >
      <div className="d-flex align-items-center justify-content-between mb-4">
        <Link to="/" className="d-flex align-items-center">
          <img src={logo} alt="Home" style={{ width: 56, height: 34 }} />
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="ud-icon-btn-sm d-lg-none"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>

      <span className="fw-bold fs-6 text-secondary text-uppercase mb-3">
        My Account
      </span>

      <nav className="flex-grow-1 d-flex flex-column gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.label}
              to={item.to}
              onClick={onClose}
              className={`ud-nav-link ${isActive ? "active" : ""}`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 d-flex flex-column gap-1">
        <Link to="/shop" onClick={onClose} className="ud-nav-link">
          <ArrowLeft size={18} />
          <span>Continue Shopping</span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="ud-nav-link w-100 border-0 bg-transparent text-start"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default UserSidebar;
