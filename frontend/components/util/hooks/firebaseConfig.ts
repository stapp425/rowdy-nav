// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAqVctyYCTvIra9pJCtcVtiti5xswu37X0",
    authDomain: "rowdy-nav.firebaseapp.com",
    projectId: "rowdy-nav",
    storageBucket: "rowdy-nav.appspot.com",
    messagingSenderId: "511405762187",
    appId: "1:511405762187:web:635239d01c9dc55e85968e",
    measurementId: "G-MWDR2CPRZT"
  }
  
// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const firestore = getFirestore(app)
// const analytics = getAnalytics(app)