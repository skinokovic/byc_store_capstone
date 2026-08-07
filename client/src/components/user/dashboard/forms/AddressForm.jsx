function AddressForm({ address, zones, saving, editing, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="d-flex flex-column gap-3">
      <input
        name="label"
        value={address.label}
        onChange={onChange}
        placeholder="Label (e.g. Home, Office)"
        className="form-control border-danger-subtle"
      />
      <input
        name="fullName"
        value={address.fullName}
        onChange={onChange}
        placeholder="Full Name"
        required
        className="form-control border-danger-subtle"
      />
      <input
        name="street"
        value={address.street}
        onChange={onChange}
        placeholder="Street address"
        required
        className="form-control border-danger-subtle"
      />
      <select
        name="country"
        value={address.country}
        onChange={onChange}
        className="form-select border-danger-subtle"
      >
        <option value="Nigeria">Nigeria</option>
      </select>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <input
            name="city"
            value={address.city}
            onChange={onChange}
            placeholder="Town / City"
            required
            className="form-control border-danger-subtle"
          />
        </div>
        <div className="col-12 col-md-6">
          <select
            name="state"
            value={address.state}
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
            value={address.postalCode}
            onChange={onChange}
            placeholder="Postal Code"
            className="form-control border-danger-subtle"
          />
        </div>
        <div className="col-12 col-md-6">
          <input
            name="phone"
            value={address.phone}
            onChange={onChange}
            placeholder="Phone"
            required
            className="form-control border-danger-subtle"
          />
        </div>
      </div>

      <div className="form-check">
        <input
          type="checkbox"
          name="isDefault"
          id="isDefault"
          checked={address.isDefault}
          onChange={onChange}
          className="form-check-input"
        />
        <label
          className="form-check-label small text-secondary"
          htmlFor="isDefault"
        >
          Set as default address
        </label>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="btn btn-danger align-self-start px-4"
      >
        {saving ? "Saving..." : editing ? "Update address" : "Save address"}
      </button>
    </form>
  );
}

export default AddressForm;
