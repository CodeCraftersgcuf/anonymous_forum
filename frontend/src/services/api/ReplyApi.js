import baseQuery from "../utils/customFetchBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import { setReplies } from "../../components/features/Replies/ReplySlice";

export const replyApi = createApi({
  reducerPath: "replyApi",
  baseQuery: baseQuery,
  tagTypes: ["Reply"],
  endpoints: (builder) => ({
    getThreadReplies: builder.query({
      query(threadNumber) {
        return {
          url: "reply/thread",
          credentials: "include",
          params: {
            threadNumber: threadNumber,
          },
        };
      },
      providesTags: ["Reply"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setReplies(data));
        } catch (error) {}
      },

      transformResponse: (result) => {
        return result?.data;
      },
    }),
    getChildReplies: builder.query({
      query(parentReplyId) {
        return {
          url: "reply/childReplies",
          credentials: "include",
          params: {
            parentReplyId: parentReplyId,
          },
        };
      },
      providesTags: ["Reply"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
        } catch (error) {}
      },

      transformResponse: (result) => {
        return result?.data;
      },
    }),
    postThreadReply: builder.mutation({
      query(payload) {
        const { threadNumber, text, user, parentReplyNumber = null } = payload;
        return {
          url: "reply/create",
          credentials: "include",
          method: "POST",
          body: {
            threadNumber,
            text,
            user,
            parentReplyNumber: parentReplyNumber,
          },
        };
      },
      providesTags: ["Reply"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
        } catch (error) {}
      },

      transformResponse: (result) => {
        return result?.data;
      },
    }),
  }),
});

export const {
  useGetThreadRepliesQuery,
  usePostThreadReplyMutation,
  useGetChildRepliesQuery,
} = replyApi;
