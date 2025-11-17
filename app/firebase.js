// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBM4iHmEKiVjdSC1sYPfHIU0hQPeNoWXtE",
  authDomain: "delacruz-auth.firebaseapp.com",
  projectId: "delacruz-auth",
  storageBucket: "delacruz-auth.firebasestorage.app",
  messagingSenderId: "656059684001",
  appId: "1:656059684001:web:fd8f08e7a5f06d82394ce0",
  measurementId: "G-Q9P1005CJ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ✅ Initialize analytics only if supported and in the browser
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      const analytics = getAnalytics(app);
      console.log("✅ Firebase Analytics initialized");
    } else {
      console.log("⚠️ Firebase Analytics not supported on this environment");
    }
  });
}

export default app;
