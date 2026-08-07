import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import cart from "../assets/cart.png";
import heart from "../assets/heart.png";
// import userIcon from "../assets/user.png";
import search from "../assets/search.png";
import Avatar from "../components/admin/Avatar";

function Sidebar({ showSidebar, handleClose }) {
  // Same login-state check as Navbar.jsx, so mobile stays consistent with desktop
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className={"offcanvas offcanvas-start " + (showSidebar ? "show" : "")}
      tabIndex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasExampleLabel">
          Menu
        </h5>
        <button
          type="button"
          onClick={handleClose}
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div className="offcanvas-body d-flex flex-column">
        {/* Page links - mirrors Navbar.jsx's NavListItem entries */}
        <ul className="list-unstyled d-flex flex-column gap-3 mb-4">
          <li>
            <Link to="/" onClick={handleClose} className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" onClick={handleClose} className="nav-link">
              Shop Products
            </Link>
          </li>
          <li>
            <Link to="/blog" onClick={handleClose} className="nav-link">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/faq" onClick={handleClose} className="nav-link">
              FAQ
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={handleClose} className="nav-link">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={handleClose} className="nav-link">
              Contact
            </Link>
          </li>
        </ul>

        <hr />

        {/* Icon actions - mirrors Navbar.jsx's NavListBtnItem entries */}
        <ul className="list-unstyled d-flex flex-column gap-3 mt-auto">
          <li>
            <Link
              to={user ? "/profile" : "/login"}
              onClick={handleClose}
              className="d-flex align-items-center gap-2 nav-link"
            >
              {/* <img src={userIcon} alt="user icon" className="nav-icon" /> */}
              <Avatar src={user?.avatar} name={user?.name} size={28} />
              {user ? user?.name : "Login / Register"}
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/wishlist"
              onClick={handleClose}
              className="d-flex align-items-center gap-2 nav-link"
            >
              <img src={heart} alt="wishlist icon" className="nav-icon" />
              Wishlist
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              onClick={handleClose}
              className="d-flex align-items-center gap-2 nav-link"
            >
              <img src={cart} alt="cart icon" className="nav-icon" />
              Cart
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-link d-flex align-items-center gap-2 nav-link p-0 text-start"
            >
              <img src={search} alt="search icon" className="nav-icon" />
              Search
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
