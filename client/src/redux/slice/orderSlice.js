import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createOrderApi,
  getMyOrdersApi,
  getOrderByIdApi,
  cancelOrderApi,
  getAllOrdersApi,
  updateOrderStatusApi,
} from "../../services/orderApi";

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ addressId, paymentMethod }, { rejectWithValue }) => {
    try {
      return await createOrderApi(addressId, paymentMethod);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to place order",
      );
    }
  },
);

export const fetchMyOrders = createAsyncThunk(
  "orders/fetchMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await getMyOrdersApi();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders",
      );
    }
  },
);

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (id, { rejectWithValue }) => {
    try {
      return await getOrderByIdApi(id);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch order",
      );
    }
  },
);

export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async (id, { rejectWithValue }) => {
    try {
      return await cancelOrderApi(id);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to cancel order",
      );
    }
  },
);

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (params, { rejectWithValue }) => {
    try {
      return await getAllOrdersApi(params);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders",
      );
    }
  },
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateOrderStatusApi(id, payload);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update order",
      );
    }
  },
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    myOrders: [],
    allOrders: [], // admin
    selectedOrder: null,
    loading: false,
    submitting: false,
    error: null,
  },
  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // create
      .addCase(createOrder.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.submitting = false;
        state.myOrders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })

      // my orders
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // single order
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // cancel
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.myOrders = state.myOrders.map((o) =>
          o._id === action.payload._id ? action.payload : o,
        );
        if (state.selectedOrder?._id === action.payload._id) {
          state.selectedOrder = action.payload;
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.error = action.payload;
      })

      // admin: all orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // admin: update status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.allOrders = state.allOrders.map((o) =>
          o._id === action.payload._id ? action.payload : o,
        );
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;
