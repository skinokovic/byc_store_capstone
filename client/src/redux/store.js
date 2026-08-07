import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productSlice";
import authReducer from "./slice/authSlice";
import cartReducer from "./slice/cartSlice";
import userReducer from "./slice/userSlice";
import categoryReducer from "./slice/categorySlice";
import blogReducer from "./slice/blogSlice";
import commentReducer from "./slice/commentSlice";
import addressReducer from "./slice/addressSlice";
import deliveryZoneReducer from "./slice/deliveryZoneSlice";
import wishlistReducer from "./slice/wishlistSlice";
import orderReducer from "./slice/orderSlice";
import recentlyViewedReducer from "./slice/recentlyViewedSlice";
import faqReducer from "./slice/faqSlice";
import dashboardReducer from "./slice/dashboardSlice";
export const store = configureStore({
  reducer: {
    products: productReducer, // accessible in components as state.products
    auth: authReducer, // accessible in components as state.auth
    cart: cartReducer, // accessible in components as state.cart
    users: userReducer, // accessible in components as state.users (admin user management)
    categories: categoryReducer, // accessible in components as state.categories
    blogs: blogReducer,
    comments: commentReducer,
    addresses: addressReducer,
    deliveryZones: deliveryZoneReducer,
    wishlist: wishlistReducer,
    orders: orderReducer,
    recentlyViewed: recentlyViewedReducer,
    faqs: faqReducer,
    dashboard: dashboardReducer,
  },
});
