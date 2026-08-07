// import { Link } from "react-router-dom";
// import { Pencil, Trash2 } from "lucide-react";

// function ProductsTable({ products, onDelete }) {
//   if (products.length === 0) {
//     return <p className="text-secondary">No products yet.</p>;
//   }

//   return (
//     <>
//       {/* Table - md and up */}
//       <div className="table-responsive d-none d-md-block">
//         <table className="table admin-table-lg align-middle mb-0">
//           <thead>
//             <tr>
//               <th>Product</th>
//               <th>SKU</th>
//               <th>S.Description</th>
//               <th>Long Description</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>Stock</th>
//               <th>Variants</th>
//               <th className="text-end">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product._id}>
//                 <td>
//                   <div className="d-flex align-items-center gap-2">
//                     <img
//                       src={product.images?.[0]?.url}
//                       alt={product.name}
//                       style={{ width: 40, height: 40, objectFit: "cover" }}
//                       className="rounded flex-shrink-0"
//                     />
//                     <span>{product.name}</span>
//                   </div>
//                 </td>
//                 <td>{product.sku}</td>
//                 <td>{product.short_description}</td>
//                 <td>{product.long_description}</td>
//                 <td>{product.category?.name || "—"}</td>
//                 <td>₦{product.price?.toLocaleString()}</td>
//                 <td>
//                   <span
//                     className={`badge ${product.stock > 0 ? "text-bg-success" : "text-bg-danger"}`}
//                   >
//                     {product.stock}
//                   </span>
//                 </td>
//                 <td>
//                   <span className="small text-secondary">
//                     {product.sizes?.length || 0} sizes ·{" "}
//                     {product.colors?.length || 0} colours
//                   </span>
//                 </td>
//                 <td>
//                   <div className="d-flex justify-content-end gap-2">
//                     <Link
//                       to={`/admin/products/edit/${product._id}`}
//                       className="admin-icon-btn-sm"
//                       aria-label="Edit product"
//                     >
//                       <Pencil size={14} />
//                     </Link>
//                     <button
//                       type="button"
//                       onClick={() => onDelete(product._id)}
//                       className="admin-icon-btn-sm admin-icon-btn-danger"
//                       aria-label="Delete product"
//                     >
//                       <Trash2 size={14} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Cards - below md */}
//       <div className="d-md-none d-flex flex-column gap-3">
//         {products.map((product) => (
//           <div className="admin-row-card" key={product._id}>
//             <div className="d-flex gap-3">
//               <img
//                 src={product.images?.[0]?.url}
//                 alt={product.name}
//                 style={{ width: 56, height: 56, objectFit: "cover" }}
//                 className="rounded flex-shrink-0"
//               />
//               <div className="flex-grow-1 min-w-0">
//                 <p className="fw-semibold mb-0 text-truncate">{product.name}</p>
//                 <p className="text-secondary small mb-1">{product.sku}</p>
//                 <p className="text-secondary small mb-0">
//                   {product.category?.name || "—"}
//                 </p>
//               </div>
//             </div>

//             <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top admin-row-card-border">
//               <div>
//                 <span className="fw-bold me-2">
//                   ₦{product.price?.toLocaleString()}
//                 </span>
//                 <span
//                   className={`badge ${product.stock > 0 ? "text-bg-success" : "text-bg-danger"}`}
//                 >
//                   {product.stock} in stock
//                 </span>

//                 <span className="small text-secondary">
//                   {product.sizes?.length || 0} sizes ·{" "}
//                   {product.colors?.length || 0} colours
//                 </span>
//               </div>
//               <div className="d-flex gap-2">
//                 <Link
//                   to={`/admin/products/edit/${product._id}`}
//                   className="admin-icon-btn-sm"
//                   aria-label="Edit product"
//                 >
//                   <Pencil size={14} />
//                 </Link>
//                 <button
//                   type="button"
//                   onClick={() => onDelete(product._id)}
//                   className="admin-icon-btn-sm admin-icon-btn-danger"
//                   aria-label="Delete product"
//                 >
//                   <Trash2 size={14} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default ProductsTable;
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

function ProductsTable({ products, onDelete }) {
  if (products.length === 0) {
    return <p className="text-secondary">No products yet.</p>;
  }

  return (
    <>
      {/* Table - md and up */}
      <div className="table-responsive d-none d-md-block">
        <table className="table admin-table-lg align-middle mb-0">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Variants</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td style={{ maxWidth: 240 }}>
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={product.images?.[0]?.url}
                      alt={product.name}
                      style={{ width: 40, height: 40, objectFit: "cover" }}
                      className="rounded flex-shrink-0"
                    />
                    <span
                      className="d-inline-block text-truncate"
                      style={{ maxWidth: 180 }}
                      title={product.name}
                    >
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="text-nowrap">{product.sku}</td>
                <td className="text-nowrap">{product.category?.name || "—"}</td>
                <td className="text-nowrap">
                  ₦{product.price?.toLocaleString()}
                </td>
                <td>
                  <span
                    className={`badge ${product.stock > 0 ? "text-bg-success" : "text-bg-danger"}`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="text-nowrap">
                  <span className="small text-secondary">
                    {product.sizes?.length || 0} sizes ·{" "}
                    {product.colors?.length || 0} colours
                  </span>
                </td>
                <td className="text-end" style={{ whiteSpace: "nowrap" }}>
                  <div className="d-inline-flex gap-2">
                    <Link
                      to={`/admin/products/edit/${product._id}`}
                      className="admin-icon-btn-sm"
                      aria-label="Edit product"
                    >
                      <Pencil size={14} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => onDelete(product._id)}
                      className="admin-icon-btn-sm admin-icon-btn-danger"
                      aria-label="Delete product"
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

      {/* Cards - below md */}
      <div className="d-md-none d-flex flex-column gap-3">
        {products.map((product) => (
          <div className="admin-row-card" key={product._id}>
            <div className="d-flex gap-3">
              <img
                src={product.images?.[0]?.url}
                alt={product.name}
                style={{ width: 56, height: 56, objectFit: "cover" }}
                className="rounded flex-shrink-0"
              />
              <div className="flex-grow-1 min-w-0">
                <p className="fw-semibold mb-0 text-truncate">{product.name}</p>
                <p className="text-secondary small mb-1">{product.sku}</p>
                <p className="text-secondary small mb-0">
                  {product.category?.name || "—"}
                </p>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top admin-row-card-border">
              <div>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <span className="fw-bold">
                    ₦{product.price?.toLocaleString()}
                  </span>
                  <span
                    className={`badge ${product.stock > 0 ? "text-bg-success" : "text-bg-danger"}`}
                  >
                    {product.stock} in stock
                  </span>
                </div>
                <span className="small text-secondary d-block mt-1">
                  {product.sizes?.length || 0} sizes ·{" "}
                  {product.colors?.length || 0} colours
                </span>
              </div>
              <div className="d-flex gap-2">
                <Link
                  to={`/admin/products/edit/${product._id}`}
                  className="admin-icon-btn-sm"
                  aria-label="Edit product"
                >
                  <Pencil size={14} />
                </Link>
                <button
                  type="button"
                  onClick={() => onDelete(product._id)}
                  className="admin-icon-btn-sm admin-icon-btn-danger"
                  aria-label="Delete product"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductsTable;
