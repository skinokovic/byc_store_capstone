import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Heart, Trash2, Plus, Minus } from "lucide-react";
import {
  fetchCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  removeGuestCart,
  clearGuestCartReducer,
  updateGuestCart,
} from "../../redux/slice/cartSlice";
import { addToWishlist } from "../../redux/slice/wishlistSlice";

const currency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
});

function CartPage() {
  const dispatch = useDispatch();
  const { cart, guestCart, loading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [dispatch, user]);

  async function handleQuantityChange(itemId, quantity) {
    if (quantity < 1) return;

    if (!user) {
      dispatch(
        updateGuestCart({
          id: itemId,
          quantity,
        }),
      );

      return;
    }

    const result = await dispatch(updateCartItem({ itemId, quantity }));

    if (!updateCartItem.fulfilled.match(result)) {
      toast.error(result.payload || "Failed to update quantity");
    }
  }

  async function handleRemove(itemId) {
    if (!user) {
      dispatch(removeGuestCart(itemId));

      toast.success("Item removed");

      return;
    }

    const result = await dispatch(removeCartItem(itemId));

    if (removeCartItem.fulfilled.match(result)) {
      toast.success("Item removed");
    } else {
      toast.error(result.payload || "Failed to remove item");
    }
  }

  async function handleClearCart() {
    if (!window.confirm("Remove all items from your cart?")) return;

    if (!user) {
      dispatch(clearGuestCartReducer());

      toast.success("Cart cleared");

      return;
    }

    const result = await dispatch(clearCart());

    if (clearCart.fulfilled.match(result)) {
      toast.success("Cart cleared");
    } else {
      toast.error(result.payload || "Failed to clear cart");
    }
  }

  async function handleWishlist(productId) {
    const result = await dispatch(addToWishlist(productId));
    if (addToWishlist.fulfilled.match(result)) {
      toast.success("Added to wishlist");
    } else {
      toast.error(result.payload || "Failed to add to wishlist");
    }
  }

  if (loading) {
    return (
      <div className="container py-5">
        <p className="text-secondary">Loading cart...</p>
      </div>
    );
  }

  // const items = cart?.items || [];
  const cartItems = user ? cart.items : guestCart;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0,
  );

  if (loading && cartItems.length === 0) {
    return (
      <div className="container py-5">
        <p className="text-secondary">Loading cart...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h4 className="mb-3">Your cart is empty</h4>
        <Link to="/shop" className="btn btn-danger">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="border-bottom pb-3 mb-4">
        <h5 className="mb-0">Cart {cartItems.length} item(s)</h5>
      </div>

      <div className="d-flex flex-column gap-4 mb-4">
        {cartItems.map((item) => {
          // ============================================
          // NEW:
          // Logged-in users:
          //   item.product contains the product details.
          //
          // Guest users:
          //   item itself is the product.
          // ============================================
          const product = user ? item.product : item;

          return (
            <div
              key={product._id}
              className="row g-3 align-items-center border-bottom pb-4"
            >
              {/* Product Details */}
              <div className="col-12 col-md-5">
                <div className="d-flex gap-3">
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.images?.[0]?.url}
                      alt={product.name}
                      style={{
                        width: 90,
                        height: 90,
                        objectFit: "cover",
                      }}
                    />
                  </Link>

                  <div>
                    <p className="fw-bold text-uppercase mb-1">
                      {product.name}
                    </p>

                    <p className="text-secondary small mb-1">{product.sku}</p>

                    {/* Size & Colour only exist for logged-in cart items */}
                    {user && (item.size || item.color) && (
                      <p className="text-secondary small mb-1">
                        {item.size && (
                          <span>
                            Size: <strong>{item.size}</strong>
                          </span>
                        )}

                        {item.size && item.color && (
                          <span className="mx-1">·</span>
                        )}

                        {item.color && (
                          <span>
                            Colour: <strong>{item.color}</strong>
                          </span>
                        )}
                      </p>
                    )}

                    <p className="text-secondary small mb-3">
                      {product.description}
                    </p>

                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleWishlist(product._id)}
                        className="btn btn-outline-danger btn-sm d-inline-flex align-items-center gap-1"
                      >
                        <Heart size={14} />
                        Wishlist
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemove(item._id)}
                        className="btn btn-danger btn-sm d-inline-flex align-items-center gap-1"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="col-6 col-md-3">
                <p className="text-secondary small mb-2">Quantity</p>

                <div className="d-inline-flex align-items-center border rounded overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    className="btn btn-danger btn-sm rounded-0"
                    style={{ width: 32 }}
                  >
                    <Minus size={12} />
                  </button>

                  <span className="px-3 text-center" style={{ minWidth: 32 }}>
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity + 1)
                    }
                    disabled={item.quantity >= product.stock}
                    className="btn btn-danger btn-sm rounded-0"
                    style={{ width: 32 }}
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="col-6 col-md-4 text-end">
                <p className="text-secondary small mb-2">Unit Price</p>

                <p className="fw-bold mb-1">
                  {currency.format(product.price || 0)}
                </p>

                <p className="text-secondary small mb-0">
                  Total:{" "}
                  <span className="fw-semibold text-danger">
                    {currency.format((product.price || 0) * item.quantity)}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center text-lg-start mb-4">
        <button
          type="button"
          onClick={handleClearCart}
          className="btn btn-outline-danger"
        >
          Clear Cart
        </button>
      </div>

      <div className="d-flex justify-content-end">
        <div style={{ minWidth: 320 }}>
          <h6 className="fw-bold mb-3">Cart Totals</h6>

          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">Subtotal</span>
            <span>{currency.format(subtotal)}</span>
          </div>

          <div className="d-flex justify-content-between fw-bold border-top pt-2 mb-4">
            <span>Total</span>
            <span>{currency.format(subtotal)}</span>
          </div>

          <div className="d-flex gap-2">
            <Link to="/shop" className="btn btn-outline-danger flex-fill">
              Continue Shopping
            </Link>
            <Link to="/checkout" className="btn btn-danger flex-fill">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
