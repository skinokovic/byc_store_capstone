import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getWishlistApi,
  addToWishlistApi,
  removeFromWishlistApi,
} from "../../services/wishlistApi";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      return await getWishlistApi();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch wishlist",
      );
    }
  },
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      return await addToWishlistApi(productId);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add to wishlist",
      );
    }
  },
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      return await removeFromWishlistApi(productId);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to remove from wishlist",
      );
    }
  },
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: { products: [] },
    loading: false,
    error: null,

    // Notification badge count
    notificationCount: 0,
  },
  reducers: {
    clearWishlistNotification(state) {
      state.notificationCount = 0;
    },
  },
  extraReducers: (builder) => {
    const setWishlist = (state, action) => {
      state.loading = false;
      state.wishlist = action.payload;
    };

    const addWishlistSuccess = (state, action) => {
      state.loading = false;

      const previousProducts = state.wishlist.products || [];
      const newProducts = action.payload.products || [];

      // Increase badge only if wishlist length actually increased
      if (newProducts.length > previousProducts.length) {
        state.notificationCount += newProducts.length - previousProducts.length;
      }

      state.wishlist = action.payload;
    };

    const setLoading = (state) => {
      state.loading = true;
      state.error = null;
    };
    const setError = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    builder
      .addCase(fetchWishlist.pending, setLoading)
      .addCase(fetchWishlist.fulfilled, setWishlist)

      .addCase(fetchWishlist.rejected, setError)

      .addCase(addToWishlist.pending, setLoading)
      // .addCase(addToWishlist.fulfilled, setWishlist)
      .addCase(addToWishlist.fulfilled, addWishlistSuccess)
      .addCase(addToWishlist.rejected, setError)

      .addCase(removeFromWishlist.pending, setLoading)
      .addCase(removeFromWishlist.fulfilled, setWishlist)
      .addCase(removeFromWishlist.rejected, setError);
  },
});
export const { clearWishlistNotification } = wishlistSlice.actions;

export default wishlistSlice.reducer;
