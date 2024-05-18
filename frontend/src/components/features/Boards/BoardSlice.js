import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  board: null,
  boards: [],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoard: (state, action) => {
      state.board = action.payload;
    },
    setBoards: (state, action) => {
      state.boards = action.payload;
    },
  },
});

export const { setBoard, setBoards } = boardSlice.actions;

export const getAllBoards = (state) => state.boardState.boards;
export const getCurrentBoard = (state) => state.boardState.board;

export default boardSlice.reducer;
