import { useState } from "react";
import { Copy, Check, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import "./PaymentMethod.css";

const BANKS = [
  {
    id: "gtbank",
    name: "Guaranty Trust Bank",
    accountName: "BYC Nig Ltd",
    accountNumber: "0108070157",
  },
  {
    id: "zenith",
    name: "Access Bank",
    accountName: "BYC Nig Ltd",
    accountNumber: "0047947276",
  },
];

const CARD_SCHEMES = [
  { id: "mastercard", label: "Mastercard" },
  { id: "visa", label: "Visa" },
  { id: "verve", label: "Verve" },
];

function PaymentMethod({ value, onChange }) {
  const [copiedId, setCopiedId] = useState(null);

  async function handleCopy(accountNumber, bankId) {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopiedId(bankId);
      toast.success("Account number copied");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Could not copy — please copy manually");
    }
  }

  return (
    <div className="payment-method">
      {/* Bank transfer */}
      <label
        htmlFor="bank_transfer"
        className={`payment-option ${value === "bank_transfer" ? "payment-option--selected" : ""}`}
      >
        <input
          type="radio"
          className="form-check-input payment-option__radio"
          name="paymentMethod"
          id="bank_transfer"
          checked={value === "bank_transfer"}
          onChange={() => onChange("bank_transfer")}
        />
        <div className="payment-option__body">
          <span className="payment-option__label">Direct bank transfer</span>

          {value === "bank_transfer" && (
            <div className="payment-option__content">
              <p className="text-secondary small mb-3">
                Make your payment directly into one of our bank accounts. Please
                use your Order ID as the payment reference. Your order will not
                be shipped until the funds have cleared in our account.
              </p>

              <div className="d-flex flex-column gap-2">
                {BANKS.map((bank) => (
                  <div key={bank.id} className="bank-card">
                    <div className="bank-card__details">
                      <p className="fw-semibold small mb-1">{bank.name}</p>
                      <p className="text-secondary small mb-0">
                        {bank.accountName}
                      </p>
                      <p className="bank-card__number mb-0">
                        {bank.accountNumber}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary bank-card__copy"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCopy(bank.accountNumber, bank.id);
                      }}
                    >
                      {copiedId === bank.id ? (
                        <>
                          <Check size={14} /> Copied
                        </>
                      ) : (
                        <>
                          <Copy size={14} /> Copy
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </label>

      {/* Card payment */}
      <label
        htmlFor="card"
        className={`payment-option ${value === "card" ? "payment-option--selected" : ""}`}
      >
        <input
          type="radio"
          className="form-check-input payment-option__radio"
          name="paymentMethod"
          id="card"
          checked={value === "card"}
          onChange={() => onChange("card")}
        />
        <div className="payment-option__body">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <span className="payment-option__label">Pay with card</span>
            <span className="trust-badge">
              <ShieldCheck size={14} />
              Secured by Paystack
            </span>
          </div>

          {value === "card" && (
            <div className="payment-option__content">
              <p className="text-secondary small mb-3">
                You'll be redirected to Paystack secure checkout to enter your
                card details. We never see or store your card number.
              </p>

              <div className="d-flex align-items-center gap-2 flex-wrap">
                {CARD_SCHEMES.map((card) => (
                  <span
                    key={card.id}
                    className={`card-badge card-badge--${card.id}`}
                  >
                    {card.id === "mastercard" && (
                      <span className="card-badge__mc" aria-hidden="true">
                        <span className="card-badge__mc-circle card-badge__mc-circle--red" />
                        <span className="card-badge__mc-circle card-badge__mc-circle--orange" />
                      </span>
                    )}
                    {card.id === "visa" && (
                      <span className="card-badge__visa">VISA</span>
                    )}
                    {card.id === "verve" && (
                      <span className="card-badge__verve">Verve</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </label>
    </div>
  );
}

export default PaymentMethod;
