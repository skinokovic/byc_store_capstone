import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchRelatedProducts } from "../redux/slice/productSlice";

function RelatedProducts({ productId, limit = 8 }) {
  const dispatch = useDispatch();
  const trackRef = useRef(null);
  const { relatedProducts, relatedLoading } = useSelector(
    (state) => state.products,
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (productId) {
      dispatch(fetchRelatedProducts({ id: productId, limit }));
    }
  }, [dispatch, productId, limit]);

  // Recalculate arrow enabled/disabled state based on scroll position
  function updateArrowState() {
    const track = trackRef.current;
    if (!track) return;

    setCanScrollPrev(track.scrollLeft > 5);
    setCanScrollNext(
      track.scrollLeft + track.clientWidth < track.scrollWidth - 5,
    );
  }

  useEffect(() => {
    updateArrowState();
  }, [relatedProducts]);

  function scrollByCard(direction) {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.firstElementChild;
    if (!firstCard) return;

    const cardStyle = window.getComputedStyle(track);
    const gap = parseFloat(cardStyle.columnGap || cardStyle.gap || 0);
    const advanceBy = firstCard.offsetWidth + gap;

    track.scrollBy({
      left: direction === "next" ? advanceBy : -advanceBy,
      behavior: "smooth",
    });
  }

  if (relatedLoading || relatedProducts.length === 0) return null;

  return (
    <section className="py-4 py-lg-5 border-top">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Related Products</h5>

          <div className="d-flex gap-2">
            <button
              type="button"
              onClick={() => scrollByCard("prev")}
              disabled={!canScrollPrev}
              className="btn btn-light border rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: 36, height: 36 }}
              aria-label="Previous products"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard("next")}
              disabled={!canScrollNext}
              className="btn btn-light border rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: 36, height: 36 }}
              aria-label="Next products"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={updateArrowState}
          className="d-flex gap-3 pb-2"
          style={{
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
          }}
        >
          {relatedProducts.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="border rounded overflow-hidden d-block text-decoration-none text-dark flex-shrink-0"
              style={{
                width: "clamp(150px, 40vw, 220px)",
                scrollSnapAlign: "start",
              }}
            >
              <img
                src={product.images?.[0]?.url}
                alt={product.name}
                className="w-100"
                style={{ height: 180, objectFit: "cover" }}
              />
              <div className="p-2">
                <p className="small fw-semibold mb-1 text-truncate">
                  {product.name}
                </p>
                <p className="small fw-semibold mb-1 text-truncate text-danger">
                  {product.sku}
                </p>
                <p className="small fw-semibold mb-1 text-truncate">
                  {product.short_description}
                </p>
                <p className="small fw-bold mb-1 text-danger">
                  ₦{product.price?.toLocaleString()}
                </p>
                <div className="d-flex align-items-center gap-1">
                  <Star size={12} color="#e8722c" fill="#e8722c" />
                  <span className="small text-secondary">
                    {(product.rating || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedProducts;
