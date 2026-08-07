import { useEffect, useState } from "react";

const emptyCollection = {
  title: "",
  subtitle: "",
  description: "",

  buttonText: "Explore",
  buttonLink: "/shop",

  order: 0,

  isActive: true,

  image: null,
};

function CollectionForm({
  initialValues,
  onSubmit,
  submitLabel = "Save Collection",
}) {
  const [form, setForm] = useState(emptyCollection);

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!initialValues) return;

    setForm({
      ...emptyCollection,
      ...initialValues,
    });

    setPreview(initialValues.image?.url || "");
  }, [initialValues]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,

      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData();

    fd.append("title", form.title);

    fd.append("subtitle", form.subtitle);

    fd.append("description", form.description);

    fd.append("buttonText", form.buttonText);

    fd.append("buttonLink", form.buttonLink);

    fd.append("order", form.order);

    fd.append("isActive", form.isActive);

    if (form.image instanceof File) fd.append("image", form.image);

    onSubmit(fd);
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="row g-4">
        <div className="col-md-6">
          <label>Title</label>

          <input
            className="form-control"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="BYC Collection"
            required
          />
        </div>

        <div className="col-md-6">
          <label>Subtitle</label>

          <input
            className="form-control"
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            placeholder="BYC Collection 2021"
          />
        </div>

        <div className="col-12">
          <label>Description</label>

          <textarea
            rows="4"
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="The best everyday option is a Super Team option within a reasonable price..."
          />
        </div>

        <div className="col-md-6">
          <label>Button Text</label>

          <input
            className="form-control"
            name="buttonText"
            value={form.buttonText}
            onChange={handleChange}
            placeholder="Explore"
          />
        </div>

        <div className="col-md-6">
          <label>Button Link</label>

          <input
            className="form-control"
            name="buttonLink"
            value={form.buttonLink}
            onChange={handleChange}
            placeholder="/shop"
          />
        </div>

        <div className="col-md-6">
          <label>Display Order</label>

          <input
            type="number"
            className="form-control"
            name="order"
            value={form.order}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />

            <label className="form-check-label">Active</label>
          </div>
        </div>

        <div className="col-md-4">
          <label>Image</label>

          <input
            type="file"
            name="image"
            accept="image/*"
            className="form-control"
            onChange={handleImageChange}
          />

          {preview && (
            <img
              src={preview}
              className="img-fluid rounded border mt-3"
              style={{
                height: 250,

                width: "100%",

                objectFit: "cover",
              }}
            />
          )}
        </div>

        <div className="col-12">
          <button className="btn btn-danger" type="submit">
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CollectionForm;
