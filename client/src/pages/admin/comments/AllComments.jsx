import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CommentTable from "../../../components/admin/tables/CommentTable";
import {
  fetchAllComments,
  removeComment,
} from "../../../redux/slice/commentSlice";

function AllComments() {
  const dispatch = useDispatch();
  const { adminList: comments, loading } = useSelector(
    (state) => state.comments,
  );

  useEffect(() => {
    dispatch(fetchAllComments());
  }, [dispatch]);

  async function handleDelete(id) {
    if (!window.confirm("Delete this comment and all its replies?")) return;

    const result = await dispatch(removeComment(id));

    if (removeComment.fulfilled.match(result)) {
      toast.success("Comment deleted");
      // deletion cascades to replies server-side, so refetch to drop any
      // now-orphaned replies the local filter alone wouldn't catch
      dispatch(fetchAllComments());
    } else {
      toast.error(result.payload || "Failed to delete comment");
    }
  }

  return (
    <div className="admin-page">
      <div className="mb-4">
        <h4 className="mb-0">Comments</h4>
        <p className="text-secondary small mb-0">
          Moderate comments and replies across every blog post.
        </p>
      </div>

      {loading ? (
        <p className="text-secondary">Loading comments...</p>
      ) : (
        <CommentTable comments={comments} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default AllComments;
