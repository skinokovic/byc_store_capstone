function SubCategoryTabs({ categories, active, onChange }) {
  return (
    <div className="sub-tabs">
      {categories.map((category) => (
        <button
          key={category._id}
          className={active?._id === category._id ? "active" : ""}
          onClick={() => onChange(category)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default SubCategoryTabs;
