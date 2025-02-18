import {
  IUser,
  IAuction,
  ILocation,
  IPort,
  IResponse,
  IState,
} from "@interfaces/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const strapiApi = createApi({
  reducerPath: "strapiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_STRAPI_URL || "http://localhost:1337/api/",
    headers: {
      authorization: "Bearer " + import.meta.env.VITE_STRAPI_TOKEN,
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query<IResponse<IUser>, string>({
      query: (id) => `calculator-users/${id}`,
    }),
    getAllUsers: builder.query<IResponse<IUser[]>, void>({
      query: () => `calculator-users`,
    }),
    getAllLocations: builder.query<IResponse<ILocation[]>, void>({
      query: () =>
        "locations?populate[state][populate]=port&populate[auctions][fields]=*&populate=port",
    }),
    getAllStates: builder.query<IResponse<IState[]>, void>({
      query: () => "states?populate=port",
    }),
    getAllPorts: builder.query<IResponse<IPort[]>, void>({
      query: () => "ports",
    }),
    getPortsByLocation: builder.query<IResponse<IPort[]>, string>({
      query: (locationId) =>
        `ports?filter[locations][documentId]=${locationId}`,
    }),
    getAllAuctions: builder.query<IResponse<IAuction[]>, void>({
      query: () => "auctions?populate=locations",
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllUsersQuery,
  useGetAllLocationsQuery,
  useGetAllPortsQuery,
  useGetPortsByLocationQuery,
  useGetAllStatesQuery,
  useGetAllAuctionsQuery,
} = strapiApi;
