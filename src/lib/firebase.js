// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";  // Add this

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBekXfsnmTY7OA2NxGndgQHtKmX3RJOgZc",
  authDomain: "buysomething-8dbac.firebaseapp.com",
  projectId: "buysomething-8dbac",
  storageBucket: "buysomething-8dbac.firebasestorage.app",
  messagingSenderId: "497314875718",
  appId: "1:497314875718:web:df9c772be4da019b8f3d47",
  measurementId: "G-8XNWVFLE1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);  // Add this

export { app, analytics, db };  // Export db