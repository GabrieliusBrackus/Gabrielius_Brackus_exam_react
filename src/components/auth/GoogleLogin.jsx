import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function GoogleLogin() {
  const handleGoogleLogin = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("Google Login successful!");
    } catch (error) {
      console.log("Google Login failed. Check your Google account.");
      console.error("Google Login Error:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
      >
        Log in with Google
      </button>
    </div>
  );
}
