// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   getCommentsForBlogApi,
//   createCommentApi,
//   deleteCommentApi,
// } from "../../services/commentApi";

// // --- Thunks ---

// export const fetchComments = createAsyncThunk(
//   "comments/fetchComments",
//   async (blogId, { rejectWithValue }) => {
//     try {
//       return await getCommentsForBlogApi(blogId);
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Failed to fetch comments",
//       );
//     }
//   },
// );

// export const addComment = createAsyncThunk(
//   "comments/addComment",
//   async (payload, { rejectWithValue }) => {
//     try {
//       return await createCommentApi(payload);
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Failed to add comment",
//       );
//     }
//   },
// );

// export const removeComment = createAsyncThunk(
//   "comments/removeComment",
//   async (id, { rejectWithValue }) => {
//     try {
//       await deleteCommentApi(id);
//       return id;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Failed to delete comment",
//       );
//     }
//   },
// );

// // --- Slice ---

// const commentSlice = createSlice({
//   name: "comments",
//   initialState: {
//     list: [], // flat list for whichever blog is currently loaded
//     loading: false,
//     submitting: false,
//     error: null,
//   },
//   reducers: {
//     clearComments: (state) => {
//       state.list = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // fetch
//       .addCase(fetchComments.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchComments.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload;
//       })
//       .addCase(fetchComments.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // add
//       .addCase(addComment.pending, (state) => {
//         state.submitting = true;
//         state.error = null;
//       })
//       .addCase(addComment.fulfilled, (state, action) => {
//         state.submitting = false;
//         state.list.push(action.payload);
//       })
//       .addCase(addComment.rejected, (state, action) => {
//         state.submitting = false;
//         state.error = action.payload;
//       })

//       // delete (removes the comment + relies on a follow-up fetch, or we
//       // filter locally - since deletion cascades server-side to replies too,
//       // we just refilter out anything no longer reachable after a refetch;
//       // for an instant UI update we optimistically drop the one comment here)
//       .addCase(removeComment.fulfilled, (state, action) => {
//         state.list = state.list.filter((c) => c._id !== action.payload);
//       })
//       .addCase(removeComment.rejected, (state, action) => {
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearComments } = commentSlice.actions;
// export default commentSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCommentsForBlogApi,
  getAllCommentsApi,
  createCommentApi,
  deleteCommentApi,
} from "../../services/commentApi";

// --- Thunks ---

// public: flat thread for one blog post (used on the public BlogDetail page)
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (blogId, { rejectWithValue }) => {
    try {
      return await getCommentsForBlogApi(blogId);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch comments",
      );
    }
  },
);

// admin only: every comment across every blog post, for moderation
export const fetchAllComments = createAsyncThunk(
  "comments/fetchAllComments",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllCommentsApi();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch comments",
      );
    }
  },
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async (payload, { rejectWithValue }) => {
    try {
      return await createCommentApi(payload);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add comment",
      );
    }
  },
);

export const removeComment = createAsyncThunk(
  "comments/removeComment",
  async (id, { rejectWithValue }) => {
    try {
      await deleteCommentApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete comment",
      );
    }
  },
);

// --- Slice ---

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    list: [], // flat thread for whichever single blog post is loaded (public page)
    adminList: [], // every comment across all posts, for the admin moderation table
    loading: false,
    submitting: false,
    error: null,
  },
  reducers: {
    clearComments: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch (public, single post)
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch all (admin moderation table)
      .addCase(fetchAllComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllComments.fulfilled, (state, action) => {
        state.loading = false;
        state.adminList = action.payload;
      })
      .addCase(fetchAllComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // add
      .addCase(addComment.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.submitting = false;
        state.list.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })

      // delete - both public thread and admin table filter out the same id,
      // whichever one happens to hold it (a cascade-deleted reply on the
      // public side gets cleaned up by the refetch CommentList triggers,
      // same as before)
      .addCase(removeComment.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c._id !== action.payload);
        state.adminList = state.adminList.filter(
          (c) => c._id !== action.payload,
        );
      })
      .addCase(removeComment.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearComments } = commentSlice.actions;
export default commentSlice.reducer;
