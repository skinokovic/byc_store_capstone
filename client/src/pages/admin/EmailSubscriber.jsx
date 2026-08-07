import { useEffect, useState } from "react";

import AdminHeader from "../../components/admin/AdminHeader";

import {
  getSubscribersApi,
  deleteSubscriberApi,
} from "../../services/newsletterApi";
import SubscriberTable from "../../components/admin/tables/SubscriberTable";
import Pagination from "../../components/common/Pagination";
import usePagination from "../../components/hooks/usePagination";

function EmailSubscriber() {
  const [email, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const {
    paginatedItems: paginatedEmail,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    goToPage,
  } = usePagination(email, 5);

  async function fetchSubscribers() {
    try {
      setLoading(true);

      const data = await getSubscribersApi();

      setEmails(data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load messages");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this message?")) return;

    try {
      await deleteSubscriberApi(id);

      setEmails((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert(err.response?.data?.message);
    }
  }

  return (
    <>
      <AdminHeader title="Email Subscribers" subtitle="Manage subscribers" />

      <div className="admin-card">
        <p className="small text-secondary mb-3">
          {email.length} {email.length > 1 ? "Subscribers" : "Subscriber"}{" "}
        </p>

        {loading && <p>Loading...</p>}

        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && (
          <SubscriberTable emails={paginatedEmail} onDelete={handleDelete} />
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          totalItems={totalItems}
          pageSize={pageSize}
        />
      </div>
    </>
  );
}

export default EmailSubscriber;
