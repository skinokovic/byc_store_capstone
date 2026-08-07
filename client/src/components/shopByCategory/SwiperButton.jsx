import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function SwiperButtons() {
  return (
    <>
      <button className="swiper-prev">
        <FaChevronLeft />
      </button>

      <button className="swiper-next">
        <FaChevronRight />
      </button>
    </>
  );
}

export default SwiperButtons;
