import { IEntity } from "./entity";

export interface IConst extends IEntity {
  broker: number;
  expedition: number;
  certification: number;
  companyService: number;
  dangerousGoods: number;
  eur: number;
  sublot: number;
}
