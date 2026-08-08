import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import author from "../assets/blogs/author.png";
import eyeIcon from "../assets/blogs/eye.png";
import heartIcon from "../assets/blogs/heart.png";
import Button from "./Button";
import arrowRightIcon from "../assets/blogs/arrow.png";
import { fetchBlogs } from "../redux/slice/blogSlice";

function Blog() {
  const dispatch = useDispatch();
  const { list: blogs, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs({ active: true }));
  }, [dispatch]);

  if (loading || blogs.length === 0) return null;

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center mb-5 fw-semibold">BYC AFRICA Blog News</h2>
        <div className="row g-4">
          {blogs.map((post) => (
            <div className="col-lg-4 col-md-6" key={post._id}>
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;

function BlogCard({ post }) {
  const navigate = useNavigate();

  const {
    slug,
    title,
    excerpt,
    views,
    likes,
    coverImage,
    author: postAuthor,
  } = post;

  return (
    <div className="blog-card bg-white h-100 d-flex flex-column">
      <Link to={`/blog/${slug}`} className="blog-image w-100 mb-5 d-block">
        <img
          src={coverImage?.url}
          alt={title}
          className="w-100 h-100 object-fit-cover"
        />
      </Link>

      <div className="d-flex px-4" style={{ height: "70px" }}>
        <img
          src={postAuthor?.avatar || author}
          alt={postAuthor?.name || "Author"}
          style={{ width: "80px", height: "100%", objectFit: "cover" }}
        />
        <div
          className="d-flex justify-content-center align-items-center flex-grow-1"
          style={{ backgroundColor: "#e2e2e2" }}
        >
          <div className="d-flex align-items-center gap-2 me-4 text-dark">
            <img src={eyeIcon} alt="views" className="author-info-icons" />
            <span className="text-secondary">{views}</span>
          </div>
          <div className="d-flex align-items-center gap-2 text-dark">
            <img src={heartIcon} alt="heart" className="author-info-icons" />
            <span className="text-secondary">{likes}</span>
          </div>
        </div>
      </div>

      <div
        className="p-4 d-flex flex-column flex-grow-1"
        style={{ backgroundColor: "#fafafa" }}
      >
        <div className="mb-4 d-flex align-items-center">
          <span className="fw-bold text-dark" style={{ fontSize: "0.95rem" }}>
            {postAuthor?.name}
          </span>
        </div>

        <Link to={`/blog/${slug}`} className="text-decoration-none">
          <h3
            className="fw-bold mb-3"
            style={{ fontSize: "1.5rem", lineHeight: "1.3", color: "#1a1a1a" }}
          >
            {title}
          </h3>
        </Link>

        <p
          className="text-muted mb-4"
          style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
        >
          {excerpt}
        </p>

        <div className="mt-auto">
          <Link to={`/blog/${slug}`}>
            <Button
              variant="outline-btn"
              style={{ width: 150 }}
              onClick={() => navigate(`/blog/${slug}`)}
            >
              Read more{" "}
              <img
                src={arrowRightIcon}
                alt="arrow"
                className="ms-2"
                style={{ width: 16, height: 16 }}
              />{" "}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
