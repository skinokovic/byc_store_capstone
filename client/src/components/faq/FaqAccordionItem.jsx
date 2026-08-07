import { ChevronDown } from "lucide-react";

function FaqAccordionItem({ faq, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
      <button
        type="button"
        className="faq-item__question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{faq.question}</span>
        <ChevronDown size={20} className="faq-item__chevron" />
      </button>

      <div className="faq-item__answer-wrapper">
        <p className="faq-item__answer">{faq.answer}</p>
      </div>
    </div>
  );
}

export default FaqAccordionItem;
