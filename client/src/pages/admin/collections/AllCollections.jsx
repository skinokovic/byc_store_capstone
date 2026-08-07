import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import CollectionTable from "../../../components/admin/tables/CollectionTable";
import {
  fetchCollections,
  deleteCollection,
  toggleCollectionActive,
} from "../../../services/collectionApi";
import { toast } from "react-toastify";

function AllCollections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadCollections() {
    try {
      setLoading(true);
      const data = await fetchCollections(false); // all, not just active
      setCollections(data);
    } catch (err) {
      toast.error("Failed to load collections", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCollections();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this collection?")) return;

    try {
      await deleteCollection(id);

      setCollections((prev) => prev.filter((c) => c._id !== id));
      toast.success("Collection deleted successfully");
    } catch (err) {
      toast.error("Failed to delete collection", err);
    }
  }

  async function handleToggleActive(id, currentActive) {
    try {
      const updated = await toggleCollectionActive(id, !currentActive);
      setCollections((prev) => prev.map((c) => (c._id === id ? updated : c)));
      toast.success(
        updated.isActive ? "Collection activated" : "Collection deactivated",
      );
    } catch (err) {
      toast.error("Failed to update status", err);
    }
  }

  return (
    <div className="admin-page">
      <div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center gap-2 mb-4">
        <h4 className="mb-0">All Collections</h4>

        <Link
          to="/admin/collections/create"
          className="btn btn-danger btn-sm d-inline-flex align-items-center justify-content-center gap-1"
        >
          <Plus size={16} />
          Add Collection
        </Link>
      </div>

      {loading ? (
        <p className="text-secondary">Loading collections...</p>
      ) : (
        <CollectionTable
          collections={collections}
          onDelete={handleDelete}
          onToggleActive={handleToggleActive}
        />
      )}
    </div>
  );
}

export default AllCollections;
