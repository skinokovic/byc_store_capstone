import { Pencil, Trash2 } from "lucide-react";

/**
 * Radio-select list of the user's saved addresses, for checkout.
 * - selectedId: currently selected address _id
 * - onSelect(address): fires when a radio is chosen
 * - onEdit(address): fires when the edit icon is clicked
 * - onDelete(id): fires when the delete icon is clicked
 */
function AddressList({ addresses, selectedId, onSelect, onEdit, onDelete }) {
  return (
    <div className="mb-4">
      {addresses.map((addr) => {
        const isSelected = addr._id === selectedId;

        return (
          <label
            key={addr._id}
            className={`d-flex align-items-start gap-3 p-3 mb-2 border rounded-3 ${
              isSelected ? "border-primary bg-light" : "border-secondary-subtle"
            }`}
            style={{ cursor: "pointer" }}
          >
            <input
              type="radio"
              name="selectedAddress"
              className="form-check-input mt-1"
              checked={isSelected}
              onChange={() => onSelect(addr)}
            />

            <div className="flex-grow-1">
              <div className="d-flex align-items-center gap-2">
                <span className="fw-semibold">{addr.label}</span>
                {addr.isDefault && (
                  <span className="badge bg-success">Default</span>
                )}
              </div>
              <div className="small mt-1">{addr.fullName}</div>
              <div className="small text-secondary">
                {addr.street}, {addr.city}, {addr.state}, {addr.country}
                {addr.postalCode ? `, ${addr.postalCode}` : ""}
              </div>
              <div className="small text-secondary">{addr.phone}</div>
              <div className="small text-secondary">
                Delivery fee: ₦{Number(addr.deliveryFee || 0).toLocaleString()}
              </div>
            </div>

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                title="Edit address"
                onClick={(e) => {
                  e.preventDefault();
                  onEdit(addr);
                }}
              >
                <Pencil size={16} />
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                title="Delete address"
                onClick={(e) => {
                  e.preventDefault();
                  onDelete(addr._id, addr.label);
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </label>
        );
      })}
    </div>
  );
}

export default AddressList;
