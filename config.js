import firebase from 'firebase';
require('@firebase/firestore')

// Your web app's Firebase configuration
const firebaseConfig = {
     
    apiKey: "AIzaSyCJkL082XXFC-HKSmh11aUNy1uvRDNgfzg",
    authDomain: "readsbooks-57acd.firebaseapp.com",
    databaseURL: "https://readsbooks-57acd.firebaseio.com",
    projectId: "readsbooks-57acd",
    storageBucket: "readsbooks-57acd.appspot.com",
    messagingSenderId: "876748706785",
    appId: "1:876748706785:web:17f152849b48dd87efb8a0"
  };


  // Initialize Firebase
if(!firebase.apps.length){ firebase.initializeApp(firebaseConfig); }
var db = firebase.firestore();
export default db