import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import HomeArrivalTable from "../../../components/admin/tables/HomeArrivalTable";
import {
  fetchArrivals,
  deleteArrival,
  toggleArrivalActive,
} from "../../../services/arrivals";

function AllHomeArrivals() {
  const [arrivals, setArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadArrivals() {
    try {
      setLoading(true);
      const res = await fetchArrivals(false); // all, not just active
      setArrivals(res);
    } catch (err) {
      console.error("Failed to load arrivals", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadArrivals();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this arrival?")) return;

    try {
      await deleteArrival(id);
      setArrivals((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      alert("Failed to delete arrival", err);
    }
  }

  async function handleToggleActive(id, currentActive) {
    try {
      const res = await toggleArrivalActive(id, !currentActive);
      setArrivals((prev) => prev.map((a) => (a._id === id ? res : a)));
    } catch (err) {
      alert("Failed to update status", err);
    }
  }

  return (
    <div className="admin-page">
      <div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center gap-2 mb-4">
        <h4 className="mb-0">All Arrivals</h4>

        <Link
          to="/admin/arrivals/create"
          className="btn btn-danger btn-sm d-inline-flex align-items-center justify-content-center gap-1"
        >
          <Plus size={16} />
          Add Arrival
        </Link>
      </div>

      {loading ? (
        <p className="text-secondary">Loading arrivals...</p>
      ) : (
        <HomeArrivalTable
          arrivals={arrivals}
          onDelete={handleDelete}
          onToggleActive={handleToggleActive}
        />
      )}
    </div>
  );
}

export default AllHomeArrivals;
