import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBVlR_UezgXu0ai5VQDlpRDTB5qqATMrHQ",
    authDomain: "react-apps-cursos-babc2.firebaseapp.com",
    projectId: "react-apps-cursos-babc2",
    storageBucket: "react-apps-cursos-babc2.appspot.com",
    messagingSenderId: "787895849579",
    appId: "1:787895849579:web:114f55013d2d478f6a972e"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


  export { db, googleAuthProvider, firebase };