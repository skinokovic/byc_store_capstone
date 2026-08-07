import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDeliveryZone,
  updateDeliveryZone,
} from "../../../../redux/slice/deliveryZoneSlice"; // 🔧 adjust path
import {
  NIGERIAN_STATES,
  DEFAULT_FEES,
} from "../../../../../src/DeliveryZoneDefaults"; // 🔧 adjust path
import { toast } from "react-toastify";

const initialState = {
  state: "",
  fee: "",
  isActive: true,
};

/**
 * Pure create/edit form — no routing logic. Used by both CreateDeliveryZone
 * and EditDeliveryZone pages.
 * Pass `editingZone` to switch into edit mode, or omit for create mode.
 * Pass `onDone` to run after a successful submit (e.g. navigate away).
 */
const DeliveryZoneForm = ({ editingZone = null, onDone }) => {
  const dispatch = useDispatch();
  const { loading, error, list } = useSelector((s) => s.deliveryZones); // 🔧 adjust slice key if different

  const [formData, setFormData] = useState(initialState);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (editingZone) {
      setFormData({
        state: editingZone.state || "",
        fee: editingZone.fee ?? "",
        isActive: editingZone.isActive ?? true,
      });
    } else {
      setFormData(initialState);
    }
  }, [editingZone]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // States that already have a zone (excluding the one being edited) —
  // disabled in the dropdown since `state` is unique on the backend.
  const takenStates = new Set(
    (list || [])
      .filter((z) => !editingZone || z._id !== editingZone._id)
      .map((z) => z.state),
  );

  const missingStates = NIGERIAN_STATES.filter((s) => !takenStates.has(s));
  const suggestedFee = formData.state ? DEFAULT_FEES[formData.state] : null;

  const useSuggestedFee = () => {
    if (suggestedFee != null) {
      setFormData((prev) => ({ ...prev, fee: suggestedFee }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const payload = {
      state: formData.state,
      fee: Number(formData.fee),
      isActive: formData.isActive,
    };

    //updated with toast
    const action = editingZone
      ? await dispatch(updateDeliveryZone({ id: editingZone._id, payload }))
      : await dispatch(createDeliveryZone(payload));

    if (action.meta.requestStatus === "fulfilled") {
      toast.success(
        editingZone ? "Delivery zone updated" : "Delivery zone created",
      );
      setFormData(initialState);
      setValidated(false);
      if (onDone) onDone();
    } else {
      toast.error(action.payload || "Something went wrong");
    }

    // if (editingZone) {
    //   await dispatch(updateDeliveryZone({ id: editingZone._id, payload }));
    // } else {
    //   await dispatch(createDeliveryZone(payload));
    // }

    // setFormData(initialState);
    // setValidated(false);
    // if (onDone) onDone();
  };

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-header bg-white border-bottom-0 pt-3">
        <h5 className="mb-0 fw-semibold">
          {editingZone ? "Edit Delivery Zone" : "Create Delivery Zone"}
        </h5>
      </div>

      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}

        {!editingZone && missingStates.length === 0 ? (
          <div className="alert alert-secondary mb-0">
            Every state already has a delivery zone. Edit an existing zone from
            the table to change its fee or status.
          </div>
        ) : (
          <form
            noValidate
            className={validated ? "was-validated" : ""}
            onSubmit={handleSubmit}
          >
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="zoneState" className="form-label">
                  State
                </label>
                <select
                  id="zoneState"
                  name="state"
                  className="form-select"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  disabled={!!editingZone}
                >
                  <option value="" disabled>
                    Select a state
                  </option>
                  {NIGERIAN_STATES.map((s) => (
                    <option key={s} value={s} disabled={takenStates.has(s)}>
                      {s} {takenStates.has(s) ? "(already has a zone)" : ""}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">Please select a state.</div>
              </div>

              <div className="col-12">
                <label htmlFor="zoneFee" className="form-label">
                  Delivery Fee (₦)
                </label>
                <div className="d-flex gap-2">
                  <input
                    id="zoneFee"
                    type="number"
                    min="0"
                    step="0.01"
                    name="fee"
                    className="form-control"
                    placeholder="e.g. 1500"
                    value={formData.fee}
                    onChange={handleChange}
                    required
                  />
                  {suggestedFee != null && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary text-nowrap"
                      onClick={useSuggestedFee}
                    >
                      Use ₦{suggestedFee.toLocaleString()}
                    </button>
                  )}
                </div>
                {suggestedFee != null && (
                  <div className="form-text">
                    Default seed rate for {formData.state} is ₦
                    {suggestedFee.toLocaleString()}.
                  </div>
                )}
                <div className="invalid-feedback">
                  Enter a valid fee (0 or more).
                </div>
              </div>

              <div className="col-12">
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    role="switch"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="isActive">
                    Zone is active
                  </label>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
              <button
                type="submit"
                className="btn btn-dark px-4"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Saving...
                  </>
                ) : editingZone ? (
                  "Update Zone"
                ) : (
                  "Create Zone"
                )}
              </button>

              {editingZone && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={onDone}
                  disabled={loading}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DeliveryZoneForm;
