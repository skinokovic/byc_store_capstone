import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import RecentlyViewed from "../components/RecentlyViewed";
import { submitContactApi } from "../services/contactApi";

function Contact() {
  const [form, setForm] = useState({ phone: "", email: "", notes: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"
  const [errorMessage, setErrorMessage] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   setStatus("sending");

  //   try {
  //     // Swap this for a real endpoint, e.g. api.post('/contact', form)
  //     await new Promise((resolve) => setTimeout(resolve, 600));
  //     setStatus("sent");
  //     setForm({ phone: "", email: "", notes: "" });
  //   } catch (error) {
  //     setStatus("error", error);
  //   }
  // }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage(null);

    try {
      await submitContactApi(form);
      setStatus("sent");
      setForm({ phone: "", email: "", notes: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.response?.data?.message || error.message);
    }
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container pt-3">
        <p className="small text-secondary mb-0">
          <Link to="/" className="text-secondary text-decoration-none">
            Home
          </Link>
          {" > "}
          <span>Contact Us</span>
        </p>
      </div>

      {/* Heading */}
      <h2 className="fw-bold text-center py-4">CONTACT US</h2>

      {/* Map */}
      <div className="container">
        <div className="ratio ratio-21x9">
          <iframe
            title="Store location"
            src="https://www.google.com/maps?q=175+Cameroun+Road,+Portharcourt,+Rivers+State,+Nigeria&output=embed"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Address / Phone / Email strip */}
      <div className="bg-light py-4 mt-4">
        <div className="container">
          <div className="row g-4">
            <div className="col-12 col-md-4 d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded flex-shrink-0"
                style={{ width: 44, height: 44, backgroundColor: "#fdece3" }}
              >
                <MapPin size={20} color="#BD3A3A" />
              </div>
              <div>
                <p className="fw-bold small mb-0">ADDRESS</p>
                <p className="text-secondary small mb-0">(Head Office)</p>
                <p className="text-secondary small mb-0">
                  175 Peter Odili Road, Rivers State.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4 d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded flex-shrink-0"
                style={{ width: 44, height: 44, backgroundColor: "#fdece3" }}
              >
                <Phone size={20} color="#e8722c" />
              </div>
              <div>
                <p className="fw-bold small mb-0">PHONE</p>
                <p className="text-secondary small mb-0">
                  07035446060, 09122262899
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4 d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded flex-shrink-0"
                style={{ width: 44, height: 44, backgroundColor: "#fdece3" }}
              >
                <Mail size={20} color="#e8722c" />
              </div>
              <div>
                <p className="fw-bold small mb-0">EMAIL ADDRESS</p>
                <p className="text-secondary small mb-0">BYCAFRICA@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drop a message form */}
      <div className="container py-5">
        <h4 className="fw-bold mb-4">Drop a Message</h4>

        <form onSubmit={handleSubmit} className="col-12 col-lg-6">
          <div className="mb-3">
            <label htmlFor="phone" className="form-label small">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="form-control border-danger-subtle"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label small">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="form-control border-danger-subtle"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="notes" className="form-label small">
              Leave a message
            </label>
            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={5}
              required
              className="form-control border-danger-subtle"
            />
          </div>

          {status === "sent" && (
            <p className="text-success small">
              Message sent — we'll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-danger small">
              Something went wrong. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn btn-danger w-100 py-2"
          >
            {status === "sending" ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>

      <RecentlyViewed />
    </div>
  );
}

export default Contact;
