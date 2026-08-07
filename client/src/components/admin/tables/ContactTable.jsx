import { Link } from "react-router-dom";
import { Trash2, Eye } from "lucide-react";
// import Avatar from "../Avatar";

function ContactTable({ messages, onDelete, currentUserId }) {
  if (messages.length === 0) {
    return <p className="text-secondary">No Messages yet.</p>;
  }

  return (
    <>
      {/* Table - md and up */}
      <div className="table-responsive d-none d-md-block">
        <table className="table admin-table-lg align-middle mb-0">
          <thead>
            <tr>
              <th>Phone Number</th>
              <th>Email Address</th>
              <th>Message</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message._id}>
                <td>{message.phone}</td>
                <td>{message.email}</td>
                <td> {message.notes}</td>
                <td>
                  {" "}
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
                  <div className="d-flex justify-content-end gap-2">
                    <Link
                      to={`/admin/messages/${message._id}`}
                      className="admin-icon-btn-sm"
                      aria-label="View Message"
                    >
                      <Eye size={14} />
                    </Link>
                    <button
                      onClick={() => onDelete(message._id)}
                      className="btn btn-sm btn-danger"
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
        {messages.map((message) => (
          <div className="admin-row-card" key={message._id}>
            <div className="d-flex gap-3 align-items-center">
              {/* <Avatar src={user.avatar} name={user.name} size={44} /> */}
              <div className="flex-grow-1 min-w-0">
                <p className=" mb-0 text-truncate">
                  <span className="fw-semibold">Phone: </span>
                  {message.phone}
                </p>
                <p className="text-white small mb-0 text-truncate">
                  <span className="fw-semibold">Email: </span>
                  {message.email}
                </p>
                <p className="text-white small mb-0 text-truncate">
                  <span className="fw-semibold">Message: </span> {message.notes}
                </p>
              </div>
            </div>

            <div className="d-flex gap-2 mt-3">
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

            <div className="d-flex justify-content-end gap-2 mt-3 pt-3 border-top admin-row-card-border">
              <Link
                to={`/admin/messages/${message._id}`}
                className="admin-icon-btn-sm"
                aria-label="View Message"
              >
                <Eye size={14} />
              </Link>

              <button
                onClick={() => onDelete(message._id)}
                className="btn btn-sm btn-danger"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ContactTable;
