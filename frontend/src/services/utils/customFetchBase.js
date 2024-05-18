import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

const BASE_URL = "http://localhost:8080";

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  credentials: "include", // Include credentials in the request
});

export default baseQuery;
