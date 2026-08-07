import { Trash2 } from "lucide-react";
// import Avatar from "../Avatar";

function SubscriberTable({ emails, onDelete }) {
  if (emails.length === 0) {
    return <p className="text-secondary">No Subscribers yet.</p>;
  }

  return (
    <>
      {/* Table - md and up */}
      <div className="table-responsive d-none d-md-block">
        <table className="table admin-table-lg align-middle mb-0">
          <thead>
            <tr>
              <th>Email Address</th>

              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <tr key={email._id}>
                <td>{email.email}</td>

                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      onClick={() => onDelete(email._id)}
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
        {emails.map((email) => (
          <div className="admin-row-card" key={email._id}>
            <div className="d-flex gap-3 align-items-center">
              {/* <Avatar src={user.avatar} name={user.name} size={44} /> */}
              <div className="flex-grow-1 min-w-0">
                <p className="text-white small mb-0 text-truncate">
                  <span className="fw-semibold">Email: </span>
                  {email.email}
                </p>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-3 pt-3 border-top admin-row-card-border">
              <button
                onClick={() => onDelete(email._id)}
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

export default SubscriberTable;
