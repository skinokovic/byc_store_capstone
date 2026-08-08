import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { fetchArrivals } from "../services/arrivals";

function NewArrivals() {
  const [arrivals, setArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArrivals() {
      try {
        const data = await fetchArrivals(true); // active=true only, for the homepage
        setArrivals(data);
      } catch (err) {
        console.error("Failed to load new arrivals", err);
      } finally {
        setLoading(false);
      }
    }

    loadArrivals();
  }, []);

  if (loading || arrivals.length === 0) return null; // or a skeleton/loader

  return (
    <section className="py-5 mb-5">
      <div className="container">
        <h2 className="mb-5 fs-2 fw-semibold text-center">
          Checkout BYC New Arrivals
        </h2>
        <div className="row">
          {arrivals.map((item) => (
            <div className="col-md-6 col-lg-4" key={item._id}>
              <NewArrivalsCard
                image={item.image?.url}
                title={item.title}
                description={item.subtitle}
              />
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center mt-5">
          <Link to="/shop">
            <Button variant="outline-btn">View All</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;

function NewArrivalsCard({ image, title, description }) {
  return (
    <div>
      <div className="">
        <img
          src={image}
          alt={title}
          className="object-fit-cover mb-4 w-100"
          style={{ aspectRatio: 1 }}
        />
      </div>
      <div className="">
        <h4 className="lh-1">{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}
