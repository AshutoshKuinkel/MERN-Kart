import "./App.css";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import HomePage from "./pages/home";
import ContactPage from "./pages/contact";
import PageNotFound from "./pages/page-not-found";
import { Toaster } from "react-hot-toast";

import { BrowserRouter as Router, Routes, Route } from "react-router";
import ProductPage from "./pages/product";
import AboutUs from "./pages/About-us";
import ClientLayout from "./layouts/client.layout";
import Wishlist from "./pages/wishlist";
import ProductDetailPage from "./pages/detailpage";
import CartPage from "./pages/cart";
import Dashboard from "./pages/admin/dashboard";
import UserPage from "./pages/admin/user";
import OrderPage from "./pages/admin/order";
import AdminLayout from "./layouts/admin.layout";
import Brands from "./pages/admin/brand/brand";
import Category from "./pages/admin/category/category";
import Products from "./pages/admin/product/product";
import CreateCategory from "./pages/admin/category/add.category";
import CreateBrand from "./pages/admin/brand/add.brand";

const App = () => {
  return (
    <main className="h-full tracking-wider">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path={"/"} element={<ClientLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />

          {/* admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/users" element={<UserPage />} />
            <Route path="/admin/brand" element={<Brands />} />
            <Route path="/admin/brand/add" element={<CreateBrand />} />
            <Route path="/admin/category" element={<Category/>} />
            <Route path="/admin/category/add" element={<CreateCategory/>} />
            <Route path="/admin/products" element={<Products/>} />
            <Route path="/admin/orders" element={<OrderPage />} />
          </Route>
        </Routes>
      </Router>
      <Toaster reverseOrder={true} />
    </main>
  );
};

export default App;
