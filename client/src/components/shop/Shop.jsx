import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";

import ProductCard from "../shop/ProductCard";
import SortDropdown from "../shop/SortDropdown";
import ViewToggle from "../shop/ViewToggle";
// import Pagination from "../shop/Pagination";
import Pagination from "../common/Pagination";
import RecentlyViewed from "../RecentlyViewed";
import { fetchProducts } from "../../redux/slice/productSlice";

const PAGE_SIZE = 10;

function sortProducts(products, sortBy) {
  const sorted = [...products];
  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case "most-sold":
    default:
      return sorted;
  }
}

function getSearchableText(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") return value.name || value.title || "";
  return "";
}

function filterByKeyword(products, keyword) {
  if (!keyword.trim()) return products;
  const q = keyword.trim().toLowerCase();

  return products.filter((p) => {
    const searchable = [
      p.name,
      p.description,
      getSearchableText(p.category),
      getSearchableText(p.brand),
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(q);
  });
}

function Shop() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const {
    list: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  const { user } = useSelector((state) => state.auth);

  const [sortBy, setSortBy] = useState("most-sold");
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // reset to page 1 whenever the search keyword changes
  useEffect(() => {
    setCurrentPage(1);
  }, [keyword]);

  const filteredProducts = useMemo(
    () => filterByKeyword(products || [], keyword),
    [products, keyword],
  );

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sortBy),
    [filteredProducts, sortBy],
  );

  const totalPages = Math.ceil(sortedProducts.length / PAGE_SIZE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedProducts.slice(start, start + PAGE_SIZE);
  }, [sortedProducts, currentPage]);

  function handleSortChange(value) {
    setSortBy(value);
    setCurrentPage(1);
  }

  function handlePageChange(page) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleClearSearch() {
    searchParams.delete("keyword");
    setSearchParams(searchParams);
  }

  return (
    <div className="container py-4">
      {/* Breadcrumb */}
      <p className="small text-secondary mb-4 text-center text-md-start">
        <Link to="/" className="text-secondary text-decoration-none">
          Home
        </Link>
        {" > "}
        <span>All Products</span>
      </p>

      {/* Header: title + sort + view toggle */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 border-bottom pb-3 mb-4 ">
        {/* <h4 className="fw-bold mb-0 text-center text-md-start">
          {keyword ? `Results for "${keyword}"` : "All Products"}
        </h4> */}

        <div className="d-flex justify-content-between align-items-center gap-3 w-100 w-md-auto">
          <SortDropdown value={sortBy} onChange={handleSortChange} />
          <ViewToggle view={view} onChange={setView} />
        </div>
      </div>

      {keyword && (
        <div className="d-flex align-items-center gap-2 mb-4">
          <span className="badge bg-light text-dark border d-inline-flex align-items-center gap-2">
            "{keyword}"
            <button
              type="button"
              onClick={handleClearSearch}
              className="btn btn-sm p-0 border-0 bg-transparent d-flex"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          </span>
          <span className="text-secondary small">
            {sortedProducts.length} result
            {sortedProducts.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* Product listing */}
      {loading ? (
        <p className="text-secondary text-center py-5">Loading products...</p>
      ) : error ? (
        <p className="text-danger text-center py-5">{error}</p>
      ) : paginatedProducts.length === 0 ? (
        <p className="text-secondary text-center py-5">
          {keyword
            ? `No products found for "${keyword}".`
            : "No products found."}
        </p>
      ) : view === "grid" ? (
        <div className="row g-4">
          {paginatedProducts.map((product) => (
            <div
              className="col-6 col-md-4 col-lg-3 col-xl-2-4"
              key={product._id}
              style={{ flex: "1 1 0", minWidth: 200 }}
            >
              <ProductCard product={product} view="grid" />
            </div>
          ))}
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {paginatedProducts.map((product) => (
            <ProductCard product={product} view="list" key={product._id} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {user && <RecentlyViewed />}
    </div>
  );
}

export default Shop;
