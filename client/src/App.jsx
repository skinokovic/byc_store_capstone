import { Routes, Route } from "react-router-dom";
import StorefrontLayout from "./components/StorefrontLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./components/shop/Shop";
import ProductDetails from "./components/shop/ProductDetails";
import Contact from "./pages/Contact";
import LoginRegister from "./pages/LoginRegister";

import UserDashboardRoute from "./components/user/UserDashboardRoute";
import UserDashboardLayout from "./components/user/dashboard/UserDashboardLayout";
import UserDashboard from "./pages/user/UserDashboard";
import UserProfile from "./pages/user/UserProfile";
import UserOrders from "./pages/user/UserOrders";
import UserWishlist from "./pages/user/UserWishlist";
import UserSettings from "./pages/user/UserSettings";

import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./components/admin/AdminLayout";
// import AdminDashboard from "./pages/admin/AdminDashboard";
import AllProducts from "./pages/admin/AllProducts";
import CreateProduct from "./pages/admin/CreateProduct";
import AllCategories from "./pages/admin/AllCategories";
import CreateCategory from "./pages/admin/CreateCategory";
import AllUsers from "./pages/admin/AllUsers";
import AllOrders from "./pages/admin/AllOrders";
import AdminSupport from "./pages/admin/AdminSupport";
import AdminSettings from "./pages/admin/AdminSettings";
import { ToastContainer } from "react-toastify";
import CreateUser from "./pages/admin/CreateUser";
import GuestRoute from "./components/GuestRoute";
import Profile from "./pages/Profile";
import MessageDetails from "./pages/admin/MessageDetails";
import ContactMessages from "./pages/admin/ContactMessages";
import CreateHeroSlider from "./pages/admin/sliders/createHeroSliders";
import EditHeroSlider from "./pages/admin/sliders/EditHeroSlider";
import HeroSliderList from "./pages/admin/sliders/AllSliders";
import AllArrivals from "./pages/admin/arrivals/AllHomeArrivals";
import CreateNewArrival from "./pages/admin/arrivals/CreateNewArrivals";
import EditHomeArrival from "./pages/admin/arrivals/EdithHomeArrivals";
import CreateCollection from "./pages/admin/collections/CreateCollections";
import EditCollection from "./pages/admin/collections/EditCollections";
import AllCollections from "./pages/admin/collections/AllCollections";
import CreateBlogs from "./pages/admin/blogs/CreateBlogs";
// import EditBlogs from "./pages/admin/blogs/CreateBlogs";
import AllBlogs from "./pages/admin/blogs/AllBlogs";
import BlogDetail from "../src/pages/BlogDetails"; // adjust path to wherever you placed it
import AllComments from "./pages/admin/comments/AllComments";
import BlogHome from "./pages/user/BlogHome";
import CartPage from "./pages/user/CartPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import { CartDrawerProvider } from "./components/shop/cartDrawer/CartDrawerContext";
import CartDrawer from "./components/shop/cartDrawer/CartDrawer";
import CreateAddress from "./pages/user/CreateAddress";

import CreateDeliveryZone from "./pages/admin/deliveryZone/CreateDeliveryZone";
import EditDeliveryZone from "./pages/admin/deliveryZone/EditDeliveryZone";
import AllDeliveryZones from "./pages/admin/deliveryZone/AllDeliveryZone";
import PaymentCallbackPage from "./pages/PaymentCallbackPage";
import FaqPage from "./pages/faq/FaqPage";
import Dashboard from "./pages/admin/Dashboard";

import AffiliatePage from "./pages/static/AffiliatePage";
import ShippingInfoPage from "./pages/static/ShippingInfoPage";
import RefundsPage from "./pages/static/RefundsPage";
import HowToOrderPage from "./pages/static/HowToOrderPage";
import HowToTrackPage from "./pages/static/HowToTrackPage";
import SizeGuidesPage from "./pages/static/SizeGuidesPage";
import PaymentMethodsPage from "./pages/static/PaymentMethodsPage";
import EmailSubscriber from "./pages/admin/EmailSubscriber";

