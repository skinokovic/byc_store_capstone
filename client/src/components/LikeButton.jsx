import { useState } from "react";
import { useDispatch } from "react-redux";
import { Heart } from "lucide-react";
import { likeBlog } from "../redux/slice/blogSlice";

const STORAGE_KEY = "likedBlogPosts";

function getLikedPosts() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function markPostLiked(id) {
  const liked = getLikedPosts();
  if (!liked.includes(id)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...liked, id]));
  }
}

function LikeButton({ blogId, likes }) {
  const dispatch = useDispatch();
  const [alreadyLiked, setAlreadyLiked] = useState(() =>
    getLikedPosts().includes(blogId),
  );

  function handleLike(e) {
    e.preventDefault(); // in case this sits inside a card-level <Link>
    e.stopPropagation();

    if (alreadyLiked) return;

    dispatch(likeBlog(blogId));
    markPostLiked(blogId);
    setAlreadyLiked(true);
  }

  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={alreadyLiked}
      className="btn btn-link p-0 d-flex align-items-center gap-1 text-decoration-none"
      style={{ color: alreadyLiked ? "#dc3545" : "inherit" }}
      aria-label={alreadyLiked ? "Already liked" : "Like this post"}
      title={alreadyLiked ? "You already liked this" : "Like this post"}
    >
      <Heart size={14} fill={alreadyLiked ? "#dc3545" : "none"} />
      <span className="text-secondary">{likes}</span>
    </button>
  );
}

export default LikeButton;
