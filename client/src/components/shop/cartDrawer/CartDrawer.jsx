import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { X, Trash2, Plus, Minus } from "lucide-react";
import {
  updateCartItem,
  removeCartItem,
  updateGuestCart,
  removeGuestCart,
} from "../../../redux/slice/cartSlice";
import { useCartDrawer } from "./CartDrawerContext";

const currency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
});

function CartDrawer() {
  const { isOpen, closeCart } = useCartDrawer();
  const dispatch = useDispatch();
  const { cart, guestCart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  // const items = cart?.items || [];
  const cartItems = user ? cart.items : guestCart;
  // const subtotal = cartItems.reduce(
  //   (sum, item) => sum + (item.product?.price || 0) * item.quantity,
  //   0,
  // );

  // Logged-in users store product inside item.product.
  // Guest users store the product directly in item.
  const subtotal = cartItems.reduce((sum, item) => {
    const product = user ? item.product : item;

    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  // async function handleQuantityChange(productId, quantity) {
  //   if (quantity < 1) return;
  //   const result = await dispatch(updateCartItem({ productId, quantity }));
  //   if (!updateCartItem.fulfilled.match(result)) {
  //     toast.error(result.payload || "Failed to update quantity");
  //   }
  // }

  async function handleQuantityChange(itemId, quantity) {
    if (quantity < 1) return;

    // Guest user
    if (!user) {
      dispatch(
        updateGuestCart({
          id: itemId,
          quantity,
        }),
      );
      return;
    }

    // Logged-in user
    const result = await dispatch(
      updateCartItem({
        itemId,
        quantity,
      }),
    );

    if (!updateCartItem.fulfilled.match(result)) {
      toast.error(result.payload || "Failed to update quantity");
    }
  }

  // async function handleRemove(productId) {
  //   const result = await dispatch(removeCartItem(productId));
  //   if (removeCartItem.fulfilled.match(result)) {
  //     toast.success("Item removed");
  //   } else {
  //     toast.error(result.payload || "Failed to remove item");
  //   }
  // }

  async function handleRemove(itemId) {
    // Guest user
    if (!user) {
      dispatch(removeGuestCart(itemId));
      toast.success("Item removed");
      return;
    }

    // Logged-in user
    const result = await dispatch(removeCartItem(itemId));

    if (removeCartItem.fulfilled.match(result)) {
      toast.success("Item removed");
    } else {
      toast.error(result.payload || "Failed to remove item");
    }
  }

  return (
    <>
      {/* backdrop */}
      {isOpen && (
        <div
          onClick={closeCart}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1040,
          }}
        />
      )}

      {/* sliding panel - full width on mobile, capped at 400px above sm */}
      <div
        className="bg-white shadow"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "min(400px, 100vw)",
          zIndex: 1050,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="d-flex justify-content-between align-items-center border-bottom p-3">
          <h6 className="mb-0">Cart {cartItems.length} item(s)</h6>
          <button
            type="button"
            onClick={closeCart}
            className="btn btn-link text-dark p-0"
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-grow-1 overflow-auto p-3">
          {cartItems.length === 0 ? (
            <p className="text-secondary text-center mt-4">
              Your cart is empty.
            </p>
          ) : (
            <div className="d-flex flex-column gap-3">
              {cartItems.map((item) => {
                // Logged-in users -> product is inside item.product
                // Guests -> product is the item itself
                const product = user ? item.product : item;

                return (
                  <div
                    key={product._id}
                    className="d-flex gap-2 border-bottom pb-3"
                  >
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={product.images?.[0]?.url}
                        alt={product.name}
                        style={{
                          width: 64,
                          height: 64,
                          objectFit: "cover",
                        }}
                      />
                    </Link>

                    <div className="flex-grow-1">
                      <p className="fw-semibold small text-uppercase mb-1">
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
                      <p className="fw-bold small mb-2">
                        {currency.format(product.price || 0)}
                      </p>

                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-inline-flex align-items-center border rounded overflow-hidden">
                          <button
                            type="button"
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="btn btn-danger btn-sm rounded-0"
                            style={{ width: 26 }}
                          >
                            <Minus size={10} />
                          </button>

                          <span
                            className="px-2 text-center small"
                            style={{ minWidth: 24 }}
                          >
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                            disabled={item.quantity >= product.stock}
                            className="btn btn-danger btn-sm rounded-0"
                            style={{ width: 26 }}
                          >
                            <Plus size={10} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemove(item._id)}
                          className="btn btn-link text-danger p-0"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-top p-3">
            <div className="d-flex justify-content-between fw-bold mb-3">
              <span>Subtotal</span>
              <span>{currency.format(subtotal)}</span>
            </div>

            <div className="d-flex gap-2">
              <Link
                to="/cart"
                onClick={closeCart}
                className="btn btn-outline-danger flex-fill"
              >
                View Cart
              </Link>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="btn btn-danger flex-fill"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;
