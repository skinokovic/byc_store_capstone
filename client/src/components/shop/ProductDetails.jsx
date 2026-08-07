// import { useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { Star, Heart } from "lucide-react";
// import ProductGallery from "../shop/product-details/ProductGallery";
// import ProductOptions from "../shop/product-details/ProductOptions";
// import ProductReviews from "../shop/product-details/ProductReview";
// import RecentlyViewed from "../RecentlyViewed";
// import {
//   fetchProductById,
//   clearSelectedProduct,
// } from "../../redux/slice/productSlice";
// import { addToCart } from "../../redux/slice/cartSlice";
// import {
//   fetchWishlist,
//   addToWishlist,
//   removeFromWishlist,
// } from "../../redux/slice/wishlistSlice";
// import { useCartDrawer } from "../../components/shop/cartDrawer/CartDrawerContext";
// import { trackRecentlyViewed } from "../../redux/slice/recentlyViewedSlice";
// import { addProductReview } from "../../redux/slice/productSlice";
// import RelatedProducts from "../RelatedProducts";

// function ProductDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { openCart } = useCartDrawer();

//   const {
//     selectedProduct: product,
//     loading,
//     error,
//   } = useSelector((state) => state.products);
//   const { wishlist } = useSelector((state) => state.wishlist);

//   useEffect(() => {
//     dispatch(fetchProductById(id));

//     // cleanup: runs when the component unmounts (user navigates away)
//     return () => {
//       dispatch(clearSelectedProduct());
//     };
//   }, [id, dispatch]);

//   useEffect(() => {
//     if (!wishlist?.products) {
//       dispatch(fetchWishlist());
//     }
//   }, [dispatch, wishlist]);

//   // inside useEffect that fetches the product, add:
//   useEffect(() => {
//     dispatch(fetchProductById(id));
//     trackRecentlyViewed(id); // record this view in localStorage

//     return () => {
//       dispatch(clearSelectedProduct());
//     };
//   }, [id, dispatch]);

//   if (loading)
//     return <p className="container py-5 text-secondary">Loading...</p>;
//   if (error) return <p className="container py-5 text-danger">{error}</p>;
//   if (!product) return null;

//   const isWishlisted = (wishlist?.products || []).some(
//     (p) => (p._id || p) === product._id,
//   );

//   async function handleAddToCart(selection) {
//     const result = await dispatch(
//       addToCart({
//         productId: product._id,
//         quantity: selection?.quantity || 1,
//         size: selection?.size || null,
//         color: selection?.color || null,
//       }),
//     );

//     if (addToCart.fulfilled.match(result)) {
//       toast.success("Added to cart");
//       openCart();
//     } else {
//       toast.error(result.payload || "Failed to add to cart");
//     }
//   }

//   async function handleWishlistToggle() {
//     const action = isWishlisted
//       ? removeFromWishlist(product._id)
//       : addToWishlist(product._id);

//     const result = await dispatch(action);

//     if (result.meta.requestStatus === "fulfilled") {
//       toast.success(
//         isWishlisted ? "Removed from wishlist" : "Added to wishlist",
//       );
//     } else {
//       toast.error(result.payload || "Failed to update wishlist");
//     }
//   }

//   // add a review submit handler
//   async function handleSubmitReview(reviewData) {
//     const result = await dispatch(
//       addProductReview({ id: product._id, reviewData }),
//     );
//     if (addProductReview.fulfilled.match(result)) {
//       toast.success("Review submitted");
//     } else {
//       toast.error(result.payload || "Failed to submit review");
//     }
//   }

//   return (
//     <div className="container py-4">
//       {/* Breadcrumb */}
//       <p className="small text-secondary mb-4 text-center text-md-start">
//         <Link to="/" className="text-secondary text-decoration-none">
//           Home
//         </Link>
//         {" > "}
//         <Link to="/shop" className="text-secondary text-decoration-none">
//           All Products
//         </Link>
//         {" > "}
//         <span>{product.name}</span>
//       </p>
//       {/* Top section: gallery + info/options */}
//       <div className="row g-5">
//         <div className="col-12 col-lg-5">
//           <ProductGallery
//             images={(product.images || []).map((img) => img.url)}
//             alt={product.name}
//           />
//         </div>

//         <div className="col-12 col-lg-7">
//           <p className="text-uppercase fw-bold small mb-1">{product.name}</p>
//           <p className="text-secondary small mb-2 text-danger">{product.sku}</p>
//           <p className="text-secondary small mb-3">
//             {product.short_description?.length > 120
//               ? `${product.short_description.slice(0, 120)}...`
//               : product.short_description}
//           </p>

