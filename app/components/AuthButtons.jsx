"use client";
import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";

const AuthButtons = () => {
  const { user, googleSignIn, githubSignIn, emailSignIn } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await googleSignIn();
    } catch (e) {
      console.log("Google Sign-In Error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setLoading(true);
      await githubSignIn();
    } catch (e) {
      console.log("GitHub Sign-In Error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
    try {
      setLoading(true);
      await emailSignIn(email, password);
    } catch (e) {
      console.log("Email Sign-In Error:", e);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return null; // Don't show auth buttons if already logged in
  }

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/60">
      <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-8">Sign In</h2>

      {/* Email & Password */}
      <div className="space-y-4 mb-8">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
        />
        <button
          onClick={handleEmailSignIn}
          disabled={loading}
          className="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in with Email"}
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-slate-300"></div>
        <span className="text-slate-500 text-sm">or</span>
        <div className="flex-1 h-px bg-slate-300"></div>
      </div>

      {/* Social Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg shadow hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          <span className="text-xl">🔍</span>
          Google
        </button>
        <button
          onClick={handleGithubSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <span className="text-xl">⚫</span>
          GitHub
        </button>
      </div>
    </div>
  );
};

export default AuthButtons;
