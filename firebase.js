//Firebase Connection File
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'
import 'firebase/compat/auth'
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDCbcCcXLlOMN7MnO1tEirVh79QKOdmvMM",
  authDomain: "capstoneproject-7ce43.firebaseapp.com",
  projectId: "capstoneproject-7ce43",
  storageBucket: "capstoneproject-7ce43.appspot.com",
  messagingSenderId: "253453091247",
  appId: "1:253453091247:web:c666fd36666517ba606f5a",
  measurementId: "G-XE4R7TGMHH",
  webClientId: "253453091247-ltapgvhpudm952atp1038mgap90j4po5.apps.googleusercontent.com",
  
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}


// Initialize Firebase
const app = initializeApp (firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { app, firebase, auth, db}
