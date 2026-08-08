import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Check, X, Loader2, LogIn } from "lucide-react";
import { verifyPaymentApi } from "../services/verifyPaymentApi";
import "./PaymentCallbackPage.css";

function PaymentCallbackPage() {
  const [searchParams] = useSearchParams();
  const [state, setState] = useState("verifying"); // verifying | success | failed | unauthenticated
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const reference =
      searchParams.get("reference") || searchParams.get("trxref");

    if (!reference) {
      setState("failed");
      return;
    }

    (async () => {
      try {
        const result = await verifyPaymentApi(reference);
        setOrder(result);
        setState(result.paymentStatus === "paid" ? "success" : "failed");
      } catch (err) {
        if (err.response?.status === 401) {
          setState("unauthenticated");
        } else {
          setState("failed");
        }
      }
    })();
  }, [searchParams]);

  return (
    <div className="payment-callback">
      <div
        className={`payment-callback__card payment-callback__card--${state}`}
      >
        {state === "success" && (
          <div className="confetti" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className={`confetti__piece confetti__piece--${i % 6}`}
              />
            ))}
          </div>
        )}

        <div className="payment-callback__content">
          {state === "verifying" && (
            <>
              <div className="payment-callback__icon payment-callback__icon--neutral">
                <Loader2 size={40} className="spin" />
              </div>
              <h2 className="payment-callback__title">Confirming payment...</h2>
              <p className="payment-callback__subtitle">
                Please don't close this page.
              </p>
            </>
          )}

          {state === "success" && (
            <>
              <div className="payment-callback__icon payment-callback__icon--success">
                <Check size={40} strokeWidth={3} />
              </div>
              <h2 className="payment-callback__title">Payment succeeded!</h2>
              <p className="payment-callback__subtitle">
                Your order {order && `#${order._id.slice(-8).toUpperCase()}`}{" "}
                has been confirmed. Thank you for your purchase!
              </p>
              <Link
                to="/dashboard/orders"
                className="payment-callback__btn payment-callback__btn--success"
              >
                Go to Your Orders
              </Link>
            </>
          )}

          {state === "failed" && (
            <>
              <div className="payment-callback__icon payment-callback__icon--failed">
                <X size={40} strokeWidth={3} />
              </div>
              <h2 className="payment-callback__title">Payment declined</h2>
              <p className="payment-callback__subtitle">
                We couldn't confirm this payment. If money left your account,
                it'll be verified automatically — check your orders shortly, or
                contact support with your order ID.
              </p>
              <Link
                to="/dashboard/orders"
                className="payment-callback__btn payment-callback__btn--failed"
              >
                Go to Your Orders
              </Link>
            </>
          )}

          {state === "unauthenticated" && (
            <>
              <div className="payment-callback__icon payment-callback__icon--neutral">
                <LogIn size={36} />
              </div>
              <h2 className="payment-callback__title">Please log in</h2>
              <p className="payment-callback__subtitle">
                Your payment may have gone through — log back in and check your
                orders to confirm.
              </p>
              <Link
                to={`/login?redirect=${encodeURIComponent(
                  `/payment/callback${window.location.search}`,
                )}`}
                className="payment-callback__btn payment-callback__btn--neutral"
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentCallbackPage;
