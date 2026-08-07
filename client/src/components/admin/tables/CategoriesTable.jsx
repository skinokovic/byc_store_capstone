import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

function CategoriesTable({ categories, onDelete }) {
  if (categories.length === 0) {
    return <p className="text-secondary">No categories yet.</p>;
  }

  return (
    <>
      {/* Table - md and up */}
      <div className="table-responsive d-none d-md-block">
        <table className="table admin-table-lg align-middle mb-0">
          <thead>
            <tr>
              <th>Category</th>
              <th>Type</th>
              <th>Slug</th>
              <th>Parent Category</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category.parentCategory ? "Subcategory" : "Parent"}</td>
                <td>{category.parentCategory?.name || "— (top-level)"}</td>
                <td>
                  <code className="text-secondary">{category.slug}</code>
                </td>
                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <Link
                      to={`/admin/categories/edit/${category._id}`}
                      className="admin-icon-btn-sm"
                      aria-label="Edit category"
                    >
                      <Pencil size={14} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => onDelete(category._id)}
                      className="admin-icon-btn-sm admin-icon-btn-danger"
                      aria-label="Delete category"
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
        {categories.map((category) => (
          <div className="admin-row-card" key={category._id}>
            <p className="fw-semibold mb-1">{category.name}</p>
            <p className="text-secondary small mb-1">
              <code className="text-secondary">{category.slug}</code>
            </p>
            <p className="text-secondary small mb-0">
              Parent: {category.parentCategory?.name || "— (top-level)"}
            </p>

            <div className="d-flex justify-content-end gap-2 mt-3 pt-3 border-top admin-row-card-border">
              <Link
                to={`/admin/categories/edit/${category._id}`}
                className="admin-icon-btn-sm"
                aria-label="Edit category"
              >
                <Pencil size={14} />
              </Link>
              <button
                type="button"
                onClick={() => onDelete(category._id)}
                className="admin-icon-btn-sm admin-icon-btn-danger"
                aria-label="Delete category"
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

export default CategoriesTable;
