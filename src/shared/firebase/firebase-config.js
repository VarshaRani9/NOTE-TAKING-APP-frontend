// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeaf7ta2vyAP8bqeMdhabfuZ-yYYXdeAg",
  authDomain: "oauthapp-d346d.firebaseapp.com",
  projectId: "oauthapp-d346d",
  storageBucket: "oauthapp-d346d.appspot.com",
  messagingSenderId: "679496908442",
  appId: "1:679496908442:web:a190d1ce46eb481ab5a923",
  measurementId: "G-7GV0809BCB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);