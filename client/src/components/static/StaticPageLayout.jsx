import { Link } from "react-router-dom";
import "./StaticPageLayout.css";

function StaticPageLayout({ title, subtitle, children }) {
  return (
    <div className="static-page">
      <div className="static-page__hero">
        <div className="container">
          <p className="static-page__breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>{title}</span>
          </p>
          <h1 className="static-page__title">{title}</h1>
          {subtitle && <p className="static-page__subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="container py-5">
        <div className="static-page__content">{children}</div>
      </div>
    </div>
  );
}

export default StaticPageLayout;
