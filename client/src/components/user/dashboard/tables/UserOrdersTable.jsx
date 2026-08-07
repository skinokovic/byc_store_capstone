// const STATUS_STYLES = {
//   pending: "text-bg-warning",
//   processing: "text-bg-info",
//   shipped: "text-bg-primary",
//   delivered: "text-bg-success",
//   cancelled: "text-bg-danger",
// };

// const PAYMENT_METHOD_LABELS = {
//   bank_transfer: "Bank transfer",
//   card: "Card",
// };

// const PAYMENT_STATUS_STYLES = {
//   pending: "text-bg-warning",
//   paid: "text-bg-success",
//   failed: "text-bg-danger",
// };

// function ItemRow({ item }) {
//   return (
//     <div className="d-flex align-items-center gap-2 mb-2">
//       <img
//         src={item.image}
//         alt={item.name}
//         width={45}
//         height={45}
//         style={{ objectFit: "cover", borderRadius: "6px" }}
//       />
//       <div>
//         <div>{item.name}</div>
//         {(item.size || item.color) && (
//           <small className="text-muted d-block">
//             {item.size && <>Size: {item.size}</>}
//             {item.size && item.color && " · "}
//             {item.color && <>Colour: {item.color}</>}
//           </small>
//         )}
//         <small className="text-danger">Qty: {item.quantity}</small>
//       </div>
//     </div>
//   );
// }

// function PaymentInfo({ order }) {
//   return (
//     <div>
//       <span className="d-block small fw-medium">
//         {PAYMENT_METHOD_LABELS[order.paymentMethod] || order.paymentMethod}
//       </span>
//       <span
//         className={`badge ${PAYMENT_STATUS_STYLES[order.paymentStatus] || "text-bg-secondary"}`}
//       >
//         {order.paymentStatus}
//       </span>
//       {order.paymentStatus === "paid" && order.paidAt && (
//         <span className="d-block text-muted small mt-1">
//           Paid {new Date(order.paidAt).toLocaleDateString()}
//         </span>
//       )}
//     </div>
//   );
// }

// function UserOrdersTable({ orders }) {
//   if (orders.length === 0) {
//     return <p className="text-secondary">You haven't placed any orders yet.</p>;
//   }

//   return (
//     <>
//       {/* Table - md and up */}
//       <div className="table-responsive d-none d-md-block">
//         <table className="table ud-table-lg align-middle mb-0">
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Items</th>
//               <th>Total</th>
//               <th>Payment Status</th>
//               <th>Order Status</th>
//               <th>Date</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <td>#{order._id.slice(-8).toUpperCase()}</td>

//                 <td>
//                   {order.items.map((item) => (
//                     <ItemRow key={item.product} item={item} />
//                   ))}
//                 </td>

//                 <td>₦{order.total.toLocaleString()}</td>

//                 <td style={{ minWidth: 130 }}>
//                   <PaymentInfo order={order} />
//                 </td>

//                 <td>
//                   <span
//                     className={`badge ${
//                       STATUS_STYLES[order.status] || "text-bg-secondary"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </td>

//                 <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Cards - below md */}
//       <div className="d-md-none d-flex flex-column gap-3">
//         {orders.map((order) => (
//           <div className="ud-row-card" key={order._id}>
//             <div className="d-flex justify-content-between align-items-start">
//               <p className="fw-semibold mb-0">
//                 #{order._id.slice(-8).toUpperCase()}
//               </p>
//               <span
//                 className={`badge ${STATUS_STYLES[order.status] || "text-bg-secondary"}`}
//               >
//                 {order.status}
//               </span>
//             </div>

//             <div className="mt-3 pt-3 border-top ud-row-card-border">
//               {order.items.map((item) => (
//                 <ItemRow key={item.product} item={item} />
//               ))}
//             </div>

//             <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top ud-row-card-border">
//               <PaymentInfo order={order} />
//               <span className="text-secondary small">
//                 {new Date(order.createdAt).toLocaleDateString()}
//               </span>
//             </div>

//             <div className="d-flex justify-content-between align-items-center mt-2">
//               <span className="text-secondary small">
//                 {order.items.length} item{order.items.length !== 1 ? "s" : ""}
//               </span>
//               <span className="fw-bold">₦{order.total.toLocaleString()}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default UserOrdersTable;
import { XCircle } from "lucide-react";

