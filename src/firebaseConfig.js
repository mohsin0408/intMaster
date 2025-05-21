// src/firebaseConfig.js
// Firebase SDKs ko import karein
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Aap jo bhi dusre Firebase products use karna chahte hain unke SDKs add karein
// Jaise: import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Aapki web app ki Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgxqhPCFPXVdKpe3R8JDEU95AofXRxJ3U",
  authDomain: "master-7ee25.firebaseapp.com",
  projectId: "master-7ee25",
  storageBucket: "master-7ee25.firebasestorage.app",
  messagingSenderId: "243058003988",
  appId: "1:243058003988:web:c8e5b23fb06f99eafc5701",
  measurementId: "G-LRMBN1WRT7",
};

// Firebase ko initialize karein
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Export karein 'app' instance aur 'analytics' (agar zaroori ho)
// Taki aap inhe apni React components mein import kar sakein
export { app, analytics, auth };
