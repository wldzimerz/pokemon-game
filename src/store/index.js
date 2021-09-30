import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "./pokemons";
import pokemons2Reducer from "./pokemons2";
import { reducer as gameResultReducer } from "./gameResult";
// import gameResultReducer from "./gameResult";

export default configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    pokemons2: pokemons2Reducer,
    gameResultReducer,
  },
});
