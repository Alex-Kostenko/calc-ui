import { Location } from "@/interfaces/location";
import { Port } from "@/interfaces/port";
import { createSlice } from "@reduxjs/toolkit";

export interface TotalState {
  location: null | Location;
  locationPort: null | Port;
  auctionName: null | string;
}

const initialState: TotalState = {
  location: null,
  locationPort: null,
  auctionName: null,
};

export const totalSlice = createSlice({
  name: "total",
  initialState,
  reducers: {
    setAll: (state, action) => {
      state = { ...state, ...action.payload };
    },
    setLocation: (state, action) => {
      state.location = action.payload;
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
