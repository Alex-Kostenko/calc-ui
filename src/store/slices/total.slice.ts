import { ICarType } from "@/interfaces/car.type";
import { ILocation, IPort, IUser } from "@/interfaces/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TotalState {
  location: null | ILocation;
  locationPort: null | IPort;
  auctionName: null | string;
  carType?: ICarType;
  user?: IUser;

  carPrice: null | number;
  auctionTax?: number;
  insurance?: number;
  portDeliveryPrice?: number;
  seaTransportingPrice?: number;
  excise?: number;
  duty?: number;
  vat?: number;
  broker?: number;
  expedition?: number;
  cityDeliveryPrice?: number;
  certification?: number;
  registration?: number;
  companyServices?: number;
}

const initialState: TotalState = {
  location: null,
  locationPort: null,
  auctionName: null,
  carPrice: null,
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
    setPorts: (state, action) => {
      state.locationPort = action.payload;
    },
    setAuction: (state, action) => {
      state.auctionName = action.payload;
    },
  },
});

export const { setAll, setAuction, setLocation, setPorts } = totalSlice.actions;

export default totalSlice.reducer;
