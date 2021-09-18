import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDy1sDj0DfDle73TmkkC-73-5bTRlrexes",
  authDomain: "pokemon-game-12c18.firebaseapp.com",
  databaseURL: "https://pokemon-game-12c18-default-rtdb.firebaseio.com",
  projectId: "pokemon-game-12c18",
  storageBucket: "pokemon-game-12c18.appspot.com",
  messagingSenderId: "1047436359885",
  appId: "1:1047436359885:web:a92fa6a0e94583820fd184",
};

firebase.initializeApp(firebaseConfig);

export const fire = firebase;
export const database = fire.database();

export default database;
