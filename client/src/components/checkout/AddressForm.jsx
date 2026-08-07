import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveryZones } from "../../redux/slice/deliveryZoneSlice";
import { createAddress, updateAddress } from "../../redux/slice/addressSlice";
import { toast } from "react-toastify";

const emptyAddress = {
  label: "Home",
  fullName: "",
  phone: "",
  email: "",
  country: "Nigeria",
  state: "",
  city: "",
  lga: "",
  street: "",
  apartment: "",
  landmark: "",
  postalCode: "",
  isDefault: false,
};

function AddressForm({
  initialValues = emptyAddress,
  onDone,
  submitText = "Save Address",
}) {
  const dispatch = useDispatch();

  const { list: zones } = useSelector((state) => state.deliveryZones);
  const { loading } = useSelector((state) => state.addresses);

  const [form, setForm] = useState(initialValues);

  useEffect(() => {
    dispatch(fetchDeliveryZones());
  }, [dispatch]);

  useEffect(() => {
    if (initialValues) {
      setForm({
        ...emptyAddress,
        ...initialValues,
      });
    }
  }, [initialValues]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const action = form._id
      ? updateAddress({
          id: form._id,
          address: form,
        })
      : createAddress(form);

    const result = await dispatch(action);

    if (!result.error) {
      toast.success(
        form._id
          ? "Address updated successfully"
          : "Address created successfully",
      );

      if (onDone) onDone(result.payload);
    } else {
      toast.error(result.payload || "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Full Name</label>
          <input
            className="form-control"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone Number</label>
          <input
            className="form-control"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Address Label</label>

          <select
            className="form-select"
            name="label"
            value={form.label}
            onChange={handleChange}
          >
            <option value="Home">Home</option>
            <option value="Office">Office</option>
            <option value="Business">Business</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Country</label>

          <select
            className="form-select"
            name="country"
            value={form.country}
            onChange={handleChange}
          >
            <option>Nigeria</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">State</label>

          <select
            className="form-select"
            name="state"
            value={form.state}
            onChange={handleChange}
            required
          >
            <option value="">Select State</option>

            {zones.map((zone) => (
              <option key={zone._id} value={zone.state}>
                {zone.state}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">City</label>

          <input
            className="form-control"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Local Government</label>

          <input
            className="form-control"
            name="lga"
            value={form.lga}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Postal Code</label>

          <input
            className="form-control"
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Street Address</label>

          <input
            className="form-control"
            name="street"
            value={form.street}
            onChange={handleChange}
            placeholder="House number, street name..."
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Apartment / Suite</label>

          <input
            className="form-control"
            name="apartment"
            value={form.apartment}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Landmark</label>

          <input
            className="form-control"
            name="landmark"
            value={form.landmark}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              name="isDefault"
              checked={form.isDefault}
              onChange={handleChange}
              id="defaultAddress"
            />

            <label htmlFor="defaultAddress" className="form-check-label">
              Set as default delivery address
            </label>
          </div>
        </div>

        <div className="col-12 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-danger w-100"
          >
            {loading ? "Saving..." : submitText}
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddressForm;
