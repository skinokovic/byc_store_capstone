import { Link } from "react-router-dom";
import StaticPageLayout from "../../components/static/StaticPageLayout";

function HowToOrderPage() {
  return (
    <StaticPageLayout
      title="How to Order"
      subtitle="A quick step-by-step guide to placing your first order."
    >
      <h2>Step-by-step</h2>
      <ol>
        <li>
          Browse our{" "}
          <Link to="/shop" className="text-danger text-decoration-none">
            Shop
          </Link>{" "}
          and select the size and colour you want for each product.
        </li>
        <li>Add items to your cart, then click "Proceed to Checkout."</li>
        <li>Log in or create a free account if you haven't already.</li>
        <li>
          Add or select a saved shipping address — your delivery fee is
          calculated automatically.
        </li>
        <li>Choose bank transfer or card payment.</li>
        <li>
          Place your order and complete payment. Card payments confirm
          instantly; bank transfers are confirmed once funds clear.
        </li>
      </ol>

      <h2>Need help mid-order?</h2>
      <p>
        If anything goes wrong during checkout, reach out via our{" "}
        <Link to="/contact" className="text-danger text-decoration-none">
          Contact page
        </Link>{" "}
        and we'll help sort it out quickly.
      </p>
    </StaticPageLayout>
  );
}

export default HowToOrderPage;
