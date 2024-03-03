import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-project-dc121.firebaseapp.com",
  projectId: "mern-blog-project-dc121",
  storageBucket: "mern-blog-project-dc121.appspot.com",
  messagingSenderId: "192276966868",
  appId: "1:192276966868:web:2c026a3445eece04edfa41"
};

export const app = initializeApp(firebaseConfig);