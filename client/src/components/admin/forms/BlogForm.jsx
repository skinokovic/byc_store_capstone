import { useEffect, useState } from "react";

const emptyBlog = {
  title: "",
  excerpt: "",
  content: "",
  views: 0,
  likes: 0,
  order: 0,
  isActive: true,
};

function BlogForm({ initialValues, onSubmit, submitLabel = "Save Blog" }) {
  const [form, setForm] = useState({ ...emptyBlog, ...initialValues });

  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(
    initialValues?.coverImage?.url || "",
  );

  // sync form once initialValues arrive (edit page may still be loading)
  useEffect(() => {
    if (!initialValues) return;

    setForm({ ...emptyBlog, ...initialValues });
    setCoverPreview(initialValues.coverImage?.url || "");
    setCoverImageFile(null);
  }, [initialValues]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleCoverImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setCoverImageFile(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData();

    fd.append("title", form.title);
    fd.append("excerpt", form.excerpt);
    fd.append("content", form.content);
    fd.append("views", form.views);
    fd.append("likes", form.likes);
    fd.append("order", form.order);
    fd.append("isActive", form.isActive);

    if (coverImageFile) fd.append("coverImage", coverImageFile);

    onSubmit(fd);
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="row g-3">
        <div className="col-12">
          <label className="form-label small">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="form-control admin-input"
            placeholder="How important are clothes in your style?"
          />
        </div>

        <div className="col-12">
          <label className="form-label small">Excerpt</label>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            rows={2}
            required
            className="form-control admin-input"
            placeholder="Short teaser shown on the blog card"
          />
        </div>

        <div className="col-12">
          <label className="form-label small">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={10}
            required
            className="form-control admin-input"
            placeholder="Full blog post body"
          />
        </div>

        <div className="col-12 col-md-4">
          <label className="form-label small">Views</label>
          <input
            type="number"
            name="views"
            value={form.views}
            onChange={handleChange}
            min="0"
            className="form-control admin-input"
          />
        </div>

        <div className="col-12 col-md-4">
          <label className="form-label small">Likes</label>
          <input
            type="number"
            name="likes"
            value={form.likes}
            onChange={handleChange}
            min="0"
            className="form-control admin-input"
          />
        </div>

        <div className="col-12 col-md-4">
          <label className="form-label small">Display Order</label>
          <input
            type="number"
            name="order"
            value={form.order}
            onChange={handleChange}
            className="form-control admin-input"
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

        <div className="col-12 col-md-6">
          <label className="form-label small">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            className="form-control admin-input"
          />

          {coverPreview && (
            <img
              src={coverPreview}
              alt="Cover preview"
              className="img-fluid rounded border mt-3"
              style={{ height: 200, width: "100%", objectFit: "cover" }}
            />
          )}
        </div>
      </div>

      <button type="submit" className="btn btn-danger mt-4">
        {submitLabel}
      </button>
    </form>
  );
}

export default BlogForm;
