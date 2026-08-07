import { Link } from "react-router-dom";
import StaticPageLayout from "../../components/static/StaticPageLayout";

function RefundsPage() {
  return (
    <StaticPageLayout
      title="Refunds & Exchanges"
      subtitle="Our policy on returns, exchanges, and refunds."
    >
      <h2>Return window</h2>
      <p>
        Unworn items in their original packaging can be returned or exchanged
        within 7 days of delivery.
      </p>

      <h2>Hygiene items</h2>
      <p>
        For hygiene reasons, opened underwear and singlet packs can only be
        exchanged in the case of a manufacturing defect — not for a change of
        mind or incorrect size selection once opened.
      </p>

      <h2>How refunds are processed</h2>
      <ul>
        <li>
          Card payments are refunded to the original card, typically within 5–10
          business days.
        </li>
        <li>
          Bank transfer payments are refunded directly to your bank account,
          typically within 3–5 business days after approval.
        </li>
      </ul>

      <h2>How to start a return</h2>
      <p>
        Go to your{" "}
        <Link to="/contact" className="text-danger text-decoration-none">
          Orders page
        </Link>{" "}
        , select the relevant order, and choose "Request Return." Our support
        team will guide you through the next steps.
      </p>

      <h2>Items that can't be returned</h2>
      <ul>
        <li>Items marked as final sale at checkout</li>
        <li>Opened underwear/singlet packs without a manufacturing defect</li>
        <li>Items returned after the 7-day window</li>
      </ul>
    </StaticPageLayout>
  );
}

export default RefundsPage;
