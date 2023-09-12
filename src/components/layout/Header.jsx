import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export default function Header() {
  const ctx = useAuth();
  const isLoggedIn = ctx.isLoggedIn;
  function logout() {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  }

  const handleLogout = () => {
    logout();
    const navigate = useNavigate();
    navigate("/");
  };

  return (
    <header className="dark:bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-2xl text-white font-bold" to={"/"}>
          MY <span className="text-green-500">SHOP</span>
        </Link>
        <nav className="space-x-4">
          {!isLoggedIn && (
            <>
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
                Registration
              </NavLink>
            </>
          )}
          {isLoggedIn && (
            <>
              <NavLink
                className="text-lg text-white hover:text-gray-300"
                activeClassName="text-gray-300"
                to={"/shops"}
              >
                Shops
              </NavLink>
              <NavLink
                className="text-lg text-white hover:text-gray-300"
                activeClassName="text-gray-300"
                to={"/add-shop"}
              >
                Add Shop
              </NavLink>
              <NavLink
                onClick={handleLogout}
                className="text-lg text-white hover:text-gray-300"
                activeClassName="text-gray-300"
                to={""}
              >
                Logout
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
