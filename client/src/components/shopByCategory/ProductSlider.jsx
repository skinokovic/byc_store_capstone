import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import ProductCard from "./ProductCards";
import SwiperButtons from "./SwiperButton";

import "swiper/css";
import "swiper/css/navigation";

function ProductSlider({ products }) {
  if (!products.length) {
    return <div className="text-center mt-5">No products found.</div>;
  }

  return (
    <div className="product-slider-wrapper">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        }}
        spaceBetween={25}
        slidesPerView={3}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <SwiperButtons />
    </div>
  );
}

export default ProductSlider;

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";

// import ProductCard from "./ProductCards";
// import CustomNavigation from "./CustomNavigation";

// function ProductSlider({ products }) {
//   if (!products?.length) {
//     return <div className="text-center py-5">No products found.</div>;
//   }

//   return (
//     <div className="category-slider">
//       <CustomNavigation />

//       <Swiper
//         modules={[Navigation]}
//         navigation={{
//           nextEl: ".category-next",
//           prevEl: ".category-prev",
//         }}
//         spaceBetween={25}
//         slidesPerView={3}
//         breakpoints={{
//           0: {
//             slidesPerView: 1,
//           },

//           576: {
//             slidesPerView: 2,
//           },

//           992: {
//             slidesPerView: 3,
//           },
//         }}
//       >
//         {products.map((product) => (
//           <SwiperSlide key={product._id}>
//             <ProductCard product={product} />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }

// export default ProductSlider;
