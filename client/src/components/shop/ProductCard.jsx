// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { Heart, ShoppingCart, Star } from "lucide-react";
// import { addToCart, addGuestCart } from "../../redux/slice/cartSlice";
// import {
//   addToWishlist,
//   removeFromWishlist,
// } from "../../redux/slice/wishlistSlice";
// import { useCartDrawer } from "../../components/shop/cartDrawer/CartDrawerContext";
// import "./ProductCard.css";

// function ProductCard({ product, view = "grid" }) {
//   const dispatch = useDispatch();
//   // Logged in user (null when browsing as guest)
//   const { user } = useSelector((state) => state.auth);
//   const { openCart } = useCartDrawer();
//   const { wishlist } = useSelector((state) => state.wishlist);
//   const { cart, guestCart } = useSelector((state) => state.cart);

//   const fullStars = Math.round(product.rating || 0);
//   const imageUrl = product.image || product.images?.[0]?.url;
//   const isOutOfStock = (product.stock ?? 0) <= 0;

//   const isWishlisted = (wishlist?.products || []).some(
//     (p) => (p._id || p) === product._id,
//   );

//   // Check backend cart for logged-in users
//   const userAlreadyInCart =
//     cart?.items?.some(
//       (item) => String(item.product._id) === String(product._id),
//     ) || false;

//   // Check localStorage cart for guests
//   const guestAlreadyInCart =
//     guestCart?.some((item) => String(item._id) === String(product._id)) ||
//     false;

//   // Use whichever cart belongs to the current visitor
//   const alreadyInCart = user ? userAlreadyInCart : guestAlreadyInCart;

//   // Buttons sit inside the Link wrapper, so stop the click from also
//   // triggering navigation to the product page.
//   async function handleWishlistClick(e) {
//     e.preventDefault();
//     e.stopPropagation();

//     const action = isWishlisted
//       ? removeFromWishlist(product._id)
//       : addToWishlist(product._id);

//     const result = await dispatch(action);

//     if (result.meta.requestStatus === "fulfilled") {
//       toast.success(
//         isWishlisted ? "Removed from wishlist" : "Added to wishlist",
//       );
//     } else {
//       toast.error(result.payload || "Failed to update wishlist");
//     }
//   }

//   async function handleBuyNowClick(e) {
//     e.preventDefault();
//     e.stopPropagation();

//     if (isOutOfStock) return;

//     // -----------------------------
//     // Guest user
//     // -----------------------------
//     if (!user) {
//       if (guestAlreadyInCart) {
//         toast.info("Product already added to cart");
//         return;
//       }

//       dispatch(addGuestCart(product));

//       toast.success("Added to cart");

//       openCart();

//       return;
//     }

//     // -----------------------------
//     // Logged-in user
//     // -----------------------------
//     if (userAlreadyInCart) {
//       toast.info("Product already added to cart");
//       return;
//     }

//     const result = await dispatch(
//       addToCart({
//         productId: product._id,
//         quantity: 1,
//       }),
//     );

//     if (addToCart.fulfilled.match(result)) {
//       toast.success("Added to cart");
//       openCart();
//     } else {
//       toast.error(result.payload || "Failed to add to cart");
//     }
//   }

//   if (view === "list") {
//     return (
//       <Link
//         to={`/product/${product._id}`}
//         className="border rounded d-flex flex-column flex-sm-row gap-3 p-3 text-decoration-none text-reset"
//       >
//         <div className="position-relative" style={{ flexShrink: 0 }}>
//           <img
//             src={imageUrl}
//             alt={product.name}
//             style={{
//               width: 140,
//               height: 140,
//               objectFit: "cover",
//               filter: isOutOfStock ? "grayscale(1)" : "none",
//               opacity: isOutOfStock ? 0.6 : 1,
//             }}
//             className="rounded"
//           />
//           {isOutOfStock && (
//             <span
//               className="badge bg-dark position-absolute top-0 start-0 m-2"
//               style={{ fontSize: "0.65rem" }}
//             >
//               Out of Stock
//             </span>
//           )}
//         </div>
//         <div className="d-flex flex-column flex-grow-1">
//           <p className="text-uppercase fw-bold small mb-0">{product.name}</p>
//           <p className="text-secondary small mb-2 text-danger">{product.sku}</p>
//           <p className="text-secondary small mb-2">
//             {product.short_description}
//           </p>
//           <p className="fw-bold mb-2 text-danger">
//             ₦{product.price.toLocaleString()}.00
//           </p>

