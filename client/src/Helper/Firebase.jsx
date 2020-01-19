import firebase from "firebase/app";
import "firebase/database"; // If using Firebase database
import "firebase/storage"; // If using Firebase storage
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBkAG7BcjKUM9onl5oETNCZ5RCGT3n_HdU",
  authDomain: "filmsite-d6065.firebaseapp.com",
  databaseURL: "https://filmsite-d6065.firebaseio.com",
  projectId: "filmsite-d6065",
  storageBucket: "filmsite-d6065.appspot.com",
  messagingSenderId: "604756454229"
};
firebase.initializeApp(config);

const database = firebase.database();
const storage = firebase.storage();

export { firebase, storage, database };
