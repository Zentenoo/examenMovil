import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDwyxVCGrd7lk-vajEg3BszgXbfwyg7gPM",
  authDomain: "listtareas-d2a75.firebaseapp.com",
  projectId: "listtareas-d2a75",
  storageBucket: "listtareas-d2a75.appspot.com",
  messagingSenderId: "227628769104",
  appId: "1:227628769104:web:933845acaa364ab0d39655"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
