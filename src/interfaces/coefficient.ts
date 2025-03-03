export interface ICoefficient {
  name: string;
  coef: ICoef[];
}

export interface ICoef {
  field:
    | "auctionFee"
    | "insurance"
    | "excise"
    | "duty"
    | "vat"
    | "portDelivery"
    | "cityDelivery"
    | "seaTransportation"
    | "broker"
    | "expedition"
    | "sertification"
    | "registration"
    | "companyServices";
  value?: number;
  isPercent: boolean;
}
