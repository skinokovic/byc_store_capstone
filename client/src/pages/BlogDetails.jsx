// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Eye, Heart } from "lucide-react";
// import { fetchBlogById, clearSelectedBlog } from "../redux/slice/blogSlice";
// import { fetchComments, clearComments } from "../redux/slice/commentSlice";
// import CommentForm from "../components/comment/commentForm";
// import CommentList from "../components/comment/CommentList";

// function BlogDetail() {
//   const { slug } = useParams();
//   const dispatch = useDispatch();

//   const { selectedBlog: blog, loading } = useSelector((state) => state.blogs);

//   useEffect(() => {
//     dispatch(fetchBlogById(slug));
//     return () => dispatch(clearSelectedBlog());
//   }, [slug, dispatch]);

//   useEffect(() => {
//     if (blog?._id) {
//       dispatch(fetchComments(blog._id));
//     }
//     return () => dispatch(clearComments());
//   }, [blog?._id, dispatch]);

//   if (loading || !blog) {
//     return (
//       <div className="container py-5">
//         <p className="text-secondary">Loading blog post...</p>
//       </div>
//     );
//   }

//   return (
//     <article className="container py-5" style={{ maxWidth: 800 }}>
//       <img
//         src={blog.coverImage?.url}
//         alt={blog.title}
//         className="w-100 object-fit-cover rounded mb-4"
//         style={{ aspectRatio: "16 / 9" }}
//       />

//       <div className="d-flex align-items-center gap-3 mb-3">
//         {blog.author?.avatar && (
//           <img
//             src={blog.author.avatar}
//             alt={blog.author.name}
//             className="rounded-circle"
//             style={{ width: 44, height: 44, objectFit: "cover" }}
//           />
//         )}

//         <div>
//           <p className="fw-semibold mb-0">{blog.author?.name}</p>
//           <p className="text-secondary small mb-0">
//             {new Date(blog.createdAt).toLocaleDateString(undefined, {
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </p>
//         </div>

//         <div className="d-flex align-items-center gap-3 text-secondary small ms-auto">
//           <span className="d-flex align-items-center gap-1">
//             <Eye size={14} /> {blog.views}
//           </span>
//           <span className="d-flex align-items-center gap-1">
//             <Heart size={14} /> {blog.likes}
//           </span>
//         </div>
//       </div>

//       <h1 className="fw-bold mb-4">{blog.title}</h1>

//       <div className="mb-5" style={{ whiteSpace: "pre-line" }}>
//         {blog.content}
//       </div>

//       <hr className="mb-4" />

//       <CommentForm blogId={blog._id} />
//       <CommentList blogId={blog._id} />
//     </article>
//   );
// }

// export default BlogDetail;

import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, MessageCircle } from "lucide-react";
import {
  fetchBlogById,
  clearSelectedBlog,
  incrementView,
} from "../redux/slice/blogSlice";
import { fetchComments, clearComments } from "../redux/slice/commentSlice";
import CommentForm from "../components/comment/commentForm";
import CommentList from "../components/comment/CommentList";
import LikeButton from "../components/LikeButton";

function BlogDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { selectedBlog: blog, loading } = useSelector((state) => state.blogs);
  const { list: comments } = useSelector((state) => state.comments);

  const hasRecordedView = useRef(false);

  useEffect(() => {
    dispatch(fetchBlogById(slug));
    hasRecordedView.current = false;
    return () => dispatch(clearSelectedBlog());
  }, [slug, dispatch]);

  // record exactly one view per page load, once the real post id is known
  useEffect(() => {
    if (blog?._id && !hasRecordedView.current) {
      hasRecordedView.current = true;
      dispatch(incrementView(blog._id));
    }
  }, [blog?._id, dispatch]);

  useEffect(() => {
    if (blog?._id) {
      dispatch(fetchComments(blog._id));
    }
    return () => dispatch(clearComments());
  }, [blog?._id, dispatch]);

  if (loading || !blog) {
    return (
      <div className="container py-5">
        <p className="text-secondary">Loading blog post...</p>
      </div>
    );
  }

  return (
    <article className="container py-5" style={{ maxWidth: 800 }}>
      {/* Breadcrumb */}
      <p className="small text-secondary mb-4 text-center text-md-start">
        <Link to="/" className="text-secondary text-decoration-none">
          Home
        </Link>
        {" > "}
        <Link to="/blog" className="text-secondary text-decoration-none">
          blogs
        </Link>
        {" > "}
        <span>{blog.title}</span>
      </p>
      <img
        src={blog.coverImage?.url}
        alt={blog.title}
        className="w-100 object-fit-cover rounded mb-4"
        style={{ aspectRatio: "16 / 9" }}
      />

      <div className="d-flex align-items-center gap-3 mb-3">
        {blog.author?.avatar && (
          <img
            src={blog.author.avatar}
            alt={blog.author.name}
            className="rounded-circle"
            style={{ width: 44, height: 44, objectFit: "cover" }}
          />
        )}

        <div>
          <p className="fw-semibold mb-0">{blog.author?.name}</p>
          <p className="text-secondary small mb-0">
            {new Date(blog.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="d-flex align-items-center gap-3 text-secondary small ms-auto">
          <span className="d-flex align-items-center gap-1">
            <Eye size={14} /> {blog.views}
          </span>

          <LikeButton blogId={blog._id} likes={blog.likes} />

          <a
            href="#comments"
            className="d-flex align-items-center gap-1 text-decoration-none text-secondary"
          >
            <MessageCircle size={14} /> {comments.length}
          </a>
        </div>
      </div>

      <h1 className="fw-bold mb-4">{blog.title}</h1>

      <div className="mb-5" style={{ whiteSpace: "pre-line" }}>
        {blog.content}
      </div>

      <hr className="mb-4" />

      <div id="comments">
        <CommentForm blogId={blog._id} />
        <CommentList blogId={blog._id} />
      </div>
    </article>
  );
}

export default BlogDetail;
