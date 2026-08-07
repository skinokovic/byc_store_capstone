// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { registerApi, loginApi } from "../../services/authApi";

// // Restore session from localStorage on app load. Safe to trust here since
// // this project uses a Bearer token (not an httpOnly cookie) - the token
// // itself is what protect/authorize actually validate on every request, so
// // a stale/tampered localStorage value just gets rejected server-side.
// const userFromStorage = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;

// export const login = createAsyncThunk(
//   "auth/login",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const data = await loginApi(credentials);
//       localStorage.setItem("user", JSON.stringify(data));
//       localStorage.setItem("token", data.token);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   },
// );

// export const register = createAsyncThunk(
//   "auth/register",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const data = await registerApi(userData);
//       localStorage.setItem("user", JSON.stringify(data));
//       localStorage.setItem("token", data.token);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   },
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: userFromStorage,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     // Synchronous - no backend call needed. With a Bearer token (not a
//     // cookie), "logging out" is just deleting the token client-side; there's
//     // nothing server-side to clear.
//     logout: (state) => {
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//       state.user = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(register.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerApi,
  loginApi,
  updateProfileApi,
  uploadAvatarApi,
} from "../../services/authApi";

// Restore session from localStorage on app load. Safe to trust here since
// this project uses a Bearer token (not an httpOnly cookie) - the token
// itself is what protect/authorize actually validate on every request, so
// a stale/tampered localStorage value just gets rejected server-side.
const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

// Keeps localStorage's "user" entry in sync with fresh data (used after
// login/register/profile update/avatar upload) - avoids repeating this
// pair of lines in every thunk below.
function persistUser(data) {
  localStorage.setItem("user", JSON.stringify(data));
}

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginApi(credentials);
      persistUser(data);
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerApi(userData);
      persistUser(data);
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await updateProfileApi(userData);
      persistUser(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const uploadAvatar = createAsyncThunk(
  "auth/uploadAvatar",
  async (file, { rejectWithValue }) => {
    try {
      const data = await uploadAvatarApi(file);
      persistUser(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromStorage,
    loading: false,
    error: null,
  },
  reducers: {
    // Synchronous - no backend call needed. With a Bearer token (not a
    // cookie), "logging out" is just deleting the token client-side; there's
    // nothing server-side to clear.
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
