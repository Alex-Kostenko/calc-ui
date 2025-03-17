import { ICarType } from "@/interfaces/car.type";
import { IConst } from "@/interfaces/const";
import { IExchange } from "@/interfaces/exchange";
import {
  TFuelType,
  IFuelCost,
  ILocation,
  IUser,
  IBid,
  IAuction,
} from "@/interfaces/index";
import { IPercentByValue } from "@/interfaces/registration";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TotalState {
  location: null | ILocation;
  auction?: IAuction;
  carType?: ICarType;
  carYear?: number;
  fuelType?: TFuelType;
  fuelCost?: IFuelCost;
  volume?: number;
  auctionFee?: number;
  additionalFee?: number;
  auctionBids?: IBid[];
  registrationPercents?: IPercentByValue[];
  user?: IUser;
  consts?: IConst;
  isSublot?: boolean;

  exchange?: IExchange;

  carPrice?: null | number;
  insurance?: number;
  excise?: number;
  duty?: number;
  vat?: number;
  broker?: number;
  expedition?: number;
  certification?: number;
  companyServices?: number;
}

const initialState: TotalState = {
  location: null,
  carPrice: undefined,
};

export const totalSlice = createSlice({
  name: "total",
  initialState,
  reducers: {
    setAll: (state, action: PayloadAction<Partial<TotalState>>) => {
      const newState = action.payload;

      Object.keys(newState).forEach((key) => {
        const field = key as keyof TotalState;
        if (state[field] !== newState[field]) {
          state[field] = newState[field] as never;
        }
      });
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setCarPrice: (state, action) => {
      state.carPrice = action.payload;
    },
  },
});

export const { setAll, setLocation } = totalSlice.actions;

export default totalSlice.reducer;
