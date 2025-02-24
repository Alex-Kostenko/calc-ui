import { IEntity } from "./entity";

export interface IConst extends IEntity {
  broker: number;
  expedition: number;
  cityDelivery: number;
  certification: number;
  companyService: number;
  dangerousGoods: number;
}
