import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getMessageByIdApi, updateMessageApi } from "../../services/contactApi";

function MessageDetails() {
  const { id } = useParams();

  const [message, setMessage] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessage();
  }, [id]);

  async function fetchMessage() {
    try {
      const data = await getMessageByIdApi(id);

      setMessage(data);

      // Automatically mark message as Read
      if (data.status === "new") {
        await updateMessageApi(id, {
          status: "read",
        });

        setMessage((prev) => ({
          ...prev,
          status: "read",
        }));
      }
    } finally {
      setLoading(false);
    }
  }

  async function markResolved() {
    await updateMessageApi(id, {
      status: "resolved",
    });

    setMessage((prev) => ({
      ...prev,
      status: "resolved",
    }));
  }

  if (loading) return <p>Loading...</p>;

  if (!message) return <p>Message not found.</p>;

  return (
    <div className="admin-card">
      <div className="d-flex justify-content-between align-items-center">
        <h4>Message Details</h4>

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
      <Link to="/admin/messages">
        <span>Back</span>
      </Link>
      <hr />

      <p>
        <strong>Phone:</strong> {message.phone}
      </p>

      <p>
        <strong>Email:</strong> {message.email}
      </p>

      <p>
        {" "}
        <strong>Message: </strong>
        {message.notes}
      </p>

      <p>
        <strong>Date:</strong> {new Date(message.createdAt).toLocaleString()}
      </p>

      <hr />

      {message.status !== "resolved" && (
        <button onClick={markResolved} className="btn btn-success mt-3">
          Mark as Resolved
        </button>
      )}
    </div>
  );
}

export default MessageDetails;
