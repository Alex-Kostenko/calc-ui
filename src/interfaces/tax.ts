import { IEntity } from "./entity";

export interface ITax extends IEntity {
  threshold: number;
  tax: number;
}
