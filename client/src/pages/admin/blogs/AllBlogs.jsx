import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import BlogTable from "../../../components/admin/tables/BlogTable";
import {
  fetchBlogs,
  deleteBlog,
  updateBlog,
} from "../../../redux/slice/blogSlice";

function AllBlogs() {
  const dispatch = useDispatch();
  const { list: blogs, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  async function handleDelete(id) {
    if (!window.confirm("Delete this blog post?")) return;

    const result = await dispatch(deleteBlog(id));
    if (deleteBlog.fulfilled.match(result)) {
      toast.success("Blog post deleted");
    } else {
      toast.error(result.payload || "Failed to delete blog post");
    }
  }

  async function handleToggleActive(id, currentActive) {
    const fd = new FormData();
    fd.append("isActive", !currentActive);

    const result = await dispatch(updateBlog({ id, formData: fd }));
    if (updateBlog.fulfilled.match(result)) {
      toast.success(
        result.payload.isActive
          ? "Blog post activated"
          : "Blog post deactivated",
      );
    } else {
      toast.error(result.payload || "Failed to update status");
    }
  }

  return (
    <div className="admin-page">
      <div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center gap-2 mb-4">
        <h4 className="mb-0">BYC Africa Blog News</h4>

        <Link
          to="/admin/blogs/create"
          className="btn btn-danger btn-sm d-inline-flex align-items-center justify-content-center gap-1"
        >
          <Plus size={16} />
          Add Blog Post
        </Link>
      </div>

      {loading ? (
        <p className="text-secondary">Loading blog posts...</p>
      ) : (
        <BlogTable
          blogs={blogs}
          onDelete={handleDelete}
          onToggleActive={handleToggleActive}
        />
      )}
    </div>
  );
}

export default AllBlogs;
