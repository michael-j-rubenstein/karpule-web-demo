// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsdOJbZsAst5dOau7dnr8oVFHu7sbKa-A",
  authDomain: "karpule-pilot-test-2.firebaseapp.com",
  databaseURL: "https://karpule-pilot-test-2-default-rtdb.firebaseio.com",
  projectId: "karpule-pilot-test-2",
  storageBucket: "karpule-pilot-test-2.appspot.com",
  messagingSenderId: "473084771991",
  appId: "1:473084771991:web:3a7e247eb6c1a02893f3d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
