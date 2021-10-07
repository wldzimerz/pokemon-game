import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "./pokemons";
import pokemons2Reducer from "./pokemons2";
import { reducer as gameResult } from "./gameResult";
import userReducer from "./user";

export default configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    pokemons2: pokemons2Reducer,
    gameResult,
    user: userReducer,
  },
});
