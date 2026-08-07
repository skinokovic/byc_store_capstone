function ShippingForm({ shipping, zones, savingAddress, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="d-flex flex-column gap-3">
      <input
        name="fullName"
        value={shipping.fullName}
        onChange={onChange}
        placeholder="Full Name"
        required
        className="form-control border-danger-subtle"
      />
      <input
        name="companyName"
        value={shipping.companyName}
        onChange={onChange}
        placeholder="Company name (optional)"
        className="form-control border-danger-subtle"
      />
      <select
        name="country"
        value={shipping.country}
        onChange={onChange}
        className="form-select border-danger-subtle"
      >
        <option value="Nigeria">Nigeria</option>
      </select>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <input
            name="city"
            value={shipping.city}
            onChange={onChange}
            placeholder="Town / City"
            required
            className="form-control border-danger-subtle"
          />
        </div>
        <div className="col-12 col-md-6">
          <select
            name="state"
            value={shipping.state}
            onChange={onChange}
            required
            className="form-select border-danger-subtle"
          >
            <option value="">State</option>
            {zones.map((zone) => (
              <option key={zone._id} value={zone.state}>
                {zone.state}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <input
            name="postalCode"
            value={shipping.postalCode}
            onChange={onChange}
            placeholder="Postal Code"
            className="form-control border-danger-subtle"
          />
        </div>
        <div className="col-12 col-md-6">
          <input
            name="phone"
            value={shipping.phone}
            onChange={onChange}
            placeholder="Phone"
            required
            className="form-control border-danger-subtle"
          />
        </div>
      </div>
      <input
        type="email"
        name="email"
        value={shipping.email}
        onChange={onChange}
        placeholder="Email address"
        required
        className="form-control border-danger-subtle"
      />

      <button
        type="submit"
        disabled={savingAddress}
        className="btn btn-danger align-self-start px-4"
      >
        {savingAddress ? "Saving..." : "Save address"}
      </button>
    </form>
  );
}

export default ShippingForm;
