// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBh75nRxiO1sVsx2cG-tFUX4FqBkVsmR38",
  authDomain: "ssd-frontend.firebaseapp.com",
  projectId: "ssd-frontend",
  storageBucket: "ssd-frontend.appspot.com",
  messagingSenderId: "488761653003",
  appId: "1:488761653003:web:e92e8f8cafac9ded4b940e",
  measurementId: "G-29HHTD0HRL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, 'gs://spm-ser003.appspot.com');
export default storage;