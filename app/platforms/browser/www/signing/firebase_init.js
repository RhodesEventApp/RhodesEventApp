// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBlUCVYlX8eDsq3HrY8FNyLW-n7W8a-f8",
  authDomain: "rhodes-event-app.firebaseapp.com",
  projectId: "rhodes-event-app",
  storageBucket: "rhodes-event-app.appspot.com",
  messagingSenderId: "971156122604",
  appId: "1:971156122604:web:18693652d87e028413aec9",
  measurementId: "G-97KDY6FCG8"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);