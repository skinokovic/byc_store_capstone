import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import UserHeader from "../../components/user/dashboard/UserHeader";
import AddressForm from "../../components/user/dashboard/forms/AddressForm";
import AddressTable from "../../components/admin/tables/user/AddressTable"; // 🔧 adjust path
import { createAddress, updateAddress } from "../../redux/slice/addressSlice"; // 🔧 adjust path/names
import { fetchDeliveryZones } from "../../redux/slice/deliveryZoneSlice";

const emptyAddress = {
  label: "Home",
  fullName: "",
  street: "",
  country: "Nigeria",
  city: "",
  state: "",
  postalCode: "",
  phone: "",
  isDefault: false,
};

function AddressCreate() {
  const dispatch = useDispatch();

  const { list: zones } = useSelector((state) => state.deliveryZones);
  const [address, setAddress] = useState(emptyAddress);
  const [editingAddress, setEditingAddress] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchDeliveryZones());
  }, [dispatch]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleEdit(addr) {
    setEditingAddress(addr);
    setAddress({
      label: addr.label || "Home",
      fullName: addr.fullName || "",
      street: addr.street || "",
      country: addr.country || "Nigeria",
      city: addr.city || "",
      state: addr.state || "",
      postalCode: addr.postalCode || "",
      phone: addr.phone || "",
      isDefault: addr.isDefault || false,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditingAddress(null);
    setAddress(emptyAddress);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    const result = editingAddress
      ? await dispatch(
          updateAddress({ id: editingAddress._id, payload: address }),
        )
      : await dispatch(createAddress(address));

    setSaving(false);

    const succeeded = editingAddress
      ? updateAddress.fulfilled.match(result)
      : createAddress.fulfilled.match(result);

    if (succeeded) {
      toast.success(editingAddress ? "Address updated" : "Address saved");
      setEditingAddress(null);
      setAddress(emptyAddress);
    } else {
      toast.error(result.payload || "Failed to save address");
    }
  }

  return (
    <div>
      <UserHeader
        title={editingAddress ? "Edit Address" : "Add Address"}
        subtitle="Save a shipping address for faster checkout"
      />

      <div className="ud-card">
        <AddressForm
          address={address}
          zones={zones}
          saving={saving}
          editing={!!editingAddress}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        {editingAddress && (
          <button
            type="button"
            className="btn btn-outline-secondary mt-2"
            onClick={handleCancelEdit}
            disabled={saving}
          >
            Cancel Edit
          </button>
        )}
      </div>

      <AddressTable onEdit={handleEdit} />
    </div>
  );
}

export default AddressCreate;
