import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "../../components/admin/AdminHeader";
import ProductForm from "../../components/admin/forms/ProductForm";
import {
  createProduct,
  updateProduct,
  fetchProductById,
  clearSelectedProduct,
} from "../../redux/slice/productSlice";
import { toast } from "react-toastify";

// Doubles as the edit page - if the URL has an :id (i.e. you're at
// /admin/products/edit/:id), this loads and edits that product instead of
// creating a new one. Keeps one form/page instead of two nearly-identical
// files.
function CreateProduct() {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products,
  );

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchProductById(id));
    }
    return () => dispatch(clearSelectedProduct());
  }, [id, isEditMode, dispatch]);

  async function handleSubmit(formData) {
    const action = isEditMode
      ? updateProduct({ id, formData })
      : createProduct(formData);

    const result = await dispatch(action);

    if (
      createProduct.fulfilled.match(result) ||
      updateProduct.fulfilled.match(result)
    ) {
      toast.success(
        isEditMode
          ? "Product updated successfully!"
          : "Product created successfully!",
      );

      navigate("/admin/products");
    } else {
      toast.error(result.payload || "Operation failed");
    }
  }

  // In edit mode, wait for the product to load before rendering the form -
  // otherwise ProductForm would briefly render with empty initialValues.
  if (isEditMode && !selectedProduct) {
    return (
      <div>
        <AdminHeader title="Edit Product" subtitle="Loading product..." />
      </div>
    );
  }

  return (
    <div>
      <AdminHeader
        title={isEditMode ? "Edit Product" : "Create Product"}
        subtitle={
          isEditMode
            ? "Update product details"
            : "Add a new product to your catalog"
        }
      />

      <div className="admin-card">
        {error && <p className="text-danger small mb-3">{error}</p>}

        <ProductForm
          initialValues={
            isEditMode
              ? {
                  ...selectedProduct,
                  category:
                    selectedProduct.category?._id || selectedProduct.category,
                  images: selectedProduct.images || [],
                }
              : undefined
          }
          onSubmit={handleSubmit}
          submitLabel={
            loading
              ? "Saving..."
              : isEditMode
                ? "Update Product"
                : "Create Product"
          }
        />
      </div>
    </div>
  );
}

export default CreateProduct;
