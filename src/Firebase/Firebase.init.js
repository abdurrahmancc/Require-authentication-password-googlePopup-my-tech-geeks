// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6YCeUa-FIThG8WEFgJnoDAigkvw7yuXk",
  authDomain: "japanese-foods.firebaseapp.com",
  projectId: "japanese-foods",
  storageBucket: "japanese-foods.appspot.com",
  messagingSenderId: "5999886793",
  appId: "1:5999886793:web:d2ba99ffb473d6b84ea818",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
