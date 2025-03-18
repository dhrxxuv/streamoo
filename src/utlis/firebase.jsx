// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "stremoo-7b2ba.firebaseapp.com",
  projectId: "stremoo-7b2ba",
  storageBucket: "stremoo-7b2ba.firebasestorage.app",
  messagingSenderId: "351298466564",
  appId: "1:351298466564:web:c589ff43a2312e68e75651",
  measurementId: "G-L9M1NWZ34K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

export const auth = getAuth()