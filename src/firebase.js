
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { data } from "autoprefixer";

export const firebaseConfig = {
  apiKey: "AIzaSyBVgEqFszE5pSVs4ZX0d4Idzg7vMmMKR5k",
  authDomain: "soulnect-8c3fe.firebaseapp.com",
  projectId: "soulnect-8c3fe",
  storageBucket: "soulnect-8c3fe.appspot.com",
  messagingSenderId: "431941918945",
  databaseURL: "https://soulnect-8c3fe-default-rtdb.firebaseio.com/",
  appId: "1:431941918945:web:d511c82d0c0c21220d17a0",
  measurementId: "G-P56LQDBYGG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
