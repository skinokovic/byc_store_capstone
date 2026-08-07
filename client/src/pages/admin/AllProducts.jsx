import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import AdminHeader from "../../components/admin/AdminHeader";
import ProductsTable from "../../components/admin/tables/ProductsTable";
import { fetchProducts, deleteProduct } from "../../redux/slice/productSlice";
import Pagination from "../../components/common/Pagination";
import usePagination from "../../components/hooks/usePagination";

function AllProducts() {
  const dispatch = useDispatch();
  const {
    list: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  const {
    paginatedItems: paginatedProducts,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    goToPage,
  } = usePagination(products, 5);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  function handleDelete(id) {
    if (window.confirm("Delete this product? This cannot be undone.")) {
      dispatch(deleteProduct(id));
    }
  }

  return (
    <div>
      <AdminHeader
        title="All Products"
        subtitle="Manage your product catalog"
      />

      <div className="admin-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="text-secondary small mb-0">
            {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
          <Link
            to="/admin/products/create"
            className="btn btn-danger btn-sm d-flex align-items-center gap-1"
          >
            <Plus size={14} />
            Create Product
          </Link>
        </div>

        {loading && <p className="text-secondary">Loading products...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <ProductsTable products={paginatedProducts} onDelete={handleDelete} />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          totalItems={totalItems}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
}

export default AllProducts;
