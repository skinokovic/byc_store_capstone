import { useEffect, useState } from "react";

const emptySlider = {
  title: "",
  subtitle: "",
  description: "",

  animatedWords: [],

  primaryText: "Shop Now",
  primaryLink: "/shop",

  secondaryText: "Learn More",
  secondaryLink: "/about",

  duration: 5000,

  order: 0,

  isActive: true,

  images: {
    left: null,
    center: null,
    right: null,
  },
};

function HeroSliderForm({
  initialValues,

  onSubmit,

  submitLabel = "Save Slider",
}) {
  const [form, setForm] = useState(emptySlider);

  const [wordInput, setWordInput] = useState("");

  const [previews, setPreviews] = useState({
    left: "",
    center: "",
    right: "",
  });

  useEffect(() => {
    if (!initialValues) return;

    setForm({
      ...emptySlider,
      ...initialValues,
    });

    setPreviews({
      left: initialValues.images?.left?.url || "",
      center: initialValues.images?.center?.url || "",
      right: initialValues.images?.right?.url || "",
    });
  }, [initialValues]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleImageChange(e) {
    const { name } = e.target;

    const file = e.target.files[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,

      images: {
        ...prev.images,

        [name]: file,
      },
    }));

    setPreviews((prev) => ({
      ...prev,

      [name]: URL.createObjectURL(file),
    }));
  }

  function addWord() {
    if (!wordInput.trim()) return;

    setForm((prev) => ({
      ...prev,

      animatedWords: [...prev.animatedWords, wordInput],
    }));

    setWordInput("");
  }

  function removeWord(index) {
    setForm((prev) => ({
      ...prev,

      animatedWords: prev.animatedWords.filter((_, i) => i !== index),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData();

    fd.append("title", form.title);

    fd.append("subtitle", form.subtitle);

    fd.append("description", form.description);

    fd.append("animatedWords", JSON.stringify(form.animatedWords));

    fd.append("primaryText", form.primaryText);

    fd.append("primaryLink", form.primaryLink);

    fd.append("secondaryText", form.secondaryText);

    fd.append("secondaryLink", form.secondaryLink);

    fd.append("duration", form.duration);

    fd.append("order", form.order);

    fd.append("isActive", form.isActive);

    if (form.images.left instanceof File) fd.append("left", form.images.left);

    if (form.images.center instanceof File)
      fd.append("center", form.images.center);

    if (form.images.right instanceof File)
      fd.append("right", form.images.right);

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
          />
        </div>
        <div className="col-12">
          <label>Description</label>

          <textarea
            rows="5"
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label>Animated Words</label>

          <div className="d-flex gap-2">
            <input
              className="form-control"
              value={wordInput}
              onChange={(e) => setWordInput(e.target.value)}
            />

            <button type="button" className="btn btn-danger" onClick={addWord}>
              Add
            </button>
          </div>

          <div className="mt-3">
            {form.animatedWords.map((word, index) => (
              <span
                key={index}
                className="badge bg-dark me-2"
                style={{ cursor: "pointer" }}
                onClick={() => removeWord(index)}
              >
                {word}×
              </span>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <label>Primary Button Text</label>

          <input
            className="form-control"
            name="primaryText"
            value={form.primaryText}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label>Primary Button Link</label>

          <input
            className="form-control"
            name="primaryLink"
            value={form.primaryLink}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label>Secondary Button Text</label>

          <input
            className="form-control"
            name="secondaryText"
            value={form.secondaryText}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label>Secondary Button Link</label>

          <input
            className="form-control"
            name="secondaryLink"
            value={form.secondaryLink}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label>Duration (ms)</label>

          <input
            type="number"
            className="form-control"
            name="duration"
            value={form.duration}
            onChange={handleChange}
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
        {["left", "center", "right"].map((side) => (
          <div className="col-md-4" key={side}>
            <label>{side.toUpperCase()} Image</label>

            <input
              type="file"
              name={side}
              accept="image/*"
              className="form-control"
              onChange={handleImageChange}
            />

            {previews[side] && (
              <img
                src={previews[side]}
                className="img-fluid rounded border mt-3"
                style={{
                  height: 250,

                  width: "100%",

                  objectFit: "cover",
                }}
              />
            )}
          </div>
        ))}
        <div className="col-12">
          <button className="btn btn-danger" type="submit">
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}

export default HeroSliderForm;
