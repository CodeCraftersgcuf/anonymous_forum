import { configureStore } from "@reduxjs/toolkit";

// API
import { threadApi } from "../services/api/ThreadApi";
import { boardApi } from "../services/api/BoardApi";
import { replyApi } from "../services/api/ReplyApi";

// Reducers
import threadReducer from "../components/features/Threads/ThreadSlice";
import boardReucer from "../components/features/Boards/BoardSlice";
import replyReducer from "../components/features/Replies/ReplySlice";
export const store = configureStore({
  reducer: {
    [boardApi.reducerPath]: boardApi.reducer,
    [threadApi.reducerPath]: threadApi.reducer,
    [replyApi.reducerPath]: replyApi.reducer,
    boardState: boardReucer,
    threadState: threadReducer,
    replyState: replyReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      threadApi.middleware,
      boardApi.middleware,
      replyApi.middleware,
    ]),
});