//           <div className="d-flex align-items-center gap-2 mb-3">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <Star
//                 key={i}
//                 size={14}
//                 color="#e8722c"
//                 fill={i < Math.round(product.rating || 0) ? "#e8722c" : "none"}
//               />
//             ))}
//             {/* <span className="small text-secondary">
//               {(product.rating || 0).toFixed(2)}
//             </span> */}
//           </div>

//           <h4 className="fw-bold mb-4 text-danger">
//             ₦{product.price?.toLocaleString()}.00
//           </h4>

//           <div className="d-flex align-items-start gap-3">
//             <div className="flex-grow-1">
//               {/* <ProductOptions onAddToCart={handleAddToCart} /> */}
//               {/* update ProductOptions usage: */}
//               <ProductOptions
//                 sizes={product.sizes || []}
//                 colors={product.colors || []}
//                 onAddToCart={handleAddToCart}
//               />
//             </div>

//             <button
//               type="button"
//               onClick={handleWishlistToggle}
//               className="btn btn-light border rounded-circle d-inline-flex align-items-center justify-content-center"
//               style={{ width: 44, height: 44 }}
//               aria-label={
//                 isWishlisted ? "Remove from wishlist" : "Add to wishlist"
//               }
//             >
//               <Heart
//                 size={18}
//                 fill={isWishlisted ? "#dc3545" : "none"}
//                 color={isWishlisted ? "#dc3545" : "currentColor"}
//               />
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* Product description */}
//       <section className="py-5 mt-4 border-top">
//         <h5 className="fw-bold mb-3">Product Description</h5>
//         <p className="text-secondary small" style={{ whiteSpace: "pre-line" }}>
//           {product.long_description}
//         </p>
//       </section>
//       {/* Reviews - separate component */}
//       <div className="border-top">
//         {/* update ProductReviews usage: */}
//         <ProductReviews
//           averageRating={product.rating || 0}
//           totalReviews={product.numReviews || 0}
//           reviews={product.reviews || []}
//           onSubmitReview={handleSubmitReview}
//         />
//       </div>
//       <RelatedProducts productId={product._id} />
//       {/* <RecentlyViewed /> */}
//       <RecentlyViewed excludeId={product._id} />
//     </div>
//   );
// }

