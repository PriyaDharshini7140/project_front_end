import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCO9CWycgtyd4AxKl7n0jKomdVKTUCbB58",
    authDomain: "ideawrapper-8deed.firebaseapp.com",
    projectId: "ideawrapper-8deed",
    storageBucket: "ideawrapper-8deed.appspot.com",
    messagingSenderId: "490340728475",
    appId: "1:490340728475:web:ae9d45779ec194b1f9903e",
    measurementId: "G-JLYVE4ZD05"
});

// const db = firebaseApp.firestore();
// const auth = firebase.auth();
const storage = firebase.storage();

export {storage };