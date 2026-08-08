import { useRef, useState } from "react";
import { AlertTriangle, Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import PrintReceipt from "./PrintReceipt";

const STATUS_OPTIONS = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];
const PAYMENT_STATUS_OPTIONS = ["pending", "paid", "failed"];

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

function StatusSelect({ order, onStatusChange }) {
  const isPaid = order.paymentStatus === "paid";
  const isCancelled = order.status === "cancelled";

  if (isCancelled) {
    return (
      <span className={`badge ${STATUS_STYLES.cancelled}`}>Cancelled</span>
    );
  }

  const availableOptions = isPaid
    ? STATUS_OPTIONS
    : STATUS_OPTIONS.filter((s) => s === "pending" || s === "cancelled");

  return (
    <div className="d-flex align-items-center gap-2">
      <select
        value={order.status}
        onChange={(e) => onStatusChange(order._id, { status: e.target.value })}
        className={`form-select form-select-sm admin-input admin-status-select ${STATUS_STYLES[order.status] || ""}`}
      >
        {availableOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      {!isPaid && (
        <span
          className="text-warning d-inline-flex align-items-center flex-shrink-0"
          title="Payment not confirmed yet — status is limited to pending or cancelled"
        >
          <AlertTriangle size={16} />
        </span>
      )}
    </div>
  );
}

function PaymentInfo({ order, onStatusChange }) {
  const isCard = order.paymentMethod === "card";
  const isCancelled = order.status === "cancelled";

  return (
    <div>
      <span className="d-block small fw-medium mb-1">
        {PAYMENT_METHOD_LABELS[order.paymentMethod] || order.paymentMethod}
      </span>

      {isCard || isCancelled ? (
        <span
          className={`badge ${PAYMENT_STATUS_STYLES[order.paymentStatus] || "text-bg-secondary"}`}
        >
          {order.paymentStatus}
        </span>
      ) : (
        <select
          value={order.paymentStatus}
          onChange={(e) =>
            onStatusChange(order._id, { paymentStatus: e.target.value })
          }
          className={`form-select form-select-sm admin-input ${PAYMENT_STATUS_STYLES[order.paymentStatus] || ""}`}
          style={{ minWidth: 110 }}
        >
          {PAYMENT_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      )}

      {order.paymentStatus === "paid" && order.paidAt && (
        <span className="d-block text-muted small mt-1">
          {new Date(order.paidAt).toLocaleDateString()}
        </span>
      )}
    </div>
  );
}

// Small reusable print trigger — only rendered when the order is paid
function PrintReceiptButton({ order, onPrint }) {
  if (order.paymentStatus !== "paid") return null;

  return (
    <button
      type="button"
      className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center justify-content-center flex-shrink-0"
      style={{ width: 30, height: 30, padding: 0 }}
      title="Print receipt"
      onClick={() => onPrint(order)}
    >
      <Printer size={15} />
    </button>
  );
}

function OrdersTable({ orders, onStatusChange }) {
  const [orderToPrint, setOrderToPrint] = useState(null);
  const receiptRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: receiptRef,
    documentTitle: orderToPrint
      ? `Receipt-${orderToPrint._id.slice(-8).toUpperCase()}`
      : "Receipt",
  });

  // Selects the order, waits a tick for PrintReceipt to render with it, then prints
  const onPrintClick = (order) => {
    setOrderToPrint(order);
    setTimeout(() => handlePrint(), 100);
  };

  if (orders.length === 0) {
    return <p className="text-secondary">No orders yet.</p>;
  }

  return (
    <>
      {/* Table - md and up */}
      <div className="table-responsive d-none d-md-block">
        <table className="table admin-table-lg align-middle mb-0">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <span>#{order._id.slice(-8).toUpperCase()}</span>
                    <PrintReceiptButton order={order} onPrint={onPrintClick} />
                  </div>
                </td>
                <td>{order.user?.name}</td>
                <td>
                  {order.items.map((item) => (
                    <div
                      key={item.product}
                      className="d-flex align-items-center gap-2 mb-2"
                    >
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
                        <small className="text-muted">
                          Qty: {item.quantity}
                        </small>
                      </div>
                    </div>
                  ))}
                </td>
                <td>₦{order.total.toLocaleString()}</td>
                <td style={{ minWidth: 130 }}>
                  <PaymentInfo order={order} onStatusChange={onStatusChange} />
                </td>
                <td style={{ minWidth: 190 }}>
                  <StatusSelect order={order} onStatusChange={onStatusChange} />
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - below md */}
      <div className="d-md-none d-flex flex-column gap-3">
        {orders.map((order) => (
          <div className="admin-row-card" key={order._id}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <p className="fw-semibold mb-0 d-flex align-items-center gap-2">
                  #{order._id.slice(-8).toUpperCase()}
                  <PrintReceiptButton order={order} onPrint={onPrintClick} />
                </p>
                <p className="text-secondary small mb-0">{order.user?.name}</p>
              </div>
              <span
                className={`badge ${STATUS_STYLES[order.status] || "text-bg-secondary"}`}
              >
                {order.status}
              </span>
            </div>

            <div className="mt-3 pt-3 border-top admin-row-card-border">
              <PaymentInfo order={order} onStatusChange={onStatusChange} />
            </div>

            <div className="mt-3">
              <StatusSelect order={order} onStatusChange={onStatusChange} />
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top admin-row-card-border">
              <span className="text-secondary small">
                {order.items.length} item{order.items.length !== 1 ? "s" : ""} ·{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
              <span className="fw-bold">₦{order.total.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Hidden off-screen; only becomes visible via @media print rules in PrintReceipt */}
      <div style={{ display: "none" }}>
        <PrintReceipt order={orderToPrint} ref={receiptRef} />
      </div>
    </>
  );
}

export default OrdersTable;
