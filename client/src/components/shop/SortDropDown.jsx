const SORT_OPTIONS = [
  { value: "most-sold", label: "Most Sold" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

function SortDropdown({ value, onChange }) {
  return (
    <select
      id="sort-by"
      aria-label="Sort by"
      className="form-select form-select-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ minWidth: 160, height: 34 }}
    >
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortDropdown;
