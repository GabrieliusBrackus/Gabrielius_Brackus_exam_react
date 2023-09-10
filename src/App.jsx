import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShopPage from "./pages/ShopPage";
import SinglePost from "./components/shop/SinglePost";
import AddShopPage from "./pages/AddShopPage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { useAuth } from "./store/AuthProvider";

export default function App() {
  const ctx = useAuth();

  return (
    <div className="">
      <Header />
      <Routes>
        {ctx.isLoggedIn && (
          <>
            <Route path="/shops" element={<ShopPage />} />
            <Route path="/add-shop" element={<AddShopPage />} />
            <Route path="/shop/:itemId" element={<SinglePost />} />
          </>
        )}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
