import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "gameResult",
  initialState: {
    winner: null,
  },
  reducers: {
    setWinner: (state, action) => {
      return { ...state, winner: action.payload };
    },
  },
});

export const winner = (state) => state.gameResult.winner;
export const { reducer } = slice;
export const { setWinner } = slice.actions;

// export default slice.reducer;