function App() {
  return (
    <>
      <CartDrawerProvider>
        <Routes>
          {/* Storefront - Navbar + Footer wrap every page nested inside here */}
          <Route element={<StorefrontLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<CartPage />}></Route>
            <Route path="/checkout" element={<CheckoutPage />}></Route>
            <Route path="/faq" element={<FaqPage />} />

            {/* GuestRoute blocks these two if already logged in */}
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<LoginRegister />} />
              <Route path="/register" element={<LoginRegister />} />
            </Route>

            <Route path="/profile" element={<Profile />} />
            <Route path="/blog" element={<BlogHome />} />
            {/* <Route path="/checkout" element={<Checkout />} /> */}
          </Route>

          <Route path="/payment/callback" element={<PaymentCallbackPage />} />

          <Route path="/blog/:slug" element={<BlogDetail />} />

          <Route path="/affiliate" element={<AffiliatePage />} />
          <Route path="/shipping-info" element={<ShippingInfoPage />} />
          <Route path="/refunds" element={<RefundsPage />} />
          <Route path="/how-to-order" element={<HowToOrderPage />} />
          <Route path="/how-to-track" element={<HowToTrackPage />} />
          <Route path="/size-guides" element={<SizeGuidesPage />} />
          <Route path="/payment-methods" element={<PaymentMethodsPage />} />

          {/* User dashboard - any logged-in user, own layout, no Navbar/Footer */}
          <Route path="/dashboard" element={<UserDashboardRoute />}>
            <Route element={<UserDashboardLayout />}>
              <Route index element={<UserDashboard />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="address/create" element={<CreateAddress />} />
              <Route path="orders" element={<UserOrders />} />
              <Route path="wishlist" element={<UserWishlist />} />
              <Route path="settings" element={<UserSettings />} />
            </Route>
          </Route>

          {/* Admin - guarded by AdminRoute (role === 'admin'), own layout, no Navbar/Footer */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<AllProducts />} />
              <Route path="products/create" element={<CreateProduct />} />
              <Route path="products/edit/:id" element={<CreateProduct />} />
              <Route path="categories" element={<AllCategories />} />
              <Route path="categories/create" element={<CreateCategory />} />
              <Route path="categories/edit/:id" element={<CreateCategory />} />
              <Route path="users" element={<AllUsers />} />
              <Route path="users/create" element={<CreateUser />} />
              <Route path="users/edit/:id" element={<CreateUser />} />
              <Route path="/admin/messages" element={<ContactMessages />} />
              <Route path="/admin/messages/:id" element={<MessageDetails />} />
              <Route path="/admin/subscribers" element={<EmailSubscriber />} />
              <Route
                path="/admin/sliders/create"
                element={<CreateHeroSlider />}
              />
              <Route path="/admin/sliders" element={<HeroSliderList />} />
              <Route
                path="/admin/sliders/edit/:id"
                element={<EditHeroSlider />}
              />
              <Route
                path="/admin/arrivals/create"
                element={<CreateNewArrival />}
              />
              <Route
                path="/admin/arrivals/edit/:id"
                element={<EditHomeArrival />}
              />
              <Route path="/admin/arrivals" element={<AllArrivals />} />

              <Route
                path="/admin/collections/create"
                element={<CreateCollection />}
              />
              <Route
                path="/admin/collections/edit/:id"
                element={<EditCollection />}
              />
              <Route path="/admin/zones" element={<AllDeliveryZones />} />
              <Route
                path="/admin/delivery-zone/create"
                element={<CreateDeliveryZone />}
              />
              <Route
                path="/admin/delivery-zones/edit/:id"
                element={<EditDeliveryZone />}
              />
              <Route path="/admin/collections" element={<AllCollections />} />
              <Route path="/admin/blogs/create" element={<CreateBlogs />} />
              <Route path="/admin/blogs/edit/:id" element={<CreateBlogs />} />
              <Route path="/admin/blogs" element={<AllBlogs />} />
              <Route path="/admin/blogs/comments" element={<AllComments />} />
              {/* <Route path="/admin/arrivals/c" element={<NewArrivalForm />} /> */}
              <Route path="orders" element={<AllOrders />} />
              <Route path="support" element={<AdminSupport />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>
        </Routes>

        <CartDrawer />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          // theme="colored"
        />
      </CartDrawerProvider>
    </>
  );
}

export default App;
