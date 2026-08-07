import { Link } from "react-router-dom";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";

function ArrivalTable({ arrivals = [], onDelete, onToggleActive }) {
  if (arrivals.length === 0) {
    return <p className="text-secondary">No arrivals yet.</p>;
  }

  return (
    <>
      {/* Table - md and up */}
      <div className="table-responsive d-none d-md-block">
        <table className="table admin-table-lg align-middle mb-0">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Order</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {arrivals.map((arrival) => (
              <tr key={arrival._id}>
                <td>
                  <img
                    src={arrival.image?.url}
                    alt={arrival.title}
                    style={{
                      width: 48,
                      height: 56,
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                  />
                </td>

                <td>
                  <p className="fw-semibold mb-0">{arrival.title}</p>
                  <p className="text-secondary small mb-0">
                    {arrival.subtitle}
                  </p>
                </td>

                <td>{arrival.category?.name || "—"}</td>

                <td>{arrival.order}</td>

                <td>
                  <span
                    className={`badge ${
                      arrival.isActive ? "text-bg-success" : "text-bg-secondary"
                    }`}
                  >
                    {arrival.isActive ? "Active" : "Deactivated"}
                  </span>
                </td>

                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <Link
                      to={`/admin/arrivals/edit/${arrival._id}`}
                      className="admin-icon-btn-sm"
                      aria-label="Edit arrival"
                    >
                      <Pencil size={14} />
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        onToggleActive(arrival._id, arrival.isActive)
                      }
                      className="admin-icon-btn-sm"
                      aria-label={
                        arrival.isActive
                          ? "Deactivate arrival"
                          : "Activate arrival"
                      }
                      title={arrival.isActive ? "Deactivate" : "Activate"}
                    >
                      {arrival.isActive ? (
                        <EyeOff size={14} />
                      ) : (
                        <Eye size={14} />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(arrival._id)}
                      className="admin-icon-btn-sm admin-icon-btn-danger"
                      aria-label="Delete arrival"
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
        {arrivals.map((arrival) => (
          <div className="admin-row-card" key={arrival._id}>
            <div className="d-flex gap-1 mb-3">
              {arrival.image?.url ? (
                <img
                  src={arrival.image.url}
                  alt={arrival.title}
                  style={{
                    width: "100%",
                    height: 140,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: 140,
                    borderRadius: 8,
                    backgroundColor: "#1f1f1f",
                  }}
                />
              )}
            </div>

            <p className="fw-semibold mb-0">{arrival.title}</p>
            <p className="text-secondary small mb-0">{arrival.subtitle}</p>

            <div className="admin-table small mt-3">
              <div className="d-flex justify-content-between py-1 border-bottom admin-row-card-border">
                <span className="text-secondary">Category</span>
                <span className="text-truncate ms-2">
                  {arrival.category?.name || "—"}
                </span>
              </div>

              <div className="d-flex justify-content-between py-1">
                <span className="text-secondary">Order</span>
                <span>{arrival.order}</span>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <span
                className={`badge ${
                  arrival.isActive ? "text-bg-success" : "text-bg-secondary"
                }`}
              >
                {arrival.isActive ? "Active" : "Deactivated"}
              </span>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-3 pt-3 border-top admin-row-card-border">
              <Link
                to={`/admin/arrivals/edit/${arrival._id}`}
                className="admin-icon-btn-sm"
                aria-label="Edit arrival"
              >
                <Pencil size={14} />
              </Link>

              <button
                type="button"
                onClick={() => onToggleActive(arrival._id, arrival.isActive)}
                className="admin-icon-btn-sm"
                aria-label={
                  arrival.isActive ? "Deactivate arrival" : "Activate arrival"
                }
              >
                {arrival.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>

              <button
                type="button"
                onClick={() => onDelete(arrival._id)}
                className="admin-icon-btn-sm admin-icon-btn-danger"
                aria-label="Delete arrival"
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

export default ArrivalTable;
