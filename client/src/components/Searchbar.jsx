import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function SearchBar({ className = "" }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/shop?keyword=${encodeURIComponent(query.trim())}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`d-flex align-items-center bg-light rounded-pill px-3 ${className}`}
      style={{ maxWidth: 560, height: 40 }}
    >
      <Search size={16} className="text-secondary flex-shrink-0" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products, brands and categories"
        aria-label="Search products, brands and categories"
        className="form-control form-control-sm bg-transparent border-0 shadow-none"
      />
    </form>
  );
}

export default SearchBar;
