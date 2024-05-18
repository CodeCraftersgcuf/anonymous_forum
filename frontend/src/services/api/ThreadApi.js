import baseQuery from "../utils/customFetchBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import { setThread, setThreads } from "../../components/features/Threads/ThreadSlice";

export const threadApi = createApi({
  reducerPath: "threadApi",
  baseQuery: baseQuery,
  tagTypes: ["Thread"],
  endpoints: (builder) => ({
    getAllThreads: builder.query({
      query() {
        return {
          url: "thread/threads",
          credentials: "include",
        };
      },
      providesTags: ["Thread"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setThreads(data?.data));
        } catch (error) {}
      },
    }),

    getThread: builder.query({
      query(threadNumber) {
        return {
          url: "thread/thread",
          params: {
            threadNumber: threadNumber,
          },
          credentials: "include",
        };
      },
      providesTags: ["Thread"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setThread(data?.data));
        } catch (error) {}
      },
    }),
    getBoardThreads: builder.query({
      query(boardId) {
        return {
          url: "thread/threads/board",
          params: {
            boardId: boardId,
          },
          credentials: "include",
        };
      },
      providesTags: ["Thread"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setThreads(data));
        } catch (error) {}
      },
      transformResponse: (result) => {
        return result?.data;
      },
    }),
    postThread: builder.mutation({
      query(payload) {
        return {
          url: "thread/create",
          body: payload,
          method: "POST",
          credentials: "include",
        };
      },
      invalidatesTags: ["Thread"],
      async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled();
          const state = getState();
          dispatch(setThreads(state.threadState?.threads));
        } catch (error) {}
      },
      transformResponse: (result) => {
        return result?.data;
      },
    }),
  }),
});

export const {
  useGetAllThreadsQuery,
  useGetBoardThreadsQuery,
  useGetThreadQuery,
  usePostThreadMutation,
} = threadApi;
