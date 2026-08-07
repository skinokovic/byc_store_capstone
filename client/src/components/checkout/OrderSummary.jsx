function OrderSummary({
  itemCount,
  subtotal,
  deliveryFee,
  total,
  hasAddress,
  isLoggedIn,
  currency,
  onPlaceOrder,
  submitting,
}) {
  return (
    <div
      className="border rounded-3 p-4 bg-light-subtle sticky-top"
      style={{ top: 24 }}
    >
      <h6 className="fw-bold mb-3">Order Summary</h6>
      <p className="text-secondary small mb-3">{itemCount} item(s)</p>

      <div className="d-flex justify-content-between small mb-2">
        <span className="text-secondary">Subtotal</span>
        <span>{currency.format(subtotal)}</span>
      </div>
      <div className="d-flex justify-content-between small mb-2">
        <span className="text-secondary">Delivery fee</span>
        <span>{hasAddress ? currency.format(deliveryFee) : "—"}</span>
      </div>
      {/* Logged-in user but no address selected */}
      {isLoggedIn && !hasAddress && (
        <p className="text-secondary small fst-italic mb-3">
          Please select or add a shipping address to calculate the delivery fee.
        </p>
      )}

      {/* Guest user */}
      {!isLoggedIn && (
        <div className="alert alert-warning mt-3 mb-3">
          Login to add a shipping address and complete your order.
        </div>
      )}
      <div className="d-flex justify-content-between fw-bold border-top pt-3 mb-4">
        <span>Total</span>
        <span>{currency.format(total)}</span>
      </div>

      <button
        type="button"
        onClick={onPlaceOrder}
        disabled={submitting || !hasAddress || !isLoggedIn}
        className="btn btn-danger w-100 mb-2"
      >
        {submitting
          ? "Placing Order..."
          : !isLoggedIn
            ? "Login to Place Order"
            : "Place Order"}
      </button>

      <a href="/cart" className="btn btn-outline-secondary w-100">
        Modify Cart
      </a>
    </div>
  );
}

export default OrderSummary;
