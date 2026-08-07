import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMyAddressesApi,
  createAddressApi,
  updateAddressApi,
  deleteAddressApi,
} from "../../services/addressApi";

export const fetchAddresses = createAsyncThunk(
  "addresses/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      return await getMyAddressesApi();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch addresses",
      );
    }
  },
);

export const createAddress = createAsyncThunk(
  "addresses/createAddress",
  async (payload, { rejectWithValue }) => {
    try {
      return await createAddressApi(payload);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create address",
      );
    }
  },
);

export const updateAddress = createAsyncThunk(
  "addresses/updateAddress",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateAddressApi(id, payload);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update address",
      );
    }
  },
);

export const deleteAddress = createAsyncThunk(
  "addresses/deleteAddress",
  async (id, { rejectWithValue }) => {
    try {
      await deleteAddressApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete address",
      );
    }
  },
);

const addressSlice = createSlice({
  name: "addresses",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createAddress.fulfilled, (state, action) => {
        // creating a new default unsets the old one server-side, so just
        // refetch-shaped locally: clear old defaults if this one is default
        if (action.payload.isDefault) {
          state.list.forEach((a) => (a.isDefault = false));
        }
        state.list.unshift(action.payload);
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updateAddress.fulfilled, (state, action) => {
        if (action.payload.isDefault) {
          state.list.forEach((a) => (a.isDefault = false));
        }
        state.list = state.list.map((a) =>
          a._id === action.payload._id ? action.payload : a,
        );
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.list = state.list.filter((a) => a._id !== action.payload);
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default addressSlice.reducer;
