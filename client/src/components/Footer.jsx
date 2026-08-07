// import { Mail, Phone, ArrowRight } from "lucide-react";
// import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <section
//       className="py-5"
//       style={{ backgroundColor: "#212121", width: "100%" }}
//     >
//       <div className="container" style={{ maxWidth: "1146.37px" }}>
//         {/* Top area: link columns + signup */}
//         <div className="row g-4 justify-content-between">
//           {/* Company Info */}
//           <div className="col-6 col-md-3 col-lg-2">
//             <h6 className="text-white fw-semibold mb-3">Company Info</h6>
//             <ul className="list-unstyled d-flex flex-column gap-2">
//               <li>
//                 <Link
//                   className="text-secondary text-decoration-none small"
//                   to="/about"
//                 >
//                   {" "}
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <a
//                   href="/affiliate"
//                   className="text-secondary text-decoration-none small"
//                 >
//                   Affiliate
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/blog"
//                   className="text-secondary text-decoration-none small"
//                 >
//                   Fashion Blogger
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Help & Support */}
//           <div className="col-6 col-md-3 col-lg-2">
//             <h6 className="text-white fw-semibold mb-3">Help &amp; Support</h6>
//             <ul className="list-unstyled d-flex flex-column gap-2">
//               <li>
//                 <a
//                   href="/shipping-info"
//                   className="text-secondary text-decoration-none small"
//                 >
//                   Shipping Info
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/refunds"
//                   className="text-secondary text-decoration-none small"
//                 >
//                   Refunds
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/how-to-order"
//                   className="text-secondary text-decoration-none small"
//                 >
//                   How to Order
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/how-to-track"
//                   className="text-secondary text-decoration-none small"
//                 >
//                   How to Track
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/size-guides"
//                   className="text-secondary text-decoration-none small"
//                 >
//                   Size Guides
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Customer Care */}
//           <div className="col-6 col-md-3 col-lg-3">
//             <h6 className="text-white fw-semibold mb-3">Customer Care</h6>
//             <ul className="list-unstyled d-flex flex-column gap-2 mb-3">
//               <li>
//                 <Link
//                   className="text-secondary text-decoration-none small"
//                   to="/contact"
//                 >
//                   {" "}
//                   Contact Us
//                 </Link>
//               </li>
//               <li>
//                 <a
//                   href="/payment-methods"
//                   className="text-secondary text-decoration-none small"
//                 >
//                   Payment Methods
//                 </a>
//               </li>
//             </ul>
//             <div className="d-flex align-items-center gap-2">
//               <img src="/src/assets/PayPal.png" alt="PayPal" height="20" />
//               <img src="/src/assets/visa.png" alt="Visa" height="20" />
//               <img
//                 src="/src/assets/mastercard.png"
//                 alt="Mastercard"
//                 height="20"
//               />
//             </div>
//           </div>

//           {/* Signup for the latest news */}
//           <div className="col-6 col-md-12 col-lg-4">
//             <h6 className="text-white fw-semibold mb-3">
//               Signup For Newsletter
//             </h6>

//             <div className="input-group mb-3">
//               <input
//                 type="email"
//                 placeholder="Enter Email"
//                 className="form-control bg-transparent text-white border-secondary"
//               />
//               <button
//                 className="btn btn-outline-secondary d-flex align-items-center"
//                 type="button"
//               >
//                 <ArrowRight size={18} />
//               </button>
//             </div>

//             <div className="d-flex align-items-center gap-2 mb-2">
//               <Mail size={16} className="text-secondary" />
//               <a
//                 href="mailto:bycafrica@gmail.com"
//                 className="text-secondary text-decoration-none small"
//               >
//                 bycafrica@gmail.com
//               </a>
//             </div>
//             <div className="d-flex align-items-center gap-2">
//               <Phone size={16} className="text-secondary" />
//               <span className="text-secondary small">
//                 +2348101375376; +2349053403403
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Social icons */}
//         <div className="d-flex justify-content-center gap-3 mt-5  ">
//           <a
//             href="#"
//             className="d-flex align-items-center justify-content-center rounded-circle bg-white social-icon-link"
//             style={{ width: 40, height: 40 }}
//           >
//             <FaFacebookF className="" size={18} color="#212121" />
//           </a>
//           <a
//             href="#"
//             className="d-flex align-items-center justify-content-center rounded-circle bg-white social-icon-link"
//             style={{ width: 40, height: 40 }}
//           >
//             <FaInstagram size={18} color="#212121" />
//           </a>
//           <a
//             href="#"
//             className="d-flex align-items-center justify-content-center rounded-circle bg-white social-icon-link"
//             style={{ width: 40, height: 40 }}
//           >
//             <FaTwitter size={18} color="#212121" />
//           </a>
//           <a
//             href="#"
//             className="d-flex align-items-center justify-content-center rounded-circle bg-white social-icon-link"
//             style={{ width: 40, height: 40 }}
//           >
//             <FaYoutube size={18} color="#212121" />
//           </a>
//         </div>

//         {/* Divider + copyright */}
//         <hr className="border-secondary mt-4 mb-3" />
//         <p className="text-center text-secondary small mb-0">
//           All rights reserved. Copyright bycafrica 2026.
//         </p>
//       </div>
//     </section>
//   );
// };

