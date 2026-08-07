import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "../../components/admin/AdminHeader";
import CategoryForm from "../../components/admin/forms/CategoryForm";
import {
  createCategory,
  updateCategory,
  fetchCategoryByIdOrSlug,
  clearSelectedCategory,
} from "../../redux/slice/categorySlice";
import { toast } from "react-toastify";

// Same pattern as CreateProduct.jsx - doubles as the edit page when the
// URL includes an :id.
function CreateCategory() {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedCategory, loading, error } = useSelector(
    (state) => state.categories,
  );

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchCategoryByIdOrSlug(id));
    }
    return () => dispatch(clearSelectedCategory());
  }, [id, isEditMode, dispatch]);

  async function handleSubmit(categoryData) {
    const action = isEditMode
      ? updateCategory({ id, category: categoryData })
      : createCategory(categoryData);

    const result = await dispatch(action);

    if (!result.error) {
      toast.success(result.payload.success);
      navigate("/admin/categories");
    } else {
      toast.error(result.payload || "Something went wrong");
    }
  }

  if (isEditMode && !selectedCategory) {
    return (
      <div>
        <AdminHeader title="Edit Category" subtitle="Loading category..." />
      </div>
    );
  }

  return (
    <div>
      <AdminHeader
        title={isEditMode ? "Edit Category" : "Create Category"}
        subtitle={
          isEditMode ? "Update category details" : "Add a new product category"
        }
      />

      <div className="admin-card">
        {error && <p className="text-danger small mb-3">{error}</p>}

        <CategoryForm
          initialValues={
            isEditMode
              ? {
                  ...selectedCategory,
                  parentCategory: selectedCategory.parentCategory?._id || "",
                }
              : undefined
          }
          onSubmit={handleSubmit}
          submitLabel={
            loading
              ? "Saving..."
              : isEditMode
                ? "Update Category"
                : "Create Category"
          }
        />
      </div>
    </div>
  );
}

export default CreateCategory;
