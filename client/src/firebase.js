// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,  // Changed to use import.meta.env
    authDomain: "mern-blog-db3a5.firebaseapp.com",
    projectId: "mern-blog-db3a5",
    storageBucket: "mern-blog-db3a5.firebasestorage.app",
    messagingSenderId: "1007935655791",
    appId: "1:1007935655791:web:33ffca508c71e72f0ee29a"
  };
  
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  