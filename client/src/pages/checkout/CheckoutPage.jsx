import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchCart } from "../../redux/slice/cartSlice";
import {
  fetchAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../../redux/slice/addressSlice";
import { fetchDeliveryZones } from "../../redux/slice/deliveryZoneSlice";
import { createOrder } from "../../redux/slice/orderSlice";
import OrderItem from "../../components/checkout/OrderItem";
import OrderSummary from "../../components/checkout/OrderSummary";
import ShippingForm from "../../components/checkout/ShippingForm";
import PaymentMethod from "../../components/checkout/PaymentMethod";
import AddressList from "../../components/checkout/AddressList";
import { initializePaymentApi } from "../../services/verifyPaymentApi";

const currency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
});

const emptyShipping = {
  fullName: "",
  companyName: "",
  country: "Nigeria",
  city: "",
  state: "",
  postalCode: "",
  phone: "",
  email: "",
};

function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, guestCart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { list: zones } = useSelector((state) => state.deliveryZones);
  const { submitting } = useSelector((state) => state.orders);
  const { list: addresses, loading: addressesLoading } = useSelector(
    (state) => state.addresses,
  );

  const [shipping, setShipping] = useState(emptyShipping);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedFee, setSelectedFee] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [savingAddress, setSavingAddress] = useState(false);

  // null = not editing/creating; "new" = create mode; object = edit mode
  const [formMode, setFormMode] = useState(null);

  useEffect(() => {
    dispatch(fetchDeliveryZones());

    // Guests don't have saved addresses.
    if (user) {
      dispatch(fetchAddresses());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (addressesLoading) return; // wait for fetch to actually settle

    if (addresses?.length) {
      // addresses exist — make sure we're not stuck in the form
      if (!selectedAddressId) {
        const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
        setSelectedAddressId(defaultAddr._id);
        setSelectedFee(defaultAddr.deliveryFee || 0);
      }
      setFormMode((prev) => (prev === "new" ? null : prev));
      // ^ only clear if we were auto-showing the create form;
      //   leave edit mode (an address object) alone
    } else {
      // confirmed empty after loading finished
      setFormMode("new");
      setSelectedAddressId(null);
      setSelectedFee(0);
    }
  }, [addresses, addressesLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  // Logged-in users use database cart.
  // Guests use Redux/localStorage cart.
  const items = user ? cart?.items || [] : guestCart;
  // Normalize product structure for guest and logged-in users.
  const subtotal = items.reduce((sum, item) => {
    const product = user ? item.product : item;

    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const total = subtotal + selectedFee;

  function handleShippingChange(e) {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
  }

  function handleSelectAddress(addr) {
    setSelectedAddressId(addr._id);
    setSelectedFee(addr.deliveryFee || 0);
  }

  function handleAddNew() {
    setShipping(emptyShipping);
    setFormMode("new");
  }

  function handleEditAddress(addr) {
    setShipping({
      fullName: addr.fullName || "",
      companyName: addr.street || "",
      country: addr.country || "Nigeria",
      city: addr.city || "",
      state: addr.state || "",
      postalCode: addr.postalCode || "",
      phone: addr.phone || "",
      email: shipping.email || "",
    });
    setFormMode(addr);
  }

  function handleCancelForm() {
    setShipping(emptyShipping);
    setFormMode(null);
  }

  async function handleDeleteAddress(id, label) {
    if (!window.confirm(`Delete the "${label}" address?`)) return;

    const result = await dispatch(deleteAddress(id));

    if (deleteAddress.fulfilled.match(result)) {
      toast.success("Address deleted");
      if (selectedAddressId === id) {
        setSelectedAddressId(null);
        setSelectedFee(0);
      }
    } else {
      toast.error(result.payload || "Failed to delete address");
    }
  }

  async function handleShippingSubmit(e) {
    e.preventDefault();
    setSavingAddress(true);

    const payload = {
      label: "Shipping",
      fullName: shipping.fullName,
      phone: shipping.phone,
      street: shipping.companyName || shipping.fullName,
      city: shipping.city,
      state: shipping.state,
      country: shipping.country,
      postalCode: shipping.postalCode,
      isDefault: false,
    };

    const isEditing = formMode && formMode !== "new";

    const result = isEditing
      ? await dispatch(updateAddress({ id: formMode._id, payload }))
      : await dispatch(createAddress(payload));

    setSavingAddress(false);

    const actionMatch = isEditing
      ? updateAddress.fulfilled.match(result)
      : createAddress.fulfilled.match(result);

    if (actionMatch) {
      setSelectedAddressId(result.payload._id);
      setSelectedFee(result.payload.deliveryFee || 0);
      toast.success(isEditing ? "Address updated" : "Shipping address saved");
      setShipping(emptyShipping);
      setFormMode(null);
    } else {
      toast.error(result.payload || "Failed to save address");
    }
  }

  async function handlePlaceOrder() {
    if (user && !selectedAddressId) {
      toast.error("Please select a shipping address.");
      return;
    }

    const result = await dispatch(
      createOrder({ addressId: selectedAddressId, paymentMethod }),
    );

    if (!createOrder.fulfilled.match(result)) {
      toast.error(result.payload || "Failed to place order");
      return;
    }

    const order = result.payload;
    await dispatch(fetchCart()); // <-- keeps Redux cart in sync everywhere it's read
    setSelectedAddressId(null);
    setSelectedFee(0);

    if (paymentMethod === "bank_transfer") {
      toast.success("Order placed! Please complete your bank transfer.");
      navigate("/dashboard/orders");
      return;
    }

    // online payment — hand off to Flutterwave's secure checkout
    try {
      const { checkoutUrl } = await initializePaymentApi(order._id);
      window.location.href = checkoutUrl;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to start payment");
    }
  }

  const hasAddresses = addresses && addresses.length > 0;
  const showForm = formMode !== null;

  return (
    <div className="container py-5">
      <h4 className="fw-bold mb-4">Checkout</h4>

      <div className="row g-5">
        {/* Left: items + forms */}
        <div className="col-12 col-lg-7">
          <h6 className="fw-bold mb-2">
            Order Items{" "}
            <span className="text-secondary fw-normal">({items.length})</span>
          </h6>
          <div className="mb-5">
            {items.map((item) => {
              const product = user ? item.product : item;

              return (
                <OrderItem
                  key={user ? item._id : product._id}
                  item={item}
                  product={product}
                  // isGuest={!user}
                  currency={currency}
                />
              );
            })}
          </div>

          {/* =========================
    SHIPPING ADDRESS
========================= */}

          {user ? (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0">Shipping Address</h6>

                {hasAddresses && !showForm && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={handleAddNew}
                  >
                    + Add new address
                  </button>
                )}
              </div>

              {addressesLoading ? (
                <div className="d-flex justify-content-center py-4">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  {hasAddresses && !showForm && (
                    <AddressList
                      addresses={addresses}
                      selectedId={selectedAddressId}
                      onSelect={handleSelectAddress}
                      onEdit={handleEditAddress}
                      onDelete={handleDeleteAddress}
                    />
                  )}

                  {showForm && (
                    <div className="mb-5">
                      <ShippingForm
                        shipping={shipping}
                        zones={zones}
                        savingAddress={savingAddress}
                        onChange={handleShippingChange}
                        onSubmit={handleShippingSubmit}
                      />

                      {hasAddresses && (
                        <button
                          type="button"
                          className="btn btn-link btn-sm mt-2 px-0"
                          onClick={handleCancelForm}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="alert alert-warning mb-5">
              <h6 className="fw-bold mb-2">Login Required</h6>

              <p className="mb-3">
                You can review your cart and choose a payment method, but you
                must login before adding a shipping address or placing an order.
              </p>

              <button
                className="btn btn-danger"
                onClick={() => navigate("/login")}
              >
                Login to Continue
              </button>
            </div>
          )}
          {/* ==========================
    PAYMENT METHOD
========================== */}

          <h6 className="fw-bold mb-3">Payment Method</h6>

          {/* Both guests and logged-in users can select a payment method */}
          <PaymentMethod value={paymentMethod} onChange={setPaymentMethod} />

          {/* Message displayed below the payment methods */}
          {user ? (
            <p className="text-secondary small mt-4 mb-0">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our privacy policy.
            </p>
          ) : (
            <div className="alert alert-info mt-4 mb-0">
              <h6 className="fw-bold mb-2">Almost there!</h6>

              <p className="mb-2">
                Your cart and payment preference have been saved.
              </p>

              <p className="mb-0">
                Please <strong>login</strong> to add a shipping address and
                complete your order.
              </p>
            </div>
          )}
        </div>

        {/* Right: sticky summary + CTA */}
        <div className="col-12 col-lg-5">
          <OrderSummary
            itemCount={items.length}
            subtotal={subtotal}
            deliveryFee={selectedFee}
            total={total}
            hasAddress={!!selectedAddressId}
            isLoggedIn={!!user}
            currency={currency}
            onPlaceOrder={handlePlaceOrder}
            submitting={submitting}
          />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
