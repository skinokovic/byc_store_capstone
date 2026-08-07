import { List, LayoutGrid } from "lucide-react";

function ViewToggle({ view, onChange }) {
  return (
    <div className="d-flex gap-2">
      <button
        type="button"
        className={`btn btn-sm d-flex align-items-center justify-content-center ${
          view === "list" ? "btn-outline-dark" : "btn-light"
        }`}
        onClick={() => onChange("list")}
        aria-label="List view"
        style={{ width: 34, height: 34, padding: 0 }}
      >
        <List size={16} />
      </button>
      <button
        type="button"
        className={`btn btn-sm d-flex align-items-center justify-content-center ${
          view === "grid" ? "btn-danger" : "btn-light"
        }`}
        onClick={() => onChange("grid")}
        aria-label="Grid view"
        style={{ width: 34, height: 34, padding: 0 }}
      >
        <LayoutGrid size={16} />
      </button>
    </div>
  );
}

export default ViewToggle;
