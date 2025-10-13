// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM4iHmEKiVjdSC1sYPfHIU0hQPeNoWXtE",
  authDomain: "delacruz-auth.firebaseapp.com",
  projectId: "delacruz-auth",
  storageBucket: "delacruz-auth.firebasestorage.app",
  messagingSenderId: "656059684001",
  appId: "1:656059684001:web:fd8f08e7a5f06d82394ce0",
  measurementId: "G-Q9P1005CJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);