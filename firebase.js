import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCbcCcXLlOMN7MnO1tEirVh79QKOdmvMM",
  authDomain: "capstoneproject-7ce43.firebaseapp.com",
  projectId: "capstoneproject-7ce43",
  storageBucket: "capstoneproject-7ce43.appspot.com",
  messagingSenderId: "253453091247",
  appId: "1:253453091247:web:c666fd36666517ba606f5a",
  measurementId: "G-XE4R7TGMHH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export {auth};