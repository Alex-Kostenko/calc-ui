export enum EFuelType {
  diesel = "diesel",
  gasoline = "gasoline",
  electric = "electric",
  hybrid = "hybrid",
}

export type TFuelType = "diesel" | "gasoline" | "electric" | "hybrid";

export interface ICost {
  amount: number;
  min: number;
  max: number;
}
export interface IFuelCost extends Record<TFuelType, ICost> {}
