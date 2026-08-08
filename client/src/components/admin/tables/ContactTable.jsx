import { Link } from "react-router-dom";
import { Trash2, Eye } from "lucide-react";
import "./ContactTable.css";

function ContactTable({ messages, onDelete, currentUserId }) {
  if (messages.length === 0) {
    return <div>No Messages yet.</div>;
  }

  return (
    <>
      {/* =====================================================
          TABLE - MD AND UP
      ===================================================== */}
      <div className="d-none d-md-block">
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Phone Number</th>
                <th>Email Address</th>
                <th>Message</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {messages.map((message) => (
                <tr key={message._id}>
                  <td>{message.phone}</td>

                  <td>{message.email}</td>

                  <td>
                    <div className="text-truncate" style={{ maxWidth: 280 }}>
                      {message.notes}
                    </div>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        message.status === "new"
                          ? "bg-danger"
                          : message.status === "read"
                            ? "bg-warning text-dark"
                            : "bg-success"
                      }`}
                    >
                      {message.status}
                    </span>
                  </td>

                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Link
                        to={`/admin/messages/${message._id}`}
                        className="admin-icon-btn-sm"
                        aria-label="View Message"
                      >
                        <Eye size={14} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => onDelete(message._id)}
                        className="btn btn-sm btn-danger"
                        aria-label="Delete Message"
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
      </div>

      {/* =====================================================
          MOBILE CARDS
      ===================================================== */}
      <div className="d-md-none d-flex flex-column gap-3">
        {messages.map((message) => (
          <div className="admin-row-card contact-mobile-card" key={message._id}>
            {/* Contact Information */}
            <div className="contact-mobile-info">
              <div className="contact-mobile-field">
                <span className="contact-mobile-label">Phone</span>
                <span className="contact-mobile-value">{message.phone}</span>
              </div>

              <div className="contact-mobile-field">
                <span className="contact-mobile-label">Email</span>
                <span className="contact-mobile-value">{message.email}</span>
              </div>

              <div className="contact-mobile-field contact-mobile-message">
                <span className="contact-mobile-label">Message</span>

                <span className="contact-mobile-value">{message.notes}</span>
              </div>
            </div>

            {/* Status */}
            <div className="contact-mobile-status">
              <span className="contact-mobile-label">Status</span>

              <span
                className={`badge ${
                  message.status === "new"
                    ? "bg-danger"
                    : message.status === "read"
                      ? "bg-warning text-dark"
                      : "bg-success"
                }`}
              >
                {message.status}
              </span>
            </div>

            {/* Actions */}
            <div className="contact-mobile-actions">
              <Link
                to={`/admin/messages/${message._id}`}
                className="contact-mobile-action contact-mobile-view"
              >
                <Eye size={15} />
                <span>View</span>
              </Link>

              <button
                type="button"
                onClick={() => onDelete(message._id)}
                className="contact-mobile-action contact-mobile-delete"
              >
                <Trash2 size={15} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ContactTable;
