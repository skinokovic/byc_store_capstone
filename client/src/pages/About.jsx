import { Award } from "lucide-react";
import aboutImage from "/src/assets/about-image.png";
import RecentlyViewed from "../components/RecentlyViewed";
import { Link } from "react-router-dom";

const records = [
  {
    year: "1990",
    text: "Gold Prize for the Best Loaded Firm awarded by Daesin Economy Research Institute.",
  },
  {
    year: "1993",
    text: "Selected as a representative enterprise of Korea for successful strategies on globalization of Korean brands by Frontier Traders Association.",
  },
  {
    year: "1997",
    text: "BYC selected as the most preferred brand for underwear by the Federation of Korean Women Economists.",
  },
  {
    year: "1997",
    text: "Selected as the official commemoration of underwear for 1988 Korea Marketing.",
  },
  {
    year: "1999",
    text: "The Prize for Export of Original Brand awarded as recommended by the Korean Association of Textile Industries.",
  },
  {
    year: "2001",
    text: "The 15th Prize for the Enterprise of Economical Justice by the enterprise Assessment commission.",
  },
  {
    year: "2006",
    text: "The Prize for Export of Original Brands awarded as recommended by the Korean Association of Textile Industries.",
  },
  {
    year: "2006",
    text: "Selected by brand management association as one of the most influential brands among the world's underwear companies.",
  },
  {
    year: "2011",
    text: "Selected as the Best Korean Enterprise of 1992 by Korean Management Association.",
  },
];

function About() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="container pt-3">
        <p className="small text-secondary mb-0">
          <Link to="/" className="text-secondary text-decoration-none">
            Home
          </Link>
          {" > "}
          <span>About Us</span>
        </p>
      </div>
      {/* Hero: image left, text right */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4 align-items-center">
            <h2 className="fw-bold mb-3 text-center">ABOUT US</h2>
            <div className="col-12 col-lg-6">
              <img
                src={aboutImage}
                alt="BYC Africa"
                className="img-fluid rounded"
                style={{ width: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="col-12 col-lg-6">
              <h2 className="fw-medium mb-3">ABOUT BYC AFRICA</h2>
              <p className="text-secondary">
                We are the sole distributor of BYC products in Africa. We import
                BYC products from Korea and distribute them to African countries
                through Onamik Holdings Limited.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What our record says */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold text-center mb-5">WHAT OUR RECORD SAYS</h2>

          <div className="row g-4">
            {records.map((record, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <div className="bg-white h-100 p-4 rounded">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{
                      width: 48,
                      height: 48,
                      backgroundColor: "#fdece3",
                    }}
                  >
                    <Award size={24} color="#e8722c" />
                  </div>
                  <p className="text-secondary small mb-3">{record.text}</p>
                  <p className="fw-bold text-danger mb-0">Year {record.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RecentlyViewed />
    </>
  );
}

export default About;
