import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addComment } from "../../redux/slice/commentSlice";

const emptyForm = { guestName: "", guestEmail: "", content: "" };

function CommentForm({ blogId, parentComment = null, onDone }) {
  const dispatch = useDispatch();
  const { submitting } = useSelector((state) => state.comments);

  const [form, setForm] = useState(emptyForm);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await dispatch(
      addComment({
        blog: blogId,
        parentComment,
        guestName: form.guestName,
        guestEmail: form.guestEmail,
        content: form.content,
      }),
    );

    if (addComment.fulfilled.match(result)) {
      toast.success(parentComment ? "Reply posted" : "Comment posted");
      setForm(emptyForm);
      onDone?.();
    } else {
      toast.error(result.payload || "Failed to post comment");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2 mb-2">
        <div className="col-12 col-sm-6">
          <input
            name="guestName"
            value={form.guestName}
            onChange={handleChange}
            required
            placeholder="Your name"
            className="form-control form-control-sm"
          />
        </div>

        <div className="col-12 col-sm-6">
          <input
            type="email"
            name="guestEmail"
            value={form.guestEmail}
            onChange={handleChange}
            required
            placeholder="Your email (not shown publicly)"
            className="form-control form-control-sm"
          />
        </div>
      </div>

      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        required
        rows={parentComment ? 2 : 3}
        maxLength={2000}
        placeholder={parentComment ? "Write a reply..." : "Write a comment..."}
        className="form-control form-control-sm mb-2"
      />

      <div className="d-flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-danger btn-sm"
        >
          {submitting
            ? "Posting..."
            : parentComment
              ? "Post Reply"
              : "Post Comment"}
        </button>

        {parentComment && (
          <button
            type="button"
            onClick={onDone}
            className="btn btn-outline-secondary btn-sm"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default CommentForm;
