import { Trash2, ShoppingCart } from "lucide-react";

function WishlistTable({ onRemove, onAddToCart, products }) {
  if (products.length === 0) {
    return <p className="text-secondary">Your wishlist is empty.</p>;
  }

  return (
    <>
      <div className="table-responsive d-none d-md-block">
        <table className="table ud-table-lg align-middle mb-0">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={item.images?.[0]?.url}
                      alt={item.name}
                      style={{ width: 40, height: 40, objectFit: "cover" }}
                      className="rounded flex-shrink-0"
                    />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td>₦{(item.price || 0).toLocaleString()}</td>
                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      onClick={() => onAddToCart(item._id)}
                      className="ud-icon-btn-sm"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart size={14} />
                    </button>
                    <button
                      onClick={() => onRemove(item._id)}
                      className="ud-icon-btn-sm"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-md-none d-flex flex-column gap-3">
        {products.map((item) => (
          <div className="ud-row-card" key={item._id}>
            <div className="d-flex gap-3 align-items-center">
              <img
                src={item.images?.[0]?.url}
                alt={item.name}
                style={{ width: 56, height: 56, objectFit: "cover" }}
                className="rounded flex-shrink-0"
              />
              <div className="flex-grow-1">
                <p className="fw-semibold mb-0">{item.name}</p>
                <p className="text-secondary small mb-0">
                  ₦{(item.price || 0).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-3 pt-3 border-top ud-row-card-border">
              <button
                onClick={() => onAddToCart(item._id)}
                className="ud-icon-btn-sm"
                aria-label="Add to cart"
              >
                <ShoppingCart size={14} />
              </button>
              <button
                onClick={() => onRemove(item._id)}
                className="ud-icon-btn-sm"
                aria-label="Remove from wishlist"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default WishlistTable;
