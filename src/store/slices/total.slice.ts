import { ICarType } from "@/interfaces/car.type";
import { IConst } from "@/interfaces/const";
import { TFuelType, IFuelCost, ILocation, IUser } from "@/interfaces/index";
import { IPercentByValue } from "@/interfaces/registration";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TotalState {
  location: null | ILocation;
  auctionName: null | string;
  carType?: ICarType;
  carYear?: number;
  fuelType?: TFuelType;
  fuelCost?: IFuelCost;
  volume?: number;
  auctionFee?: number;
  registrationPercents?: IPercentByValue[];
  user?: IUser;
  consts?: IConst;
  isSublot?: boolean;

  carPrice?: null | number;
  insurance?: number;
  // portDeliveryPrice?: number;
  // seaTransportingPrice?: number;
  excise?: number;
  duty?: number;
  vat?: number;
  broker?: number;
  expedition?: number;
  // cityDeliveryPrice?: number;
  certification?: number;
  // registration?: number;
  companyServices?: number;
}

const initialState: TotalState = {
  location: null,
  auctionName: null,
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
    setAuction: (state, action) => {
      state.auctionName = action.payload;
    },
  },
});

export const { setAll, setAuction, setLocation } = totalSlice.actions;

export default totalSlice.reducer;
