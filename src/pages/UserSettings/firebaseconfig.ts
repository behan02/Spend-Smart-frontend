import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-ItJ9PDLjY0T_2SgzOru56RZI6XzCOd4",
  authDomain: "spend-smart-89085.firebaseapp.com",
  projectId: "spend-smart-89085",
  storageBucket: "spend-smart-89085.firebasestorage.app",
  messagingSenderId: "561873582903",
  appId: "1:561873582903:web:297901608b9137f73738b2",
  measurementId: "G-6V35QF6Y02"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

// Function to ensure user is authenticated
export const ensureAuthenticated = async () => {
  if (!auth.currentUser) {
    try {
      await signInAnonymously(auth);
      console.log("Signed in anonymously");
    } catch (error) {
      console.error("Authentication failed:", error);
      throw error;
    }
  }
  return auth.currentUser; // Return the authenticated user
};

export { storage, auth };
