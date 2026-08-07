import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDashboard } from "../../services/dashboardApi";

// =============================================
// GET DASHBOARD
// =============================================

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      return await getDashboard();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch dashboard",
      );
    }
  },
);

const initialState = {
  revenue: 0,

  totalOrders: 0,

  pendingOrders: 0,

  processingOrders: 0,

  transitOrders: 0,

  deliveredOrders: 0,

  cancelledOrders: 0,

  totalProducts: 0,

  totalCustomers: 0,

  revenueChart: [],

  topProducts: [],

  recentOrders: [],

  recentCustomers: [],

  lowStockProducts: [],

  loading: false,

  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ===================================
      // FETCH DASHBOARD
      // ===================================

      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;

        state.revenue = action.payload.revenue;

        state.totalOrders = action.payload.totalOrders;

        state.pendingOrders = action.payload.pendingOrders;

        state.processingOrders = action.payload.processingOrders;

        state.transitOrders = action.payload.transitOrders;

        state.deliveredOrders = action.payload.deliveredOrders;

        state.cancelledOrders = action.payload.cancelledOrders;

        state.totalProducts = action.payload.totalProducts;

        state.totalCustomers = action.payload.totalCustomers;

        state.revenueChart = action.payload.revenueChart;

        state.topProducts = action.payload.topProducts;

        state.recentOrders = action.payload.recentOrders;

        state.recentCustomers = action.payload.recentCustomers;

        state.lowStockProducts = action.payload.lowStockProducts;
      })

      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
