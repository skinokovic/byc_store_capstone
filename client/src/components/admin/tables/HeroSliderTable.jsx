// import { Link } from "react-router-dom";
// import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";

// function HeroSliderTable({ sliders, onDelete, onToggleActive }) {
//   return (
//     <>
//       {/* ===========================
//             Desktop Table
//       ============================ */}

//       <div className="table-responsive d-none d-lg-block">
//         <table className="table align-middle table-hover">
//           <thead className="table-light">
//             <tr>
//               <th>#</th>
//               <th>Images</th>
//               <th>Title</th>
//               <th>Animated Words</th>
//               <th>Buttons</th>
//               <th>Duration</th>
//               <th>Order</th>
//               <th>Status</th>
//               <th width="170">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {sliders.map((slider, index) => (
//               <tr key={slider._id}>
//                 <td>{index + 1}</td>

//                 <td>
//                   <div className="d-flex gap-1">
//                     {["left", "center", "right"].map((side) => (
//                       <img
//                         key={side}
//                         src={slider.images?.[side]?.url}
//                         alt={side}
//                         title={side}
//                         style={{
//                           width: 40,
//                           height: 40,
//                           objectFit: "cover",
//                           borderRadius: 6,
//                         }}
//                       />
//                     ))}
//                   </div>
//                 </td>

//                 <td>
//                   <h6 className="mb-1">{slider.title}</h6>
//                   <small className="text-muted">{slider.subtitle}</small>
//                 </td>

//                 <td>
//                   <div
//                     className="d-flex flex-wrap gap-1"
//                     style={{ maxWidth: 180 }}
//                   >
//                     {slider.animatedWords?.length ? (
//                       slider.animatedWords.map((word, i) => (
//                         <span key={i} className="badge bg-dark">
//                           {word}
//                         </span>
//                       ))
//                     ) : (
//                       <span className="text-muted small">—</span>
//                     )}
//                   </div>
//                 </td>

//                 <td>
//                   <div className="small">
//                     <div>
//                       <strong>Primary:</strong> {slider.buttons?.primary?.text}{" "}
//                       ({slider.buttons?.primary?.link})
//                     </div>
//                     <div>
//                       <strong>Secondary:</strong>{" "}
//                       {slider.buttons?.secondary?.text} (
//                       {slider.buttons?.secondary?.link})
//                     </div>
//                   </div>
//                 </td>

//                 <td>{slider.duration}ms</td>

//                 <td>{slider.order}</td>

//                 <td>
//                   <span
//                     className={`badge ${
//                       slider.isActive ? "bg-success" : "bg-secondary"
//                     }`}
//                   >
//                     {slider.isActive ? "Active" : "Inactive"}
//                   </span>
//                 </td>

//                 <td>
//                   <div className="d-flex gap-2">
//                     <button
//                       className="btn btn-sm btn-outline-dark"
//                       onClick={() =>
//                         onToggleActive(slider._id, slider.isActive)
//                       }
//                     >
//                       {slider.isActive ? (
//                         <EyeOff size={18} />
//                       ) : (
//                         <Eye size={18} />
//                       )}
//                     </button>

//                     <Link
//                       to={`/admin/sliders/edit/${slider._id}`}
//                       className="btn btn-sm btn-outline-primary"
//                     >
//                       <Pencil size={18} />
//                     </Link>

//                     <button
//                       className="btn btn-sm btn-outline-danger"
//                       onClick={() => onDelete(slider._id)}
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ===========================
//               Mobile Cards
//       ============================ */}

//       <div className="d-lg-none">
//         <div className="row g-3">
//           {sliders.map((slider) => (
//             <div className="col-12" key={slider._id}>
//               <div className="card shadow-sm border-0">
//                 <div className="d-flex">
//                   {["left", "center", "right"].map((side) => (
//                     <img
//                       key={side}
//                       src={slider.images?.[side]?.url}
//                       alt={side}
//                       style={{
//                         flex: 1,
//                         height: 140,
//                         objectFit: "cover",
//                       }}
//                     />
//                   ))}
//                 </div>

//                 <div className="card-body">
//                   <div className="d-flex justify-content-between">
//                     <h5>{slider.title}</h5>

//                     <span
//                       className={`badge ${
//                         slider.isActive ? "bg-success" : "bg-secondary"
//                       }`}
//                     >
//                       {slider.isActive ? "Active" : "Inactive"}
//                     </span>
//                   </div>

//                   <p className="text-muted mb-2">{slider.subtitle}</p>

//                   {slider.animatedWords?.length > 0 && (
//                     <div className="d-flex flex-wrap gap-1 mb-2">
//                       {slider.animatedWords.map((word, i) => (
//                         <span key={i} className="badge bg-dark">
//                           {word}
//                         </span>
//                       ))}
//                     </div>
//                   )}

//                   <div className="small mb-2">
//                     <div>
//                       <strong>Primary:</strong> {slider.buttons?.primary?.text}{" "}
//                       ({slider.buttons?.primary?.link})
//                     </div>
//                     <div>
//                       <strong>Secondary:</strong>{" "}
//                       {slider.buttons?.secondary?.text} (
//                       {slider.buttons?.secondary?.link})
//                     </div>
//                   </div>

//                   <small>
//                     Order : {slider.order} &nbsp;|&nbsp; Duration :{" "}
//                     {slider.duration}ms
//                   </small>

//                   <hr />

//                   <div className="d-flex justify-content-between">
//                     <button
//                       className="btn btn-outline-dark btn-sm"
//                       onClick={() =>
//                         onToggleActive(slider._id, slider.isActive)
//                       }
//                     >
//                       {slider.isActive ? (
//                         <EyeOff size={18} />
//                       ) : (
//                         <Eye size={18} />
//                       )}
//                     </button>

