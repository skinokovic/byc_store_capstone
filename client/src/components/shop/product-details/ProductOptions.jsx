import { useState } from "react";
import { ShoppingCart } from "lucide-react";

function ProductOptions({ sizes = [], colors = [], onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(sizes[0] || null);
  const [selectedColor, setSelectedColor] = useState(colors[0]?.name || null);
  const [quantity, setQuantity] = useState(1);

  function decreaseQty() {
    setQuantity((q) => Math.max(1, q - 1));
  }
  function increaseQty() {
    setQuantity((q) => q + 1);
  }

  return (
    <div>
      {sizes.length > 0 && (
        <div className="mb-4">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <p className="small fw-semibold mb-0">Available Sizes</p>
            {selectedSize && (
              <span className="small text-secondary">
                Selected: <strong className="text-dark">{selectedSize}</strong>
              </span>
            )}
          </div>
          <div className="d-flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`btn btn-sm d-flex align-items-center justify-content-center flex-shrink-0 ${
                  selectedSize === size ? "btn-danger" : "btn-outline-secondary"
                }`}
                style={{
                  minWidth: 44,
                  height: 44,
                  borderRadius: 6,
                  padding: "0 12px",
                  fontWeight: 600,
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div className="mb-4">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <p className="small fw-semibold mb-0">Available Colours</p>
            {selectedColor && (
              <span className="small text-secondary">
                Selected: <strong className="text-dark">{selectedColor}</strong>
              </span>
            )}
          </div>
          <div className="d-flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color.name)}
                aria-label={color.name}
                className="btn p-0 rounded-circle flex-shrink-0 position-relative"
                style={{
                  width: 36,
                  height: 36,
                  backgroundColor: color.hex,
                  border:
                    selectedColor === color.name
                      ? "3px solid #212121"
                      : "1px solid #dee2e6",
                  boxShadow:
                    selectedColor === color.name
                      ? "0 0 0 2px #fff, 0 0 0 3px #212121"
                      : "none",
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="d-flex flex-wrap gap-2">
        <div
          className="d-flex align-items-center border rounded flex-shrink-0"
          style={{ height: 44 }}
        >
          <button
            type="button"
            onClick={decreaseQty}
            className="btn btn-danger d-flex align-items-center justify-content-center h-100"
            style={{ width: 40 }}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span
            className="px-3 fw-semibold"
            style={{ minWidth: 32, textAlign: "center" }}
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={increaseQty}
            className="btn btn-danger d-flex align-items-center justify-content-center h-100"
            style={{ width: 40 }}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={() =>
            onAddToCart?.({
              size: selectedSize,
              color: selectedColor,
              quantity,
            })
          }
          className="btn btn-danger flex-grow-1 d-flex align-items-center justify-content-center gap-2"
          style={{ height: 44 }}
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductOptions;
