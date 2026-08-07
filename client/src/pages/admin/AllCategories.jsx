import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import AdminHeader from "../../components/admin/AdminHeader";
import CategoriesTable from "../../components/admin/tables/CategoriesTable";
import {
  fetchAllCategories,
  deleteCategory,
} from "../../redux/slice/categorySlice";

function AllCategories() {
  const dispatch = useDispatch();
  const {
    list: categories,
    loading,
    error,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  function handleDelete(id) {
    if (
      window.confirm(
        "Delete this category? Products still assigned to it will block this action.",
      )
    ) {
      dispatch(deleteCategory(id));
    }
  }
  console.log("CATEGORIES", categories);

  return (
    <div>
      <AdminHeader
        title="All Categories"
        subtitle="Manage your product categories"
      />

      <div className="admin-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="text-secondary small mb-0">
            {categories.length}{" "}
            {categories.length !== 1 ? "Categories" : "Category"}
          </p>
          <Link
            to="/admin/categories/create"
            className="btn btn-danger btn-sm d-flex align-items-center gap-1"
          >
            <Plus size={14} />
            Create Category
          </Link>
        </div>

        {loading && <p className="text-secondary">Loading categories...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <CategoriesTable categories={categories} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}

export default AllCategories;
