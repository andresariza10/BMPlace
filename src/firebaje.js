const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');
require('firebase/storage');


const firebaseConfig = {
    apiKey: "AIzaSyCk8G2vwyr1cnj6sMtMbogP9ShtR1JNLCs",
    authDomain: "crud-2cf3f.firebaseapp.com",
    databaseURL: "https://crud-2cf3f.firebaseio.com",
    projectId: "crud-2cf3f",
    storageBucket: "crud-2cf3f.appspot.com",
    messagingSenderId: "852553031268",
    appId: "1:852553031268:web:e36f17b82726b97de80971"
  };
  
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { firebase, db, auth, storage }