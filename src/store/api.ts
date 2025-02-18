import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const strapiApi = createApi({
  reducerPath: "strapiApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5432/api/" }),
  endpoints: (builder) => ({
    getUser: builder.query<string, string>({
      query: (id) => `calculator-users${id}`,
    }),
  }),
});

export const { useGetUserQuery } = strapiApi;
