import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCategoriesApi,
  getCategoryApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,

  // NEW
  getParentCategoriesApi,
  getSubCategoriesApi,
  getAllCategoriesApi,
} from "../../services/categoryApi";

// export const fetchCategories = createAsyncThunk(
//   "categories/fetchCategories",
//   async (_, { rejectWithValue }) => {
//     try {
//       return await getCategoriesApi();
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   },
// );

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCategoriesApi();

      console.log("Thunk Result:", data);

      return data;
    } catch (error) {
      console.log("Thunk Error:", error);

      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllCategoriesApi();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// ========================================
// Parent Categories
// ========================================

export const fetchParentCategories = createAsyncThunk(
  "categories/fetchParentCategories",
  async (_, { rejectWithValue }) => {
    try {
      return await getParentCategoriesApi();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// ========================================
// Sub Categories
// ========================================

export const fetchSubCategories = createAsyncThunk(
  "categories/fetchSubCategories",
  async (parentId, { rejectWithValue }) => {
    try {
      return await getSubCategoriesApi(parentId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const fetchCategoryByIdOrSlug = createAsyncThunk(
  "categories/fetchCategoryByIdOrSlug",
  async (idOrSlug, { rejectWithValue }) => {
    try {
      return await getCategoryApi(idOrSlug);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (category, { rejectWithValue }) => {
    try {
      return await createCategoryApi(category);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, category }, { rejectWithValue }) => {
    try {
      return await updateCategoryApi(id, category);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await deleteCategoryApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    list: [],

    // Homepage
    parentCategories: [],
    subCategories: [],

    // Existing
    selectedCategory: null,

    loading: false,

    error: null,
  },
  reducers: {
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder;
    // // --- fetchCategories ---
    // .addCase(fetchCategories.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(fetchCategories.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.list = action.payload;
    // })
    // .addCase(fetchCategories.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // })
    // // --- fetchAllCategories ---
    // .addCase(fetchAllCategories.fulfilled, (state, action) => {
    //   state.list = action.payload;
    // })

    // // ========================================
    // // Parent Categories
    // // ========================================

    // .addCase(fetchParentCategories.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })

    // .addCase(fetchParentCategories.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.parentCategories = action.payload;
    // })

    // .addCase(fetchParentCategories.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // })

    // // ========================================
    // // Sub Categories
    // // ========================================

    // .addCase(fetchSubCategories.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })

    // .addCase(fetchSubCategories.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.subCategories = action.payload;
    // })

    // .addCase(fetchSubCategories.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // })

    // // --- fetchCategoryByIdOrSlug ---
    // .addCase(fetchCategoryByIdOrSlug.fulfilled, (state, action) => {
    //   state.selectedCategory = action.payload;
    // })

    // // --- createCategory ---
    // .addCase(createCategory.fulfilled, (state, action) => {
    //   state.list.push(action.payload);
    // })
    // .addCase(createCategory.rejected, (state, action) => {
    //   state.error = action.payload;
    // })

    // // --- updateCategory ---
    // .addCase(updateCategory.fulfilled, (state, action) => {
    //   const index = state.list.findIndex((c) => c._id === action.payload._id);
    //   if (index !== -1) state.list[index] = action.payload;
    // })
    // .addCase(updateCategory.rejected, (state, action) => {
    //   state.error = action.payload;
    // })

    // // --- deleteCategory ---
    // .addCase(deleteCategory.fulfilled, (state, action) => {
    //   state.list = state.list.filter((c) => c._id !== action.payload);
    // })
    // .addCase(deleteCategory.rejected, (state, action) => {
    //   state.error = action.payload;
    // });

    builder
      // ========================================
      // Admin - All Categories
      // ========================================

      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========================================
      // Homepage - Parent Categories
      // ========================================

      .addCase(fetchParentCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchParentCategories.fulfilled, (state, action) => {
        console.log("PAYLOAd", action.payload);
        state.loading = false;
        state.parentCategories = action.payload;
      })

      .addCase(fetchParentCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========================================
      // Homepage - Sub Categories
      // ========================================

      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = action.payload;
      })

      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========================================
      // Get Single Category
      // ========================================

      .addCase(fetchCategoryByIdOrSlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCategoryByIdOrSlug.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload;
      })

      .addCase(fetchCategoryByIdOrSlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========================================
      // Create Category
      // ========================================

      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.list.push(action.payload);

        // Optional:
        // If the newly-created category is a parent category,
        // immediately add it to the homepage parents.
        if (!action.payload.parentCategory) {
          state.parentCategories.push(action.payload);
        }
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========================================
      // Update Category
      // ========================================

      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.list.findIndex((c) => c._id === action.payload._id);

        if (index !== -1) {
          state.list[index] = action.payload;
        }

        if (state.selectedCategory?._id === action.payload._id) {
          state.selectedCategory = action.payload;
        }
      })

      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========================================
      // Delete Category
      // ========================================

      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.list = state.list.filter((c) => c._id !== action.payload);

        state.parentCategories = state.parentCategories.filter(
          (c) => c._id !== action.payload,
        );

        state.subCategories = state.subCategories.filter(
          (c) => c._id !== action.payload,
        );
      })

      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
