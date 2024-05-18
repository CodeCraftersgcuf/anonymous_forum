import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reply: null,
  replies: [],
};

const replySlice = createSlice({
  name: "thread",
  initialState,
  reducers: {
    setReply: (state, action) => {
      state.reply = action.payload;
    },
    setReplies: (state, action) => {
      state.replies = action.payload;
    },
  },
});

export const getCurrentReply = (state) => state.replyState.reply;

export const { setReply, setReplies } = replySlice.actions;

export default replySlice.reducer;