// export default ProductDetails;
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Star, Heart } from "lucide-react";
import ProductGallery from "../shop/product-details/ProductGallery";
import ProductOptions from "../shop/product-details/ProductOptions";
import ProductReviews from "../shop/product-details/ProductReview";
import RecentlyViewed from "../RecentlyViewed";
import {
  fetchProductById,
  clearSelectedProduct,
} from "../../redux/slice/productSlice";
import { addToCart } from "../../redux/slice/cartSlice";
import {
  fetchWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slice/wishlistSlice";
import { useCartDrawer } from "../../components/shop/cartDrawer/CartDrawerContext";
import { trackRecentlyViewed } from "../../redux/slice/recentlyViewedSlice";
import { addProductReview } from "../../redux/slice/productSlice";
import RelatedProducts from "../RelatedProducts";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { openCart } = useCartDrawer();

  const {
    selectedProduct: product,
    loading,
    error,
  } = useSelector((state) => state.products);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProductById(id));

    // cleanup: runs when the component unmounts (user navigates away)
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (!wishlist?.products) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, wishlist]);

  // inside useEffect that fetches the product, add:
  useEffect(() => {
    dispatch(fetchProductById(id));
    trackRecentlyViewed(id); // record this view in localStorage

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [id, dispatch]);

  if (loading)
    return <p className="container py-5 text-secondary">Loading...</p>;
  if (error) return <p className="container py-5 text-danger">{error}</p>;
  if (!product) return null;

  const isOutOfStock = (product.stock ?? 0) <= 0;

  const isWishlisted = (wishlist?.products || []).some(
    (p) => (p._id || p) === product._id,
  );

  async function handleAddToCart(selection) {
    const result = await dispatch(
      addToCart({
        productId: product._id,
        quantity: selection?.quantity || 1,
        size: selection?.size || null,
        color: selection?.color || null,
      }),
    );

    if (addToCart.fulfilled.match(result)) {
      toast.success("Added to cart");
      openCart();
    } else {
      toast.error(result.payload || "Failed to add to cart");
    }
  }

  async function handleWishlistToggle() {
    const action = isWishlisted
      ? removeFromWishlist(product._id)
      : addToWishlist(product._id);

    const result = await dispatch(action);

    if (result.meta.requestStatus === "fulfilled") {
      toast.success(
        isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      );
    } else {
      toast.error(result.payload || "Failed to update wishlist");
    }
  }

  // add a review submit handler
  async function handleSubmitReview(reviewData) {
    const result = await dispatch(
      addProductReview({ id: product._id, reviewData }),
    );
    if (addProductReview.fulfilled.match(result)) {
      toast.success("Review submitted");
    } else {
      toast.error(result.payload || "Failed to submit review");
    }
  }

  return (
    <div className="container py-4">
      {/* Breadcrumb */}
      <p className="small text-secondary mb-4 text-center text-md-start">
        <Link to="/" className="text-secondary text-decoration-none">
          Home
        </Link>
        {" > "}
        <Link to="/shop" className="text-secondary text-decoration-none">
          All Products
        </Link>
        {" > "}
        <span>{product.name}</span>
      </p>
      {/* Top section: gallery + info/options */}
      <div className="row g-5">
        <div className="col-12 col-lg-5">
          <div
            className="position-relative"
            style={{
              filter: isOutOfStock ? "grayscale(1)" : "none",
              opacity: isOutOfStock ? 0.7 : 1,
            }}
          >
            <ProductGallery
              images={(product.images || []).map((img) => img.url)}
              alt={product.name}
            />
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <div className="d-flex align-items-center gap-2 mb-1">
            <p className="text-uppercase fw-bold small mb-0">{product.name}</p>
            {isOutOfStock && (
              <span className="badge bg-dark" style={{ fontSize: "0.65rem" }}>
                Out of Stock
              </span>
            )}
          </div>
          <p className="text-secondary small mb-2 text-danger">{product.sku}</p>
          <p className="text-secondary small mb-3">
            {product.short_description?.length > 120
              ? `${product.short_description.slice(0, 120)}...`
              : product.short_description}
          </p>

          <div className="d-flex align-items-center gap-2 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                color="#e8722c"
                fill={i < Math.round(product.rating || 0) ? "#e8722c" : "none"}
              />
            ))}
            {/* <span className="small text-secondary">
              {(product.rating || 0).toFixed(2)}
            </span> */}
          </div>

          <h4 className="fw-bold mb-4 text-danger">
            ₦{product.price?.toLocaleString()}.00
          </h4>

          {isOutOfStock && (
            <p className="text-secondary small fst-italic mb-3">
              This product is currently unavailable. Check back later or explore
              similar items below.
            </p>
          )}

          <div className="d-flex align-items-start gap-3">
            <div
              className="flex-grow-1"
              style={
                isOutOfStock
                  ? { pointerEvents: "none", opacity: 0.5 }
                  : undefined
              }
              aria-disabled={isOutOfStock}
            >
              {/* <ProductOptions onAddToCart={handleAddToCart} /> */}
              {/* update ProductOptions usage: */}
              <ProductOptions
                sizes={product.sizes || []}
                colors={product.colors || []}
                onAddToCart={handleAddToCart}
              />
            </div>

            <button
              type="button"
              onClick={handleWishlistToggle}
              className="btn btn-light border rounded-circle d-inline-flex align-items-center justify-content-center"
              style={{ width: 44, height: 44 }}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <Heart
                size={18}
                fill={isWishlisted ? "#dc3545" : "none"}
                color={isWishlisted ? "#dc3545" : "currentColor"}
              />
            </button>
          </div>
        </div>
      </div>
      {/* Product description */}
      <section className="py-5 mt-4 border-top">
        <h5 className="fw-bold mb-3">Product Description</h5>
        <p className="text-secondary small" style={{ whiteSpace: "pre-line" }}>
          {product.long_description}
        </p>
      </section>
      {/* Reviews - separate component */}
      <div className="border-top">
        {/* update ProductReviews usage: */}
        <ProductReviews
          averageRating={product.rating || 0}
          totalReviews={product.numReviews || 0}
          reviews={product.reviews || []}
          onSubmitReview={handleSubmitReview}
        />
      </div>
      <RelatedProducts productId={product._id} />
      {/* <RecentlyViewed /> */}
      {user && <RecentlyViewed excludeId={product._id} />}
    </div>
  );
}

export default ProductDetails;
