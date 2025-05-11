import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBWwneQ2JW0ZBaWL7jFcY27KBbsIgQlrXQ",
  authDomain: "myinsta-f6c43.firebaseapp.com",
  projectId: "myinsta-f6c43",
  storageBucket: "myinsta-f6c43.firebasestorage.app", 
  messagingSenderId: "651284900645",
  appId: "1:651284900645:web:2bf6f7ad34450d1b2b48cc",
  measurementId: "G-2GGZSKBH51"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
