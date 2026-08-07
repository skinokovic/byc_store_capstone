import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartApi,
  addToCartApi,
  updateCartItemApi,
  removeCartItemApi,
  clearCartApi,
} from "../../services/cartApi";
import {
  clearGuestCart,
  getGuestCart,
  saveGuestCart,
} from "../utils/guestCart";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      return await getCartApi();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch cart",
      );
    }
  },
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity = 1, size = null, color = null },
    { rejectWithValue },
  ) => {
    try {
      return await addToCartApi(productId, quantity, size, color);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add to cart",
      );
    }
  },
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      return await updateCartItemApi(itemId, quantity);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update cart item",
      );
    }
  },
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (itemId, { rejectWithValue }) => {
    try {
      return await removeCartItemApi(itemId);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to remove cart item",
      );
    }
  },
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      await clearCartApi();
      return true;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to clear cart",
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: { items: [] },

    guestCart: getGuestCart(),

    loading: false,
    error: null,
  },
  reducers: {
    addGuestCart(state, action) {
      const product = action.payload;

      const exists = state.guestCart.find((item) => item._id === product._id);

      if (exists) {
        return;
      }

      state.guestCart.push({
        ...product,
        quantity: 1,
      });

      saveGuestCart(state.guestCart);
    },

    removeGuestCart(state, action) {
      state.guestCart = state.guestCart.filter(
        (item) => item._id !== action.payload,
      );

      saveGuestCart(state.guestCart);
    },

    updateGuestCart(state, action) {
      const { id, quantity } = action.payload;

      const item = state.guestCart.find((item) => item._id === id);

      if (item) {
        item.quantity = quantity;

        saveGuestCart(state.guestCart);
      }
    },

    clearGuestCartReducer(state) {
      state.guestCart = [];

      clearGuestCart();
    },
  },

  extraReducers: (builder) => {
    const setCart = (state, action) => {
      state.loading = false;
      state.cart = action.payload;
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
      .addCase(fetchCart.pending, setLoading)
      .addCase(fetchCart.fulfilled, setCart)
      .addCase(fetchCart.rejected, setError)

      .addCase(addToCart.pending, setLoading)
      .addCase(addToCart.fulfilled, setCart)
      .addCase(addToCart.rejected, setError)

      .addCase(updateCartItem.pending, setLoading)
      .addCase(updateCartItem.fulfilled, setCart)
      .addCase(updateCartItem.rejected, setError)

      .addCase(removeCartItem.pending, setLoading)
      .addCase(removeCartItem.fulfilled, setCart)
      .addCase(removeCartItem.rejected, setError)

      .addCase(clearCart.fulfilled, (state) => {
        state.cart = { items: [] };
      });
  },
});
export const {
  addGuestCart,

  removeGuestCart,

  updateGuestCart,

  clearGuestCartReducer,
} = cartSlice.actions;
export default cartSlice.reducer;
