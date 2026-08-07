import { Link } from "react-router-dom";
import StaticPageLayout from "../../components/static/StaticPageLayout";

function HowToTrackPage() {
  return (
    <StaticPageLayout
      title="How to Track Your Order"
      subtitle="Check your order status anytime from your dashboard."
    >
      <h2>Tracking your order</h2>
      <p>
        Go to{" "}
        <Link
          to="/dashboard/orders"
          className="text-danger text-decoration-none"
        >
          My Orders
        </Link>{" "}
        in your account dashboard to see the current status of every order
        you've placed.
      </p>

      <h2>What the statuses mean</h2>
      <ul>
        <li>
          <strong>Pending</strong> — order placed, awaiting payment
          confirmation.
        </li>
        <li>
          <strong>Processing</strong> — payment confirmed, your order is being
          prepared.
        </li>
        <li>
          <strong>Shipped</strong> — your order is on its way.
        </li>
        <li>
          <strong>Delivered</strong> — your order has arrived.
        </li>
        <li>
          <strong>Cancelled</strong> — the order was cancelled and will not be
          fulfilled.
        </li>
      </ul>

      <h2>Haven't received an update?</h2>
      <p>
        Delivery times can occasionally vary due to your location or courier
        availability. If your order hasn't moved in longer than the expected
        delivery window, contact us with your order ID and we'll look into it
        right away.
      </p>
    </StaticPageLayout>
  );
}

export default HowToTrackPage;
