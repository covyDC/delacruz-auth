"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, googleSignIn, githubSignIn, emailSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  const handleGoogleSignIn = async () => {
    try { await googleSignIn(); } catch (e) { console.log("Google Sign-In Error:", e); }
  };

  const handleGithubSignIn = async () => {
    try { await githubSignIn(); } catch (e) { console.log("GitHub Sign-In Error:", e); }
  };

  const handleEmailSignIn = async () => {
    const email = prompt("Enter your email:");
    const password = prompt("Enter your password:");
    if (email && password) {
      try { await emailSignIn(email, password); } catch (e) { console.log("Email Sign-In Error:", e); }
    }
  };

  const handleSignOut = async () => {
    try { await logOut(); } catch (e) { console.log("Logout Error:", e); }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, []);

  return (
    <nav className="w-full shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white font-bold text-2xl tracking-wider">
          <Link href="/">Dela Cruz</Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-white font-medium">
          <li className="hover:text-yellow-300 transition-colors duration-300 cursor-pointer">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-yellow-300 transition-colors duration-300 cursor-pointer">
            <Link href="/about">About</Link>
          </li>
          {user && (
            <li className="hover:text-yellow-300 transition-colors duration-300 cursor-pointer">
              <Link href="/profile">Profile</Link>
            </li>
          )}
        </ul>

        {/* User Profile (logged in only) */}
        {!loading && user && (
          <div className="flex items-center space-x-4 bg-white rounded-full px-4 py-1 shadow-lg">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <p className="text-gray-800 font-medium">Hi, {user.displayName || "User"}</p>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors font-semibold"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
