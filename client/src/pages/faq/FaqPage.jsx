import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "lucide-react";
import { fetchFaqs } from "../../redux/slice/faqSlice";
import FaqAccordionItem from "../../components/faq/FaqAccordionItem";
import "./FaqPage.css";
import { Link } from "react-router-dom";

function FaqPage() {
  const dispatch = useDispatch();
  const { list: faqs, loading } = useSelector((state) => state.faqs);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    dispatch(fetchFaqs());
  }, [dispatch]);

  const categories = useMemo(() => {
    const unique = [...new Set(faqs.map((f) => f.category))];
    return ["All", ...unique];
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "All" || faq.category === activeCategory;
      const matchesSearch =
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqs, activeCategory, search]);

  const groupedFaqs = useMemo(() => {
    return filteredFaqs.reduce((groups, faq) => {
      if (!groups[faq.category]) groups[faq.category] = [];
      groups[faq.category].push(faq);
      return groups;
    }, {});
  }, [filteredFaqs]);

  function handleToggle(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="faq-page">
      <div className="faq-hero">
        <div className="container">
          <h1 className="faq-hero__title">Frequently Asked Questions</h1>
          <p className="faq-hero__subtitle">
            Everything you need to know about ordering, sizing, delivery, and
            returns.
          </p>

          <div className="faq-search">
            <Search size={18} className="faq-search__icon" />
            <input
              type="text"
              className="faq-search__input"
              placeholder="Search for a question..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="faq-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`faq-category-pill ${
                activeCategory === cat ? "faq-category-pill--active" : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {!loading && filteredFaqs.length === 0 && (
          <div className="text-center py-5">
            <p className="text-secondary mb-0">
              No questions found for "{search}". Try a different search or{" "}
              <Link to="/contact">Contact Support</Link>
            </p>
          </div>
        )}

        {!loading &&
          Object.entries(groupedFaqs).map(([category, items]) => (
            <div key={category} className="faq-group">
              <h5 className="faq-group__title">{category}</h5>
              <div className="faq-list">
                {items.map((faq) => (
                  <FaqAccordionItem
                    key={faq._id}
                    faq={faq}
                    isOpen={openId === faq._id}
                    onToggle={() => handleToggle(faq._id)}
                  />
                ))}
              </div>
            </div>
          ))}

        <div className="faq-contact-cta">
          <h6 className="fw-bold mb-2">Still have questions?</h6>
          <p className="text-secondary small mb-3">
            Our support team is happy to help with anything not covered here.
          </p>
          <Link to="/contact" className="btn btn-danger">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FaqPage;
