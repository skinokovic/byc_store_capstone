import StaticPageLayout from "../../components/static/StaticPageLayout";

function ShippingInfoPage() {
  return (
    <StaticPageLayout
      title="Shipping Info"
      subtitle="Everything you need to know about delivery timelines and fees."
    >
      <h2>Delivery timelines</h2>
      <table>
        <thead>
          <tr>
            <th>Location</th>
            <th>Estimated delivery</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Portharcourt</td>
            <td>1–3 business days</td>
          </tr>
          <tr>
            <td>Other states in Nigeria</td>
            <td>3–7 business days</td>
          </tr>
        </tbody>
      </table>

      <h2>Delivery fees</h2>
      <p>
        Delivery fees are calculated automatically based on your saved address
        and delivery zone, and shown at checkout before you place your order —
        no surprise charges.
      </p>

      <h2>Order processing</h2>
      <p>
        Orders paid by card are processed as soon as payment is confirmed.
        Orders paid by bank transfer begin processing once your payment has been
        manually verified by our team, which is typically same-day for transfers
        made during business hours.
      </p>

      <h2>Delivery coverage</h2>
      <p>
        We currently deliver within Nigeria only. We're working on expanding
        coverage — check back for updates.
      </p>
    </StaticPageLayout>
  );
}

export default ShippingInfoPage;
