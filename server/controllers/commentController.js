// import Comment from "../models/commentModel.js";
// import Blog from "../models/blogModel.js";

// // @desc    Get all comments for a blog post (flat list, ordered oldest
// //          first - the frontend builds the nested reply tree from
// //          parentComment references)
// // @route   GET /api/comments/blog/:blogId
// // @access  Public
// export const getCommentsForBlog = async (req, res) => {
//   try {
//     const comments = await Comment.find({
//       blog: req.params.blogId,
//       isActive: true,
//     }).sort({ createdAt: 1 });

//     res.status(200).json(comments);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Failed to fetch comments", error: error.message });
//   }
// };

// // @desc    Add a comment (or a reply, via parentComment) to a blog post.
// //          No login required - guestName/guestEmail identify the commenter.
// // @route   POST /api/comments
// // @access  Public
// export const createComment = async (req, res) => {
//   try {
//     const {
//       blog: blogId,
//       parentComment,
//       guestName,
//       guestEmail,
//       content,
//     } = req.body;

//     const blog = await Blog.findById(blogId);
//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }

//     if (parentComment) {
//       const parent = await Comment.findById(parentComment);
//       if (!parent || String(parent.blog) !== String(blogId)) {
//         return res
//           .status(400)
//           .json({ message: "Invalid parent comment for this blog post" });
//       }
//     }

//     const comment = await Comment.create({
//       blog: blogId,
//       parentComment: parentComment || null,
//       guestName,
//       guestEmail,
//       content,
//     });

//     blog.commentCount = (blog.commentCount || 0) + 1;
//     await blog.save();

//     res.status(201).json(comment);
//   } catch (error) {
//     res
//       .status(400)
//       .json({ message: "Failed to add comment", error: error.message });
//   }
// };

// // @desc    Delete a comment. Cascades: also deletes every reply nested
// //          underneath it (direct and indirect), so a removed comment never
// //          leaves orphaned replies behind.
// // @route   DELETE /api/comments/:id
// // @access  Private/Admin
// export const deleteComment = async (req, res) => {
//   try {
//     const comment = await Comment.findById(req.params.id);
//     if (!comment) {
//       return res.status(404).json({ message: "Comment not found" });
//     }

//     // collect this comment + every descendant reply, breadth-first
//     const idsToDelete = [comment._id];
//     let frontier = [comment._id];

//     while (frontier.length > 0) {
//       const children = await Comment.find({
//         parentComment: { $in: frontier },
//       }).select("_id");

//       if (children.length === 0) break;

//       const childIds = children.map((c) => c._id);
//       idsToDelete.push(...childIds);
//       frontier = childIds;
//     }

//     await Comment.deleteMany({ _id: { $in: idsToDelete } });

//     await Blog.findByIdAndUpdate(comment.blog, {
//       $inc: { commentCount: -idsToDelete.length },
//     });

//     res.status(200).json({
//       message: "Comment deleted successfully",
//       deletedCount: idsToDelete.length,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Failed to delete comment", error: error.message });
//   }
// };

import Comment from "../models/commentModel.js";
import Blog from "../models/blogModel.js";

// @desc    Get all comments for a blog post (flat list, ordered oldest
//          first - the frontend builds the nested reply tree from
//          parentComment references)
// @route   GET /api/comments/blog/:blogId
// @access  Public
export const getCommentsForBlog = async (req, res) => {
  try {
    const comments = await Comment.find({
      blog: req.params.blogId,
      isActive: true,
    }).sort({ createdAt: 1 });

    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch comments", error: error.message });
  }
};

// @desc    Get every comment across all blog posts, for admin moderation.
//          Populated with which blog each comment belongs to (title/slug)
//          so the moderation table can link back to it in context.
// @route   GET /api/comments
// @access  Private/Admin
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("blog", "title slug")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch comments", error: error.message });
  }
};

// @desc    Add a comment (or a reply, via parentComment) to a blog post.
//          No login required - guestName/guestEmail identify the commenter.
// @route   POST /api/comments
// @access  Public
export const createComment = async (req, res) => {
  try {
    const {
      blog: blogId,
      parentComment,
      guestName,
      guestEmail,
      content,
    } = req.body;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (parentComment) {
      const parent = await Comment.findById(parentComment);
      if (!parent || String(parent.blog) !== String(blogId)) {
        return res
          .status(400)
          .json({ message: "Invalid parent comment for this blog post" });
      }
    }

    const comment = await Comment.create({
      blog: blogId,
      parentComment: parentComment || null,
      guestName,
      guestEmail,
      content,
    });

    blog.commentCount = (blog.commentCount || 0) + 1;
    await blog.save();

    res.status(201).json(comment);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to add comment", error: error.message });
  }
};

// @desc    Delete a comment. Cascades: also deletes every reply nested
//          underneath it (direct and indirect), so a removed comment never
//          leaves orphaned replies behind.
// @route   DELETE /api/comments/:id
// @access  Private/Admin
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // collect this comment + every descendant reply, breadth-first
    const idsToDelete = [comment._id];
    let frontier = [comment._id];

    while (frontier.length > 0) {
      const children = await Comment.find({
        parentComment: { $in: frontier },
      }).select("_id");

      if (children.length === 0) break;

      const childIds = children.map((c) => c._id);
      idsToDelete.push(...childIds);
      frontier = childIds;
    }

    await Comment.deleteMany({ _id: { $in: idsToDelete } });

    await Blog.findByIdAndUpdate(comment.blog, {
      $inc: { commentCount: -idsToDelete.length },
    });

    res.status(200).json({
      message: "Comment deleted successfully",
      deletedCount: idsToDelete.length,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete comment", error: error.message });
  }
};
