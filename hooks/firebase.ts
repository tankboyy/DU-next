import firebaseConfig from "../firestoreKey.json";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp(firebaseConfig);

export default firebase;
