// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFF3ZAs2480kKuJ_mNRpj3ghKX7BvUQcw",
  authDomain: "netflixgpt-842fe.firebaseapp.com",
  projectId: "netflixgpt-842fe",
  storageBucket: "netflixgpt-842fe.firebasestorage.app",
  messagingSenderId: "1069005949964",
  appId: "1:1069005949964:web:2ad99ac678ccef787f3229",
  measurementId: "G-ZCL9RSJNMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()