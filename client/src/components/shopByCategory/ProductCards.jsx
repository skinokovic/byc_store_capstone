import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="product-card">
      <div className="product-image">
        <img src={product.images?.[0]?.url} alt={product.name} />
      </div>

      <div className="product-info">
        <h6>{product.name}</h6>

        <small>{product.sku}</small>

        <h5>₦{Number(product.price).toLocaleString()}</h5>
      </div>
    </Link>
  );
}

export default ProductCard;
