import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import AdminHeader from "../../../components/admin/AdminHeader";

import HeroSliderForm from "../../../components/admin/forms/HeroSliderForm";

import {
  getSliderByIdApi,
  updateSliderApi,
} from "../../../services/heroSliderApi";

function EditHeroSlider() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [slider, setSlider] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchSlider();
  }, []);

  async function fetchSlider() {
    try {
      setLoading(true);

      const data = await getSliderByIdApi(id);

      setSlider(data);
    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || "Failed to load slider");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(formData) {
    try {
      setSaving(true);

      setError("");

      await updateSliderApi(id, formData);

      navigate("/admin/sliders");
    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || "Failed to update slider");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Loading slider...</p>;
  }

  return (
    <div>
      <AdminHeader title="Edit Hero Slider" subtitle="Update homepage slider" />

      <div className="admin-card">
        {error && <div className="alert alert-danger">{error}</div>}

        <HeroSliderForm
          initialValues={slider}
          onSubmit={handleSubmit}
          submitLabel={saving ? "Updating..." : "Update Slider"}
        />
      </div>
    </div>
  );
}

export default EditHeroSlider;
