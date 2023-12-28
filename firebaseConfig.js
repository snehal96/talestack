// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC_1U8AcZ8blrmUxVRD4nOQUyLWCPH8SZ4',
  authDomain: 'talestack-bde12.firebaseapp.com',
  projectId: 'talestack-bde12',
  storageBucket: 'talestack-bde12.appspot.com',
  messagingSenderId: '414418229040',
  appId: '1:414418229040:web:003c4188413c47bc8cdaf5'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()
// const analytics = getAnalytics(app);

export { app, auth }
