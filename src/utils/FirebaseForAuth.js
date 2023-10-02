import { initializeApp  } from "firebase/app";
const apiKey = process.env.API_KEY;

const firebaseConfig = {
    apiKey: "AIzaSyBh75nRxiO1sVsx2cG-tFUX4FqBkVsmR38",
    authDomain: "ssd-frontend.firebaseapp.com",
    projectId: "ssd-frontend",
    storageBucket: "ssd-frontend.appspot.com",
    messagingSenderId: "488761653003",
    appId: "1:488761653003:web:e92e8f8cafac9ded4b940e",
    measurementId: "G-29HHTD0HRL"
};

const firebase = initializeApp(firebaseConfig);


export default firebase;