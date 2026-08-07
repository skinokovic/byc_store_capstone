import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Trash2, Reply } from "lucide-react";
import { removeComment, fetchComments } from "../../redux/slice/commentSlice";
import CommentForm from "./commentForm";

function timeAgo(dateString) {
  const seconds = Math.floor((Date.now() - new Date(dateString)) / 1000);
  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [label, secondsInUnit] of units) {
    const count = Math.floor(seconds / secondsInUnit);
    if (count >= 1) return `${count} ${label}${count > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

// builds a parentComment -> children tree out of the flat list your API
// returns, so it only has to be computed once per render rather than
// filtering the array repeatedly for every node
function buildTree(comments) {
  const byParent = {};
  comments.forEach((comment) => {
    const key = comment.parentComment || "root";
    if (!byParent[key]) byParent[key] = [];
    byParent[key].push(comment);
  });
  return byParent;
}

function CommentNode({ comment, byParent, blogId, isAdmin, depth = 0 }) {
  const dispatch = useDispatch();
  const [replying, setReplying] = useState(false);

  const replies = byParent[comment._id] || [];

  async function handleDelete() {
    if (!window.confirm("Delete this comment and all its replies?")) return;

    const result = await dispatch(removeComment(comment._id));
    if (removeComment.fulfilled.match(result)) {
      toast.success("Comment deleted");
      // cascade-deletes replies server-side, so refetch to drop any
      // now-orphaned replies from local state too
      dispatch(fetchComments(blogId));
    } else {
      toast.error(result.payload || "Failed to delete comment");
    }
  }

  return (
    <div
      className={depth > 0 ? "ms-4 ps-3 border-start mt-3" : "mt-4"}
      style={{ maxWidth: 700 }}
    >
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <span className="fw-semibold me-2">{comment.guestName}</span>
          <span className="text-secondary small">
            {timeAgo(comment.createdAt)}
          </span>
        </div>

        {isAdmin && (
          <button
            type="button"
            onClick={handleDelete}
            className="btn btn-link btn-sm text-danger p-0"
            aria-label="Delete comment"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      <p className="mb-1 mt-1">{comment.content}</p>

      <button
        type="button"
        onClick={() => setReplying((prev) => !prev)}
        className="btn btn-link btn-sm p-0 d-inline-flex align-items-center gap-1 text-secondary"
      >
        <Reply size={14} /> Reply
      </button>

      {replying && (
        <div className="mt-2">
          <CommentForm
            blogId={blogId}
            parentComment={comment._id}
            onDone={() => setReplying(false)}
          />
        </div>
      )}

      {replies.map((reply) => (
        <CommentNode
          key={reply._id}
          comment={reply}
          byParent={byParent}
          blogId={blogId}
          isAdmin={isAdmin}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}

function CommentList({ blogId }) {
  const { list: comments, loading } = useSelector((state) => state.comments);

  // NOTE: assumes your authSlice stores the logged-in user at
  // state.auth.user with a `role` field - adjust this selector if your
  // actual auth slice shape differs
  const currentUser = useSelector((state) => state.auth?.user);
  const isAdmin = currentUser?.role === "admin";

  if (loading) return <p className="text-secondary">Loading comments...</p>;

  const byParent = buildTree(comments);
  const topLevel = byParent.root || [];

  return (
    <div>
      <h5 className="mb-0">{comments.length} Comments</h5>

      {topLevel.length === 0 ? (
        <p className="text-secondary mt-3">
          No comments yet. Be the first to share your thoughts.
        </p>
      ) : (
        topLevel.map((comment) => (
          <CommentNode
            key={comment._id}
            comment={comment}
            byParent={byParent}
            blogId={blogId}
            isAdmin={isAdmin}
          />
        ))
      )}
    </div>
  );
}

export default CommentList;
