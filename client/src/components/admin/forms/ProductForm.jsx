// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllCategories } from "../../../redux/slice/categorySlice";

// const emptyProduct = {
//   name: "",
//   sku: "",
//   description: "",
//   price: "",
//   category: "",
//   stock: "",
//   images: [],
// };

// function ProductForm({
//   initialValues,
//   onSubmit,
//   submitLabel = "Save Product",
// }) {
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const dispatch = useDispatch();
//   const { list: categories } = useSelector((state) => state.categories);
//   const [form, setForm] = useState({
//     ...emptyProduct,
//     ...initialValues,
//     category: initialValues?.category || "",
//   });
//   const [newImages, setNewImages] = useState([]);

//   useEffect(() => {
//     dispatch(fetchAllCategories());
//   }, [dispatch]);

//   // If initialValues arrive after first render (e.g. edit page still
//   // loading the product), sync the form once they're available.

//   useEffect(() => {
//     if (initialValues) {
//       setForm({
//         ...emptyProduct,
//         ...initialValues,
//         category: initialValues?.category || "",
//         images: initialValues.images || [],
//       });

//       setNewImages([]);
//     }
//   }, [initialValues]);

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   }

//   function handleImageChange(e) {
//     const files = Array.from(e.target.files);

//     setNewImages(files);

//     setImagePreviews(files.map((file) => URL.createObjectURL(file)));
//   }

//   // Existing images from database
//   const existingImages = Array.isArray(form.images)
//     ? form.images
//     : form.images
//       ? [form.images]
//       : [];

//   const imagesToDisplay =
//     imagePreviews.length > 0 ? imagePreviews : existingImages;

//   function handleSubmit(e) {
//     e.preventDefault();

//     const formData = new FormData();

//     formData.append("name", form.name);
//     formData.append("sku", form.sku);
//     formData.append("description", form.description);
//     formData.append("price", Number(form.price));
//     formData.append("stock", Number(form.stock));
//     formData.append("category", form.category);

//     newImages.forEach((image) => {
//       formData.append("images", image);
//     });

//     onSubmit(formData);
//   }

//   return (
//     <form onSubmit={handleSubmit} className="admin-form">
//       <div className="row g-3">
//         <div className="col-12 col-md-6">
//           <label className="form-label small">Product Name</label>
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             required
//             className="form-control admin-input"
//           />
//         </div>

//         <div className="col-12 col-md-6">
//           <label className="form-label small">SKU</label>
//           <input
//             name="sku"
//             value={form.sku}
//             onChange={handleChange}
//             required
//             className="form-control admin-input"
//           />
//         </div>

//         <div className="col-12">
//           <label className="form-label small">Description</label>
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             rows={4}
//             required
//             className="form-control admin-input"
//           />
//         </div>

//         <div className="col-12 col-md-4">
//           <label className="form-label small">Price (₦)</label>
//           <input
//             type="number"
//             name="price"
//             value={form.price}
//             onChange={handleChange}
//             min="0"
//             required
//             className="form-control admin-input"
//           />
//         </div>

//         <div className="col-12 col-md-4">
//           <label className="form-label small">Stock</label>
//           <input
//             type="number"
//             name="stock"
//             value={form.stock}
//             onChange={handleChange}
//             min="0"
//             required
//             className="form-control admin-input"
//           />
//         </div>

//         <div className="col-12 col-md-4">
//           <label className="form-label small">Category</label>
//           <select
//             name="category"
//             value={form.category}
//             onChange={handleChange}
//             required
//             className="form-select admin-input"
//           >
//             <option value="">Select category</option>
//             {categories.map((category) => (
//               <option key={category._id} value={category._id}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="col-12">
//           <label className="form-label small">Product Images</label>

//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={handleImageChange}
//             className="form-control admin-input"
//           />

