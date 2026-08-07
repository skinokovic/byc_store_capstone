import { useEffect, useState } from "react";

import AdminHeader from "../../../components/admin/AdminHeader";

import HeroSliderTable from "../../../components/admin/tables/HeroSliderTable";

import {
  getSlidersApi,
  deleteSliderApi,
  updateSliderApi,
} from "../../../services/heroSliderApi";

function HeroSliderList() {
  const [sliders, setSliders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchSliders();
  }, []);

  async function fetchSliders() {
    try {
      setLoading(true);

      const data = await getSlidersApi();

      setSliders(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load sliders.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this slider?")) return;

    try {
      await deleteSliderApi(id);

      setSliders((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert("Delete failed.", err);
    }
  }

  async function handleToggleActive(id, current) {
    try {
      await updateSliderApi(id, {
        isActive: !current,
      });

      setSliders((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                isActive: !current,
              }
            : item,
        ),
      );
    } catch (err) {
      alert("Update failed.", err);
    }
  }

  return (
    <div className="px-3 px-md-4">
      <AdminHeader title="Hero Sliders" subtitle="Manage homepage sliders" />

      <div className="admin-card">
        {loading && <div className="text-center py-5">Loading...</div>}

        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <HeroSliderTable
            sliders={sliders}
            onDelete={handleDelete}
            onToggleActive={handleToggleActive}
          />
        )}
      </div>
    </div>
  );
}

export default HeroSliderList;
