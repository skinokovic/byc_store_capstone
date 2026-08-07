import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFaqsApi,
  getAllFaqsAdminApi,
  createFaqApi,
  updateFaqApi,
  deleteFaqApi,
} from "../../services/faqApi";

export const fetchFaqs = createAsyncThunk(
  "faqs/fetchFaqs",
  async (_, { rejectWithValue }) => {
    try {
      return await getFaqsApi();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch FAQs",
      );
    }
  },
);

export const fetchAllFaqsAdmin = createAsyncThunk(
  "faqs/fetchAllFaqsAdmin",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllFaqsAdminApi();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch FAQs",
      );
    }
  },
);

export const createFaq = createAsyncThunk(
  "faqs/createFaq",
  async (payload, { rejectWithValue }) => {
    try {
      return await createFaqApi(payload);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create FAQ",
      );
    }
  },
);

export const updateFaq = createAsyncThunk(
  "faqs/updateFaq",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateFaqApi(id, payload);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update FAQ",
      );
    }
  },
);

export const deleteFaq = createAsyncThunk(
  "faqs/deleteFaq",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteFaqApi(id);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete FAQ",
      );
    }
  },
);

const faqSlice = createSlice({
  name: "faqs",
  initialState: {
    list: [], // public, active-only
    adminList: [], // admin, all
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAllFaqsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFaqsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminList = action.payload;
      })
      .addCase(fetchAllFaqsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createFaq.fulfilled, (state, action) => {
        state.adminList.push(action.payload);
      })
      .addCase(createFaq.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updateFaq.fulfilled, (state, action) => {
        state.adminList = state.adminList.map((f) =>
          f._id === action.payload._id ? action.payload : f,
        );
      })
      .addCase(updateFaq.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(deleteFaq.fulfilled, (state, action) => {
        state.adminList = state.adminList.filter(
          (f) => f._id !== action.payload._id,
        );
      })
      .addCase(deleteFaq.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default faqSlice.reducer;
