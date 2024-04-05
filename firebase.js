import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "tots-rolling-backend.firebaseapp.com",
  projectId: "tots-rolling-backend",
  storageBucket: "tots-rolling-backend.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-S018EELKQD",
  databaseURL: "https://tots-rolling-backend-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const database = getDatabase(app);

export default database;