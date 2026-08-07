import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsByIdsApi } from "../../services/productApi";

const STORAGE_KEY = "recentlyViewedIds";

// Call this from ProductDetails whenever a product page loads
export function trackRecentlyViewed(productId) {
  const ids = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const filtered = ids.filter((id) => id !== productId);
  filtered.unshift(productId); // most recent first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, 10)));
}

export const fetchRecentlyViewed = createAsyncThunk(
  "recentlyViewed/fetch",
  async (excludeId, { rejectWithValue }) => {
    try {
      const ids = (JSON.parse(localStorage.getItem(STORAGE_KEY)) || []).filter(
        (id) => id !== excludeId,
      );
      if (!ids.length) return [];

      const products = await getProductsByIdsApi(ids);
      // preserve most-recent-first order (Mongo $in doesn't guarantee order)
      return ids
        .map((id) => products.find((p) => p._id === id))
        .filter(Boolean);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentlyViewed.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentlyViewed.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRecentlyViewed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default recentlyViewedSlice.reducer;
