import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./TopProducts.css";

const currency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
});

function TopProducts() {
  const navigate = useNavigate();

  const { list: products } = useSelector((state) => state.products);
  const { allOrders: orders } = useSelector((state) => state.orders);

  const topProducts = useMemo(() => {
    if (!products?.length) return [];

    const salesMap = {};

    orders
      ?.filter((order) => order.paymentStatus === "paid")
      .forEach((order) => {
        order.items.forEach((item) => {
          const id = String(item.product);

          if (!salesMap[id]) {
            salesMap[id] = {
              sold: 0,
              revenue: 0,
            };
          }

          salesMap[id].sold += item.quantity;
          salesMap[id].revenue += item.quantity * item.price;
        });
      });

    return products
      .map((product) => ({
        ...product,
        sold: salesMap[product._id]?.sold || 0,
        revenue: salesMap[product._id]?.revenue || 0,
      }))
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);
  }, [products, orders]);

  const stockBadge = (stock) => {
    if (stock === 0) {
      return <span className="badge text-bg-danger">Out of Stock</span>;
    }

    if (stock <= 10) {
      return <span className="badge text-bg-warning">Low Stock</span>;
    }

    return <span className="badge text-bg-success">In Stock</span>;
  };

  return (
    <div className="admin-card top-products-card h-100">
      {/* =========================
          HEADER
      ========================== */}
      <div className="top-products-header">
        <div>
          <h5 className="fw-bold mb-1">Top Selling Products</h5>

          <small className="text-secondary">Ranked by total units sold</small>
        </div>

        <span className="badge bg-danger">Top {topProducts.length}</span>
      </div>

      {/* =================================================
          DESKTOP / TABLET TABLE
      ================================================= */}
      <div className="top-products-table-wrapper">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Units Sold</th>
                <th>Revenue</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {topProducts.map((product, index) => (
                <tr key={product._id}>
                  {/* Ranking */}
                  <td>
                    <span className="product-rank">
                      {index === 0
                        ? "🥇"
                        : index === 1
                          ? "🥈"
                          : index === 2
                            ? "🥉"
                            : `#${index + 1}`}
                    </span>
                  </td>

                  {/* Product */}
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={product.images?.[0]?.url}
                        alt={product.name}
                        width={55}
                        height={55}
                        className="top-product-image"
                      />

                      <div className="top-product-info">
                        <div className="fw-semibold">{product.name}</div>

                        <small className="text-secondary">
                          {product.category?.name || product.category}
                        </small>
                      </div>
                    </div>
                  </td>

                  {/* Units Sold */}
                  <td className="fw-semibold">{product.sold}</td>

                  {/* Revenue */}
                  <td className="text-success fw-bold">
                    {currency.format(product.revenue)}
                  </td>

                  {/* Stock */}
                  <td>{product.stock}</td>

                  {/* Status */}
                  <td>{stockBadge(product.stock)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =================================================
          MOBILE CARDS
      ================================================= */}
      <div className="top-products-mobile">
        {topProducts.map((product, index) => (
          <div key={product._id} className="top-product-mobile-card">
            {/* Product Header */}
            <div className="top-product-mobile-header">
              <div className="d-flex align-items-center gap-3">
                <div className="mobile-product-rank">
                  {index === 0
                    ? "🥇"
                    : index === 1
                      ? "🥈"
                      : index === 2
                        ? "🥉"
                        : `#${index + 1}`}
                </div>

                <img
                  src={product.images?.[0]?.url}
                  alt={product.name}
                  className="top-product-mobile-image"
                />

                <div className="top-product-mobile-name">
                  <div className="fw-semibold">{product.name}</div>

                  <small className="text-secondary">
                    {product.category?.name || product.category}
                  </small>
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="top-product-mobile-details">
              <div className="top-product-stat">
                <small>Units Sold</small>
                <strong>{product.sold}</strong>
              </div>

              <div className="top-product-stat">
                <small>Revenue</small>
                <strong className="text-success">
                  {currency.format(product.revenue)}
                </strong>
              </div>

              <div className="top-product-stat">
                <small>Stock</small>
                <strong>{product.stock}</strong>
              </div>

              <div className="top-product-stat">
                <small>Status</small>
                <div>{stockBadge(product.stock)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* =========================
          EMPTY STATE
      ========================== */}
      {!topProducts.length && (
        <div className="text-center py-5 text-secondary">
          No products available.
        </div>
      )}

      {/* =========================
          VIEW ALL
      ========================== */}
      {topProducts.length > 0 && (
        <div className="text-center mt-4">
          <button
            type="button"
            className="btn btn-danger top-products-view-btn"
            onClick={() => navigate("/admin/products")}
          >
            View All Products
            <ArrowRight size={18} className="ms-2" />
          </button>
        </div>
      )}
    </div>
  );
}

export default TopProducts;
