import { Link } from "react-router-dom";
import StaticPageLayout from "../../components/static/StaticPageLayout";

function AffiliatePage() {
  return (
    <StaticPageLayout
      title="Affiliate Program"
      subtitle="Earn commission by sharing BYC products with your audience."
    >
      <h2>How it works</h2>
      <p>
        Our affiliate program lets content creators, resellers, and loyal
        customers earn a commission for every sale they refer to our store. Once
        approved, you'll receive a unique referral link to share on social
        media, your blog, or with friends and family.
      </p>

      <h2>Commission structure</h2>
      <ul>
        <li>
          Earn a percentage commission on every completed, paid order referred
          through your link.
        </li>
        <li>
          Commissions are calculated on the order subtotal, excluding delivery
          fees.
        </li>
        <li>
          Payouts are processed monthly once you reach the minimum payout
          threshold.
        </li>
      </ul>

      <h2>Who can join</h2>
      <p>
        Anyone with an active audience — Instagram, TikTok, YouTube, a blog, or
        simply a network of people who trust your recommendations — can apply.
        We review applications to ensure a good fit with the brand.
      </p>

      <h2>How to apply</h2>
      <p>
        Send us a message via our{" "}
        <Link to="/contact" className="text-danger text-decoration-none">
          Contact page
        </Link>{" "}
        with a short introduction and links to your platform(s). Our team
        typically responds within 3–5 business days.
      </p>
    </StaticPageLayout>
  );
}

export default AffiliatePage;