//                     <Link
//                       to={`/admin/sliders/edit/${slider._id}`}
//                       className="btn btn-outline-primary btn-sm"
//                     >
//                       <Pencil size={18} />
//                     </Link>

//                     <button
//                       className="btn btn-outline-danger btn-sm"
//                       onClick={() => onDelete(slider._id)}
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default HeroSliderTable;

import { Link } from "react-router-dom";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";

function HeroSliderTable({ sliders, onDelete, onToggleActive }) {
  if (sliders.length === 0) {
    return <p className="text-secondary">No sliders yet.</p>;
  }

  return (
    <>
      {/* Table - md and up */}
      <div className="table-responsive d-none d-md-block">
        <table className="table admin-table-lg align-middle mb-0">
          <thead>
            <tr>
              <th>Images</th>
              <th>Title</th>
              <th>Buttons</th>
              <th>Duration</th>
              <th>Order</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sliders.map((slider) => (
              <tr key={slider._id}>
                <td>
                  <div className="d-flex gap-1">
                    {["left", "center", "right"].map((side) => (
                      <img
                        key={side}
                        src={slider.images?.[side]?.url}
                        alt={side}
                        title={side}
                        style={{
                          width: 40,
                          height: 40,
                          objectFit: "cover",
                          borderRadius: 6,
                        }}
                      />
                    ))}
                  </div>
                </td>

                <td>
                  <p className="fw-semibold mb-0">{slider.title}</p>
                  <p className="text-secondary small mb-0">{slider.subtitle}</p>
                </td>

                <td>
                  <div className="small text-secondary">
                    <div>
                      <span className="text-white">Primary:</span>{" "}
                      {slider.buttons?.primary?.text}
                    </div>
                    <div>
                      <span className="text-white">Secondary:</span>{" "}
                      {slider.buttons?.secondary?.text}
                    </div>
                  </div>
                </td>

                <td>{slider.duration}ms</td>

                <td>{slider.order}</td>

                <td>
                  <span
                    className={`badge ${
                      slider.isActive ? "text-bg-success" : "text-bg-secondary"
                    }`}
                  >
                    {slider.isActive ? "Active" : "Deactivated"}
                  </span>
                </td>

                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <Link
                      to={`/admin/sliders/edit/${slider._id}`}
                      className="admin-icon-btn-sm"
                      aria-label="Edit slider"
                    >
                      <Pencil size={14} />
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        onToggleActive(slider._id, slider.isActive)
                      }
                      className="admin-icon-btn-sm"
                      aria-label={
                        slider.isActive
                          ? "Deactivate slider"
                          : "Activate slider"
                      }
                      title={slider.isActive ? "Deactivate" : "Activate"}
                    >
                      {slider.isActive ? (
                        <EyeOff size={14} />
                      ) : (
                        <Eye size={14} />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(slider._id)}
                      className="admin-icon-btn-sm admin-icon-btn-danger"
                      aria-label="Delete slider"
                    >
                      <Trash2 size={14} />
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
        {sliders.map((slider) => (
          <div className="admin-row-card" key={slider._id}>
            <div className="d-flex gap-1 mb-3">
              {["left", "center", "right"].map((side) =>
                slider.images?.[side]?.url ? (
                  <img
                    key={side}
                    src={slider.images[side].url}
                    alt={`${slider.title} - ${side}`}
                    style={{
                      flex: 1,
                      height: 90,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                ) : (
                  <div
                    key={side}
                    style={{
                      flex: 1,
                      height: 90,
                      borderRadius: 8,
                      backgroundColor: "#1f1f1f",
                    }}
                  />
                ),
              )}
            </div>

            <p className="fw-semibold mb-0">{slider.title}</p>
            <p className="text-secondary small mb-0">{slider.subtitle}</p>

            {slider.animatedWords?.length > 0 && (
              <div className="d-flex flex-wrap gap-2 mt-3">
                {slider.animatedWords.map((word, i) => (
                  <span key={i} className="badge text-bg-secondary">
                    {word}
                  </span>
                ))}
              </div>
            )}

            <div className="admin-table small mt-3">
              <div className="d-flex justify-content-between py-1 border-bottom admin-row-card-border">
                <span className="text-secondary">Primary</span>
                <span className="text-truncate ms-2">
                  {slider.buttons?.primary?.text}
                </span>
              </div>

              <div className="d-flex justify-content-between py-1">
                <span className="text-secondary">Secondary</span>
                <span className="text-truncate ms-2">
                  {slider.buttons?.secondary?.text}
                </span>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <span
                className={`badge ${
                  slider.isActive ? "text-bg-success" : "text-bg-secondary"
                }`}
              >
                {slider.isActive ? "Active" : "Deactivated"}
              </span>

              <span className="text-secondary small">
                Order: {slider.order} &middot; {slider.duration}ms
              </span>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-3 pt-3 border-top admin-row-card-border">
              <Link
                to={`/admin/sliders/edit/${slider._id}`}
                className="admin-icon-btn-sm"
                aria-label="Edit slider"
              >
                <Pencil size={14} />
              </Link>

              <button
                type="button"
                onClick={() => onToggleActive(slider._id, slider.isActive)}
                className="admin-icon-btn-sm"
                aria-label={
                  slider.isActive ? "Deactivate slider" : "Activate slider"
                }
              >
                {slider.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>

              <button
                type="button"
                onClick={() => onDelete(slider._id)}
                className="admin-icon-btn-sm admin-icon-btn-danger"
                aria-label="Delete slider"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default HeroSliderTable;
