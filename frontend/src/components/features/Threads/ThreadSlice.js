import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  thread: null,
  threads: [],
};

const threadSlice = createSlice({
  name: "thread",
  initialState,
  reducers: {
    setThread: (state, action) => {
      state.thread = action.payload;
    },
    setThreads: (state, action) => {
      state.threads = action.payload;
    },
  },
});

export const getCurrentThread = (state) => state.threadState.thread;

export const { setThread, setThreads } = threadSlice.actions;

export default threadSlice.reducer;
