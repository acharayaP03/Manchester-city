
import dotenv from 'dotenv';
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
dotenv.config()

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const DOMAIN = process.env.REACT_APP_AUTH_DOMAIN
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  var firebaseConfig = {
    apiKey: API_KEY,
    authDomain: DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const db = firebase.database();
  const matches = db.ref('matches');
  const promotions = db.ref('promotions');
  const teams = db.ref('teams');
  const players = db.ref('players');
  export {
      firebase,
      matches,
      promotions,
      teams,
      players,
      db,
  }
//   db.ref('matches').once('value').then((result)=>{
//       console.log(result.val());
//   })