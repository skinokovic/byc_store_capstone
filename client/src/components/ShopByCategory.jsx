import { useState } from "react";
import women1 from "../assets/categories/women1.png";
import women2 from "../assets/categories/women2.png";
import men1 from "../assets/categories/men1.png";
import Button from "./Button";

const categories = ["For Women", "For Men", "For Kids"];

const subcategories = {
  "For Women": ["Panties", "Brassieres", "Camisoles", "Shapewear"],
  "For Men": ["T-Shirt", "Singlet", "Pants", "Boxers"],
  "For Kids": ["Underwear Sets", "Vests", "Pyjamas"],
};

const products = [
  {
    id: 1,
    name: "WOMEN PANTS",
    sku: "BYC-501LMS",
    price: "₦4,500",
    image: women1
  },
  {
    id: 2,
    name: "WOMEN PANTS",
    sku: "BYC-501LMS",
    price: "₦4,500",
    image: women2
  },
  {
    id: 3,
    name: "WOMEN PANTS",
    sku: "BYC-501LMS",
    price: "₦5,000",
    image: men1
  }
];

function ShopByCategory() {
  const [activeCategory, setActiveCategory] = useState(categories[1]);
  const [activeSubcategory, setActiveSubcategory] = useState(
    subcategories[categories[1]][2]
  );

  return (
    <section className="shop-by-category py-5" id="shop-by-category">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="mb-5 fw-semibold fs-2">Shop By Category</h2>
          
          <div className="category-tabs d-flex justify-content-center gap-4 mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-tab-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveSubcategory(subcategories[cat][0]);
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="d-flex justify-content-center flex-wrap gap-3">
            {subcategories[activeCategory].map((subcat) => (
              <div
                key={subcat}
                role="button"
                className={`subcategory-tab-btn ${activeSubcategory === subcat ? "active" : ""}`}
                onClick={() => setActiveSubcategory(subcat)}
              >
                {subcat}
              </div>
            ))}
          </div>
        </div>

        <div className="category-content animate-fade-in" key={activeCategory + activeSubcategory}>
          <div className="row">
            {products.map((product) => (
              <div className="col-sm-6 col-lg-4 mb-4" key={product.id}>
                <div className="product-card">
                  <div className="product-image-wrapper mb-3">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <div className="d-flex align-items-center gap-2">
                      <span className="fw-semibold">{product.name}</span>
                      <span className="text-muted" style={{fontSize: "0.9rem"}}>{product.sku}</span>
                    </div>
                    <div className="mt-1">
                      {product.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
           <div className="d-flex justify-content-center mt-5">
          <Button variant="outline-btn">View All</Button>
        </div>
      </div>
    </section>
  );
}

export default ShopByCategory;
