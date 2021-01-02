import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD7cJs9xg54jXPXQ8CEEnUU81HaKdUrlFs",
    authDomain: "books-katalog.firebaseapp.com",
    projectId: "books-katalog",
    storageBucket: "books-katalog.appspot.com",
    messagingSenderId: "677279798662",
    appId: "1:677279798662:web:ae2b47f4e83e4bb4ec8807"
  };

export const myApp = firebase.initializeApp(firebaseConfig);
export const db = myApp.firestore();
export const auth = myApp.auth();