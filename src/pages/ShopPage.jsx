import { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../store/AuthProvider";
import SingleItem from "../components/shop/SingleItem";

export default function ShopPage() {
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const authContext = useAuth();

  useEffect(() => {
    async function fetchShopItems() {
      try {
        const q = query(collection(db, "shops"));
        const querySnapshot = await getDocs(q);

        const items = [];
        console.log(items);
        querySnapshot.forEach((doc) => {
          const itemData = {
            id: doc.id,
            ...doc.data(),
          };
          items.push(itemData);
        });

        setShopItems(items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shop items:", error);
      }
    }

    fetchShopItems();
  }, [authContext.user.uid]);

  return (
    <div className="mx-auto max-w-screen-xl border border-gray-300 rounded p-6 mb-20">
      <h2 className="text-3xl font-bold mb-8">ShopPage</h2>
      {loading ? (
        <p className="text-xl text-gray-500">Loading...</p>
      ) : shopItems.length === 0 ? (
        <p className="text-xl text-gray-500">No items found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {shopItems.map((item) => (
            <SingleItem
              key={item.id}
              item={item}
              currentUserUid={authContext.user.uid}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
