// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import {
//   fetchAddresses,
//   deleteAddress,
// } from "../../../../redux/slice/addressSlice"; // 🔧 adjust path/names to match your slice
// import { Pencil, Trash } from "lucide-react";

// /**
//  * Lists the logged-in user's saved addresses.
//  * Pass `onEdit(address)` so the parent page can populate AddressForm in edit mode.
//  * Requires bootstrap-icons: `npm install bootstrap-icons` then
//  * `import "bootstrap-icons/font/bootstrap-icons.css";` once, e.g. in main.jsx.
//  */
// const AddressTable = ({ onEdit }) => {
//   const dispatch = useDispatch();
//   const { list: addresses, loading, error } = useSelector((s) => s.addresses); // 🔧 adjust slice key if different

//   useEffect(() => {
//     dispatch(fetchAddresses());
//   }, [dispatch]);

//   const handleDelete = async (id, label) => {
//     if (
//       window.confirm(`Delete the "${label}" address? This cannot be undone.`)
//     ) {
//       const action = await dispatch(deleteAddress(id));
//       if (deleteAddress.fulfilled.match(action)) {
//         toast.success("Address deleted");
//       } else {
//         toast.error(action.payload || "Failed to delete address");
//       }
//     }
//   };

//   return (
//     <div className="ud-card mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5 className="mb-0 fw-semibold">Saved Addresses</h5>
//         {!loading && (
//           <span className="text-muted small">
//             {addresses?.length || 0} address
//             {addresses?.length === 1 ? "" : "es"}
//           </span>
//         )}
//       </div>

//       {error && <div className="alert alert-danger">{error}</div>}

//       {loading ? (
//         <div className="d-flex justify-content-center py-4">
//           <div className="spinner-border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       ) : addresses && addresses.length > 0 ? (
//         <div className="table-responsive">
//           <table className="table table-hover align-middle mb-0">
//             <thead className="table-light">
//               <tr>
//                 <th>Label</th>
//                 <th>Recipient</th>
//                 <th>Address</th>
//                 <th>Phone</th>
//                 <th>Delivery Fee</th>
//                 <th>Default</th>
//                 <th className="text-end">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {addresses.map((addr) => (
//                 <tr key={addr._id}>
//                   <td className="fw-medium">{addr.label}</td>
//                   <td>{addr.fullName}</td>
//                   <td className="text-muted small">
//                     {addr.street}, {addr.city}, {addr.state}
//                   </td>
//                   <td>{addr.phone}</td>
//                   <td>₦{Number(addr.deliveryFee || 0).toLocaleString()}</td>
//                   <td>
//                     {addr.isDefault && (
//                       <span className="badge bg-success">Default</span>
//                     )}
//                   </td>
//                   <td className="text-end">
//                     <button
//                       type="button"
//                       className="btn btn-sm btn-outline-primary me-2"
//                       title="Edit address"
//                       onClick={() => onEdit(addr)}
//                     >
//                       <Pencil size={16} />
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-sm btn-outline-danger"
//                       title="Delete address"
//                       onClick={() => handleDelete(addr._id, addr.label)}
//                     >
//                       <Trash size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="text-center text-muted py-4">
//           No saved addresses yet. Add one above.
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddressTable;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Pencil, Trash2 } from "lucide-react";
import {
  fetchAddresses,
  deleteAddress,
} from "../../../../redux/slice/addressSlice"; // 🔧 adjust path

const AddressTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { list: addresses, loading, error } = useSelector((s) => s.addresses);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleDelete = async (id, label) => {
    if (
      window.confirm(`Delete the "${label}" address? This cannot be undone.`)
    ) {
      const action = await dispatch(deleteAddress(id));
      if (deleteAddress.fulfilled.match(action)) {
        toast.success("Address deleted");
      } else {
        toast.error(action.payload || "Failed to delete address");
      }
    }
  };

  return (
    <div className="ud-card mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h5 className="mb-0 fw-semibold">Saved Addresses</h5>
        {!loading && (
          <span className="text-muted small">
            {addresses?.length || 0} address
            {addresses?.length === 1 ? "" : "es"}
          </span>
        )}
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="d-flex justify-content-center py-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : addresses && addresses.length > 0 ? (
        <>
          {/* Table - md and up */}
          {/* Table - md and up */}
          <div className="table-responsive d-none d-md-block">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Label</th>
                  <th>Recipient</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Delivery Fee</th>
                  <th>Default</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {addresses.map((addr) => (
                  <tr key={addr._id}>
                    <td className="fw-medium">{addr.label}</td>
                    <td>{addr.fullName}</td>
                    <td className="text-muted small" style={{ maxWidth: 260 }}>
                      <span
                        className="d-inline-block text-truncate align-middle"
                        style={{ maxWidth: 260 }}
                        title={`${addr.street}, ${addr.city}, ${addr.state}`}
                      >
                        {addr.street}, {addr.city}, {addr.state}
                      </span>
                    </td>
                    <td className="text-nowrap">{addr.phone}</td>
                    <td className="text-nowrap">
                      ₦{Number(addr.deliveryFee || 0).toLocaleString()}
                    </td>
                    <td>
                      {addr.isDefault && (
                        <span className="badge bg-success">Default</span>
                      )}
                    </td>
                    <td className="text-end" style={{ whiteSpace: "nowrap" }}>
                      <div className="d-inline-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          title="Edit address"
                          onClick={() => onEdit(addr)}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          title="Delete address"
                          onClick={() => handleDelete(addr._id, addr.label)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards - below md */}
          <div className="d-md-none d-flex flex-column gap-3">
            {addresses.map((addr) => (
              <div className="ud-row-card" key={addr._id}>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="fw-semibold">{addr.label}</span>
                      {addr.isDefault && (
                        <span className="badge bg-success">Default</span>
                      )}
                    </div>
                    <p className="small mb-0 mt-1">{addr.fullName}</p>
                  </div>

                  <div className="d-flex gap-2 flex-shrink-0">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      title="Edit address"
                      onClick={() => onEdit(addr)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      title="Delete address"
                      onClick={() => handleDelete(addr._id, addr.label)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-top ud-row-card-border">
                  <p className="text-secondary small mb-1">
                    {addr.street}, {addr.city}, {addr.state}
                  </p>
                  <p className="text-secondary small mb-1">{addr.phone}</p>
                  <p className="text-secondary small mb-0">
                    Delivery fee: ₦
                    {Number(addr.deliveryFee || 0).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-muted py-4">
          No saved addresses yet. Add one above.
        </div>
      )}
    </div>
  );
};

export default AddressTable;
