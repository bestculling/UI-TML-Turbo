import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-app-3b664.firebaseapp.com",
  projectId: "chat-app-3b664",
  storageBucket: "chat-app-3b664.appspot.com",
  messagingSenderId: "1073877403073",
  appId: "1:1073877403073:web:f7e8749a34bfd532311b40",
  measurementId: "G-4ZSXHX2Z7T"
};

export const app = initializeApp(firebaseConfig);