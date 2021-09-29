import { createSlice } from "@reduxjs/toolkit";
import FirebaseClass from "../services/firebase";

export const slice = createSlice({
  name: "pokemons",
  initialState: {
    isLoading: false,
    data: {},
    error: null,
    selectedPokemons: {},
  },
  reducers: {
    fetchPokemons: (state) => ({
      ...state,
      isLoading: true,
    }),

    fetchPokemonsResolve: (state, action) => ({
      ...state,
      isLoading: false,
      data: action.payload,
    }),

    fetchPokemonsReject: (state, action) => ({
      ...state,
      isLoading: false,
      data: {},
      error: action.payload,
    }),

    handleSelectedPokemons: (state, { payload: { pokemon, key } }) => {
      const newPokemons = { ...state.selectedPokemons };
      if (newPokemons[key]) {
        delete newPokemons[key];
        return { ...state, selectedPokemons: newPokemons };
      }
      newPokemons[key] = pokemon;
      return { ...state, selectedPokemons: newPokemons };
    },

    clearPokemons: (state) => ({
      ...state,
      selectedPokemons: {},
    }),
  },
});

export const { fetchPokemons, fetchPokemonsResolve, fetchPokemonsReject, handleSelectedPokemons, clearPokemons } = slice.actions;

export const selectPokemonsLoading = (state) => state.pokemons.isLoading;
export const selectPokemonsData = (state) => state.pokemons.data;
export const selectedPokemons = (state) => state.pokemons.selectedPokemons;
export const winner = (state) => state.pokemons.winner;

export const getPokemonsAsync = () => async (dispatch) => {
  dispatch(fetchPokemons());
  const data = await FirebaseClass.getPokemonsOnce();
  dispatch(fetchPokemonsResolve(data));
};

export default slice.reducer;
