// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpF6ogTNhRH5msjyuqPV-KoPwK2_yoflU",
  authDomain: "cuyenapp.firebaseapp.com",
  projectId: "cuyenapp",
  storageBucket: "cuyenapp.appspot.com",
  messagingSenderId: "112291740921",
  appId: "1:112291740921:web:070db08fcb17a85d197628",
  measurementId: "G-DL9BSRH945",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
