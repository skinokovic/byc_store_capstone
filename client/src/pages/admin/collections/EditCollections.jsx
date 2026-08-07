import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CollectionForm from "../../../components/admin/forms/CollectionForm";
import {
  fetchCollectionById,
  updateCollection,
} from "../../../services/collectionApi";
import { toast } from "react-toastify";

function EditCollection() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCollection() {
      try {
        const data = await fetchCollectionById(id);
        setCollection(data);
      } catch (err) {
        toast.error("Failed to load collection", err);
      } finally {
        setLoading(false);
      }
    }

    loadCollection();
  }, [id]);

  async function handleSubmit(formData) {
    try {
      await updateCollection(id, formData);
      toast.success("Collection updated successfully");
      navigate("/admin/collections");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update collection");
    }
  }

  if (loading) return <p className="text-secondary">Loading...</p>;
  if (!collection)
    return <p className="text-secondary">Collection not found.</p>;

  return (
    <div className="admin-page">
      <h4 className="mb-4">Edit Collection</h4>

      <CollectionForm
        initialValues={collection}
        onSubmit={handleSubmit}
        submitLabel={loading ? "Precessing..." : "Update Collection"}
      />
    </div>
  );
}

export default EditCollection;
