import React from "react";

export default function SingleItem(props) {
  const { item, currentUserUid } = props;

  return (
    <li
      className={`border p-4 ${
        item.userUid !== currentUserUid ? "bg-yellow-100" : ""
      }`}
    >
      <div className="flex flex-col items-center">
        <img
          src={item.imageUrl}
          alt={item.shopName}
          className="w-full h-auto object-contain"
          style={{ maxHeight: "150px" }}
        />
        <p className="text-xl font-semibold mt-2">{item.shopName}</p>
      </div>
    </li>
  );
}
