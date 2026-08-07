import { useEffect } from "react";

import cartIcon from "../assets/cart.png";
import logo from "../assets/logo.png";
import heart from "../assets/heart.png";
import userIcon from "../assets/user.png";
import search from "../assets/search.png";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import SearchBar from "./Searchbar";
import Avatar from "../components/admin/Avatar";
import {
  fetchWishlist,
  clearWishlistNotification,
} from "../redux/slice/wishlistSlice";

function Navbar() {
  const dispatch = useDispatch();

  const [showSearch, setShowSearch] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  function handleClick() {
    setShowSearch(!showSearch);
  }

  function handleShowSidebar() {
    setShowSidebar(true);
  }
  function handleCloseSidebar() {
    setShowSidebar(false);
  }
  // const { wishlist } = useSelector((state) => state.wishlist);
  const { notificationCount } = useSelector((state) => state.wishlist);

  // const wishlistCount = wishlist?.products?.length || 0;

  const { user } = useSelector((state) => state.auth);
  const { cart, guestCart } = useSelector((state) => state.cart);

  // const cartCount = cartState?.items?.length || 0;

  // Logged in users -> database cart
  // Guests -> localStorage cart
  const cartCount = user ? cart?.items?.length || 0 : guestCart?.length || 0;

  useEffect(() => {
    if (user) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, user]);
  return (
    <>
      <nav>
        <div className="container py-3 py-md-5">
          <div className="navbar-row">
            <ul className="list-unstyled d-flex align-items-center gap-3 mb-0 nav-col nav-col-start">
              <li className="d-xl-none">
                <button className="btn" onClick={handleShowSidebar}>
                  <Menu />
                </button>
              </li>

              <NavListItem title="Shop Products" to="/shop" />
              <NavListItem title="Blog" to="/blog" />
              <NavListItem title="FAQ" to="/faq" />
            </ul>

            <div className="nav-logo-container">
              {showSearch ? (
                <SearchBar />
              ) : (
                <Link to="/" className="nav-logo">
                  <img
                    src={logo}
                    alt="logo"
                    style={{ width: "72px", height: "44px" }}
                  />
                </Link>
              )}
            </div>

            <ul className="list-unstyled d-flex align-items-center gap-2 gap-xl-3 mb-0 nav-col nav-col-end">
              <NavListItem title="About Us" to="/about" />
              <NavListItem title="Contact" to="/contact" />

              <NavListBtnItem
                src={search}
                alt="search icon"
                showOnAllScreens={true}
                onClick={handleClick}
              />

              <li className="">
                {user ? (
                  <Link
                    to={
                      user.role === "admin" ? "/admin/settings" : "/dashboard"
                    }
                    className="d-flex align-items-center"
                  >
                    <Avatar src={user.avatar} name={user.name} size={28} />
                  </Link>
                ) : (
                  <Link to="/login">
                    <button className="btn">
                      <img
                        src={userIcon}
                        alt="user icon"
                        className="nav-icon"
                      />
                    </button>
                  </Link>
                )}
              </li>

              <NavListBtnItem
                src={heart}
                alt="heart icon"
                to="/dashboard/wishlist"
                badgeCount={notificationCount}
                onClick={() => dispatch(clearWishlistNotification())}
              />
              <NavListBtnItem
                src={cartIcon}
                alt="cart icon"
                to="/cart"
                showOnAllScreens={true}
                badgeCount={cartCount}
              />
            </ul>
          </div>
        </div>
      </nav>
      <Sidebar showSidebar={showSidebar} handleClose={handleCloseSidebar} />
    </>
  );
}

function NavListItem({ title, to }) {
  return (
    <li className="d-none d-xl-block">
      <Link to={to} className="nav-link">
        {title}
      </Link>
    </li>
  );
}

function NavListBtnItem({
  src,
  alt,
  showOnAllScreens,
  onClick,
  to,
  badgeCount,
}) {
  return (
    <li className={showOnAllScreens ? "" : "d-none d-xl-block"}>
      <Link
        to={to}
        className="btn position-relative d-flex align-items-center justify-content-center"
        onClick={onClick}
      >
        <img src={src} alt={alt} className="nav-icon" />

        {badgeCount > 0 && (
          <span
            className="position-absolute badge rounded-pill bg-danger"
            style={{
              top: "-2px",
              right: "-2px",
              minWidth: "18px",
              height: "18px",
              fontSize: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {badgeCount > 99 ? "99+" : badgeCount}
          </span>
        )}
      </Link>
    </li>
  );
}

export default Navbar;
