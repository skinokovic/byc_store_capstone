import { Link } from "react-router-dom";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";

function BlogTable({ blogs = [], onDelete, onToggleActive }) {
  if (blogs.length === 0) {
    return <p className="text-secondary">No blog posts yet.</p>;
  }

  return (
    <>
      {/* Table - md and up */}
      <div className="table-responsive d-none d-md-block">
        <table className="table admin-table-lg align-middle mb-0">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Views</th>
              <th>Likes</th>
              <th>Order</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td>
                  <img
                    src={blog.coverImage?.url}
                    alt={blog.title}
                    style={{
                      width: 56,
                      height: 48,
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                  />
                </td>

                <td>
                  <p className="fw-semibold mb-0" style={{ maxWidth: 260 }}>
                    {blog.title}
                  </p>
                </td>

                <td>
                  <div className="d-flex align-items-center gap-2">
                    {blog.author?.avatar && (
                      <img
                        src={blog.author.avatar}
                        alt={blog.author.name}
                        className="rounded-circle"
                        style={{ width: 28, height: 28, objectFit: "cover" }}
                      />
                    )}
                    <span className="small">{blog.author?.name}</span>
                  </div>
                </td>

                <td>{blog.views}</td>
                <td>{blog.likes}</td>
                <td>{blog.order}</td>

                <td>
                  <span
                    className={`badge ${
                      blog.isActive ? "text-bg-success" : "text-bg-secondary"
                    }`}
                  >
                    {blog.isActive ? "Active" : "Deactivated"}
                  </span>
                </td>

                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <Link
                      to={`/admin/blogs/edit/${blog._id}`}
                      className="admin-icon-btn-sm"
                      aria-label="Edit blog post"
                    >
                      <Pencil size={14} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => onToggleActive(blog._id, blog.isActive)}
                      className="admin-icon-btn-sm"
                      aria-label={
                        blog.isActive
                          ? "Deactivate blog post"
                          : "Activate blog post"
                      }
                      title={blog.isActive ? "Deactivate" : "Activate"}
                    >
                      {blog.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(blog._id)}
                      className="admin-icon-btn-sm admin-icon-btn-danger"
                      aria-label="Delete blog post"
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
        {blogs.map((blog) => (
          <div className="admin-row-card" key={blog._id}>
            <img
              src={blog.coverImage?.url}
              alt={blog.title}
              className="mb-3"
              style={{
                width: "100%",
                height: 140,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />

            <p className="fw-semibold mb-1">{blog.title}</p>

            <div className="d-flex align-items-center gap-2 mb-2">
              {blog.author?.avatar && (
                <img
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  className="rounded-circle"
                  style={{ width: 24, height: 24, objectFit: "cover" }}
                />
              )}
              <span className="text-secondary small">{blog.author?.name}</span>
            </div>

            <div className="admin-table small mt-3">
              <div className="d-flex justify-content-between py-1 border-bottom admin-row-card-border">
                <span className="text-secondary">Views / Likes</span>
                <span>
                  {blog.views} / {blog.likes}
                </span>
              </div>

              <div className="d-flex justify-content-between py-1">
                <span className="text-secondary">Order</span>
                <span>{blog.order}</span>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <span
                className={`badge ${
                  blog.isActive ? "text-bg-success" : "text-bg-secondary"
                }`}
              >
                {blog.isActive ? "Active" : "Deactivated"}
              </span>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-3 pt-3 border-top admin-row-card-border">
              <Link
                to={`/admin/blogs/edit/${blog._id}`}
                className="admin-icon-btn-sm"
                aria-label="Edit blog post"
              >
                <Pencil size={14} />
              </Link>

              <button
                type="button"
                onClick={() => onToggleActive(blog._id, blog.isActive)}
                className="admin-icon-btn-sm"
                aria-label={
                  blog.isActive ? "Deactivate blog post" : "Activate blog post"
                }
              >
                {blog.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>

              <button
                type="button"
                onClick={() => onDelete(blog._id)}
                className="admin-icon-btn-sm admin-icon-btn-danger"
                aria-label="Delete blog post"
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

export default BlogTable;
