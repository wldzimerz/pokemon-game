import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "pokemons2",
  initialState: {
    isLoading: false,
    data: {},
    selectedPokemons: [],
    error: null,
  },
  reducers: {
    fetchPokemons: (state) => ({
      ...state,
      isLoading: true,
    }),

    fetchPokemonsResolve: (state, action) => ({
      ...state,
      isLoading: false,
      data: action.payload.data,
      selectedPokemons: action.payload.pokemons,
    }),

    fetchPokemonsReject: (state, action) => ({
      ...state,
      isLoading: false,
      data: {},
      selectedPokemons: [],
      error: action.payload,
    }),

    clearPokemons2: (state) => ({
      ...state,
      selectedPokemons: [],
    }),
  },
});

export const { fetchPokemons, fetchPokemonsResolve, fetchPokemonsReject, handleSelectedPokemons, clearPokemons2 } = slice.actions;
export const cards2Data = (state) => state.pokemons2.data;
export const selectedPokemons2 = (state) => state.pokemons2.selectedPokemons;

export const getPokemons2Async = () => async (dispatch) => {
  dispatch(fetchPokemons());

  try {
    const player2Response = await fetch("https://reactmarathon-api.netlify.app/api/create-player");
    const player2Request = await player2Response.json();
    dispatch(fetchPokemonsResolve({ data: player2Request, pokemons: player2Request.data }));
  } catch (error) {
    dispatch(fetchPokemonsReject("Error"));
  }
};

export default slice.reducer;
