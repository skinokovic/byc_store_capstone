// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   fetchDeliveryZones,
//   deleteDeliveryZone,
// } from "../../../../redux/slice/deliveryZoneSlice"; // 🔧 adjust path
// import { toast } from "react-toastify";

// /**
//  * Lists all delivery zones. No props needed — Edit links to its own route,
//  * Delete dispatches directly. Safe to render standalone at /admin/zones.
//  */
// const DeliveryZoneTable = () => {
//   const dispatch = useDispatch();
//   const { list, loading, error } = useSelector((s) => s.deliveryZones); // 🔧 adjust slice key if different

//   useEffect(() => {
//     dispatch(fetchDeliveryZones());
//   }, [dispatch]);

//   //   const handleDelete = (id, state) => {
//   //     if (
//   //       window.confirm(
//   //         `Delete the delivery zone for ${state}? This cannot be undone.`,
//   //       )
//   //     ) {
//   //       dispatch(deleteDeliveryZone(id));
//   //     }
//   //   };
//   const handleDelete = async (id, state) => {
//     if (
//       window.confirm(
//         `Delete the delivery zone for ${state}? This cannot be undone.`,
//       )
//     ) {
//       const action = await dispatch(deleteDeliveryZone(id));
//       if (action.meta.requestStatus === "fulfilled") {
//         toast.success(`Delivery zone for ${state} deleted`);
//       } else {
//         toast.error(action.payload || "Failed to delete delivery zone");
//       }
//     }
//   };

//   return (
//     <div className="card shadow-sm border-0">
//       <div className="card-header bg-white d-flex justify-content-between align-items-center pt-3">
//         <h5 className="mb-0 fw-semibold">Delivery Zones</h5>
//         <div className="d-flex align-items-center gap-3">
//           {!loading && (
//             <span className="text-muted small">
//               {list?.length || 0} zone{list?.length === 1 ? "" : "s"}
//             </span>
//           )}
//           <Link
//             to="/admin/delivery-zones/create"
//             className="btn btn-sm btn-dark"
//           >
//             + New Zone
//           </Link>
//         </div>
//       </div>

//       <div className="card-body p-0">
//         {error && <div className="alert alert-danger m-3">{error}</div>}

//         {loading ? (
//           <div className="d-flex justify-content-center align-items-center py-5">
//             <div className="spinner-border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         ) : list && list.length > 0 ? (
//           <div className="table-responsive">
//             <table className="table table-hover align-middle mb-0">
//               <thead className="table-light">
//                 <tr>
//                   <th>State</th>
//                   <th>Fee</th>
//                   <th>Status</th>
//                   <th className="text-end">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {list.map((zone) => (
//                   <tr key={zone._id}>
//                     <td className="fw-medium">{zone.state}</td>
//                     <td>₦{Number(zone.fee).toLocaleString()}</td>
//                     <td>
//                       <span
//                         className={`badge ${zone.isActive ? "bg-success" : "bg-secondary"}`}
//                       >
//                         {zone.isActive ? "Active" : "Inactive"}
//                       </span>
//                     </td>
//                     <td className="text-end">
//                       <Link
//                         to={`/admin/delivery-zones/edit/${zone._id}`}
//                         className="btn btn-sm btn-outline-primary me-2"
//                       >
//                         Edit
//                       </Link>
//                       <button
//                         className="btn btn-sm btn-outline-danger"
//                         onClick={() => handleDelete(zone._id, zone.state)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="text-center text-muted py-5">
//             No delivery zones yet.{" "}
//             <Link to="/admin/delivery-zones/create">Create one</Link> to get
//             started.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DeliveryZoneTable;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchDeliveryZones,
  deleteDeliveryZone,
} from "../../../../redux/slice/deliveryZoneSlice"; // 🔧 adjust path

const PAGE_SIZE = 10;

/**
 * Lists all delivery zones, paginated client-side (backend returns the full
 * list in one call). No props needed — Edit links to its own route,
 * Delete dispatches directly. Safe to render standalone at /admin/zones.
 */
const DeliveryZoneTable = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((s) => s.deliveryZones); // 🔧 adjust slice key if different
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchDeliveryZones());
  }, [dispatch]);

  const totalPages = Math.max(1, Math.ceil((list?.length || 0) / PAGE_SIZE));
  const paginatedList = (list || []).slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  // Keep page in range if the list shrinks (e.g. after a delete)
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const handleDelete = async (id, state) => {
    if (
      window.confirm(
        `Delete the delivery zone for ${state}? This cannot be undone.`,
      )
    ) {
      const action = await dispatch(deleteDeliveryZone(id));
      if (action.meta.requestStatus === "fulfilled") {
        toast.success(`Delivery zone for ${state} deleted`);
      } else {
        toast.error(action.payload || "Failed to delete delivery zone");
      }
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white d-flex justify-content-between align-items-center pt-3">
        <h5 className="mb-0 fw-semibold">Delivery Zones</h5>
        <div className="d-flex align-items-center gap-3">
          {!loading && (
            <span className="text-muted small">
              {list?.length || 0} zone{list?.length === 1 ? "" : "s"}
            </span>
          )}
          <Link
            to="/admin/delivery-zone/create"
            className="btn btn-sm btn-dark"
          >
            + New Zone
          </Link>
        </div>
      </div>

      <div className="card-body p-0">
        {error && <div className="alert alert-danger m-3">{error}</div>}

        {loading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : list && list.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>State</th>
                  <th>Fee</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedList.map((zone) => (
                  <tr key={zone._id}>
                    <td className="fw-medium">{zone.state}</td>
                    <td>₦{Number(zone.fee).toLocaleString()}</td>
                    <td>
                      <span
                        className={`badge ${zone.isActive ? "bg-success" : "bg-secondary"}`}
                      >
                        {zone.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="text-end">
                      <Link
                        to={`/admin/delivery-zones/edit/${zone._id}`}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(zone._id, zone.state)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {!loading && list && list.length > PAGE_SIZE && (
          <div className="d-flex justify-content-between align-items-center px-3 py-3 border-top">
            <span className="text-muted small">
              Page {page} of {totalPages}
            </span>
            <nav aria-label="Delivery zones pagination">
              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <li
                      key={p}
                      className={`page-item ${page === p ? "active" : ""}`}
                    >
                      <button className="page-link" onClick={() => setPage(p)}>
                        {p}
                      </button>
                    </li>
                  ),
                )}
                <li
                  className={`page-item ${page === totalPages ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {!loading && (!list || list.length === 0) && (
          <div className="text-center text-muted py-5">
            No delivery zones yet.{" "}
            <Link to="/admin/delivery-zones/create">Create one</Link> to get
            started.
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryZoneTable;
