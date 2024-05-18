import baseQuery from "../utils/customFetchBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import { setBoard, setBoards } from "../../components/features/Boards/BoardSlice";

export const boardApi = createApi({
  reducerPath: "boardApi",
  baseQuery: baseQuery,
  tagTypes: ["Board"],
  endpoints: (builder) => ({
    getBoards: builder.query({
      query() {
        return {
          url: "boards/",
          credentials: "include",
        };
      },
      providesTags: ["Board"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setBoards(data));
        } catch (error) {}
      },

      transformResponse: (result) => {
        return result?.data;
      },
    }),
    postBoard: builder.mutation({
      query(payload) {
        const { name, description, tags } = payload;
        return {
          url: "boards/create",
          credentials: "include",
          method: "POST",
          body: {
            name: name,
            description: description,
            tags: tags,
          },
        };
      },
      invalidatesTags: ["Board"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // dispatch(setBoards(data));
        } catch (error) {}
      },

      transformResponse: (result) => {
        return result?.data;
      },
    }),
    getBoard: builder.query({
      query(id) {
        return {
          url: "boards/board",
          params: {
            boardNumber: id,
          },
          credentials: "include",
        };
      },
      providesTags: ["Board"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setBoard(data));
        } catch (error) {}
      },

      transformResponse: (result) => {
        return result?.data;
      },
    }),
  }),
});

export const { useGetBoardsQuery, useGetBoardQuery, usePostBoardMutation } =
  boardApi;
