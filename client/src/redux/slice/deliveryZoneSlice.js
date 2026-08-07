import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDeliveryZonesApi,
  createDeliveryZoneApi,
  updateDeliveryZoneApi,
  deleteDeliveryZoneApi,
} from "../../services/deliveryZonesApi";

export const fetchDeliveryZones = createAsyncThunk(
  "deliveryZones/fetchDeliveryZones",
  async (_, { rejectWithValue }) => {
    try {
      return await getDeliveryZonesApi();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch delivery zones",
      );
    }
  },
);

export const createDeliveryZone = createAsyncThunk(
  "deliveryZones/createDeliveryZone",
  async (payload, { rejectWithValue }) => {
    try {
      return await createDeliveryZoneApi(payload);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create delivery zone",
      );
    }
  },
);

export const updateDeliveryZone = createAsyncThunk(
  "deliveryZones/updateDeliveryZone",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateDeliveryZoneApi(id, payload);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update delivery zone",
      );
    }
  },
);

export const deleteDeliveryZone = createAsyncThunk(
  "deliveryZones/deleteDeliveryZone",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDeliveryZoneApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete delivery zone",
      );
    }
  },
);

const deliveryZoneSlice = createSlice({
  name: "deliveryZones",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveryZones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveryZones.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchDeliveryZones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createDeliveryZone.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(createDeliveryZone.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updateDeliveryZone.fulfilled, (state, action) => {
        state.list = state.list.map((z) =>
          z._id === action.payload._id ? action.payload : z,
        );
      })
      .addCase(updateDeliveryZone.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(deleteDeliveryZone.fulfilled, (state, action) => {
        state.list = state.list.filter((z) => z._id !== action.payload);
      })
      .addCase(deleteDeliveryZone.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default deliveryZoneSlice.reducer;
