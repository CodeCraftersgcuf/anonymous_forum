import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  credentials: "include", // Include credentials in the request
});

export default baseQuery;
