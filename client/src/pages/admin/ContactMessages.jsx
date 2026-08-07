import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import AdminHeader from "../../components/admin/AdminHeader";
import ContactTable from "../../components/admin/tables/ContactTable";

import { getMessageApi, deleteMessageApi } from "../../services/contactApi";

function ContactMessages() {
  //   const { user: currentUser } = useSelector((state) => state.auth);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      setLoading(true);

      const data = await getMessageApi();

      setMessages(data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load messages");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this message?")) return;

    try {
      await deleteMessageApi(id);

      setMessages((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert(err.response?.data?.message);
    }
  }

  return (
    <>
      <AdminHeader
        title="Customer Messages"
        subtitle="Manage customer enquiries"
      />

      <div className="admin-card">
        <p className="small text-secondary mb-3">{messages.length} Messages</p>

        {loading && <p>Loading...</p>}

        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && (
          <ContactTable
            messages={messages}
            onDelete={handleDelete}
            // currentUserId={currentUser?._id}
          />
        )}
      </div>
    </>
  );
}

export default ContactMessages;
