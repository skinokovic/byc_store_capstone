import { Link } from "react-router-dom";
import StaticPageLayout from "../../components/static/StaticPageLayout";

function PaymentMethodsPage() {
  return (
    <StaticPageLayout
      title="Payment Methods"
      subtitle="Secure, flexible ways to pay for your order."
    >
      <h2>Direct bank transfer</h2>
      <p>
        Pay directly into one of our bank accounts using your Order ID as the
        payment reference. Your order ships once funds have cleared and been
        confirmed by our team.
      </p>

      <h2>Card payment</h2>
      <p>
        We accept Mastercard, Visa, and Verve through our secure payment
        partner. Your card details are encrypted and processed directly by the
        payment gateway — we never see or store your card number.
      </p>

      <h2>Is it safe to pay online?</h2>
      <p>
        Yes. All card transactions are processed through a PCI-DSS compliant
        payment gateway, the same standard used by major banks and online
        retailers.
      </p>

      <h2>Need help with a payment issue?</h2>
      <p>
        If a payment didn't go through or you have a billing question, reach out
        via our{" "}
        <Link to="/contact" className="text-danger text-decoration-none">
          Contact page
        </Link>{" "}
        with your order ID and we'll sort it out promptly.
      </p>
    </StaticPageLayout>
  );
}

export default PaymentMethodsPage;
