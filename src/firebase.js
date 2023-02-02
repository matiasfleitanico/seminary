// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHWru9Uze-5bDDT7n6Pr4bmr7vGIFqbpY",
  authDomain: "tecno-museo.firebaseapp.com",
  projectId: "tecno-museo",
  storageBucket: "tecno-museo.appspot.com",
  messagingSenderId: "967723366637",
  appId: "1:967723366637:web:519c7c98ae3825acbf74e4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);