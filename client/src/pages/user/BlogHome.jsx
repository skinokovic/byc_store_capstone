import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, MessageCircle, ArrowRight } from "lucide-react";
import { fetchBlogs } from "../../redux/slice/blogSlice";
import LikeButton from "../../components/LikeButton";

const PAGE_SIZE = 3;

function BlogHome() {
  const dispatch = useDispatch();
  const { list: blogs, loading } = useSelector((state) => state.blogs);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchBlogs({ active: true }));
  }, [dispatch]);

  const totalPages = Math.max(1, Math.ceil(blogs.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageBlogs = blogs.slice(start, start + PAGE_SIZE);

  if (loading) {
    return (
      <div className="container py-5">
        <p className="text-secondary">Loading blog posts...</p>
      </div>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center fw-bold mb-5">BYC AFRICA Blog News</h2>

        <div className="d-flex flex-column gap-5">
          {pageBlogs.map((blog, index) => (
            <BlogRow key={blog._id} blog={blog} reversed={index % 2 === 1} />
          ))}
        </div>

        {totalPages > 1 && (
          <nav className="d-flex justify-content-center mt-5">
            <ul className="pagination">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  aria-label="Previous page"
                >
                  &lsaquo;
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => (
                  <li
                    key={num}
                    className={`page-item ${page === num ? "active" : ""}`}
                  >
                    <button className="page-link" onClick={() => setPage(num)}>
                      {num}
                    </button>
                  </li>
                ),
              )}

              <li
                className={`page-item ${page === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  aria-label="Next page"
                >
                  &rsaquo;
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
}

export default BlogHome;

function BlogRow({ blog, reversed }) {
  return (
    <div
      className={`row g-4 align-items-center ${reversed ? "flex-row-reverse" : ""}`}
    >
      <div className="col-md-6">
        <Link to={`/blog/${blog.slug}`}>
          <img
            src={blog.coverImage?.url}
            alt={blog.title}
            className="w-100 object-fit-cover rounded"
            style={{ aspectRatio: "4 / 3" }}
          />
        </Link>
      </div>

      <div className="col-md-6">
        <Link
          to={`/blog/${blog.slug}`}
          className="text-decoration-none text-dark"
        >
          <h3 className="fw-bold mb-3">{blog.title}</h3>
        </Link>

        <p className="text-secondary mb-3">{blog.excerpt}</p>

        <Link
          to={`/blog/${blog.slug}`}
          className="d-inline-flex align-items-center gap-2 fw-semibold text-dark text-decoration-none mb-4"
        >
          Read more <ArrowRight size={14} />
        </Link>

        <div className="d-flex align-items-center gap-3">
          {blog.author?.avatar && (
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="rounded-circle"
              style={{ width: 40, height: 40, objectFit: "cover" }}
            />
          )}

          <span className="fw-semibold small">{blog.author?.name}</span>

          <div className="d-flex align-items-center gap-3 text-secondary small ms-auto">
            <span className="d-flex align-items-center gap-1">
              <Eye size={14} /> {blog.views}
            </span>

            <LikeButton blogId={blog._id} likes={blog.likes} />

            <Link
              to={`/blog/${blog.slug}#comments`}
              className="d-flex align-items-center gap-1 text-decoration-none text-secondary"
            >
              <MessageCircle size={14} /> {blog.commentCount || 0}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
