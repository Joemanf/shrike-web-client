import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCAN0DjVK3nUxAtrloudMgsc7Y6KEnMLNo",
  authDomain: "tots-rolling-backend.firebaseapp.com",
  projectId: "tots-rolling-backend",
  storageBucket: "tots-rolling-backend.appspot.com",
  messagingSenderId: "252275554725",
  appId: "1:252275554725:web:3c3066e89dc627613fd04c",
  measurementId: "G-S018EELKQD",
  databaseURL: "https://tots-rolling-backend-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const database = getDatabase(app);

export default database;