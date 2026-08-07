// import { useMemo } from "react";
// import { useSelector } from "react-redux";

// const currency = new Intl.NumberFormat("en-NG", {
//   style: "currency",
//   currency: "NGN",
// });

// function TopProducts() {
//   const { list: products } = useSelector((state) => state.products);
//   const { allOrders: orders } = useSelector((state) => state.orders);

//   const topProducts = useMemo(() => {
//     if (!products?.length) return [];

//     const salesMap = {};

//     // Count sales from paid orders only
//     orders
//       ?.filter((order) => order.paymentStatus === "paid")
//       ?.forEach((order) => {
//         console.log("ORDER", order);
//         order.items.forEach((item) => {
//           console.log("ITEM", item);
//           const id = item.product;

//           if (!salesMap[id]) {
//             salesMap[id] = {
//               sold: 0,
//               revenue: 0,
//             };
//           }

//           salesMap[id].sold += item.quantity;
//           salesMap[id].revenue += item.quantity * item.price;
//         });
//       });

//     return products
//       .map((product) => ({
//         ...product,
//         sold: salesMap[product._id]?.sold || 0,
//         revenue: salesMap[product._id]?.revenue || 0,
//       }))
//       .sort((a, b) => b.sold - a.sold)
//       .slice(0, 7);
//   }, [products, orders]);

//   const stockBadge = (stock) => {
//     if (stock === 0)
//       return <span className="badge text-bg-danger">Out of Stock</span>;

//     if (stock <= 10)
//       return <span className="badge text-bg-warning">Low Stock</span>;

//     return <span className="badge text-bg-success">In Stock</span>;
//   };

//   return (
//     <div className="admin-card h-100">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h5 className="fw-bold mb-0">Top Selling Products</h5>

//           <small className="text-secondary">Ranked by units sold</small>
//         </div>

//         <span className="badge bg-danger">Top {topProducts.length}</span>
//       </div>

//       <div className="table-responsive">
//         <table className="table align-middle">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Product</th>
//               <th>Units Sold</th>
//               <th>Revenue</th>
//               <th>Stock</th>
//               <th>Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {topProducts.map((product, index) => (
//               <tr key={product._id}>
//                 <td>
//                   {index === 0
//                     ? "🥇"
//                     : index === 1
//                       ? "🥈"
//                       : index === 2
//                         ? "🥉"
//                         : `#${index + 1}`}
//                 </td>

//                 <td>
//                   <div className="d-flex align-items-center gap-3">
//                     <img
//                       src={product.images?.[0]?.url}
//                       alt={product.name}
//                       width={55}
//                       height={55}
//                       style={{
//                         objectFit: "cover",
//                         borderRadius: 8,
//                       }}
//                     />

//                     <div>
//                       <div className="fw-semibold">{product.name}</div>

//                       <small className="text-secondary">
//                         {product.category?.name || product.category}
//                       </small>
//                     </div>
//                   </div>
//                 </td>

//                 <td className="fw-semibold">{product.sold}</td>

//                 <td className="text-success fw-bold">
//                   {currency.format(product.revenue)}
//                 </td>

//                 <td>{product.stock}</td>

//                 <td>{stockBadge(product.stock)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {!topProducts.length && (
//         <div className="text-center py-5 text-secondary">
//           No products available.
//         </div>
//       )}
//     </div>
//   );
// }

// export default TopProducts;

import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * Currency formatter
 * Formats numbers like:
 * 11500 -> ₦11,500.00
 */
const currency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
});

function TopProducts() {
  const navigate = useNavigate();
  /**
   * Fetch all products from Redux.
   * We need this because it contains:
   * - image
   * - stock
   * - category
   * - product name
   */
  const { list: products } = useSelector((state) => state.products);

  /**
   * Fetch all orders.
   * Sales and revenue will be calculated from orders,
   * NOT from the product collection.
   */
  const { allOrders: orders } = useSelector((state) => state.orders);

  /**
   * useMemo prevents recalculating every render.
   * It only runs again when products or orders change.
   */
  const topProducts = useMemo(() => {
    // Nothing to calculate if there are no products.
    if (!products?.length) return [];

    /**
     * salesMap
     *
     * Stores sales information grouped by Product ID.
     *
     * Example:
     *
     * {
     *   "productId123": {
     *      sold: 15,
     *      revenue: 120000
     *   }
     * }
     */
    const salesMap = {};

    /**
     * Loop through every PAID order.
     *
     * Cancelled or unpaid orders should not count
     * towards revenue or units sold.
     */
    orders
      ?.filter((order) => order.paymentStatus === "paid")

      .forEach((order) => {
        /**
         * Every order can contain multiple products.
         */
        order.items.forEach((item) => {
          /**
           * In your Order model,
           * item.product is stored as the Product ID string.
           *
           * Example:
           * product: "6a5eaf94eedc42..."
           */
          const id = String(item.product);

          /**
           * First time seeing this product?
           * Create a record for it.
           */
          if (!salesMap[id]) {
            salesMap[id] = {
              sold: 0,
              revenue: 0,
            };
          }

          /**
           * Increase units sold.
           */
          salesMap[id].sold += item.quantity;

          /**
           * Increase total revenue.
           */
          salesMap[id].revenue += item.quantity * item.price;
        });
      });

    /**
     * Merge sales statistics into each product.
     *
     * This allows us to keep:
     * - stock
     * - image
     * - category
     * while adding:
     * - sold
     * - revenue
     */
    return (
      products
        .map((product) => ({
          ...product,

          /**
           * If product has never been sold,
           * default to zero.
           */
          sold: salesMap[product._id]?.sold || 0,

          revenue: salesMap[product._id]?.revenue || 0,
        }))

        /**
         * Highest selling products first.
         */
        .sort((a, b) => b.sold - a.sold)

        /**
         * Dashboard only needs Top 5.
         * Full list can be viewed elsewhere.
         */
        .slice(0, 5)
    );
  }, [products, orders]);

  /**
   * Returns a Bootstrap badge depending on stock level.
   */
  const stockBadge = (stock) => {
    if (stock === 0)
      return <span className="badge text-bg-danger">Out of Stock</span>;

    if (stock <= 10)
      return <span className="badge text-bg-warning">Low Stock</span>;

    return <span className="badge text-bg-success">In Stock</span>;
  };

  return (
    <div className="admin-card h-100">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold mb-0">Top Selling Products</h5>

          <small className="text-secondary">Ranked by total units sold</small>
        </div>

        <span className="badge bg-danger">Top {topProducts.length}</span>
      </div>

      {/* Responsive table */}
      <div className="table-responsive">
        <table className="table align-middle">
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
                  {index === 0
                    ? "🥇"
                    : index === 1
                      ? "🥈"
                      : index === 2
                        ? "🥉"
                        : `#${index + 1}`}
                </td>

                {/* Product Info */}
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={product.images?.[0]?.url}
                      alt={product.name}
                      width={55}
                      height={55}
                      style={{
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />

                    <div>
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

                {/* Current Stock */}
                <td>{product.stock}</td>

                {/* Stock Status */}
                <td>{stockBadge(product.stock)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {!topProducts.length && (
        <div className="text-center py-5 text-secondary">
          No products available.
        </div>
      )}

      {topProducts.length > 0 && (
        <div className="text-center mt-4">
          <button
            className="btn btn-danger"
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