// export default Footer;
import { useState } from "react";
import { Mail, Phone, ArrowRight, Loader2 } from "lucide-react";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { subscribeNewsletterApi } from "../services/newsletterApi";

import paypal from "../assets/PayPal.png";
import visa from "../assets/visa.png";
import mastercard from "../assets/mastercard.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  async function handleSubscribe(e) {
    e.preventDefault();

    if (!email.trim()) return;

    setSubscribing(true);

    try {
      await subscribeNewsletterApi(email.trim());

      toast.success("Subscribed! Thanks for joining.");

      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to subscribe");
    } finally {
      setSubscribing(false);
    }
  }

  return (
    <footer
      className="py-5"
      style={{
        background: "#212121",
        width: "100%",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "1146px",
        }}
      >
        <div className="row g-4 justify-content-between">
          {/* Company */}

          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="text-white fw-semibold mb-3">Company Info</h6>

            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <Link
                  to="/about"
                  className="text-secondary text-decoration-none small"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/affiliate"
                  className="text-secondary text-decoration-none small"
                >
                  Affiliate
                </Link>
              </li>

              <li>
                <Link
                  to="/blog"
                  className="text-secondary text-decoration-none small"
                >
                  Fashion Blogger
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}

          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="text-white fw-semibold mb-3">Help &amp; Support</h6>

            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <Link
                  to="/shipping-info"
                  className="text-secondary text-decoration-none small"
                >
                  Shipping Info
                </Link>
              </li>

              <li>
                <Link
                  to="/refunds"
                  className="text-secondary text-decoration-none small"
                >
                  Refunds
                </Link>
              </li>

              <li>
                <Link
                  to="/how-to-order"
                  className="text-secondary text-decoration-none small"
                >
                  How to Order
                </Link>
              </li>

              <li>
                <Link
                  to="/how-to-track"
                  className="text-secondary text-decoration-none small"
                >
                  How to Track
                </Link>
              </li>

              <li>
                <Link
                  to="/size-guides"
                  className="text-secondary text-decoration-none small"
                >
                  Size Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}

          <div className="col-6 col-md-3 col-lg-3">
            <h6 className="text-white fw-semibold mb-3">Customer Care</h6>

            <ul className="list-unstyled d-flex flex-column gap-2 mb-3">
              <li>
                <Link
                  to="/contact"
                  className="text-secondary text-decoration-none small"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/payment-methods"
                  className="text-secondary text-decoration-none small"
                >
                  Payment Methods
                </Link>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-3 flex-wrap">
              <img src={paypal} alt="PayPal" height={22} />
              <img src={visa} alt="Visa" height={22} />
              <img src={mastercard} alt="Mastercard" height={22} />
            </div>
          </div>

          {/* Newsletter */}

          <div className="col-12 col-lg-4">
            <h6 className="text-white fw-semibold mb-3">
              Signup For The Latest News
            </h6>

            <form className="input-group mb-4" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="form-control bg-transparent text-white border-secondary footer-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribing}
                required
              />

              <button
                className="btn btn-outline-secondary"
                type="submit"
                disabled={subscribing}
              >
                {subscribing ? (
                  <Loader2 size={18} className="spin" />
                ) : (
                  <ArrowRight size={18} />
                )}
              </button>
            </form>

            <div className="d-flex align-items-center gap-2 mb-3">
              <Mail size={16} className="text-secondary" />

              <a
                href="mailto:bycafrica@gmail.com"
                className="text-secondary text-decoration-none small"
              >
                bycafrica@gmail.com
              </a>
            </div>

            <div className="d-flex align-items-center gap-2">
              <Phone size={16} className="text-secondary" />

              <a
                href="tel:+2348101375376"
                className="text-secondary text-decoration-none small"
              >
                +234 703 544 6060
              </a>
            </div>
          </div>
        </div>

        {/* Social Icons */}

        <div className="d-flex justify-content-center gap-3 mt-5">
          <a
            href="www.linkedin.com/in/bright-nwulu-022744312"
            target="_blank"
            rel="noopener noreferrer"
            className="d-flex justify-content-center align-items-center rounded-circle bg-white social-icon-link"
            style={{
              width: 42,
              height: 42,
            }}
          >
            <FaLinkedinIn color="#212121" size={18} />
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="d-flex justify-content-center align-items-center rounded-circle bg-white social-icon-link"
            style={{
              width: 42,
              height: 42,
            }}
          >
            <FaInstagram color="#212121" size={18} />
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="d-flex justify-content-center align-items-center rounded-circle bg-white social-icon-link"
            style={{
              width: 42,
              height: 42,
            }}
          >
            <FaTwitter color="#212121" size={18} />
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="d-flex justify-content-center align-items-center rounded-circle bg-white social-icon-link"
            style={{
              width: 42,
              height: 42,
            }}
          >
            <FaYoutube color="#212121" size={18} />
          </a>
        </div>

        <hr className="border-secondary my-4" />

        <p className="text-center text-secondary small mb-0">
          © {new Date().getFullYear()} BYC Africa. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
