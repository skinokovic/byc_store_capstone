import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// adjust this import path/action name to match your categories slice
import { fetchCategories } from "../../../redux/slice/categorySlice";

const emptyArrival = {
  title: "",
  subtitle: "",

  category: "",

  order: 0,

  isActive: true,

  image: null,
};

function NewArrivalForm({
  initialValues,
  onSubmit,
  submitLabel = "Save Arrival",
}) {
  const [form, setForm] = useState(emptyArrival);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.list);

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!initialValues) return;

    setForm({
      ...emptyArrival,
      ...initialValues,
      category: initialValues.category?._id || initialValues.category || "",
    });

    setPreview(initialValues.image?.url || "");
  }, [initialValues]);

  // only fetch if the store doesn't already have categories loaded
  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories, dispatch]);

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

    fd.append("category", form.category);

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
            placeholder="Men Underwears"
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
            placeholder="Fashionist Versatile Elani"
          />
        </div>

        <div className="col-md-6">
          <label>Category</label>

          <select
            className="form-select"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>

            {(categories || []).map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
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

export default NewArrivalForm;
