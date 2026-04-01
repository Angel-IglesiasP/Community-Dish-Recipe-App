// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhAaGO0dpfhC9v3gPS7ROze_tJkn-g3oc",
  authDomain: "mobile-dev-app-95c39.firebaseapp.com",
  projectId: "mobile-dev-app-95c39",
  storageBucket: "mobile-dev-app-95c39.firebasestorage.app",
  messagingSenderId: "254272297618",
  appId: "1:254272297618:web:ba48db8d83ff46688f244b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
