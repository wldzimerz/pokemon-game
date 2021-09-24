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
class Firebase {
  constructor() {
    this.fire = firebase;
    this.database = this.fire.database();
  }

  getPokemonSoket = (cb) => {
    this.database.ref("pokemons").on("value", (snapshot) => {
      cb(snapshot.val());
    });
  };

  offPokemonSoket = (cb) => {
    this.database.ref("pokemons").off("value", (snapshot) => {
      cb(snapshot.val());
    });
  };

  getPokemonsOnce = async () => {
    return await this.database
      .ref("pokemons")
      .once("value")
      .then((snapshot) => snapshot.val());
  };

  postPokemon = (key, pokemon) => {
    this.database.ref(`pokemons/${key}`).set(pokemon);
  };

  addPokemon = (data, cb) => {
    const newKey = this.database.ref().child("pokemons").push().key;
    this.database.ref("pokemons/" + newKey).set(data);
  };
}

export default Firebase;
