import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchParentCategories,
  fetchSubCategories,
} from "../../redux/slice/categorySlice";

import { fetchProducts } from "../../redux/slice/productSlice";

import ParentTabs from "./ParentTabs";
import SubCategoryTabs from "./SubCategoryTabs";
import ProductSlider from "./ProductSlider";

import "./ShopByCategory.css";
import { Link } from "react-router-dom";

function ShopByCategory() {
  const dispatch = useDispatch();

  const { parentCategories, subCategories, loading } = useSelector(
    (state) => state.categories,
  );
  console.log(
    "Category State:",
    useSelector((state) => state.categories),
  );
  const { list: products } = useSelector((state) => state.products);

  const [selectedParent, setSelectedParent] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);

  /**
   * ============================================
   * Load Parent Categories
   * ============================================
   */
  useEffect(() => {
    dispatch(fetchParentCategories());
  }, [dispatch]);

  /**
   * ============================================
   * Select first parent automatically
   * ============================================
   */
  useEffect(() => {
    if (!selectedParent && parentCategories.length) {
      setSelectedParent(parentCategories[0]);
    }
  }, [parentCategories, selectedParent]);

  /**
   * ============================================
   * Whenever parent changes,
   * load its subcategories
   * ============================================
   */
  useEffect(() => {
    if (selectedParent?._id) {
      dispatch(fetchSubCategories(selectedParent._id));
    }
  }, [dispatch, selectedParent]);

  /**
   * ============================================
   * Automatically select first subcategory
   * ============================================
   */
  useEffect(() => {
    if (subCategories.length) {
      setSelectedSub(subCategories[0]);
    } else {
      setSelectedSub(null);
    }
  }, [subCategories]);

  /**
   * ============================================
   * Fetch Products
   * ============================================
   */
  useEffect(() => {
    if (selectedSub?._id) {
      dispatch(
        fetchProducts({
          category: selectedSub._id,
        }),
      );
    }
  }, [dispatch, selectedSub]);

  /**
   * ============================================
   * Parent Tab Click
   * ============================================
   */
  const handleParentChange = (parent) => {
    setSelectedParent(parent);
    setSelectedSub(null);
  };

  /**
   * ============================================
   * Subcategory Click
   * ============================================
   */
  const handleSubChange = (subcategory) => {
    setSelectedSub(subcategory);
  };

  return (
    <section className="shop-category py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="shop-title">Shop By Category</h2>
          <p className="text-muted">Browse our collections by category</p>
        </div>

        {/* Parent Categories */}

        <ParentTabs
          categories={parentCategories}
          active={selectedParent}
          onChange={handleParentChange}
        />

        {/* Sub Categories */}

        <SubCategoryTabs
          categories={subCategories}
          active={selectedSub}
          onChange={handleSubChange}
        />

        {/* Products */}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <ProductSlider products={products} />
        )}

        <div className="view-all-wrapper">
          <Link
            to={selectedSub ? `/shop?category=${selectedSub.slug}` : "/shop"}
            className="view-all-btn"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ShopByCategory;
