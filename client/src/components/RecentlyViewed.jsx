// import { useEffect, useRef } from "react";
// import { Star } from "lucide-react";

// const defaultProducts = [
//   {
//     id: 1,
//     brand: "BYC",
//     name: "MEN BOXERS",
//     price: "₦11,500",
//     rating: 4.35,
//     image: "/src/assets/recent_viewed.png",
//   },
//   {
//     id: 2,
//     brand: "BYC",
//     name: "MEN BOXERS",
//     price: "₦10,500",
//     rating: 4.35,
//     image: "/src/assets/recent_viewed.png",
//   },
//   {
//     id: 3,
//     brand: "BYC",
//     name: "MEN BOXERS",
//     price: "₦10,500",
//     rating: 4.35,
//     image: "/src/assets/recent_viewed.png",
//   },
//   {
//     id: 4,
//     brand: "BYC",
//     name: "MEN BOXERS",
//     price: "₦10,500",
//     rating: 4.35,
//     image: "/src/assets/recent_viewed.png",
//   },
//   {
//     id: 5,
//     brand: "BYC",
//     name: "MEN BOXERS",
//     price: "₦10,500",
//     rating: 4.35,
//     image: "/src/assets/recent_viewed.png",
//   },
// ];

// // How often the strip auto-advances, in milliseconds
// const SLIDE_INTERVAL_MS = 3000;

// function RecentlyViewed({ products = defaultProducts }) {
//   const trackRef = useRef(null);

//   useEffect(() => {
//     const track = trackRef.current;
//     if (!track) return;

//     const intervalId = setInterval(() => {
//       const firstCard = track.firstElementChild;
//       if (!firstCard) return;

//       // Distance to advance = one card's width + the gap
//       const cardStyle = window.getComputedStyle(track);
//       const gap = parseFloat(cardStyle.columnGap || cardStyle.gap || 0);
//       const advanceBy = firstCard.offsetWidth + gap;

//       const atEnd =
//         track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;

//       track.scrollTo({
//         left: atEnd ? 0 : track.scrollLeft + advanceBy,
//         behavior: "smooth",
//       });
//     }, SLIDE_INTERVAL_MS);

//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <section className="py-5">
//       <div className="container">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h5 className="fw-bold mb-0">Recently Viewed</h5>
//           <a href="#" className="text-danger text-decoration-none small">
//             See all &gt;
//           </a>
//         </div>

//         <div
//           ref={trackRef}
//           className="d-flex gap-3 pb-2"
//           style={{
//             overflowX: "hidden",
//             scrollSnapType: "x mandatory",
//             scrollBehavior: "smooth",
//           }}
//         >
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="border rounded overflow-hidden flex-shrink-0"
//               style={{
//                 width: "clamp(150px, 30vw, 200px)",
//                 scrollSnapAlign: "start",
//               }}
//             >
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-100"
//                 style={{ height: 160, objectFit: "cover" }}
//               />
//               <div className="p-2">
//                 <p className="text-uppercase text-secondary small mb-1">
//                   {product.brand}
//                 </p>
//                 <p className="small fw-semibold mb-1">{product.name}</p>
//                 <p className="small fw-bold mb-1">{product.price}</p>
//                 <div className="d-flex align-items-center gap-1">
//                   <Star size={12} color="#e8722c" fill="#e8722c" />
//                   <span className="small text-secondary">{product.rating}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default RecentlyViewed;
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchRecentlyViewed } from "../redux/slice/recentlyViewedSlice";

const SLIDE_INTERVAL_MS = 3000;

function RecentlyViewed({ excludeId }) {
  const dispatch = useDispatch();
  const trackRef = useRef(null);
  const { list: products, loading } = useSelector(
    (state) => state.recentlyViewed,
  );

  useEffect(() => {
    dispatch(fetchRecentlyViewed(excludeId));
  }, [dispatch, excludeId]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || products.length === 0) return;

    const intervalId = setInterval(() => {
      const firstCard = track.firstElementChild;
      if (!firstCard) return;

      const cardStyle = window.getComputedStyle(track);
      const gap = parseFloat(cardStyle.columnGap || cardStyle.gap || 0);
      const advanceBy = firstCard.offsetWidth + gap;
      const atEnd =
        track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;

      track.scrollTo({
        left: atEnd ? 0 : track.scrollLeft + advanceBy,
        behavior: "smooth",
      });
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [products]);

  if (loading || products.length === 0) return null;

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Recently Viewed</h5>
        </div>

        <div
          ref={trackRef}
          className="d-flex gap-3 pb-2"
          style={{
            overflowX: "hidden",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
          }}
        >
          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="border rounded overflow-hidden flex-shrink-0 text-decoration-none text-dark"
              style={{
                width: "clamp(150px, 30vw, 200px)",
                scrollSnapAlign: "start",
              }}
            >
              <img
                src={product.images?.[0]?.url}
                alt={product.name}
                className="w-100"
                style={{ height: 160, objectFit: "cover" }}
              />
              <div className="p-2">
                <p className="small fw-semibold mb-1">{product.name}</p>
                <p className="small fw-semibold mb-1 text-danger">
                  {product.sku}
                </p>
                <p className="small fw-semibold mb-1">
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

export default RecentlyViewed;
