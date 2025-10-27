import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
    console.log("✅ User signed in successfully!");
  } catch (error) {
    if (error.code === "auth/popup-closed-by-user") {
      console.warn("⚠️ User closed the popup before completing sign-in.");
      // (Optional) show a friendly message in your UI
    } else {
      console.error("❌ Sign-in failed:", error);
    }
  }
};


const facebookSignIn = async () => {
    const provider = new FacebookAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      console.log("✅ Facebook user signed in successfully!");
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        console.warn("⚠️ Facebook popup closed before sign-in.");
      } else {
        console.error("❌ Facebook sign-in failed:", error);
      }
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
