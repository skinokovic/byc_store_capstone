import { Link } from "react-router-dom";

function OrderItem({ item, product, currency }) {
  return (
    <div className="d-flex gap-3 py-3 border-bottom">
      {/* ------------------------------------------------------- */}
      {/* Product Image                                            */}
      {/* Logged-in: product == item.product                       */}
      {/* Guest:     product == item                               */}
      {/* ------------------------------------------------------- */}

      <Link to={`/product/${product._id}`}>
        <img
          src={product?.images?.[0]?.url}
          alt={product?.name}
          className="rounded"
          style={{
            width: 72,
            height: 72,
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
      </Link>

      <div className="flex-grow-1 d-flex justify-content-between gap-3">
        <div>
          {/* Product Name */}
          <p className="fw-semibold text-uppercase small mb-1">
            {product?.name}
          </p>

          {/* SKU */}
          <p className="text-secondary small mb-1">{product?.sku}</p>

          {/* Selected Variant */}
          {(item.size || item.color) && (
            <p className="text-secondary small mb-1">
              {item.size && (
                <span>
                  Size: <strong>{item.size}</strong>
                </span>
              )}

              {item.size && item.color && <span className="mx-1">•</span>}

              {item.color && (
                <span>
                  Colour: <strong>{item.color}</strong>
                </span>
              )}
            </p>
          )}

          {/* Quantity */}
          <p className="text-secondary small mb-0">Qty: {item.quantity}</p>
        </div>

        {/* Price */}
        <p className="fw-semibold mb-0 text-nowrap">
          {currency.format(product?.price || 0)}
        </p>
      </div>
    </div>
  );
}

export default OrderItem;
