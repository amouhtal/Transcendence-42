// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2CrvYjltoOorK2HmGHsbDW4Aem8HIJwk",
  authDomain: "transadance-login.firebaseapp.com",
  projectId: "transadance-login",
  storageBucket: "transadance-login.appspot.com",
  messagingSenderId: "1015574170",
  appId: "1:1015574170:web:d156eaa87116dd86057923",
  measurementId: "G-PKMNS3TL0R"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;