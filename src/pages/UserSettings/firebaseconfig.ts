import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

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

export { storage };
