import React from "react";
import ShopForm from "../components/shop/ShopForm.jsx";

export default function AddShopPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="max-w-lg w-full p-6 bg-gray-800 rounded-md shadow-md mt-5 text-white">
        <h2 className="text-3xl mb-4 text-center">Shop Page</h2>
        <p className="text-center">
          To add a shop element, please fill out all the required fields.
        </p>
        <ShopForm />
      </div>
    </div>
  );
}
