import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import NewArrivalForm from "../../../components/admin/forms/NewArrivalForm";
import { fetchArrivalById, updateArrival } from "../../../services/arrivals";

function EditHomeArrival() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [arrival, setArrival] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArrival() {
      try {
        const data = await fetchArrivalById(id);
        setArrival(data);
      } catch (err) {
        console.error("Failed to load arrival", err);
      } finally {
        setLoading(false);
      }
    }

    loadArrival();
  }, [id]);

  async function handleSubmit(formData) {
    try {
      await updateArrival(id, formData);
      navigate("/admin/arrivals");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update arrival");
    }
  }

  return (
    <div className="admin-page">
      <div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center gap-2 mb-4">
        <div>
          <Link
            to="/admin/arrivals"
            className="d-inline-flex align-items-center gap-1 text-secondary text-decoration-none small mb-1"
          >
            <ArrowLeft size={14} />
            Back to Arrivals
          </Link>

          <h4 className="mb-0">Edit Arrival</h4>
        </div>
      </div>

      {loading ? (
        <p className="text-secondary">Loading...</p>
      ) : !arrival ? (
        <p className="text-secondary">Arrival not found.</p>
      ) : (
        <NewArrivalForm
          initialValues={arrival}
          onSubmit={handleSubmit}
          submitLabel="Update Arrival"
        />
      )}
    </div>
  );
}

export default EditHomeArrival;
