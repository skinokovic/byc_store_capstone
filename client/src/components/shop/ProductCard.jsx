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
  // Logged in user (null when browsing as guest)
  const { user } = useSelector((state) => state.auth);
  const { openCart } = useCartDrawer();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart, guestCart } = useSelector((state) => state.cart);

  const fullStars = Math.round(product.rating || 0);
  const imageUrl = product.image || product.images?.[0]?.url;
  const isOutOfStock = (product.stock ?? 0) <= 0;

  const isWishlisted = (wishlist?.products || []).some(
    (p) => (p._id || p) === product._id,
  );

  // Check backend cart for logged-in users
  const userAlreadyInCart =
    cart?.items?.some(
      (item) => String(item.product._id) === String(product._id),
    ) || false;

  // Check localStorage cart for guests
  const guestAlreadyInCart =
    guestCart?.some((item) => String(item._id) === String(product._id)) ||
    false;

  // Use whichever cart belongs to the current visitor
  const alreadyInCart = user ? userAlreadyInCart : guestAlreadyInCart;

  // Buttons sit inside the Link wrapper, so stop the click from also
  // triggering navigation to the product page.
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

  async function handleBuyNowClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) return;

    // -----------------------------
    // Guest user
    // -----------------------------
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

    // -----------------------------
    // Logged-in user
    // -----------------------------
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

  if (view === "list") {
    return (
      <Link
        to={`/product/${product._id}`}
        className="border rounded d-flex flex-column flex-sm-row gap-3 p-3 text-decoration-none text-reset"
      >
        <div className="position-relative" style={{ flexShrink: 0 }}>
          <img
            src={imageUrl}
            alt={product.name}
            style={{
              width: 140,
              height: 140,
              objectFit: "cover",
              filter: isOutOfStock ? "grayscale(1)" : "none",
              opacity: isOutOfStock ? 0.6 : 1,
            }}
            className="rounded"
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
        <div className="d-flex flex-column flex-grow-1">
          <p className="text-uppercase fw-bold small mb-0">{product.name}</p>
          <p className="text-secondary small mb-2 text-danger">{product.sku}</p>
          <p className="text-secondary small mb-2">
            {product.short_description}
          </p>
          <p className="fw-bold mb-2 text-danger">
            ₦{product.price.toLocaleString()}.00
          </p>

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

          <div className="d-flex gap-2 mt-auto">
            <button
              className={`btn btn-sm flex-fill wishlist-btn ${
                isWishlisted ? "wishlisted" : ""
              }`}
              onClick={handleWishlistClick}
            >
              <Heart
                size={14}
                fill={isWishlisted ? "white" : "none"}
                className={isWishlisted ? "wishlist-heart" : ""}
              />

              {isWishlisted ? "Wishlisted" : "Wishlist"}
            </button>

            <button
              className={`btn btn-sm d-flex align-items-center justify-content-center gap-1 text-nowrap ${
                isOutOfStock
                  ? "btn-secondary"
                  : alreadyInCart
                    ? "btn-success"
                    : "btn-danger"
              }`}
              style={{
                fontSize: "0.75rem",
                padding: "4px 10px",
              }}
              onClick={handleBuyNowClick}
              disabled={isOutOfStock || alreadyInCart}
            >
              <ShoppingCart size={13} />

              {isOutOfStock
                ? "Sold Out"
                : alreadyInCart
                  ? "✓ Added"
                  : "Buy Now"}
            </button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/product/${product._id}`}
      className="border rounded h-100 d-flex flex-column text-decoration-none text-reset"
    >
      <div className="position-relative">
        <img
          src={imageUrl}
          alt={product.name}
          style={{
            width: "100%",
            height: 160,
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
      <div className="p-3 d-flex flex-column flex-grow-1">
        <p className="text-uppercase fw-bold small mb-0">{product.name}</p>
        <p className="text-secondary small mb-2 text-danger">{product.sku}</p>
        <p className="text-secondary small mb-2">{product.short_description}</p>
        <p className="fw-bold mb-2 text-danger">
          ₦{product.price.toLocaleString()}.00
        </p>

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

        <div className="d-flex gap-2 mt-auto">
          <button
            className={`btn btn-sm flex-fill wishlist-btn ${
              isWishlisted ? "wishlisted" : ""
            }`}
            onClick={handleWishlistClick}
          >
            <Heart
              size={14}
              fill={isWishlisted ? "white" : "none"}
              className={isWishlisted ? "wishlist-heart" : ""}
            />

            {isWishlisted ? "Wishlisted" : "Wishlist"}
          </button>

          <button
            className={`btn btn-sm flex-fill d-flex align-items-center justify-content-center gap-1 text-nowrap ${
              isOutOfStock
                ? "btn-secondary"
                : alreadyInCart
                  ? "btn-success"
                  : "btn-danger"
            }`}
            style={{
              fontSize: "0.75rem",
              padding: "4px 6px",
            }}
            onClick={handleBuyNowClick}
            disabled={isOutOfStock || alreadyInCart}
          >
            <ShoppingCart size={13} />

            {isOutOfStock ? "Sold Out" : alreadyInCart ? "✓ Added" : "Buy Now"}
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
