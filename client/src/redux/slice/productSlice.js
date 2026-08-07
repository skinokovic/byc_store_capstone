import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProductsApi,
  getProductByIdApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,

  // NEW
  getShopProductsApi,
  addProductReviewApi,
  getRelatedProductsApi,
} from "../../services/productApi";

// --- Thunks: one per productApi.js function ---

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params, { rejectWithValue }) => {
    try {
      return await getProductsApi(params);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// =========================================
// Shop By Category Products
// =========================================

export const fetchShopProducts = createAsyncThunk(
  "products/fetchShopProducts",
  async (params, { rejectWithValue }) => {
    try {
      return await getShopProductsApi(params);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      return await getProductByIdApi(id);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product, { rejectWithValue }) => {
    try {
      return await createProductApi(product);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      return await updateProductApi(id, formData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await deleteProductApi(id);
      return id; // only need the id back, to remove it from state.list below
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const addProductReview = createAsyncThunk(
  "products/addProductReview",
  async ({ id, reviewData }, { rejectWithValue }) => {
    try {
      return await addProductReviewApi(id, reviewData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const fetchRelatedProducts = createAsyncThunk(
  "products/fetchRelatedProducts",
  async ({ id, limit }, { rejectWithValue }) => {
    try {
      return await getRelatedProductsApi(id, limit);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    // Admin Product List
    list: [],

    // Homepage
    shopProducts: [],

    // Product Details
    selectedProduct: null,

    //Related Product
    relatedProducts: [],
    relatedLoading: false,
    relatedError: null,

    loading: false,

    error: null,
  },
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.relatedProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // --- fetchProducts ---
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================================
      // fetchShopProducts
      // =========================================

      .addCase(fetchShopProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchShopProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.shopProducts = action.payload;
      })

      .addCase(fetchShopProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- fetchProductById ---
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- createProduct ---
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- updateProduct ---
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
        if (state.selectedProduct?._id === action.payload._id) {
          state.selectedProduct = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- deleteProduct ---
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addProductReview.fulfilled, (state, action) => {
        state.selectedProduct = action.payload; // updated product w/ new review + recalculated rating
      })
      .addCase(addProductReview.rejected, (state, action) => {
        state.error = action.payload;
      })
      //Related Products
      .addCase(fetchRelatedProducts.pending, (state) => {
        state.relatedLoading = true;
        state.relatedError = null;
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.relatedLoading = false;
        state.relatedProducts = action.payload;
      })
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.relatedLoading = false;
        state.relatedError = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
