// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCategories } from "../../../redux/slice/categorySlice";

// const emptyCategory = {
//   name: "",
//   slug: "",
//   description: "",
//   image: "",
//   parentCategory: "",
// };

// function CategoryForm({
//   initialValues,
//   onSubmit,
//   submitLabel = "Save Category",
// }) {
//   const dispatch = useDispatch();
//   const { list: categories } = useSelector((state) => state.categories);

//   const [form, setForm] = useState({ ...emptyCategory, ...initialValues });
//   const [slugTouched, setSlugTouched] = useState(false);

//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   useEffect(() => {
//     if (initialValues) {
//       setForm((prev) => ({ ...prev, ...initialValues }));
//     }
//   }, [initialValues]);

//   function handleNameChange(e) {
//     const name = e.target.value;
//     setForm((prev) => ({
//       ...prev,
//       name,
//       // Auto-generate the slug from the name until the user edits slug
//       // manually themselves - a common admin-form convenience.
//       slug: slugTouched
//         ? prev.slug
//         : name
//             .toLowerCase()
//             .trim()
//             .replace(/[^a-z0-9]+/g, "-")
//             .replace(/(^-|-$)/g, ""),
//     }));
//   }

//   function handleChange(e) {
//     const { name, value } = e.target;
//     if (name === "slug") setSlugTouched(true);
//     setForm((prev) => ({ ...prev, [name]: value }));
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     onSubmit({
//       ...form,
//       parentCategory: form.parentCategory || null,
//     });
//   }

//   return (
//     <form onSubmit={handleSubmit} className="admin-form">
//       <div className="row g-3">
//         <div className="col-12 col-md-6">
//           <label className="form-label small">Category Name</label>
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleNameChange}
//             required
//             className="form-control admin-input"
//           />
//         </div>

//         <div className="col-12 col-md-6">
//           <label className="form-label small">Slug</label>
//           <input
//             name="slug"
//             value={form.slug}
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
//             rows={3}
//             className="form-control admin-input"
//           />
//         </div>

//         <div className="col-12 col-md-6">
//           <label className="form-label small">Image URL</label>
//           <input
//             name="image"
//             value={form.image}
//             onChange={handleChange}
//             placeholder="https://..."
//             className="form-control admin-input"
//           />
//         </div>

//         <div className="col-12 col-md-6">
//           <label className="form-label small">Parent Category (optional)</label>
//           <select
//             name="parentCategory"
//             value={form.parentCategory || ""}
//             onChange={handleChange}
//             className="form-select admin-input"
//           >
//             <option value="">None (top-level)</option>
//             {categories
//               .filter((c) => c._id !== form._id) // a category can't be its own parent
//               .map((category) => (
//                 <option key={category._id} value={category._id}>
//                   {category.name}
//                 </option>
//               ))}
//           </select>
//         </div>
//       </div>

//       <button type="submit" className="btn btn-danger mt-4">
//         {submitLabel}
//       </button>
//     </form>
//   );
// }

// export default CategoryForm;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCategories } from "../../../redux/slice/categorySlice";

// const emptyCategory = {
//   name: "",
//   slug: "",
//   description: "",
//   image: "",
//   parentCategory: "",
// };

// function CategoryForm({
//   initialValues,
//   onSubmit,
//   submitLabel = "Save Category",
// }) {
//   const dispatch = useDispatch();

//   const { list: categories } = useSelector((state) => state.categories);

//   const [form, setForm] = useState({
//     ...emptyCategory,
//     ...initialValues,
//   });

//   const [slugTouched, setSlugTouched] = useState(false);

//   // NEW
//   const [categoryType, setCategoryType] = useState("parent");

//   useEffect(() => {
//     console.log("Fetching categories...");
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   useEffect(() => {
//     if (initialValues) {
//       setForm((prev) => ({
//         ...prev,
//         ...initialValues,
//       }));

//       // Detect edit mode
//       if (initialValues.parentCategory) {
//         setCategoryType("sub");
//       } else {
//         setCategoryType("parent");
//       }
//     }
//   }, [initialValues]);

//   function handleNameChange(e) {
//     const name = e.target.value;

//     setForm((prev) => ({
//       ...prev,
//       name,

//       slug: slugTouched
//         ? prev.slug
//         : name
//             .toLowerCase()
//             .trim()
//             .replace(/[^a-z0-9]+/g, "-")
//             .replace(/(^-|-$)/g, ""),
//     }));
//   }

//   function handleChange(e) {
//     const { name, value } = e.target;

//     if (name === "slug") {
//       setSlugTouched(true);
//     }

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   function handleTypeChange(type) {
//     setCategoryType(type);

//     if (type === "parent") {
//       setForm((prev) => ({
//         ...prev,
//         parentCategory: "",
//       }));
//     }
//   }

//   function handleSubmit(e) {
//     e.preventDefault();

//     onSubmit({
//       ...form,
//       parentCategory:
//         categoryType === "sub" ? form.parentCategory || null : null,
//     });
//   }

//   // Only top-level categories
//   const parentCategories = categories.filter(
//     (category) => !category.parentCategory && category._id !== form._id,
//   );
//   console.log(categories);
//   return (
//     <form onSubmit={handleSubmit} className="admin-form">
//       {console.log(JSON.stringify(categories, null, 2))}
//       <div className="row g-3">
//         {/* Category Type */}

//         <div className="col-12">
//           <label className="form-label small">Category Type</label>

//           <div className="d-flex gap-4">
//             <div className="form-check">
//               <input
//                 type="radio"
//                 id="parent"
//                 className="form-check-input"
//                 checked={categoryType === "parent"}
//                 onChange={() => handleTypeChange("parent")}
//               />

//               <label htmlFor="parent" className="form-check-label">
//                 Parent Category
//               </label>
//             </div>

//             <div className="form-check">
//               <input
//                 type="radio"
//                 id="sub"
//                 className="form-check-input"
//                 checked={categoryType === "sub"}
//                 onChange={() => handleTypeChange("sub")}
//               />

//               <label htmlFor="sub" className="form-check-label">
//                 Sub Category
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Parent Category */}

//         {categoryType === "sub" && (
//           <div className="col-12 col-md-6">
//             <label className="form-label small">Parent Category</label>

//             <select
//               name="parentCategory"
//               value={form.parentCategory || ""}
//               onChange={handleChange}
//               required
//               className="form-select admin-input"
//             >
//               <option value="">Select Parent Category</option>

//               {parentCategories.map((category) => (
//                 <option key={category._id} value={category._id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Name */}

//         <div className="col-12 col-md-6">
//           <label className="form-label small">Category Name</label>

//           <input
//             name="name"
//             value={form.name}
//             onChange={handleNameChange}
//             required
//             className="form-control admin-input"
//           />
//         </div>

//         {/* Slug */}

//         <div className="col-12 col-md-6">
//           <label className="form-label small">Slug</label>

//           <input
//             name="slug"
//             value={form.slug}
//             onChange={handleChange}
//             required
//             className="form-control admin-input"
//           />
//         </div>

//         {/* Description */}

//         <div className="col-12">
//           <label className="form-label small">Description</label>

//           <textarea
//             rows={3}
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             className="form-control admin-input"
//           />
//         </div>

//         {/* Image */}

//         <div className="col-12 col-md-6">
//           <label className="form-label small">Image URL</label>

//           <input
//             name="image"
//             value={form.image}
//             onChange={handleChange}
//             placeholder="https://..."
//             className="form-control admin-input"
//           />
//         </div>
//       </div>

//       <button className="btn btn-danger mt-4" type="submit">
//         {submitLabel}
//       </button>
//     </form>
//   );
// }

// export default CategoryForm;

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../redux/slice/categorySlice";

const emptyCategory = {
  name: "",
  slug: "",
  description: "",
  image: "",
  parentCategory: "",
};

function CategoryForm({
  initialValues,
  onSubmit,
  submitLabel = "Save Category",
}) {
  const dispatch = useDispatch();

  const { list: categories } = useSelector((state) => state.categories);

  const [form, setForm] = useState({
    ...emptyCategory,
    ...initialValues,
  });

  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (initialValues) {
      setForm({
        ...emptyCategory,
        ...initialValues,
      });
    }
  }, [initialValues]);

  // Auto Generate Slug
  function handleNameChange(e) {
    const name = e.target.value;

    setForm((prev) => ({
      ...prev,
      name,
      slug: slugTouched
        ? prev.slug
        : name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, ""),
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "slug") {
      setSlugTouched(true);
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      ...form,
      parentCategory: form.parentCategory || null,
    });
  }

  // Prevent category selecting itself
  const availableParents = useMemo(() => {
    return categories.filter((category) => category._id !== form._id);
  }, [categories, form._id]);

  const selectedParent = availableParents.find(
    (cat) => cat._id === form.parentCategory,
  );

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="row g-3">
        {/* Category Name */}

        <div className="col-12 col-md-6">
          <label className="form-label small">Category Name</label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleNameChange}
            required
            className="form-control admin-input"
          />
        </div>

        {/* Slug */}

        <div className="col-12 col-md-6">
          <label className="form-label small">Slug</label>

          <input
            type="text"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
            className="form-control admin-input"
          />
        </div>

        {/* Parent Category */}

        <div className="col-12 col-md-6">
          <label className="form-label small">Parent Category</label>

          <select
            name="parentCategory"
            value={form.parentCategory || ""}
            onChange={handleChange}
            className="form-select admin-input"
          >
            <option value="">None (Top Level)</option>

            {availableParents.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <small className="text-muted">
            Leave as <strong>None</strong> to create a top-level category.
            Select an existing category to make this category its child.
          </small>
        </div>

        {/* Image */}

        <div className="col-12 col-md-6">
          <label className="form-label small">Image URL</label>

          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://..."
            className="form-control admin-input"
          />
        </div>

        {/* Image Preview */}

        {form.image && (
          <div className="col-12">
            <label className="form-label small">Image Preview</label>

            <div className="border rounded p-3 d-flex justify-content-center">
              <img
                src={form.image}
                alt="Preview"
                style={{
                  maxHeight: "180px",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        )}

        {/* Description */}

        <div className="col-12">
          <label className="form-label small">Description</label>

          <textarea
            rows={4}
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control admin-input"
          />
        </div>

        {/* Category Preview */}

        <div className="col-12">
          <div className="alert alert-light border">
            <strong>Category Preview</strong>

            <div className="mt-2">
              {selectedParent ? (
                <>
                  {selectedParent.name}
                  {" > "}
                  <strong>{form.name || "New Category"}</strong>
                </>
              ) : (
                <strong>{form.name || "Top Level Category"}</strong>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button type="submit" className="btn btn-danger px-4">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;
