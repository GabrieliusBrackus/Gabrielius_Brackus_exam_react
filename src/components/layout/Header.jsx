import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="dark:bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-2xl text-white font-bold" to={"/"}>
          MY <span className="text-green-500">SHOP</span>
        </Link>
        <nav className="space-x-4">
          <NavLink
            className="text-lg text-white hover:text-gray-300"
            activeClassName="text-gray-300"
            to={"/"}
          >
            Login
          </NavLink>

          <NavLink
            className="text-lg text-white hover:text-gray-300"
            activeClassName="text-gray-300"
            to={"/register"}
          >
            Register
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
