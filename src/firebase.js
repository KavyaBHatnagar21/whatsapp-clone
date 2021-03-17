
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBobSP61N7zUyOw1ituGvxA7SxXm-SAi04",
    authDomain: "whatsapp-clone-a6292.firebaseapp.com",
    projectId: "whatsapp-clone-a6292",
    storageBucket: "whatsapp-clone-a6292.appspot.com",
    messagingSenderId: "918380749336",
    appId: "1:918380749336:web:98177bb2e9e062167a996d"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore(); 
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;