const STATUS_STYLES = {
  pending: "text-bg-warning",
  processing: "text-bg-info",
  shipped: "text-bg-primary",
  delivered: "text-bg-success",
  cancelled: "text-bg-danger",
};

const PAYMENT_METHOD_LABELS = {
  bank_transfer: "Bank transfer",
  card: "Card",
};

const PAYMENT_STATUS_STYLES = {
  pending: "text-bg-warning",
  paid: "text-bg-success",
  failed: "text-bg-danger",
};

function ItemRow({ item }) {
  return (
    <div className="d-flex align-items-center gap-2 mb-2">
      <img
        src={item.image}
        alt={item.name}
        width={45}
        height={45}
        style={{ objectFit: "cover", borderRadius: "6px" }}
      />
      <div>
        <div>{item.name}</div>
        {(item.size || item.color) && (
          <small className="text-muted d-block">
            {item.size && <>Size: {item.size}</>}
            {item.size && item.color && " · "}
            {item.color && <>Colour: {item.color}</>}
          </small>
        )}
        <small className="text-muted">Qty: {item.quantity}</small>
      </div>
    </div>
  );
}

function PaymentInfo({ order }) {
  return (
    <div>
      <span className="d-block small fw-medium">
        {PAYMENT_METHOD_LABELS[order.paymentMethod] || order.paymentMethod}
      </span>
      <span
        className={`badge ${PAYMENT_STATUS_STYLES[order.paymentStatus] || "text-bg-secondary"}`}
      >
        {order.paymentStatus}
      </span>
      {order.paymentStatus === "paid" && order.paidAt && (
        <span className="d-block text-muted small mt-1">
          Paid {new Date(order.paidAt).toLocaleDateString()}
        </span>
      )}
    </div>
  );
}

function CancelButton({ order, onCancel }) {
  if (order.status !== "pending") return null;

  return (
    <button
      type="button"
      className="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1"
      onClick={() => onCancel(order._id)}
    >
      <XCircle size={14} />
      Cancel order
    </button>
  );
}

function UserOrdersTable({ orders, onCancel }) {
  if (orders.length === 0) {
    return <p className="text-secondary">You haven't placed any orders yet.</p>;
  }

  return (
    <>
      {/* Table - md and up */}
      <div className="table-responsive d-none d-md-block">
        <table className="table ud-table-lg align-middle mb-0">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>#{order._id.slice(-8).toUpperCase()}</td>

                <td>
                  {order.items.map((item) => (
                    <ItemRow key={item.product} item={item} />
                  ))}
                </td>

                <td>₦{order.total.toLocaleString()}</td>

                <td style={{ minWidth: 130 }}>
                  <PaymentInfo order={order} />
                </td>

                <td>
                  <span
                    className={`badge ${
                      STATUS_STYLES[order.status] || "text-bg-secondary"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                <td>
                  <CancelButton order={order} onCancel={onCancel} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - below md */}
      <div className="d-md-none d-flex flex-column gap-3">
        {orders.map((order) => (
          <div className="ud-row-card" key={order._id}>
            <div className="d-flex justify-content-between align-items-start">
              <p className="fw-semibold mb-0">
                #{order._id.slice(-8).toUpperCase()}
              </p>
              <span
                className={`badge ${STATUS_STYLES[order.status] || "text-bg-secondary"}`}
              >
                {order.status}
              </span>
            </div>

            <div className="mt-3 pt-3 border-top ud-row-card-border">
              {order.items.map((item) => (
                <ItemRow key={item.product} item={item} />
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top ud-row-card-border">
              <PaymentInfo order={order} />
              <span className="text-secondary small">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-2">
              <span className="text-secondary small">
                {order.items.length} item{order.items.length !== 1 ? "s" : ""}
              </span>
              <span className="fw-bold">₦{order.total.toLocaleString()}</span>
            </div>

            {order.status === "pending" && (
              <div className="mt-3 pt-3 border-top ud-row-card-border">
                <CancelButton order={order} onCancel={onCancel} />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default UserOrdersTable;