//           <div className="d-flex align-items-center gap-1 mb-3">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <Star
//                 key={i}
//                 size={14}
//                 color="#e8722c"
//                 fill={i < fullStars ? "#e8722c" : "none"}
//               />
//             ))}
//             <span className="small text-secondary ms-1">
//               {(product.rating || 0).toFixed(2)}
//             </span>
//           </div>

//           <div className="d-flex gap-2 mt-auto">
//             <button
//               className={`btn btn-sm flex-fill wishlist-btn ${
//                 isWishlisted ? "wishlisted" : ""
//               }`}
//               onClick={handleWishlistClick}
//             >
//               <Heart
//                 size={14}
//                 fill={isWishlisted ? "white" : "none"}
//                 className={isWishlisted ? "wishlist-heart" : ""}
//               />

//               {isWishlisted ? "Wishlisted" : "Wishlist"}
//             </button>

//             <button
//               className={`btn btn-sm d-flex align-items-center justify-content-center gap-1 text-nowrap ${
//                 isOutOfStock
//                   ? "btn-secondary"
//                   : alreadyInCart
//                     ? "btn-success"
//                     : "btn-danger"
//               }`}
//               style={{
//                 fontSize: "0.75rem",
//                 padding: "4px 10px",
//               }}
//               onClick={handleBuyNowClick}
//               disabled={isOutOfStock || alreadyInCart}
//             >
//               <ShoppingCart size={13} />

//               {isOutOfStock ? "Sold" : alreadyInCart ? "Added" : "Buy"}
//             </button>
//           </div>
//         </div>
//       </Link>
//     );
//   }

//   return (
//     <Link
//       to={`/product/${product._id}`}
//       className="border rounded h-100 d-flex flex-column text-decoration-none text-reset"
//     >
//       <div className="position-relative">
//         <img
//           src={imageUrl}
//           alt={product.name}
//           style={{
//             width: "100%",
//             height: 160,
//             objectFit: "cover",
//             filter: isOutOfStock ? "grayscale(1)" : "none",
//             opacity: isOutOfStock ? 0.6 : 1,
//           }}
//         />
//         {isOutOfStock && (
//           <span
//             className="badge bg-dark position-absolute top-0 start-0 m-2"
//             style={{ fontSize: "0.65rem" }}
//           >
//             Out of Stock
//           </span>
//         )}
//       </div>
//       <div className="p-3 d-flex flex-column flex-grow-1">
//         <p className="text-uppercase fw-bold small mb-0">{product.name}</p>
//         <p className="text-secondary small mb-2 text-danger">{product.sku}</p>
//         <p className="text-secondary small mb-2">{product.short_description}</p>
//         <p className="fw-bold mb-2 text-danger">
//           ₦{product.price.toLocaleString()}.00
//         </p>

//         <div className="d-flex align-items-center gap-1 mb-3">
//           {Array.from({ length: 5 }).map((_, i) => (
//             <Star
//               key={i}
//               size={14}
//               color="#e8722c"
//               fill={i < fullStars ? "#e8722c" : "none"}
//             />
//           ))}
//         </div>

//         <div className="d-flex gap-2 mt-auto">
//           <button
//             className={`btn btn-sm flex-fill wishlist-btn ${
//               isWishlisted ? "wishlisted" : ""
//             }`}
//             onClick={handleWishlistClick}
//           >
//             <Heart
//               size={14}
//               fill={isWishlisted ? "white" : "none"}
//               className={isWishlisted ? "wishlist-heart" : ""}
//             />

//             {isWishlisted ? "Saved" : "Wishlist"}
//           </button>

//           <button
//             className={`btn btn-sm flex-fill d-flex align-items-center justify-content-center gap-1 text-nowrap ${
//               isOutOfStock
//                 ? "btn-secondary"
//                 : alreadyInCart
//                   ? "btn-success"
//                   : "btn-danger"
//             }`}
//             style={{
//               fontSize: "0.75rem",
//               padding: "4px 6px",
//             }}
//             onClick={handleBuyNowClick}
//             disabled={isOutOfStock || alreadyInCart}
//           >
//             <ShoppingCart size={13} />

