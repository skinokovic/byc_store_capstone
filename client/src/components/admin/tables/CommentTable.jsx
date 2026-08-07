import { Link } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";

function truncate(text, max = 80) {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

function CommentTable({ comments = [], onDelete }) {
  if (comments.length === 0) {
    return <p className="text-secondary">No comments yet.</p>;
  }

  return (
    <>
      {/* Table - md and up */}
      <div className="table-responsive d-none d-md-block">
        <table className="table admin-table-lg align-middle mb-0">
          <thead>
            <tr>
              <th>Commenter</th>
              <th>Comment</th>
              <th>Blog Post</th>
              <th>Type</th>
              <th>Date</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {comments.map((comment) => (
              <tr key={comment._id}>
                <td>
                  <p className="fw-semibold mb-0">{comment.guestName}</p>
                  <p className="text-secondary small mb-0">
                    {comment.guestEmail}
                  </p>
                </td>

                <td style={{ maxWidth: 280 }}>{truncate(comment.content)}</td>

                <td>{comment.blog?.title || "—"}</td>

                <td>
                  <span
                    className={`badge ${
                      comment.parentComment
                        ? "text-bg-secondary"
                        : "text-bg-dark"
                    }`}
                  >
                    {comment.parentComment ? "Reply" : "Comment"}
                  </span>
                </td>

                <td className="small text-secondary">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </td>

                <td>
                  <div className="d-flex justify-content-end gap-2">
                    {comment.blog?.slug && (
                      <Link
                        to={`/blog/${comment.blog.slug}`}
                        className="admin-icon-btn-sm"
                        aria-label="View comment on blog post"
                        title="View on blog post"
                      >
                        <Eye size={14} />
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => onDelete(comment._id)}
                      className="admin-icon-btn-sm admin-icon-btn-danger"
                      aria-label="Delete comment"
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
        {comments.map((comment) => (
          <div className="admin-row-card" key={comment._id}>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <p className="fw-semibold mb-0">{comment.guestName}</p>
                <p className="text-secondary small mb-0">
                  {comment.guestEmail}
                </p>
              </div>

              <span
                className={`badge ${
                  comment.parentComment ? "text-bg-secondary" : "text-bg-dark"
                }`}
              >
                {comment.parentComment ? "Reply" : "Comment"}
              </span>
            </div>

            <p className="mb-2">{truncate(comment.content, 140)}</p>

            <div className="admin-table small mt-2">
              <div className="d-flex justify-content-between py-1 border-bottom admin-row-card-border">
                <span className="text-secondary">Blog Post</span>
                <span className="text-truncate ms-2">
                  {comment.blog?.title || "—"}
                </span>
              </div>

              <div className="d-flex justify-content-between py-1">
                <span className="text-secondary">Date</span>
                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-3 pt-3 border-top admin-row-card-border">
              {comment.blog?.slug && (
                <Link
                  to={`/blog/${comment.blog.slug}`}
                  className="admin-icon-btn-sm"
                  aria-label="View comment on blog post"
                >
                  <Eye size={14} />
                </Link>
              )}

              <button
                type="button"
                onClick={() => onDelete(comment._id)}
                className="admin-icon-btn-sm admin-icon-btn-danger"
                aria-label="Delete comment"
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

export default CommentTable;
