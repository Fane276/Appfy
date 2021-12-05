import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC4u7Dnmh09tlH4rgM383Jyk4HqYDpsPb4",
  authDomain: "appfy-330417.firebaseapp.com",
  projectId: "appfy-330417",
  storageBucket: "appfy-330417.appspot.com",
  messagingSenderId: "19862592131",
  appId: "1:19862592131:web:8b664faac73d3f2ae299b6"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = app.auth();
const firestore = app.firestore();
const rtdb = app.database();
const providerGoogle = new firebase.auth.GoogleAuthProvider();
const providerFacebook = new firebase.auth.FacebookAuthProvider();


export { firestore, rtdb, auth, providerGoogle, providerFacebook };