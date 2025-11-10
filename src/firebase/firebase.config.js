// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuKCDUF_q7riEb-cq0JpV9-vTdf4GMh6M",
  authDomain: "ai-model-inventory-manag-c1caf.firebaseapp.com",
  projectId: "ai-model-inventory-manag-c1caf",
  storageBucket: "ai-model-inventory-manag-c1caf.firebasestorage.app",
  messagingSenderId: "743110798069",
  appId: "1:743110798069:web:c1ba11a4ee2983ba8bf3bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);