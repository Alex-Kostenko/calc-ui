import { IConst } from "@/interfaces/const";
import { IExchange } from "@/interfaces/exchange";
import { IRegistration } from "@/interfaces/registration";
import {
  IUser,
  IAuction,
  ILocation,
  IPort,
  IResponse,
  IState,
  LoginDto,
  LoginData,
  ICarType,
  IFormula,
  IFuelCost,
  TCarTypes,
} from "@interfaces/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_STRAPI_URL || "http://localhost:1337/api/",
  prepareHeaders: (headers) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const strapiApi = createApi({
  reducerPath: "strapiApi",
  baseQuery,
  endpoints: (builder) => ({
    getUser: builder.query<IResponse<IUser>, string>({
      query: (id) => `calculator-users/${id}`,
    }),
    getAllUsers: builder.query<IResponse<IUser[]>, void>({
      query: () => `calculator-users`,
    }),
    getAllLocations: builder.query<IResponse<ILocation[]>, void>({
      query: () =>
        "locations?populate[state][fields]=*&populate[auctions][populate]=auction_tax.tax&populate[port][populate]=car_types&populate[price_by_type][fields]=*",
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
      query: () =>
        "auctions?populate=locations&populate=auction_tax.tax&populate=image&populate=bids",
    }),
    getAllCarTypes: builder.query<IResponse<ICarType[]>, void>({
      query: () => "car-types?populate=image&populate=packImage",
      transformResponse(res: IResponse<ICarType[]>) {
        const typesOrder: TCarTypes[] = [
          "sedan",
          "crossover",
          "big-crossover",
          "minivan",
          "pikup",
        ];
        res.data = res.data.sort(
          (a, b) => typesOrder.indexOf(a.name) - typesOrder.indexOf(b.name)
        );
        return res;
      },
    }),
    getAllFormules: builder.query<IResponse<IFormula[]>, void>({
      query: () => "formulas?populate=operations",
    }),
    getFormulaByName: builder.query<IResponse<IFormula[]>, string>({
      query: (name) => `formulas?filters[name]=${name}`,
    }),
    login: builder.mutation<LoginData, LoginDto>({
      query: (dto) => ({
        url: "auth/local",
        method: "POST",
        body: dto,
      }),
    }),
    getMe: builder.query<IUser, void>({
      query: () => "users/me?populate[coefficient][populate]=*",
    }),
    getConsts: builder.query<IResponse<IConst>, void>({
      query: () => "const",
    }),
    getRegistrationPercent: builder.query<IResponse<IRegistration>, void>({
      query: () => "registration?populate=*",
    }),
    getFuelCost: builder.query<IResponse<IFuelCost>, void>({
      query: () => "fuel?populate=*",
    }),
    getCurrencyRate: builder.query<IExchange, void>({
      query: () => `currency`,
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
  useGetAllCarTypesQuery,
  useLoginMutation,
  useGetAllFormulesQuery,
  useGetFormulaByNameQuery,
  useGetMeQuery,
  useGetConstsQuery,
  useGetRegistrationPercentQuery,
  useGetFuelCostQuery,
  useGetCurrencyRateQuery,
} = strapiApi;
