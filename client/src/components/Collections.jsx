

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCollections } from "../services/collectionApi";
import { toast } from "react-toastify";
import "./Collection.css";

function Collections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCollections() {
      try {
        const data = await fetchCollections(true);
        setCollections(data);
      } catch (error) {
        toast.error("Failed to load collections", error);
      } finally {
        setLoading(false);
      }
    }

    loadCollections();
  }, []);

  if (loading || collections.length === 0) return null;

  const [featureTile, ...imageTiles] = collections;

  return (
    <section className="collections-section py-5">
      <div className="container">
        <div className="row g-2">
          {/* Text Card */}

          <div className="col-12 col-md-6 ">
            <div className="collection-text-card">
              {featureTile.subtitle && (
                <small className="collection-subtitle">
                  {featureTile.subtitle}
                </small>
              )}

              <h2>{featureTile.title}</h2>

              {featureTile.description && <p>{featureTile.description}</p>}

              <Link
                to={featureTile.buttonLink || "/shop"}
                className="btn btn-outline-dark"
              >
                {featureTile.buttonText || "Explore"}
              </Link>
            </div>
          </div>

          {/* Image 1 */}

          <div className="col-12 col-md-6">
            <div className="collection-image-card">
              <img src={imageTiles[0]?.image?.url} alt={imageTiles[0]?.title} />
            </div>
          </div>

          {/* Image 2 */}

          <div className="col-12 col-md-6">
            <div className="collection-image-card">
              <img src={imageTiles[1]?.image?.url} alt={imageTiles[1]?.title} />
            </div>
          </div>

          {/* Image 3 */}

          <div className="col-12 col-md-6">
            <div className="collection-image-card">
              <img src={imageTiles[2]?.image?.url} alt={imageTiles[2]?.title} />
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <Link to="/shop" className="btn btn-outline-dark px-5">
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Collections;
