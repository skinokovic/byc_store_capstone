import { useNavigate } from "react-router-dom";
// import ArrivalForm from "";
import { createArrival } from "../../../services/arrivals";
import NewArrivalForm from "../../../components/admin/forms/NewArrivalForm";
import { useState } from "react";
import { toast } from "react-toastify";

function CreateNewArrival() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  async function handleSubmit(formData) {
    try {
      setLoading(true);
      await createArrival(formData);
      toast.success("New Arrival created successfully");
      navigate("/admin/arrivals");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create arrival");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-page">
      <h4 className="mb-4">Add New Arrival</h4>

      <NewArrivalForm
        onSubmit={handleSubmit}
        submitLabel={loading ? "Creating" : "Create Arrival"}
      />
    </div>
  );
}

export default CreateNewArrival;
