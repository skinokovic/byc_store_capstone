import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BlogForm from "../../../components/admin/forms/BlogForm";
import {
  createBlog,
  updateBlog,
  fetchBlogById,
  clearSelectedBlog,
} from "../../../redux/slice/blogSlice";

// Doubles as the edit page - if the URL has an :id (i.e. you're at
// /admin/blogs/edit/:id), this loads and edits that blog instead of
// creating a new one.
function CreateBlog() {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedBlog, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchBlogById(id));
    }
    return () => dispatch(clearSelectedBlog());
  }, [id, isEditMode, dispatch]);

  async function handleSubmit(formData) {
    const action = isEditMode
      ? updateBlog({ id, formData })
      : createBlog(formData);

    const result = await dispatch(action);

    if (
      createBlog.fulfilled.match(result) ||
      updateBlog.fulfilled.match(result)
    ) {
      toast.success(
        isEditMode
          ? "Blog updated successfully!"
          : "Blog created successfully!",
      );
      navigate("/admin/blogs");
    } else {
      toast.error(result.payload || "Operation failed");
    }
  }

  // In edit mode, wait for the blog to load before rendering the form -
  // otherwise BlogForm would briefly render with empty initialValues.
  if (isEditMode && !selectedBlog) {
    return (
      <div className="admin-page">
        <h4 className="mb-4">Loading blog...</h4>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <h4 className="mb-4">
        {isEditMode ? "Edit Blog Post" : "Add New Blog Post"}
      </h4>

      <div className="admin-card">
        {error && <p className="text-danger small mb-3">{error}</p>}

        <BlogForm
          initialValues={isEditMode ? selectedBlog : undefined}
          onSubmit={handleSubmit}
          submitLabel={
            loading ? "Saving..." : isEditMode ? "Update Blog" : "Create Blog"
          }
        />
      </div>
    </div>
  );
}

export default CreateBlog;
