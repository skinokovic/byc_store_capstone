// import blog1 from "../assets/blogs/blog1.png";
// import blog2 from "../assets/blogs/blog2.png";
// import blog3 from "../assets/blogs/blog3.png";
// import author from "../assets/blogs/author.png";
// import eyeIcon from "../assets/blogs/eye.png";
// import heartIcon from "../assets/blogs/heart.png";
// import Button from "./Button";
// import arrowRightIcon from "../assets/blogs/arrow.png";

// const blogPosts = [
//   {
//     id: 1,
//     image: blog1,
//     alt: "Couple in fashionable clothes",
//     authorImage: author,
//     authorName: "Wade Warren",
//     authorPosition: "Fashion Designer",
//     views: 35,
//     likes: 23,
//     title: "How important are clothes in your style?",
//     description:
//       "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
//   },
//   {
//     id: 2,
//     image: blog2,
//     alt: "Man wearing plaid pants",
//     authorImage: author,
//     authorName: "Wade Warren",
//     authorPosition: "Fashion Designer",
//     views: 35,
//     likes: 23,
//     title: "How important are pants in your style?",
//     description:
//       "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
//   },
//   {
//     id: 3,
//     image: blog3,
//     alt: "Man in fashionable overalls",
//     authorImage: author,
//     authorName: "Wade Warren",
//     authorPosition: "Fashion Designer",
//     views: 35,
//     likes: 23,
//     title: "How important are shoes in your style?",
//     description:
//       "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
//   },
// ];

// function Blog() {
//   return (
//     <section className="py-5">
//       <div className="container">
//         <h2 className="text-center mb-5 fw-semibold">BYC AFRICA Blog News</h2>
//         <div className="row g-4">
//           {blogPosts.map((post) => (
//             <div className="col-lg-4 col-md-6" key={post.id}>
//               <BlogCard {...post} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Blog;

// function BlogCard({
//   image,
//   alt,
//   authorImage,
//   authorName,
//   authorPosition,
//   title,
//   description,
//   views,
//   likes,
// }) {
//   return (
//     <div className="blog-card bg-white h-100 d-flex flex-column">
//       <div className="blog-image w-100 mb-5">
//         <img src={image} alt={alt} className="w-100 h-100 object-fit-cover" />
//       </div>
//       <div className="d-flex px-4" style={{ height: "70px" }}>
//         <img
//           src={authorImage}
//           alt={authorName}
//           style={{ width: "80px", height: "100%", objectFit: "cover" }}
//         />
//         <div
//           className="d-flex justify-content-center align-items-center flex-grow-1"
//           style={{ backgroundColor: "#e2e2e2" }}
//         >
//           <div className="d-flex align-items-center gap-2 me-4 text-dark">
//             <img src={eyeIcon} alt="views" className="author-info-icons" />
//             <span className="text-secondary">{views}</span>
//           </div>
//           <div className="d-flex align-items-center gap-2 text-dark">
//             <img src={heartIcon} alt="heart" className="author-info-icons" />
//             <span className="text-secondary">{likes}</span>
//           </div>
//         </div>
//       </div>
//       <div
//         className="p-4 d-flex flex-column flex-grow-1"
//         style={{ backgroundColor: "#fafafa" }}
//       >
//         <div className="mb-4 d-flex align-items-center">
//           <span className="fw-bold text-dark" style={{ fontSize: "0.95rem" }}>
//             {authorName}
//           </span>
//           <span className="mx-2 text-muted">.</span>
//           <span className="text-muted" style={{ fontSize: "0.95rem" }}>
//             {authorPosition}
//           </span>
//         </div>
//         <h3
//           className="fw-bold mb-3"
//           style={{ fontSize: "1.5rem", lineHeight: "1.3", color: "#1a1a1a" }}
//         >
//           {title}
//         </h3>
//         <p
//           className="text-muted mb-4"
//           style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
//         >
//           {description}
//         </p>
//         <div className="mt-auto">
//           <Button variant="outline-btn" style={{ width: 150 }}>
//             Read more{" "}
//             <img
//               src={arrowRightIcon}
//               alt="arrow"
//               className="ms-2"
//               style={{ width: 16, height: 16 }}
//             />{" "}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

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
