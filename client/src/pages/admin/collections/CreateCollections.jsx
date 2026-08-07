import { useNavigate } from "react-router-dom";
import CollectionForm from "../../../components/admin/forms/CollectionForm";
import { createCollection } from "../../../services/collectionApi";
import { toast } from "react-toastify";
import { useState } from "react";

function CreateCollection() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  async function handleSubmit(formData) {
    try {
      setLoading(true);
      await createCollection(formData);
      toast.success("Collection created successfully");

      navigate("/admin/collections");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create collection");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-page">
      <h4 className="mb-4">Add New Collection</h4>

      <CollectionForm
        onSubmit={handleSubmit}
        submitLabel={loading ? "Processing..." : "Create Collection"}
      />
    </div>
  );
}

export default CreateCollection;
