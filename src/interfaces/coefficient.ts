export interface ICoefficient {
  name: string;
  coef: ICoef[];
}

export interface ICoef {
  Field: "auctionFee" | "insurance" | "excise" | "duty" | "vat";
  value: number;
  isPercent: boolean;
}
