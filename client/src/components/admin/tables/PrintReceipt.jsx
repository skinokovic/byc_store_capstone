import { forwardRef } from "react";

const PAYMENT_METHOD_LABELS = {
  bank_transfer: "Bank transfer",
  card: "Card",
};

/**
 * PrintReceipt
 * Print-friendly receipt matched to the real Order schema:
 * items[]: { name, price, quantity, size, color }
 * shippingAddress: { fullName, phone, street, city, state, country, postalCode }
 * subtotal, deliveryFee, total, paymentMethod, paymentStatus, paidAt, createdAt
 */
const PrintReceipt = forwardRef(({ order }, ref) => {
  if (!order) return null;

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "-";

  const formatDateTime = (date) =>
    date
      ? new Date(date).toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";

  const formatCurrency = (value) => `₦${Number(value).toLocaleString()}`;

  const { shippingAddress: addr } = order;

  return (
    <div ref={ref} className="receipt-container">
      <style>{`
        .receipt-container {
          width: 340px;
          margin: 0 auto;
          padding: 20px;
          font-family: "Courier New", monospace;
          font-size: 12px;
          color: #000;
          border: 2px solid #000;
        }
        .receipt-header { text-align: center; margin-bottom: 10px; }
        .receipt-header h2 { margin: 0; font-size: 15px; letter-spacing: 1px; }
        .receipt-header p { margin: 2px 0; font-size: 11px; }
        .receipt-divider { border-top: 1px solid #000; margin: 10px 0; }
        .receipt-section-title {
          font-weight: bold;
          margin: 0 0 6px 0;
          letter-spacing: 1px;
        }
        .receipt-row { display: flex; justify-content: space-between; margin: 3px 0; }
        .receipt-row span:first-child { flex-shrink: 0; margin-right: 8px; }

        .receipt-items-header {
          display: grid;
          grid-template-columns: 2fr 0.6fr 1fr 1fr;
          font-weight: bold;
          margin-bottom: 4px;
          font-size: 11px;
        }
        .receipt-items-header span:nth-child(2) { text-align: center; }
        .receipt-items-header span:nth-child(3),
        .receipt-items-header span:nth-child(4) { text-align: right; }

        .receipt-item-row {
          display: grid;
          grid-template-columns: 2fr 0.6fr 1fr 1fr;
          margin: 3px 0;
        }
        .receipt-item-row span:nth-child(2) { text-align: center; }
        .receipt-item-row span:nth-child(3),
        .receipt-item-row span:nth-child(4) { text-align: right; }
        .receipt-item-meta {
          grid-column: 1 / -1;
          font-size: 10px;
          color: #333;
          margin: -1px 0 3px 0;
        }
        .receipt-item-divider { border-top: 1px dashed #000; margin: 6px 0; }

        .receipt-total-row {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          margin-top: 4px;
          font-size: 14px;
        }
        .receipt-footer { text-align: center; margin-top: 14px; font-size: 11px; }
        .paid-stamp {
          text-align: center;
          font-weight: bold;
          letter-spacing: 2px;
          margin: 4px 0;
        }

        @media print {
          body * { visibility: hidden; }
          .receipt-container, .receipt-container * { visibility: visible; }
          .receipt-container { position: absolute; top: 0; left: 0; }
        }
      `}</style>

      <div className="receipt-header">
        <h2>BRIGHT BYC STORE</h2>
        <p>Port Harcourt</p>
        <p>support@brightbycstore.com</p>
      </div>

      <div className="receipt-divider" />

      <p className="receipt-section-title">ORDER RECEIPT</p>
      <div className="receipt-row">
        <span>Order ID:</span>
        <span>#{order._id.slice(-8).toUpperCase()}</span>
      </div>
      <div className="receipt-row">
        <span>Date:</span>
        <span>{formatDate(order.createdAt)}</span>
      </div>
      <div className="paid-stamp">STATUS: PAID ✓</div>

      <div className="receipt-divider" />

      <p className="receipt-section-title">Billed To:</p>
      <p style={{ margin: "2px 0" }}>{addr?.fullName || order.user?.name}</p>
      <p style={{ margin: "2px 0" }}>{addr?.phone}</p>
      <p style={{ margin: "2px 0" }}>
        {addr?.street}, {addr?.city}, {addr?.state}
      </p>
      <p style={{ margin: "2px 0" }}>
        {addr?.postalCode ? `${addr.postalCode}, ` : ""}
        {addr?.country}
      </p>

      <div className="receipt-divider" />

      <div className="receipt-items-header">
        <span>Item</span>
        <span>Qty</span>
        <span>Price</span>
        <span>Total</span>
      </div>
      <div className="receipt-item-divider" />
      {order.items.map((item, idx) => (
        <div key={idx}>
          <div className="receipt-item-row">
            <span>{item.name}</span>
            <span>{item.quantity}</span>
            <span>{formatCurrency(item.price)}</span>
            <span>{formatCurrency(item.price * item.quantity)}</span>
            {(item.size || item.color) && (
              <span className="receipt-item-meta">
                {item.size && <>Size: {item.size}</>}
                {item.size && item.color && " · "}
                {item.color && <>Colour: {item.color}</>}
              </span>
            )}
          </div>
        </div>
      ))}

      <div className="receipt-divider" />

      <div className="receipt-row">
        <span>Subtotal:</span>
        <span>{formatCurrency(order.subtotal)}</span>
      </div>
      <div className="receipt-row">
        <span>Delivery Fee:</span>
        <span>{formatCurrency(order.deliveryFee)}</span>
      </div>
      <div className="receipt-item-divider" />
      <div className="receipt-total-row">
        <span>TOTAL:</span>
        <span>{formatCurrency(order.total)}</span>
      </div>

      <div className="receipt-divider" />

      <div className="receipt-row">
        <span>Payment Method:</span>
        <span>
          {PAYMENT_METHOD_LABELS[order.paymentMethod] || order.paymentMethod}
        </span>
      </div>
      <div className="receipt-row">
        <span>Paid At:</span>
        <span>{formatDateTime(order.paidAt)}</span>
      </div>

      <div className="receipt-divider" />

      <div className="receipt-footer">
        <p>Thank you for your order!</p>
      </div>
    </div>
  );
});

PrintReceipt.displayName = "PrintReceipt";

export default PrintReceipt;
