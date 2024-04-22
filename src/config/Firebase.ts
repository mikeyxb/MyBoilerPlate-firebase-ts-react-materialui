// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr9txQGsjFFVbM5D7bkQaNYWNZa7lweIE",
  authDomain: "react-learning-mikeyxb.firebaseapp.com",
  projectId: "react-learning-mikeyxb",
  storageBucket: "react-learning-mikeyxb.appspot.com",
  messagingSenderId: "373852294607",
  appId: "1:373852294607:web:b6ad07127e22b415c896ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();