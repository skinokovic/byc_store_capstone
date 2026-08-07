import Blog from "../models/blogModel.js";
import cloudinary from "../config/cloudinary.js";

function slugify(text) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

const AUTHOR_FIELDS = "name avatar";

// @desc    Get all blog posts (supports ?active=true for the public homepage)
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res) => {
  try {
    const filter = {};
    if (req.query.active === "true") filter.isActive = true;

    const blogs = await Blog.find(filter)
      .populate("author", AUTHOR_FIELDS)
      .sort({ order: 1, createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch blogs", error: error.message });
  }
};

// @desc    Get a single blog post by id or slug
// @route   GET /api/blogs/:idOrSlug
// @access  Public
export const getBlogById = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const isObjectId = idOrSlug.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: idOrSlug } : { slug: idOrSlug };

    const blog = await Blog.findOne(query).populate("author", AUTHOR_FIELDS);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch blog", error: error.message });
  }
};

// @desc    Increment a blog post's view count by 1. Called once when a
//          visitor opens the full post - atomic $inc so concurrent views
//          from different visitors can never race/overwrite each other.
// @route   PATCH /api/blogs/:id/view
// @access  Public
export const incrementBlogView = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true },
    ).populate("author", AUTHOR_FIELDS);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to record view", error: error.message });
  }
};

// @desc    Increment a blog post's like count by 1. No login required -
//          the frontend guards against a single visitor liking the same
//          post repeatedly via localStorage, since there's no user account
//          to attach a "like" record to.
// @route   PATCH /api/blogs/:id/like
// @access  Public
export const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true },
    ).populate("author", AUTHOR_FIELDS);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to like blog post", error: error.message });
  }
};

// @desc    Create a new blog post
// @route   POST /api/blogs/create
// @access  Private/Admin
export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, views, likes, order, isActive } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Cover image is required" });
    }

    const blog = await Blog.create({
      title,
      slug: slugify(title),
      excerpt,
      content,
      views,
      likes,
      order,
      isActive,
      // author is always the logged-in admin making the request - never
      // trust a client-submitted author id here
      author: req.user._id,
      coverImage: {
        url: req.file.path,
        public_id: req.file.filename,
      },
    });

    const populated = await blog.populate("author", AUTHOR_FIELDS);
    res.status(201).json(populated);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create blog", error: error.message });
  }
};

// @desc    Update an existing blog post
// @route   PUT /api/blogs/update/:id
// @access  Private/Admin
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const { title, excerpt, content, views, likes, order, isActive } = req.body;

    if (title !== undefined) {
      blog.title = title;
      blog.slug = slugify(title);
    }
    if (excerpt !== undefined) blog.excerpt = excerpt;
    if (content !== undefined) blog.content = content;
    if (views !== undefined) blog.views = views;
    if (likes !== undefined) blog.likes = likes;
    if (order !== undefined) blog.order = order;
    if (isActive !== undefined) blog.isActive = isActive;

    // author is intentionally never reassigned here - editing a post
    // doesn't transfer authorship to whoever happens to edit it

    if (req.file) {
      if (blog.coverImage?.public_id) {
        await cloudinary.uploader.destroy(blog.coverImage.public_id);
      }
      blog.coverImage = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    await blog.save();
    const populated = await blog.populate("author", AUTHOR_FIELDS);
    res.status(200).json(populated);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update blog", error: error.message });
  }
};

// @desc    Delete a blog post + its cover image
// @route   DELETE /api/blogs/delete/:id
// @access  Private/Admin
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.coverImage?.public_id) {
      await cloudinary.uploader.destroy(blog.coverImage.public_id);
    }

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete blog", error: error.message });
  }
};
