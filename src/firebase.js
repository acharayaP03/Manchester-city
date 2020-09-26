
import dotenv from 'dotenv';
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';

dotenv.config({path: './config.env'})

const API_KEY = process.env.FIREBASE_API_KEY;
const DOMAIN = process.env.AUTH_DOMAIN
const DB_URL = process.env.DATABASE_URL
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  var firebaseConfig = {
    apiKey: API_KEY,
    authDomain: DOMAIN,
    databaseURL: "https://m-city-4ae6e.firebaseio.com",
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const db = firebase.database();
  const matches = db.ref('matches');

  export {
      firebase,
      matches
  }
//   db.ref('matches').once('value').then((result)=>{
//       console.log(result.val());
//   })