import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function SingleItem(props) {
  const { item, currentUserUid } = props;
  const isOnSale = item.saleOnSale;
  const price = item.price;
  const discountedPrice = isOnSale ? price * 0.5 : price;
  const handleDelete = async () => {
    try {
      if (currentUserUid === item.userUid) {
        const itemRef = doc(db, "shops", item.id);
        await deleteDoc(itemRef);
        toast.success("Shop item deleted successfully.");
      } else {
        toast.error("You do not have permission to delete this item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  return (
    <li
      className={`border p-4 ${
        item.userUid === currentUserUid ? "bg-yellow-100" : ""
      }`}
    >
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col items-center relative">
        <Link key={item.id} to={`/shop/${item.id}`}>
          <img
            src={item.imageUrl}
            alt={item.shopName}
            className="w-full h-auto object-contain"
            style={{ maxHeight: "150px" }}
          />
        </Link>
        {isOnSale && (
          <div className="bg-red-500 text-white font-bold py-1 px-2 rounded-full shadow-md text-xs absolute top-2 right-2">
            ON SALE!
          </div>
        )}
        <p className="text-xl font-semibold mt-2">{item.shopName}</p>

        <div className="flex justify-between w-full">
          <div>
            {isOnSale ? (
              <div className="text-red-500">
                <del>{price.toFixed(2)}€</del> ({discountedPrice.toFixed(2)}€)
              </div>
            ) : (
              <div>{price.toFixed(2)}€</div>
            )}
          </div>
          {currentUserUid === item.userUid && (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
