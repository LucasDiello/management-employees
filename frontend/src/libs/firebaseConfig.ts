// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsUrDTtMhigc54W6Xcsp9vQ6qX1RGNcBo",
  authDomain: "test-av1.firebaseapp.com",
  projectId: "test-av1",
  storageBucket: "test-av1.appspot.com",
  messagingSenderId: "502249752830",
  appId: "1:502249752830:web:542e195b22b3349512fdaf"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);