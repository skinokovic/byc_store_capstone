import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminHeader from "../../../components/admin/AdminHeader";
import HeroSliderForm from "../../../components/admin/forms/HeroSliderForm";

import { createSliderApi } from "../../../services/heroSliderApi";
import { toast } from "react-toastify";

function CreateHeroSlider() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(formData) {
    try {
      setLoading(true);

      setError("");

      await createSliderApi(formData);
      toast.success("Slider created successfully");
      navigate("/admin/sliders");
    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || "Failed to create slider");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <AdminHeader
        title="Create Hero Slider"
        subtitle="Create homepage slider"
      />

      <div className="admin-card">
        {error && <div className="alert alert-danger">{error}</div>}

        <HeroSliderForm
          onSubmit={handleSubmit}
          submitLabel={loading ? "Saving..." : "Create Slider"}
        />
      </div>
    </div>
  );
}

export default CreateHeroSlider;
