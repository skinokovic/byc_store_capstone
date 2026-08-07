import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ProductGallery({ images = [], alt = "Product image" }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) return null;

  function showPrev() {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function showNext() {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  return (
    <div>
      <div className="position-relative mb-3">
        <img
          src={images[activeIndex]}
          alt={alt}
          className="w-100 rounded"
          style={{ height: 340, objectFit: "cover" }}
        />
        <button
          type="button"
          onClick={showPrev}
          className="btn btn-light rounded-circle position-absolute top-50 start-0 translate-middle-y ms-2 d-flex align-items-center justify-content-center"
          style={{ width: 32, height: 32 }}
          aria-label="Previous image"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          onClick={showNext}
          className="btn btn-light rounded-circle position-absolute top-50 end-0 translate-middle-y me-2 d-flex align-items-center justify-content-center"
          style={{ width: 32, height: 32 }}
          aria-label="Next image"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="d-flex gap-2">
        {images.map((image, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`btn p-0 border rounded overflow-hidden ${
              index === activeIndex ? "border-danger border-2" : ""
            }`}
            style={{ width: 56, height: 56, flexShrink: 0 }}
          >
            <img
              src={image}
              alt={`${alt} thumbnail ${index + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
