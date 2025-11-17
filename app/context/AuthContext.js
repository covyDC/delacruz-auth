"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  linkWithCredential
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authInProgress, setAuthInProgress] = useState(false);

  const signInWithProvider = async (provider, name) => {
    if (authInProgress) return;
    setAuthInProgress(true);
    try {
      await signInWithPopup(auth, provider);
      console.log(`✅ ${name} user signed in successfully!`);
    } catch (error) {
      await handleAuthError(name, error);
    } finally {
      setAuthInProgress(false);
    }
  };

  // Google and GitHub sign-ins
  const googleSignIn = () => signInWithProvider(new GoogleAuthProvider(), "Google");
  const githubSignIn = () => signInWithProvider(new GithubAuthProvider(), "GitHub");

  // Email/Password authentication
  const emailSignUp = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("✅ Email user signed up successfully!", result.user);
      return result.user;
    } catch (error) {
      console.error("❌ Email sign-up failed:", error);
      let message = "Sign-up failed";
      if (error.code === "auth/email-already-in-use") {
        message = "This email is already registered. Please sign in instead.";
      } else if (error.code === "auth/weak-password") {
        message = "Password is too weak. Use at least 6 characters.";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email address.";
      } else if (error.code === "auth/operation-not-allowed") {
        message = "Email/password accounts are not enabled.";
      }
      throw new Error(message);
    }
  };

  const emailSignIn = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Email user signed in successfully!", result.user);
      return result.user;
    } catch (error) {
      console.error("❌ Email sign-in failed:", error);
      let message = "Sign-in failed";
      if (error.code === "auth/user-not-found") {
        message = "No account found with this email. Please sign up first.";
      } else if (error.code === "auth/wrong-password") {
        message = "Incorrect password. Please try again.";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email address.";
      } else if (error.code === "auth/user-disabled") {
        message = "This account has been disabled.";
      } else if (error.code === "auth/too-many-requests") {
        message = "Too many failed attempts. Please try again later.";
      }
      throw new Error(message);
    }
  };

  const handleAuthError = async (providerName, error) => {
    if (error.code === "auth/popup-closed-by-user") {
      console.warn(`⚠️ ${providerName} sign-in popup closed by user.`);
    } else if (error.code === "auth/cancelled-popup-request") {
      console.warn(`⚠️ ${providerName} popup cancelled because another was in progress.`);
    } else if (error.code === "auth/account-exists-with-different-credential") {
      console.warn(`⚠️ ${providerName} account exists with a different credential.`);

      const pendingCred = error.credential;
      const email = error.customData.email;
      const methods = await fetchSignInMethodsForEmail(auth, email);
      console.log("Existing sign-in methods:", methods);

      if (methods.includes("google.com")) {
        const result = await signInWithPopup(auth, new GoogleAuthProvider());
        await linkWithCredential(result.user, pendingCred);
        console.log("✅ Accounts linked successfully with Google!");
      } else {
        console.warn("User has a different login method:", methods);
      }
    } else {
      console.error(`❌ ${providerName} sign-in failed:`, error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("👋 User signed out successfully!");
    } catch (error) {
      console.error("❌ Sign-out failed:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, googleSignIn, githubSignIn, emailSignIn, emailSignUp, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
