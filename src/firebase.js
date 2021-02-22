import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA8uwaEP25LWQXmZyUBD-VuJa2m39MzDQg",
    authDomain: "messenger-clone-b42f9.firebaseapp.com",
    projectId: "messenger-clone-b42f9",
    storageBucket: "messenger-clone-b42f9.appspot.com",
    messagingSenderId: "35860728490",
    appId: "1:35860728490:web:eb6f46a8d5278132051ed3",
    measurementId: "G-43CJZC2C70"
});

const db = firebaseApp.firestore();

export default db;