//           {imagesToDisplay.length > 0 && (
//             <div className="d-flex flex-wrap gap-3 mt-3">
//               {imagesToDisplay.map((image, index) => (
//                 <img
//                   key={
//                     typeof image === "string" ? index : image.public_id || index
//                   }
//                   src={typeof image === "string" ? image : image.url}
//                   alt={`Product ${index + 1}`}
//                   style={{
//                     width: "100px",
//                     height: "100px",
//                     objectFit: "cover",
//                     borderRadius: "8px",
//                     border: "1px solid #ddd",
//                   }}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <button type="submit" className="btn btn-danger mt-4">
//         {submitLabel}
//       </button>
//     </form>
//   );
// }

// export default ProductForm;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Plus } from "lucide-react";
import { fetchAllCategories } from "../../../redux/slice/categorySlice";
import { Link } from "react-router-dom";

const emptyProduct = {
  name: "",
  sku: "",
  short_description: "",
  long_description: "",
  price: "",
  category: "",
  stock: "",
  images: [],
  sizes: [],
  colors: [],
};

const PRESET_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

function ProductForm({
  initialValues,
  onSubmit,
  submitLabel = "Save Product",
}) {
  const dispatch = useDispatch();
  const { list: categories } = useSelector((state) => state.categories);

  const [form, setForm] = useState({
    ...emptyProduct,
    ...initialValues,
    category: initialValues?.category || "",
  });

  // Existing images (from DB) that the user hasn't removed yet
  const [existingImages, setExistingImages] = useState(
    initialValues?.images || [],
  );
  // Newly selected files (not yet uploaded)
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);

  const [colorInput, setColorInput] = useState({ name: "", hex: "#000000" });

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (initialValues) {
      setForm({
        ...emptyProduct,
        ...initialValues,
        category: initialValues?.category || "",
        sizes: initialValues.sizes || [],
        colors: initialValues.colors || [],
      });
      setExistingImages(initialValues.images || []);
      setNewImageFiles([]);
      setNewImagePreviews([]);
    }
  }, [initialValues]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // --- Gallery handlers ---
  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    setNewImageFiles((prev) => [...prev, ...files]);
    setNewImagePreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
    e.target.value = ""; // allow re-selecting the same file again if removed
  }

  function removeExistingImage(public_id) {
    setExistingImages((prev) =>
      prev.filter((img) => img.public_id !== public_id),
    );
  }

  function removeNewImage(index) {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
  }

  // --- Sizes handlers ---
  function toggleSize(size) {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  }

  // --- Colors handlers ---
  function addColor() {
    if (!colorInput.name.trim()) return;
    setForm((prev) => ({ ...prev, colors: [...prev.colors, colorInput] }));
    setColorInput({ name: "", hex: "#000000" });
  }

  function removeColor(index) {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("sku", form.sku);
    formData.append("short_description", form.short_description);
    formData.append("long_description", form.long_description);
    formData.append("price", Number(form.price));
    formData.append("stock", Number(form.stock));
    formData.append("category", form.category);
    formData.append("sizes", JSON.stringify(form.sizes));
    formData.append("colors", JSON.stringify(form.colors));

    // which existing images to keep (edit mode only — ignored on create)
    formData.append(
      "keepImages",
      JSON.stringify(existingImages.map((img) => img.public_id)),
    );

    newImageFiles.forEach((file) => {
      formData.append("images", file);
    });

    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label className="form-label small">Product Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="form-control admin-input"
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label small">SKU</label>
          <input
            name="sku"
            value={form.sku}
            onChange={handleChange}
            required
            className="form-control admin-input"
          />
        </div>

        <div className="col-12">
          <label className="form-label small">Short Description</label>
          <textarea
            name="short_description"
            value={form.short_description}
            onChange={handleChange}
            rows={4}
            required
            className="form-control admin-input"
          />
        </div>

        <div className="col-12">
          <label className="form-label small">Detailed Description</label>
          <textarea
            name="long_description"
            value={form.long_description}
            onChange={handleChange}
            rows={4}
            required
            className="form-control admin-input"
          />
        </div>

        <div className="col-12 col-md-4">
          <label className="form-label small">Price (₦)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            min="0"
            required
            className="form-control admin-input"
          />
        </div>

        <div className="col-12 col-md-4">
          <label className="form-label small">Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            min="0"
            required
            className="form-control admin-input"
          />
        </div>

        <div className="col-12 col-md-4">
          <label className="form-label small">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="form-select admin-input"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* --- Sizes --- */}
        <div className="col-12">
          <label className="form-label small">Available Sizes</label>
          <div className="d-flex flex-wrap gap-2">
            {PRESET_SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`btn btn-sm rounded-circle d-flex align-items-center justify-content-center ${
                  form.sizes.includes(size)
                    ? "btn-danger"
                    : "btn-outline-secondary"
                }`}
                style={{ width: 36, height: 36 }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* --- Colors --- */}
        <div className="col-12">
          <label className="form-label small">Available Colours</label>

          <div className="d-flex flex-wrap gap-2 mb-2">
            {form.colors.map((color, index) => (
              <span
                key={index}
                className="d-inline-flex align-items-center gap-2 border rounded-pill px-2 py-1"
              >
                <span
                  className="rounded-circle"
                  style={{
                    width: 16,
                    height: 16,
                    backgroundColor: color.hex,
                    display: "inline-block",
                    border: "1px solid #ddd",
                  }}
                />
                <span className="small">{color.name}</span>
                <button
                  type="button"
                  onClick={() => removeColor(index)}
                  className="btn btn-sm p-0 border-0 bg-transparent d-flex align-items-center"
                  aria-label={`Remove ${color.name}`}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>

          <div className="d-flex gap-2 align-items-center">
            <input
              type="text"
              placeholder="Colour name (e.g. Blue)"
              value={colorInput.name}
              onChange={(e) =>
                setColorInput((prev) => ({ ...prev, name: e.target.value }))
              }
              className="form-control admin-input"
              style={{ maxWidth: 220 }}
            />
            <input
              type="color"
              value={colorInput.hex}
              onChange={(e) =>
                setColorInput((prev) => ({ ...prev, hex: e.target.value }))
              }
              className="form-control form-control-color"
              style={{ width: 48, height: 38, padding: 2 }}
            />
            <button
              type="button"
              onClick={addColor}
              className="btn btn-outline-danger d-flex align-items-center gap-1"
            >
              <Plus size={14} />
              Add
            </button>
          </div>
        </div>

        {/* --- Image Gallery --- */}
        <div className="col-12">
          <label className="form-label small">Product Images</label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="form-control admin-input"
          />

          {(existingImages.length > 0 || newImagePreviews.length > 0) && (
            <div className="d-flex flex-wrap gap-3 mt-3">
              {existingImages.map((image) => (
                <div key={image.public_id} className="position-relative">
                  <img
                    src={image.url}
                    alt="Product"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(image.public_id)}
                    className="btn btn-danger btn-sm rounded-circle position-absolute d-flex align-items-center justify-content-center p-0"
                    style={{ width: 22, height: 22, top: -8, right: -8 }}
                    aria-label="Remove image"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}

              {newImagePreviews.map((preview, index) => (
                <div key={index} className="position-relative">
                  <img
                    src={preview}
                    alt={`New upload ${index + 1}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="btn btn-danger btn-sm rounded-circle position-absolute d-flex align-items-center justify-content-center p-0"
                    style={{ width: 22, height: 22, top: -8, right: -8 }}
                    aria-label="Remove image"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="d-flex gap-3 mt-4">
        <button type="submit" className="btn btn-danger">
          {submitLabel}
        </button>
        <Link to="/admin/products" className="btn btn-outline-secondary">
          Cancel
        </Link>
      </div>
    </form>
  );
}

export default ProductForm;