//             {isOutOfStock ? "Sold" : alreadyInCart ? "Added" : "Buy"}
//           </button>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default ProductCard;

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Heart, ShoppingCart, Star } from "lucide-react";

import { addToCart, addGuestCart } from "../../redux/slice/cartSlice";

import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slice/wishlistSlice";

import { useCartDrawer } from "../../components/shop/cartDrawer/CartDrawerContext";

import "./ProductCard.css";

function ProductCard({ product, view = "grid" }) {
  const dispatch = useDispatch();

  // ==========================================
  // AUTH
  // ==========================================

  const { user } = useSelector((state) => state.auth);

  // ==========================================
  // CART DRAWER
  // ==========================================

  const { openCart } = useCartDrawer();

  // ==========================================
  // WISHLIST
  // ==========================================

  const { wishlist } = useSelector((state) => state.wishlist);

  // ==========================================
  // CART
  // ==========================================

  const { cart, guestCart } = useSelector((state) => state.cart);

  // ==========================================
  // PRODUCT DATA
  // ==========================================

  const fullStars = Math.round(product.rating || 0);

  const imageUrl =
    product.image ||
    product.images?.[0]?.url ||
    "/images/product-placeholder.jpg";

  const isOutOfStock = (product.stock ?? 0) <= 0;

  // ==========================================
  // CHECK WISHLIST
  // ==========================================

  const isWishlisted = (wishlist?.products || []).some(
    (p) => String(p?._id || p) === String(product._id),
  );

  // ==========================================
  // CHECK LOGGED-IN USER CART
  // ==========================================

  const userAlreadyInCart =
    cart?.items?.some(
      (item) =>
        String(item.product?._id || item.product) === String(product._id),
    ) || false;

  // ==========================================
  // CHECK GUEST CART
  // ==========================================

  const guestAlreadyInCart =
    guestCart?.some((item) => String(item?._id) === String(product._id)) ||
    false;

  // ==========================================
  // CURRENT CART STATUS
  // ==========================================

  const alreadyInCart = user ? userAlreadyInCart : guestAlreadyInCart;

  // ==========================================
  // WISHLIST
  // ==========================================

  async function handleWishlistClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const action = isWishlisted
      ? removeFromWishlist(product._id)
      : addToWishlist(product._id);

    const result = await dispatch(action);

    if (result.meta.requestStatus === "fulfilled") {
      toast.success(
        isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      );
    } else {
      toast.error(result.payload || "Failed to update wishlist");
    }
  }

  // ==========================================
  // ADD TO CART
  // ==========================================

  async function handleBuyNowClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) return;

    // ========================================
    // GUEST USER
    // ========================================

    if (!user) {
      if (guestAlreadyInCart) {
        toast.info("Product already added to cart");
        return;
      }

      dispatch(addGuestCart(product));

      toast.success("Added to cart");

      openCart();

      return;
    }

    // ========================================
    // LOGGED-IN USER
    // ========================================

    if (userAlreadyInCart) {
      toast.info("Product already added to cart");
      return;
    }

    const result = await dispatch(
      addToCart({
        productId: product._id,
        quantity: 1,
      }),
    );

    if (addToCart.fulfilled.match(result)) {
      toast.success("Added to cart");

      openCart();
    } else {
      toast.error(result.payload || "Failed to add to cart");
    }
  }

  // =========================================================
  // LIST VIEW
  // =========================================================

  if (view === "list") {
    return (
      <Link
        to={`/product/${product._id}`}
        className="product-card-list border rounded d-flex flex-column flex-sm-row gap-3 p-3 text-decoration-none text-reset"
      >
        {/* =========================================
            IMAGE
        ========================================= */}

        <div className="position-relative" style={{ flexShrink: 0 }}>
          <img
            src={imageUrl}
            alt={product.name}
            className="rounded"
            style={{
              width: 140,
              height: 140,
              objectFit: "cover",
              filter: isOutOfStock ? "grayscale(1)" : "none",
              opacity: isOutOfStock ? 0.6 : 1,
            }}
          />

          {isOutOfStock && (
            <span
              className="badge bg-dark position-absolute top-0 start-0 m-2"
              style={{ fontSize: "0.65rem" }}
            >
              Out of Stock
            </span>
          )}
        </div>

        {/* =========================================
            CONTENT
        ========================================= */}

        <div className="d-flex flex-column flex-grow-1 min-w-0">
          <h6 className="fw-bold text-uppercase mb-1">{product.name}</h6>

          <small className="text-secondary mb-2">{product.sku}</small>

          <p className="text-secondary small mb-2">
            {product.short_description || product.description}
          </p>

          <p className="fw-bold mb-2">₦{product.price?.toLocaleString()}.00</p>

          {/* =====================================
              RATINGS
          ===================================== */}

          <div className="d-flex align-items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                color="#e8722c"
                fill={i < fullStars ? "#e8722c" : "none"}
              />
            ))}

            <span className="small text-secondary ms-1">
              {(product.rating || 0).toFixed(2)}
            </span>
          </div>

          {/* =====================================
              ACTION BUTTONS
          ===================================== */}

          <div className="product-card-actions">
            {/* WISHLIST */}

            <button
              type="button"
              className={`btn btn-sm wishlist-btn ${
                isWishlisted ? "wishlisted" : ""
              }`}
              onClick={handleWishlistClick}
            >
              <Heart
                size={14}
                fill={isWishlisted ? "white" : "none"}
                className={isWishlisted ? "wishlist-heart" : ""}
              />

              <span>{isWishlisted ? "Wishlisted" : "Wishlist"}</span>
            </button>

            {/* CART */}

            <button
              type="button"
              className={`btn btn-sm cart-btn ${
                isOutOfStock
                  ? "btn-secondary"
                  : alreadyInCart
                    ? "btn-success"
                    : "btn-danger"
              }`}
              onClick={handleBuyNowClick}
              disabled={isOutOfStock || alreadyInCart}
            >
              <ShoppingCart size={13} />

              <span>
                {isOutOfStock ? "Sold" : alreadyInCart ? "Added" : "Buy"}
              </span>
            </button>
          </div>
        </div>
      </Link>
    );
  }

  // =========================================================
  // GRID VIEW
  // =========================================================

  return (
    <Link
      to={`/product/${product._id}`}
      className="product-card border rounded h-100 d-flex flex-column text-decoration-none text-reset"
    >
      {/* =========================================
          IMAGE
      ========================================= */}

      <div className="product-card-image-wrapper position-relative">
        <img
          src={imageUrl}
          alt={product.name}
          className="product-card-image"
          style={{
            filter: isOutOfStock ? "grayscale(1)" : "none",
            opacity: isOutOfStock ? 0.6 : 1,
          }}
        />

        {isOutOfStock && (
          <span
            className="badge bg-dark position-absolute top-0 start-0 m-2"
            style={{ fontSize: "0.65rem" }}
          >
            Out of Stock
          </span>
        )}
      </div>

      {/* =========================================
          PRODUCT CONTENT
      ========================================= */}

      <div className="product-card-body d-flex flex-column">
        <h6 className="product-card-name">{product.name}</h6>

        <div className="product-card-sku">{product.sku}</div>

        <p className="product-card-description">
          {product.short_description || product.description}
        </p>

        <div className="product-card-price">
          ₦{product.price?.toLocaleString()}.00
        </div>

        {/* =====================================
            RATINGS
        ===================================== */}

        <div className="d-flex align-items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              color="#e8722c"
              fill={i < fullStars ? "#e8722c" : "none"}
            />
          ))}
        </div>

        {/* =====================================
            ACTION BUTTONS
        ===================================== */}

        <div className="product-card-actions">
          {/* WISHLIST */}

          <button
            type="button"
            className={`btn btn-sm wishlist-btn ${
              isWishlisted ? "wishlisted" : ""
            }`}
            onClick={handleWishlistClick}
          >
            <Heart
              size={14}
              fill={isWishlisted ? "white" : "none"}
              className={isWishlisted ? "wishlist-heart" : ""}
            />

            <span>{isWishlisted ? "Saved" : "Wishlist"}</span>
          </button>

          {/* CART */}

          <button
            type="button"
            className={`btn btn-sm cart-btn ${
              isOutOfStock
                ? "btn-secondary"
                : alreadyInCart
                  ? "btn-success"
                  : "btn-danger"
            }`}
            onClick={handleBuyNowClick}
            disabled={isOutOfStock || alreadyInCart}
          >
            <ShoppingCart size={13} />

            <span>
              {isOutOfStock ? "Sold" : alreadyInCart ? "Added" : "Buy"}
            </span>
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
