import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD-PPkvJGlz43DlKr4YKqjmPX4l9An0lGM",
  authDomain: "shopbuy-service.firebaseapp.com",
  projectId: "shopbuy-service",
  storageBucket: "shopbuy-service.appspot.com",
  messagingSenderId: "5417361091",
  appId: "1:5417361091:web:982877194aee2fd0548c76",
  measurementId: "G-5VB9XM3E2E"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)