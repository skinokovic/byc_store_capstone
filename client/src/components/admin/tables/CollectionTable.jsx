import { Link } from "react-router-dom";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";

function CollectionTable({ collections = [], onDelete, onToggleActive }) {
  if (collections.length === 0) {
    return <p className="text-secondary">No collections yet.</p>;
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
              <th>Button</th>
              <th>Order</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {collections.map((item) => (
              <tr key={item._id}>
                <td>
                  <img
                    src={item.image?.url}
                    alt={item.title}
                    style={{
                      width: 48,
                      height: 56,
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                  />
                </td>

                <td>
                  <p className="fw-semibold mb-0">{item.title}</p>
                  <p className="text-secondary small mb-0">{item.subtitle}</p>
                </td>

                <td>
                  <div className="small text-secondary">
                    <div>
                      <span className="text-white">{item.buttonText}</span>
                    </div>
                    <div>{item.buttonLink}</div>
                  </div>
                </td>

                <td>{item.order}</td>

                <td>
                  <span
                    className={`badge ${
                      item.isActive ? "text-bg-success" : "text-bg-secondary"
                    }`}
                  >
                    {item.isActive ? "Active" : "Deactivated"}
                  </span>
                </td>

                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <Link
                      to={`/admin/collections/edit/${item._id}`}
                      className="admin-icon-btn-sm"
                      aria-label="Edit collection"
                    >
                      <Pencil size={14} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => onToggleActive(item._id, item.isActive)}
                      className="admin-icon-btn-sm"
                      aria-label={
                        item.isActive
                          ? "Deactivate collection"
                          : "Activate collection"
                      }
                      title={item.isActive ? "Deactivate" : "Activate"}
                    >
                      {item.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(item._id)}
                      className="admin-icon-btn-sm admin-icon-btn-danger"
                      aria-label="Delete collection"
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
        {collections.map((item) => (
          <div className="admin-row-card" key={item._id}>
            <div className="d-flex gap-1 mb-3">
              {item.image?.url ? (
                <img
                  src={item.image.url}
                  alt={item.title}
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

            <p className="fw-semibold mb-0">{item.title}</p>
            <p className="text-secondary small mb-0">{item.subtitle}</p>

            <div className="admin-table small mt-3">
              <div className="d-flex justify-content-between py-1 border-bottom admin-row-card-border">
                <span className="text-secondary">Button</span>
                <span className="text-truncate ms-2">{item.buttonText}</span>
              </div>

              <div className="d-flex justify-content-between py-1">
                <span className="text-secondary">Order</span>
                <span>{item.order}</span>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <span
                className={`badge ${
                  item.isActive ? "text-bg-success" : "text-bg-secondary"
                }`}
              >
                {item.isActive ? "Active" : "Deactivated"}
              </span>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-3 pt-3 border-top admin-row-card-border">
              <Link
                to={`/admin/collections/edit/${item._id}`}
                className="admin-icon-btn-sm"
                aria-label="Edit collection"
              >
                <Pencil size={14} />
              </Link>

              <button
                type="button"
                onClick={() => onToggleActive(item._id, item.isActive)}
                className="admin-icon-btn-sm"
                aria-label={
                  item.isActive
                    ? "Deactivate collection"
                    : "Activate collection"
                }
              >
                {item.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>

              <button
                type="button"
                onClick={() => onDelete(item._id)}
                className="admin-icon-btn-sm admin-icon-btn-danger"
                aria-label="Delete collection"
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

export default CollectionTable;
