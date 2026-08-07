import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBlogsApi,
  getBlogByIdApi,
  createBlogApi,
  updateBlogApi,
  deleteBlogApi,
  likeBlogApi,
  incrementBlogViewApi,
} from "../../services/blogApi";

// --- Thunks ---

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (params, { rejectWithValue }) => {
    try {
      return await getBlogsApi(params);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch blogs",
      );
    }
  },
);

export const fetchBlogById = createAsyncThunk(
  "blogs/fetchBlogById",
  async (idOrSlug, { rejectWithValue }) => {
    try {
      return await getBlogByIdApi(idOrSlug);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch blog",
      );
    }
  },
);

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (formData, { rejectWithValue }) => {
    try {
      return await createBlogApi(formData);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create blog",
      );
    }
  },
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      return await updateBlogApi(id, formData);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update blog",
      );
    }
  },
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      await deleteBlogApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete blog",
      );
    }
  },
);

export const incrementView = createAsyncThunk(
  "blogs/incrementView",
  async (id, { rejectWithValue }) => {
    try {
      return await incrementBlogViewApi(id);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to record view",
      );
    }
  },
);

export const likeBlog = createAsyncThunk(
  "blogs/likeBlog",
  async (id, { rejectWithValue }) => {
    try {
      return await likeBlogApi(id);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to like blog post",
      );
    }
  },
);

// --- Slice ---

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    list: [],
    selectedBlog: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedBlog: (state) => {
      state.selectedBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch one
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog,
        );
        state.selectedBlog = action.payload;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((blog) => blog._id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedBlog } = blogSlice.actions;
export default blogSlice.reducer;
