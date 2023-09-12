import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
});

export default function AuthProvider(props) {
  const [fireUser, setFireUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFireUser(user);
      } else {
        setFireUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const ctx = {
    user: fireUser,
    isLoggedIn: !!fireUser,
  };

  return (
    <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
